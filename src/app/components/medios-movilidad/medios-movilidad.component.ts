import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from "@angular/material/dialog";
import { MediosMovilidad } from 'src/app/models/medios-movilidad.model';
import { MediosMovilidadService } from 'src/app/services/medios-movilidad.service';
import { BicycleModalComponent } from 'src/app/shared/modals/bicycle-modal/bicycle-modal.component';
import { SnackBarService } from 'src/app/services/snack-bar.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './medios-movilidad.component.html',
  styleUrls: ['./medios-movilidad.component.scss']
})
export class MediosMovilidadComponent implements OnInit {

  selectedOption: string;
  mediosMovilidad: MediosMovilidad[];

  public dataSource = [
    {
      nombre: 'Caminata',
    },
    {
      nombre: 'Bicicleta',
    },
  ];

  displayedColumns: string[] = ['medioMovilidad', 'acciones'];

  myControl = new FormControl();
  options: string[] = ['Automóvil', 'Bicicleta', 'Skate', 'Rollers'];
  filteredOptions: Observable<string[]>;

  constructor(
    private mediosMovilidadService: MediosMovilidadService,
    private snackService: SnackBarService,
    public matDialog: MatDialog,
  ) {

  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.get()
  }

  get() {
    this.mediosMovilidadService.get().subscribe(mediosMovilidad => {
      this.mediosMovilidad = mediosMovilidad
      console.log(mediosMovilidad);
    })
  }

  openDialog() {
    const dialogRef = this.matDialog.open(BicycleModalComponent, {
      width: '60vw',
      height: '80vh'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.snackService.openSnackBar('Actualizado con éxito', true);
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSelectionChange(option: MatAutocompleteSelectedEvent) {
    this.selectedOption = option.option.value;
    this.openDialog()
  }

  agregarContacto() {
    let [nombre, apellido] = this.selectedOption.split(' ');
    console.log(nombre, apellido);
    this.dataSource.push({
      nombre: nombre,
    })
    this.dataSource = [...this.dataSource];
  }

}
