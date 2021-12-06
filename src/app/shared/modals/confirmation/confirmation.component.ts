import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ConfirmationComponent>
  ) { }

  ngOnInit(): void {
  }

  close(eliminar?: boolean) {
    this.dialogRef.close(eliminar)
  }

}
