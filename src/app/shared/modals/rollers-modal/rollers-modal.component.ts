import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeanOfTransportation } from 'src/app/interfaces/mean-of-transportation';

@Component({
  selector: 'app-rollers-modal',
  templateUrl: './rollers-modal.component.html',
  styleUrls: ['./rollers-modal.component.scss']
})
export class RollersModalComponent implements OnInit {

  public formBuilder: FormBuilder;
  constructor(
    public dialogRef: MatDialogRef<RollersModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: MeanOfTransportation
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 2000);
  }

}
