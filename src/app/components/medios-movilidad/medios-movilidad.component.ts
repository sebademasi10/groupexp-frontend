import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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


@Component({
  selector: 'app-agregar',
  templateUrl: './medios-movilidad.component.html',
  styleUrls: ['./medios-movilidad.component.scss']
})
export class MediosMovilidadComponent implements OnInit {

  meanOfTransportation: string;
  mediosMovilidad: MedioMovilidad[];

  public dataSource: MedioMovilidad[];

  displayedColumns: string[] = ['medioMovilidad', 'acciones'];

  myControl = new FormControl();
  options: MedioMovilidad[];
  filteredOptions: Observable<MedioMovilidad[]>;

  constructor(
    private snackService: SnackBarService,
    public matDialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.options = this.activatedRoute.snapshot.data[ResolversEnum.MEDIOS_MOVILIDAD].meansOfTransportation;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.options.slice())
    );
  }

  displayFn(meanOfTransportation: MedioMovilidad): string {
    return meanOfTransportation && meanOfTransportation.name ? meanOfTransportation.name : '';
  }

  openDialog() {

    const modalType = this.getModalType();
    const dialogRef = this.matDialog.open(modalType, {
      width: '99vw',
    });


    dialogRef.afterClosed().subscribe(() => {
      this.snackService.openSnackBar('Actualizado con éxito', true);
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
    console.log('opt', $selected.option.value);
    this.meanOfTransportation = $selected.option.value.name;
    this.openDialog()
  }

  agregarContacto() {

  }

}
