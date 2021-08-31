import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MediosMovilidad } from 'src/app/models/medios-movilidad';
import { MediosMovilidadService } from 'src/app/services/medios-movilidad.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  selectedOption: string;
  mediosMovilidad: MediosMovilidad[];

  public dataSource = [
    {
      nombre: 'Caminata',
    },
  ];

  displayedColumns: string[] = ['medioMovilidad', 'acciones'];

  myControl = new FormControl();
  options: string[] = ['Automóvil', 'Bicicleta', 'Skate', 'Rollers'];
  filteredOptions: Observable<string[]>;

  constructor(
    private mediosMovilidadService: MediosMovilidadService
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSelectionChange(option: MatAutocompleteSelectedEvent) {
    this.selectedOption = option.option.value;
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
