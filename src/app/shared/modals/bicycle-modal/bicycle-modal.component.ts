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
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<BicycleModalComponent>,) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      brand: [],
      model: [],
      wheelBase: [],
      xpLevel: []
    })
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
}
