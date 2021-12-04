import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpLevelEnum } from 'src/app/enums/exp-level.enum';
import { MeanOfTransportation } from 'src/app/interfaces/mean-of-transportation';

@Component({
  selector: 'app-running',
  templateUrl: './running.modal.html',
  styleUrls: ['./running.modal.scss']
})
export class RunningModal implements OnInit {

  public formBuilder: FormBuilder;
  public xpLevels = ExpLevelEnum;
  public form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<RunningModal>,
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
