import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MapDirectionsService, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ResolversEnum } from 'src/app/enums/enums/resolvers.enum';
import { MeansOfTransportations } from 'src/app/enums/means-of-transportations.enum';
import { MapsService } from 'src/app/maps.service';
import { Activity } from 'src/app/models/activity.model';
import { MedioMovilidad } from 'src/app/models/medio-movilidad.model';
import { ActividadService } from 'src/app/services/actividad.service';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {

  public activity: Activity;

  public activityForm: FormGroup;
  public meansOfTransportation: MedioMovilidad[];
  public filteredOptions: Observable<MedioMovilidad[]>;
  public selectedOption: MedioMovilidad;
  public mapApiLoaded: Observable<boolean>;

  // MAPS
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  public directionsResults$: Observable<google.maps.DirectionsResult | undefined>
  public directionsOptions: google.maps.DirectionsRendererOptions = {
    draggable: false
  }
  public center: google.maps.LatLngLiteral = { lat: -31.417, lng: -64.183 };
  public zoom = 8
  public markerOptions: google.maps.MarkerOptions = { draggable: false };
  public markerPositions: google.maps.LatLngLiteral[] = [];
  public loggedUserName: string;
  public uid: string;
  public isParticipant: boolean;
  public loggedUser: any;
  public loggedUserFullName: string;


  constructor
    (
      private formBuilder: FormBuilder,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private mapsDirectionsService: MapDirectionsService,
      private snackBarService: SnackBarService,
      private activitiesService: ActividadService,
      private authService: AuthService
    ) {
    this.loggedUser = authService.getLoggedUserName();
    this.loggedUserFullName = `${this.loggedUser.name} ${this.loggedUser.surname}`
    this.uid = authService.getUserId();
  }

  ngOnInit(): void {
    this.meansOfTransportation = this.activatedRoute.snapshot.data[ResolversEnum.MEDIOS_MOVILIDAD].meansOfTransportation;
    this.activity = this.activatedRoute.snapshot.data[ResolversEnum.ACTIVIDAD];
    this.isParticipant = this.checkParticipant()
    this.markerPositions.push(this.activity.fromCoordinates);
    this.markerPositions.push(this.activity.toCoordinates);
    this.activity.isOwner = this.activity.creators.includes(this.loggedUserName)
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
        const directionsRequest = this._createDirectionsRequest();
        this.mapApiLoaded = of(true);
        this.directionsResults$ = this.mapsDirectionsService
          .route(directionsRequest)
          .pipe(map(response => response.result))
      })
      .catch((err) => {
        console.error(err);
        this.mapApiLoaded = of(false);
      })
  }

  public checkParticipant() {
    const participant = this.activity.participants.find((participant) => {
      console.log('part', participant);
      return participant.name === this.loggedUser.name && participant.surname === this.loggedUser.surname;
    });

    return participant !== undefined;
  }

  private _createForm() {
    this.activityForm = this.formBuilder.group({
      title: [this.activity.title],
      meanOfTransportation: [this.activity.meanOfTransportation],
      minAge: [this.activity.minAge],
      maxAge: [this.activity.maxAge],
      startDate: [new Date(this.activity.startDate)],
      endDate: [new Date(this.activity.endDate)],
      startTime: [this.activity.startTime],
      endTime: [this.activity.endTime],
      description: [this.activity.description]
    })

    this.activityForm.disable();
    if (this.activity.isOwner) {
      this.activityForm.controls.title.enable();
      this.activityForm.controls.description.enable();
      this.activityForm.controls.startDate.enable();
      this.activityForm.controls.endDate.enable();
    }
  }

  public clearMarkers() {
    this.markerPositions = [];
    this.directionsResults$ = undefined;
  }

  private _filter(value: string): MedioMovilidad[] {
    const filterValue = value.toLowerCase();

    return this.meansOfTransportation.filter((option: any) => option.name.toLowerCase().includes(filterValue));
  }

  private _createDirectionsRequest(): google.maps.DirectionsRequest {
    const travelMode = this._getTravelMode()
    return {
      origin: this.markerPositions[0],
      destination: this.markerPositions[1],
      travelMode
    }
  }

  private _getTravelMode(): google.maps.TravelMode {
    if (!this.activity.meanOfTransportation) return google.maps.TravelMode.WALKING;
    let travelMode: google.maps.TravelMode;
    switch (this.activity.meanOfTransportation) {
      case MeansOfTransportations.CAMINANDO:
      case MeansOfTransportations.CORRER:
      case MeansOfTransportations.ROLLERS:
      case MeansOfTransportations.BICICLETA:
        travelMode = google.maps.TravelMode.WALKING;
        break;
      case MeansOfTransportations.MOTO:
      case MeansOfTransportations.AUTO:
        travelMode = google.maps.TravelMode.DRIVING;
        break;
      default:
    }
    return travelMode;
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
    this.activity = this.activityForm.value;
    this.activity.meanOfTransportation = this.activityForm.controls['meanOfTransportation'].value.name;
    this.activity.fromCoordinates = this.markerPositions[0];
    this.activity.toCoordinates = this.markerPositions[1];
    this.activitiesService.save(this.activity).subscribe((activityTitle: string) => {
      this.snackBarService.openSnackBarTimeout(`Actividad "${activityTitle}" creada con éxito`, true, 3000);
      // TODO: Navegar a detalle de actividad
      this.router.navigate(['home'])
    });
  }

  public openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  public moveMap(event: google.maps.MapMouseEvent) {
    this.center = (event.latLng.toJSON());
  }

  public move(event: google.maps.MapMouseEvent) {
    this.center = event.latLng.toJSON();
  }

  public participate() {
    let payload = JSON.parse(JSON.stringify(this.activity));
    const user = this.authService.getLoggedUser()
    payload.participants.push(user);
    this.activitiesService.save(payload).subscribe((response: any) => {
      this.activity = response;
      this.snackBarService.openSnackBar("Listo, ya estás participando!", true);
      this.router.navigate(['home']);
    })
  }

  disparticipate() {
    // this.activitiesService.disparticipate(this.uid).subscribe((data: any) => {
    //   console.log(data)
    // })
  }

  edit() {
    let activity = this.activityForm.value;
    activity.uid = this.activity.uid;
    this.activitiesService.update(activity).subscribe((response: any) => {
      this.activity = response;
      this.snackBarService.openSnackBar("Edición exitosa!", true);
      this.router.navigate(['home']);
    })
  }
}