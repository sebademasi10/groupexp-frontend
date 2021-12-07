import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpLevelEnum } from 'src/app/enums/exp-level.enum';
import { MeanOfTransportation } from 'src/app/interfaces/mean-of-transportation';

@Component({
  selector: 'app-walking',
  templateUrl: './walking.modal.html',
  styleUrls: ['./walking.modal.scss']
})
export class WalkingModal implements OnInit {

  public formBuilder: FormBuilder;
  enabled = true;
  mot: any;
  public xpLevels = ExpLevelEnum;
  public xpLevel: any;
  public form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<WalkingModal>,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
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
