import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from "@angular/material/dialog";
import { MediosMovilidad } from 'src/app/models/medios-movilidad.model';
import { BicycleModalComponent } from 'src/app/shared/modals/bicycle-modal/bicycle-modal.component';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ActivatedRoute } from '@angular/router';
import { ResolversEnum } from 'src/app/enums/enums/resolvers.enum';


@Component({
  selector: 'app-agregar',
  templateUrl: './medios-movilidad.component.html',
  styleUrls: ['./medios-movilidad.component.scss']
})
export class MediosMovilidadComponent implements OnInit {

  selectedOption: string;
  mediosMovilidad: MediosMovilidad[];

  public dataSource: MediosMovilidad[];

  displayedColumns: string[] = ['medioMovilidad', 'acciones'];

  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;

  constructor(
    private snackService: SnackBarService,
    public matDialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.options = this.activatedRoute.snapshot.data[ResolversEnum.MEDIOS_MOVILIDAD].meansOfTransportation;
    console.log(this.options);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
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

    return this.options.filter((option: any) => option.name.toLowerCase().includes(filterValue));
  }

  onSelectionChange(option: MatAutocompleteSelectedEvent) {
    this.selectedOption = option.option.value;
    this.openDialog()
  }

  agregarContacto() {

  }

}
