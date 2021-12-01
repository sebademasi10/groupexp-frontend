import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rollers-modal',
  templateUrl: './rollers-modal.component.html',
  styleUrls: ['./rollers-modal.component.scss']
})
export class RollersModalComponent implements OnInit {

  public formBuilder: FormBuilder;
  constructor(public dialogRef: MatDialogRef<RollersModalComponent>) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 2000);
  }

}
