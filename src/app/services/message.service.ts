import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private _snackbar: MatSnackBar) {}

  /**
   * Displays a message via snackbar on bottom
   * @param message Message to display
   * @param action String to display for action button
   * @param duration Duration before auto dismiss
   */
  showMessage(
    message: string,
    action: string = 'Close',
    duration: number = 3000
  ): void {
    this._snackbar.open(message, action, {
      duration: duration,
    });
  }

  /**
   * Displays a message in warning color via snackbar on bottom
   * @param message Message to display
   * @param action String to display for action button
   * @param duration Duration before auto dismiss
   */
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
