import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpLevelEnum } from 'src/app/enums/exp-level.enum';
import { MeanOfTransportation } from 'src/app/interfaces/mean-of-transportation';

@Component({
  selector: 'app-bicycle-modal',
  templateUrl: './bicycle-modal.component.html',
  styleUrls: ['./bicycle-modal.component.scss']
})
export class BicycleModalComponent implements OnInit {
  formBuilder: FormBuilder;

  public xpLevels = ExpLevelEnum;
  enabled = true;
  form: FormGroup;
  mot: any;
  constructor(public dialogRef: MatDialogRef<BicycleModalComponent>,) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      brand: [this.mot?.detail.brand],
      model: [this.mot?.detail.model],
      wheelBase: [this.mot?.detail.wheelBase],
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
