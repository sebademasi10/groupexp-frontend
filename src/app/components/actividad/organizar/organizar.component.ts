import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MapDirectionsService, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ResolversEnum } from 'src/app/enums/enums/resolvers.enum';
import { MapsService } from 'src/app/maps.service';
import { MedioMovilidad } from 'src/app/models/medio-movilidad.model';

@Component({
  selector: 'app-organizar',
  templateUrl: './organizar.component.html',
  styleUrls: ['./organizar.component.scss']
})
export class OrganizarComponent implements OnInit, AfterViewInit {

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
      private activatedRoute: ActivatedRoute,
      private mapsDirectionsService: MapDirectionsService
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
      title: [],
      meanOfTransportation: [this.meansOfTransportation],
      minAge: [18],
      maxAge: [18],
      startDate: [new Date()],
      endDate: [new Date()],
      startTime: ['00:00'],
      endTime: ['00:00'],
      description: []
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
    console.log(this.selectedOption);
  }

  public newActivity() {
    console.log(this.activityForm.value)
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
