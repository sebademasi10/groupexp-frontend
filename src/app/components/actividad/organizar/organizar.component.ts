import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapDirectionsService, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ResolversEnum } from 'src/app/enums/enums/resolvers.enum';
import { MapsService } from 'src/app/maps.service';
import { Activity } from 'src/app/models/activity.model';
import { MedioMovilidad } from 'src/app/models/medio-movilidad.model';
import { ActividadService } from 'src/app/services/actividad.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-organizar',
  templateUrl: './organizar.component.html',
  styleUrls: ['./organizar.component.scss']
})
export class OrganizarComponent implements OnInit, AfterViewInit {

  private _activity: Activity;

  public activityForm: FormGroup;
  public meansOfTransportation: MedioMovilidad[];
  public filteredOptions: Observable<MedioMovilidad[]>;
  public selectedOption: MedioMovilidad;
  public mapApiLoaded: Observable<boolean>;

  // MAPS
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  public directionsResults$: Observable<google.maps.DirectionsResult | undefined>
  public directionsOptions: google.maps.DirectionsRendererOptions = {
    draggable: true
  }
  public center: google.maps.LatLngLiteral = { lat: -31.417, lng: -64.183 };
  public zoom = 8
  public markerOptions: google.maps.MarkerOptions = { draggable: false };
  public markerPositions: google.maps.LatLngLiteral[] = [];


  constructor
    (
      private formBuilder: FormBuilder,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private mapsDirectionsService: MapDirectionsService,
      private snackBarService: SnackBarService,
      private activitiesService: ActividadService
    ) { }

  ngOnInit(): void {
    this.meansOfTransportation = this.activatedRoute.snapshot.data[ResolversEnum.MEDIOS_MOVILIDAD].meansOfTransportation;
    this._createForm();
    this.filteredOptions = this.activityForm.controls['meanOfTransportation'].valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.meansOfTransportation.slice())
    );
  }

  ngAfterViewInit() {
    MapsService.getInstance()
      .getLoader()
      .load()
      .then(() => {
        this.mapApiLoaded = of(true);
      })
      .catch((err) => {
        console.error(err);
        this.mapApiLoaded = of(false);
      })
  }

  private _createForm() {
    this.activityForm = this.formBuilder.group({
      title: ["", Validators.required],
      meanOfTransportation: [this.meansOfTransportation, Validators.required],
      minAge: [18, Validators.required],
      maxAge: [18, Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      startTime: ['00:00', Validators.required],
      endTime: ['00:00', Validators.required],
      description: ["", Validators.required]
    })
  }

  private _filter(value: string): MedioMovilidad[] {
    const filterValue = value.toLowerCase();

    return this.meansOfTransportation.filter((option: any) => option.name.toLowerCase().includes(filterValue));
  }

  private _createDirectionsRequest(): google.maps.DirectionsRequest {
    return {
      origin: this.markerPositions[0],
      destination: this.markerPositions[1],
      travelMode: google.maps.TravelMode.DRIVING
    }
  }

  public displayFn(meanOfTransportation: MedioMovilidad): string {
    return meanOfTransportation && meanOfTransportation.name ? meanOfTransportation.name : '';
  }

  public formatLabel(value: number) {
    return `${value} años`;
  }

  public onSelectionChange(option: MatAutocompleteSelectedEvent) {
    this.selectedOption = option.option.value;
  }

  public newActivity() {
    if (this.activityForm.invalid || this.markerPositions.length < 2) {
      return this.snackBarService.openSnackBar("Por favor complete los campos requeridos y seleccione 2 puntos del mapa", false)
    }
    this._activity = this.activityForm.value;
    this._activity.meanOfTransportation = this.activityForm.controls['meanOfTransportation'].value.name;
    this._activity.fromCoordinates = this.markerPositions[0];
    this._activity.toCoordinates = this.markerPositions[1];
    this.activitiesService.save(this._activity).subscribe((activityTitle: string) => {
      this.snackBarService.openSnackBarTimeout(`Actividad "${activityTitle}" creada con éxito`, true, 3000);
      // TODO: Navegar a detalle de actividad
      this.router.navigate(['home'])
    });
  }

  public addMarker(event: google.maps.MapMouseEvent) {

    if (this.markerPositions.length < 2) {
      this.markerPositions.push(event.latLng.toJSON());
      if (this.markerPositions.length === 2) {
        const directionsRequest = this._createDirectionsRequest();
        this.directionsResults$ = this.mapsDirectionsService
          .route(directionsRequest)
          .pipe(map(response => response.result))
      }
    }

  };

  public openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  public moveMap(event: google.maps.MapMouseEvent) {
    this.center = (event.latLng.toJSON());
  }

  public move(event: google.maps.MapMouseEvent) {
    this.center = event.latLng.toJSON();
  }




}
