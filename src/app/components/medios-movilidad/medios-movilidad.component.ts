import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from "@angular/material/dialog";
import { MedioMovilidad } from 'src/app/models/medio-movilidad.model';
import { BicycleModalComponent } from 'src/app/shared/modals/bicycle-modal/bicycle-modal.component';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ActivatedRoute } from '@angular/router';
import { ResolversEnum } from 'src/app/enums/enums/resolvers.enum';
import { MeansOfTransportations } from 'src/app/enums/means-of-transportations.enum';
import { CarModalComponent } from 'src/app/shared/modals/car-modal/car-modal.component';
import { MotorcycleModalComponent } from 'src/app/shared/modals/motorcycle-modal/motorcycle-modal.component';
import { RollersModalComponent } from 'src/app/shared/modals/rollers-modal/rollers-modal.component';
import { WalkingModal } from 'src/app/shared/modals/walking/walking.modal';
import { RunningModal } from 'src/app/shared/modals/running/running.modal';
import { AuthService } from 'src/app/services/auth.service';
import { ExpLevelEnum } from 'src/app/enums/exp-level.enum';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './medios-movilidad.component.html',
  styleUrls: ['./medios-movilidad.component.scss']
})
export class MediosMovilidadComponent implements OnInit {

  meanOfTransportation: string;
  mediosMovilidad: MedioMovilidad[];
  xpLevels: ExpLevelEnum;

  public dataSource: MedioMovilidad[];

  displayedColumns: string[] = ['medioMovilidad', 'acciones'];

  myControl = new FormControl();
  options: MedioMovilidad[];
  filteredOptions: Observable<MedioMovilidad[]>;
  loggedUser: any;

  constructor(
    public matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    public formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.options = this.activatedRoute.snapshot.data[ResolversEnum.MEDIOS_MOVILIDAD].meansOfTransportation;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.options.slice())
    );

    this.loggedUser = this.authService.getLoggedUser();
  }

  displayFn(meanOfTransportation: MedioMovilidad): string {
    return meanOfTransportation && meanOfTransportation.name ? meanOfTransportation.name : '';
  }

  openDialog(uid: string) {

    const modalType = this.getModalType();
    let dialogRef = this.matDialog.open(modalType, {
      width: '99vw',
      data: { uid }
    });

    dialogRef.componentInstance.formBuilder = this.formBuilder;


    dialogRef.afterClosed().subscribe((value) => {
      const mot = this.activatedRoute.snapshot.data[ResolversEnum.MEDIOS_MOVILIDAD].meansOfTransportation.find((mot) => mot.uid === uid);
      mot.xpLevel = value;
      if (this.loggedUser.meansOfTransportation.length) {
        this.loggedUser.meansOfTransportation.push(mot)
      } else {
        this.loggedUser.meansOfTransportation = [mot];
      }
      this.userService.update(this.loggedUser.uid, this.loggedUser).subscribe((data) => {
        this.loggedUser = data;
        // this.authService.refreshUser(this.loggedUser);
      })
    })
  }

  getModalType() {
    let modalType = BicycleModalComponent;
    switch (this.meanOfTransportation) {
      case MeansOfTransportations.AUTO:
        modalType = CarModalComponent;
        break;
      case MeansOfTransportations.MOTO:
        modalType = MotorcycleModalComponent;
        break;
      case MeansOfTransportations.ROLLERS:
        modalType = RollersModalComponent;
        break;
      case MeansOfTransportations.CAMINANDO:
        modalType = WalkingModal;
        break;
      case MeansOfTransportations.CORRER:
        modalType = RunningModal;
        break
      default:
        break;
    }
    return modalType;
  }

  private _filter(value: string): MedioMovilidad[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option: any) => option.name.toLowerCase().includes(filterValue));
  }

  onSelectionChange($selected: MatAutocompleteSelectedEvent) {
    this.meanOfTransportation = $selected.option.value.name;
    this.openDialog($selected.option.value.uid)
  }

  agregarContacto() {

  }

}
