import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  selectedOption: string;

  public dataSource = [
    {
      nombre: 'Ricardo',
      apellido: 'Galván'
    },
    {
      nombre: 'Máximo',
      apellido: 'Cozzeti'
    }
  ];

  displayedColumns: string[] = ['nombreApellido', 'acciones'];

  myControl = new FormControl();
  options: string[] = ['Tomás Bonanzea', 'Carlos Pérez', 'Román Riquelme'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
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
      apellido: apellido
    })
    this.dataSource = [...this.dataSource];
  }

}
