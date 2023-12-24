/* tslint:disable:no-unused-variable */
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('Service: Snackbar', () => {
  let service: SnackbarService;
  let snackBar: jest.Mocked<MatSnackBar>;
  let translateService: jest.Mocked<TranslateService>;

  beforeEach(() => {
    snackBar = { open: jest.fn() } as any;
    translateService = { get: jest.fn() } as any;

    service = new SnackbarService(snackBar, translateService);
  });

  describe('showSuccessSnackbar', () => {
    it('should call snackBar.open', () => {
      translateService.get.mockReturnValue(of('message'));

      service.showSuccessSnackbar('messageKey');

      expect(snackBar.open).toHaveBeenCalledWith('message', 'Success', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['green-snackbar'],
      });
    });

    it('should call translateService.get with correct message key', () => {
      service.showSuccessSnackbar('messageKey');
      expect(translateService.get).toHaveBeenCalledWith('messageKey');
    });
  });

  describe('showErrorSnackbar', () => {
    it('should call snackBar.open', () => {
      translateService.get.mockReturnValue(of('message'));

      service.showErrorSnackbar('messageKey');

      expect(snackBar.open).toHaveBeenCalledWith('message', 'Error', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['red-snackbar'],
      });
    });
    it('should call translateService.get with correct message key', () => {
      service.showErrorSnackbar('messageKey');
      expect(translateService.get).toHaveBeenCalledWith('messageKey');
    });
  });
});
