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

  public xpLevels = ExpLevelEnum;
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<MotorcycleModalComponent>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      brand: [],
      model: [],
      motorCcs: [],
      xpLevel: [],
    })
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

}
