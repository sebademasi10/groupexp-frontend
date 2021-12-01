import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-motorcycle-modal',
  templateUrl: './motorcycle-modal.component.html',
  styleUrls: ['./motorcycle-modal.component.scss']
})
export class MotorcycleModalComponent implements OnInit {

  public formBuilder: FormBuilder;
  constructor(public dialogRef: MatDialogRef<MotorcycleModalComponent>) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 2000);
  }

}
