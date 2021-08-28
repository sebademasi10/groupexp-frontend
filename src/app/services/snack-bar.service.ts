import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  public openSnackBar(mensaje: string, exito: boolean) {
    let clase;
    exito ? clase = 'notify-success' : clase = 'notify-error';
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 15000,
      verticalPosition: 'top',
      panelClass: clase
    });
  }

  public openSnackBarTimeout(mensaje: string, exito: boolean, timeOut: number) {
    let clase;
    exito ? clase = 'notify-success' : clase = 'notify-error';
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: timeOut,
      verticalPosition: 'top',
      panelClass: clase
    });
  }
}
