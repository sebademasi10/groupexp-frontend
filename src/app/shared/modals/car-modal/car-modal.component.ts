import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExpLevelEnum } from 'src/app/enums/exp-level.enum';

@Component({
  selector: 'app-car-modal',
  templateUrl: './car-modal.component.html',
  styleUrls: ['./car-modal.component.scss']
})
export class CarModalComponent implements OnInit {

  public formBuilder: FormBuilder
  public xpLevels = ExpLevelEnum;
  mot: any;
  enabled = true;
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<CarModalComponent>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      brand: [this.mot?.detail.brand],
      model: [this.mot?.detail.model],
      motorCcs: [this.mot?.detail.motorCcs],
      xpLevel: [this.mot?.detail.xpLevel]
    })
    if (!this.enabled) {
      this.form.disable();
    }
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

}
