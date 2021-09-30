import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ResolversEnum } from 'src/app/enums/enums/resolvers.enum';
import { MedioMovilidad } from 'src/app/models/medio-movilidad.model';

@Component({
  selector: 'app-organizar',
  templateUrl: './organizar.component.html',
  styleUrls: ['./organizar.component.scss']
})
export class OrganizarComponent implements OnInit {

  public activityForm: FormGroup;
  public meansOfTransportation: MedioMovilidad[];
  public filteredOptions: Observable<MedioMovilidad[]>;
  selectedOption: MedioMovilidad;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.meansOfTransportation = this.activatedRoute.snapshot.data[ResolversEnum.MEDIOS_MOVILIDAD].meansOfTransportation;
    this._createForm();
    this.filteredOptions = this.activityForm.controls['meanOfTransportation'].valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.meansOfTransportation.slice())
    );
    this.logValue()
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

  logValue() {
    console.log(this.activityForm.value);
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



}
