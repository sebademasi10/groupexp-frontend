import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bicycle-modal',
  templateUrl: './bicycle-modal.component.html',
  styleUrls: ['./bicycle-modal.component.scss']
})
export class BicycleModalComponent implements OnInit {
  formBuilder: FormBuilder;

  constructor(public dialogRef: MatDialogRef<BicycleModalComponent>) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 2000);
  }

}
