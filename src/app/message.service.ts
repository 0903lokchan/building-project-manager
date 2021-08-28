import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private _snackbar: MatSnackBar) {}

  showMessage(
    message: string,
    action: string = 'Close',
    duration: number = 3000
  ): void {
    this._snackbar.open(message, action, {
      duration: duration,
    });
  }

  showErrorMessage(
    message: string,
    action: string = 'Close',
    duration: number = 3000
  ): void {
    // TODO test this
    this._snackbar.open(message, action, {
      duration: duration,
      panelClass: ['snackbar-warn'],
    });
  }
}
