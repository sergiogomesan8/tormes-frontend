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

  showSuccessSnackbar(message: string): void {
    this.translateService
      .get('shop.admin.dashboard.options.products.updateSuccess')
      .subscribe((success: string) => {
        this.snackBar.open(message, success, {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['green-snackbar'],
        });
      });
  }

  showErrorSnackbar(message: string): void {
    this.translateService
      .get('shop.admin.dashboard.options.products.updateSuccess')
      .subscribe((error: string) => {
        this.snackBar.open(message, error, {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['red-snackbar'],
        });
      });
  }
}
