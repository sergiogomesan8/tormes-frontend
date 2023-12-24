import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {}

  showSuccessSnackbar(messageKey: string): void {
    this.translateService.get(messageKey).subscribe((message: string) => {
      this.snackBar.open(message, 'Success', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['green-snackbar'],
      });
    });
  }

  showErrorSnackbar(messageKey: string): void {
    this.translateService.get(messageKey).subscribe((message: string) => {
      this.snackBar.open(message, 'Error', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['red-snackbar'],
      });
    });
  }
}
