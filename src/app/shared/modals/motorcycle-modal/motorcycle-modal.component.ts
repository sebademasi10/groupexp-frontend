import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExpLevelEnum } from 'src/app/enums/exp-level.enum';

@Component({
  selector: 'app-motorcycle-modal',
  templateUrl: './motorcycle-modal.component.html',
  styleUrls: ['./motorcycle-modal.component.scss']
})
export class MotorcycleModalComponent implements OnInit {

  formBuilder: FormBuilder;

  enabled = true;
  mot: any;
  public xpLevels = ExpLevelEnum;
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<MotorcycleModalComponent>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      brand: [this.mot?.detail.brand],
      model: [this.mot?.detail.model],
      motorCcs: [this.mot?.detail.motorCcs],
      xpLevel: [this.mot?.detail.xpLevel],
    })
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

}
