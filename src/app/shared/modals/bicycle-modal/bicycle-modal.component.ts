import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeanOfTransportation } from 'src/app/interfaces/mean-of-transportation';

@Component({
  selector: 'app-bicycle-modal',
  templateUrl: './bicycle-modal.component.html',
  styleUrls: ['./bicycle-modal.component.scss']
})
export class BicycleModalComponent implements OnInit {
  formBuilder: FormBuilder;

  constructor(
    public dialogRef: MatDialogRef<BicycleModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: MeanOfTransportation
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 2000);
  }

}
