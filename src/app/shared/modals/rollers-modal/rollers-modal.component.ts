import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpLevelEnum } from 'src/app/enums/exp-level.enum';
import { MeanOfTransportation } from 'src/app/interfaces/mean-of-transportation';

@Component({
  selector: 'app-rollers-modal',
  templateUrl: './rollers-modal.component.html',
  styleUrls: ['./rollers-modal.component.scss']
})
export class RollersModalComponent implements OnInit {

  public formBuilder: FormBuilder;
  public xpLevels = ExpLevelEnum;
  public xpLevel: any;
  public form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<RollersModalComponent>,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      xpLevel: []
    })
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

}
