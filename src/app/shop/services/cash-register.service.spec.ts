/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CashRegisterService } from './cash-register.service';
import { HttpService } from '@core/services/http-service.service';
import { SnackbarService } from '@shared/services/snackbar.service';
import { CashRegisterEndPoint } from '@shared/end-points';
import { User } from '@shop/models/user.model';
import { Bills, CashRegister, Coins } from '@shop/models/cash-register';
import { of, throwError } from 'rxjs';
import {
  CreateCashRegisterDto,
  UpdateCashRegisterDto,
} from '@shop/admin/dtos/cash-register.dto';

describe('Service: CashRegister', () => {
  let cashRegisterService: CashRegisterService;
  let httpService: jest.Mocked<HttpService>;
  let snackbarService: jest.Mocked<SnackbarService>;

  let cashRegisterEndPoint: CashRegisterEndPoint;

  beforeEach(() => {
    httpService = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
      patch: jest.fn(),
    } as any;
    snackbarService = {
      showSuccessSnackbar: jest.fn(),
      showErrorSnackbar: jest.fn(),
    } as any;
    cashRegisterEndPoint = new CashRegisterEndPoint();
    cashRegisterService = new CashRegisterService(httpService, snackbarService);
  });

  const user: User = {
    id: 'id',
    name: 'Test User',
    email: 'test@mail.com',
  };

  const coins: Coins = {
    oneCent: 1,
    twoCent: 2,
    fiveCent: 3,
    tenCent: 4,
    twentyCent: 5,
    fiftyCent: 6,
    oneEuro: 7,
    twoEuro: 8,
  };

  const bills: Bills = {
    fiveEuro: 5,
    tenEuro: 10,
    twentyEuro: 20,
    fiftyEuro: 50,
    hundredEuro: 100,
  };

  const cashRegister = {
    id: 'c-id',
    date: 0,
    coins: coins,
    bills: bills,
    totalCardPayments: 200,
    totalSpent: 60,
    cashInBox: 400,
    reportedTotal: 1000,
    employee: user,
  } as CashRegister;

  describe('findAllCashRegisters', () => {
    it('should return an array of cash registers if the http call is successful', () => {
      httpService.get.mockReturnValue(of([cashRegister]));

      cashRegisterService.findAllCashRegisters().subscribe((res) => {
        expect(res).toEqual([cashRegister]);
      });
      expect(httpService.get).toHaveBeenCalled();
    });

    it('should return an empty array if the http call fails', () => {
      httpService.get.mockReturnValue(throwError(() => new Error('Error')));

      cashRegisterService.findAllCashRegisters().subscribe((res) => {
        expect(res).toEqual([]);
      });

      expect(httpService.get).toHaveBeenCalled();
    });
  });

  describe('findCashRegisterById', () => {
    it('should return an cash register if the http call is successful', () => {
      httpService.get.mockReturnValue(of(cashRegister));

      cashRegisterService
        .findCashRegisterById(cashRegister.id)
        .subscribe((res) => {
          expect(res).toEqual(cashRegister);
        });
      expect(httpService.get).toHaveBeenCalledWith(
        cashRegisterEndPoint.FIND_BY_ID + cashRegister.id
      );
    });

    it('should return undefined if the http call fails', () => {
      httpService.get.mockReturnValue(throwError(() => new Error('Error')));

      cashRegisterService.findCashRegisterById(cashRegister.id).subscribe(
        () => {},
        () => {
          expect(httpService.get).toHaveBeenCalledWith(
            cashRegisterEndPoint.FIND_BY_ID + cashRegister.id
          );

          expect(snackbarService.showSuccessSnackbar).toHaveBeenCalledWith(
            'shop.admin.cashRegister.getByIdError'
          );
        }
      );
    });
  });

  describe('createCashRegister', () => {
    const createCashRegisterDto: CreateCashRegisterDto = {
      coins: coins,
      bills: bills,
      totalCardPayments: 200,
      totalSpent: 60,
      cashInBox: 400,
      reportedTotal: 1000,
    };

    it('should return an cash regsiter if the http call is successful', () => {
      httpService.post.mockReturnValue(of(cashRegister));

      cashRegisterService.createCashRegister(createCashRegisterDto).subscribe();

      expect(httpService.post).toHaveBeenCalledWith(
        cashRegisterEndPoint.ADD,
        createCashRegisterDto
      );

      expect(snackbarService.showSuccessSnackbar).toHaveBeenCalledWith(
        'shop.admin.cashRegister.addSuccess'
      );
    });

    it('should show error snackbar and return undefined if the http call fails', () => {
      const errorResponse = new Error('Error');
      httpService.post.mockReturnValue(throwError(errorResponse));

      cashRegisterService.createCashRegister(createCashRegisterDto).subscribe(
        () => {},
        (error) => {
          expect(error).toEqual(errorResponse);
          expect(snackbarService.showErrorSnackbar).toHaveBeenCalledWith(
            'shop.admin.cashRegister.addError'
          );
        }
      );

      expect(httpService.post).toHaveBeenCalledWith(
        cashRegisterEndPoint.ADD,
        createCashRegisterDto
      );
    });
  });

  describe('updateCashRegister', () => {
    const updateCashRegisterDto: UpdateCashRegisterDto = {
      coins: coins,
      bills: bills,
      totalCardPayments: 200,
      totalSpent: 60,
      cashInBox: 400,
    };

    it('should return undefined if the http call is successful', () => {
      httpService.patch.mockReturnValue(of(undefined));

      cashRegisterService
        .updateCashRegister(cashRegister.id, updateCashRegisterDto)
        .subscribe((res) => {
          expect(res).toBeUndefined();
        });
      expect(httpService.patch).toHaveBeenCalledWith(
        `${cashRegisterEndPoint.UPDATE}${cashRegister.id}`,
        updateCashRegisterDto
      );
      expect(snackbarService.showSuccessSnackbar).toHaveBeenCalledWith(
        'shop.admin.cashRegister.updateSuccess'
      );
    });

    it('should return undefined if the http call fails', () => {
      httpService.patch.mockReturnValue(throwError(() => new Error('Error')));

      cashRegisterService
        .updateCashRegister(cashRegister.id, updateCashRegisterDto)
        .subscribe((res) => {
          expect(res).toBeUndefined();
          expect(snackbarService.showErrorSnackbar).toHaveBeenCalledWith(
            'shop.customer.orders.updateError'
          );
        });

      expect(httpService.patch).toHaveBeenCalledWith(
        `${cashRegisterEndPoint.UPDATE}${cashRegister.id}`,
        updateCashRegisterDto
      );
    });
  });

  describe('deleteCashRegister', () => {
    it('should return undefined if the http call is successful', () => {
      httpService.delete.mockReturnValue(of(undefined));

      cashRegisterService.deleteCashRegister(cashRegister).subscribe((res) => {
        expect(res).toBeUndefined();
      });
      expect(httpService.delete).toHaveBeenCalled();
    });

    it('should return undefined if the http call fails', () => {
      httpService.delete.mockReturnValue(throwError(() => new Error('Error')));

      cashRegisterService.deleteCashRegister(cashRegister).subscribe((res) => {
        expect(res).toBeUndefined();
      });

      expect(httpService.delete).toHaveBeenCalled();
    });
  });
});
