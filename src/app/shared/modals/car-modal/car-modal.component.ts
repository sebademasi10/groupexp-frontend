import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-car-modal',
  templateUrl: './car-modal.component.html',
  styleUrls: ['./car-modal.component.scss']
})
export class CarModalComponent implements OnInit {

  public formBuilder: FormBuilder
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<CarModalComponent>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      brand: [],
      model: [],
      motorCcs: [],
    })
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

}
