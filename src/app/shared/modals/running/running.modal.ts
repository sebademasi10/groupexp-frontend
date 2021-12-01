import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  constructor(
    public dialogRef: MatDialogRef<RunningModal>,
    @Inject(MAT_DIALOG_DATA) data: MeanOfTransportation
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close({ a: 2 });
    }, 2000);
  }

}
