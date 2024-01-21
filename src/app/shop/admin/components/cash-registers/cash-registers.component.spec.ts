/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CashRegisterService } from '@shop/services/cash-register.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Bills, CashRegister, Coins } from '@shop/models/cash-register';
import { User } from '@shop/models/user.model';
import { CashRegistersComponent } from './cash-registers.component';

describe('CashRegistersComponent', () => {
  let cashRegisterscomponent: CashRegistersComponent;
  let cashRegisterService: jest.Mocked<CashRegisterService>;
  let mockRouter: jest.Mocked<Router>;

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

  beforeEach(() => {
    cashRegisterService = {
      findAllCashRegisters: jest.fn().mockReturnValue(of([cashRegister])),
      updateCashRegister: jest.fn(),
      deleteCashRegister: jest.fn(),
    } as any;

    mockRouter = {
      navigate: jest.fn(),
    } as any;

    cashRegisterscomponent = new CashRegistersComponent(
      cashRegisterService,
      mockRouter
    );
  });

  describe('ngOnInit', () => {
    it('should call findAllProducts on ngOnInit', () => {
      cashRegisterscomponent.ngOnInit();
      expect(cashRegisterService.findAllCashRegisters).toHaveBeenCalled();
    });
  });

  describe('findAllProducts', () => {
    it('should find all products', () => {
      cashRegisterscomponent.findAllCashRegisters();

      expect(cashRegisterService.findAllCashRegisters).toHaveBeenCalled();
      expect(cashRegisterscomponent.cashRegisters).toEqual([cashRegister]);
    });

    it('should log error on failure', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const error = new Error('Test error');

      cashRegisterService.findAllCashRegisters.mockReturnValue(
        throwError(() => error)
      );

      cashRegisterscomponent.findAllCashRegisters();

      expect(consoleSpy).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteProduct', () => {
    it('should delete product and refresh the list', () => {
      const findAllProductsSpy = jest.spyOn(
        cashRegisterscomponent,
        'findAllCashRegisters'
      );
      cashRegisterService.deleteCashRegister.mockReturnValue(of(undefined));

      cashRegisterscomponent.deleteCashRegister(cashRegister);

      expect(cashRegisterService.deleteCashRegister).toHaveBeenCalledWith(
        cashRegister
      );
      expect(findAllProductsSpy).toHaveBeenCalled();
    });

    it('should log error on failure', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const error = new Error('Test error');

      cashRegisterService.deleteCashRegister.mockReturnValue(
        throwError(() => error)
      );

      cashRegisterscomponent.deleteCashRegister(cashRegister);

      expect(consoleSpy).toHaveBeenCalledWith(error);
    });
  });

  describe('updateProduct', () => {
    it('should navigate to update product page', () => {
      cashRegisterscomponent.updateCashRegister(cashRegister);

      expect(mockRouter.navigate).toHaveBeenCalledWith([
        '/admin/cash-registers/update-cash-register',
        cashRegister.id,
      ]);
    });
  });
});
