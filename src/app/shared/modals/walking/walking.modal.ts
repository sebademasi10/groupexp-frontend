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

  @Output()
  onFormValid = new EventEmitter<FormGroup>()

  public formBuilder: FormBuilder;
  public xpLevels = ExpLevelEnum;
  public xpLevel: any;
  constructor(
    public dialogRef: MatDialogRef<WalkingModal>,
    @Inject(MAT_DIALOG_DATA) data: MeanOfTransportation
  ) { }

  ngOnInit(): void {

  }

  selectionChanged(event) {
    this.xpLevel = event.value;
  }

  save() {
    this.dialogRef.close(this.xpLevel);
  }

}
