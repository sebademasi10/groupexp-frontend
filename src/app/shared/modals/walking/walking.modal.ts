import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExpLevelEnum } from 'src/app/enums/exp-level.enum';

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
  public walkingForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<WalkingModal>) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 2000);
  }

  selectionChanged(event) {
    this.onFormValid.emit(event.value);
  }

}
