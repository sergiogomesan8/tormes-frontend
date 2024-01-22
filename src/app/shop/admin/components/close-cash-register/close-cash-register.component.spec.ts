/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CloseCashRegisterComponent } from './close-cash-register.component';
import { CashRegisterService } from '@shop/services/cash-register.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SnackbarService } from '@shared/services/snackbar.service';
import { of, throwError } from 'rxjs';
import { CashRegister } from '@shop/models/cash-register';
import { User } from '@shop/models/user.model';

describe('CloseCashRegisterComponent', () => {
  let component: CloseCashRegisterComponent;
  let mockCashRegisterService: jest.Mocked<CashRegisterService>;
  let formBuilder: FormBuilder;
  let snackbarService: jest.Mocked<SnackbarService>;

  beforeEach(() => {
    mockCashRegisterService = {
      createCashRegister: jest.fn(),
    } as any;

    snackbarService = {
      showErrorSnackbar: jest.fn(),
    } as any;

    formBuilder = new FormBuilder();

    component = new CloseCashRegisterComponent(
      mockCashRegisterService,
      formBuilder,
      snackbarService
    );
  });

  const user: User = {
    id: 'id',
    name: 'Test User',
    email: 'test@mail.com',
  };

  const mockCashRegister: CashRegister = {
    id: 'id-1',
    date: 123,
    coins: {
      oneCent: 10,
      twoCent: 10,
      fiveCent: 0,
      tenCent: 0,
      twentyCent: 0,
      fiftyCent: 0,
      oneEuro: 0,
      twoEuro: 0,
    },
    bills: {
      fiveEuro: 10,
      tenEuro: 10,
      twentyEuro: 0,
      fiftyEuro: 0,
      hundredEuro: 0,
    },
    totalCardPayments: 10,
    totalSpent: 10,
    cashInBox: 10,
    reportedTotal: 50,
    totalCoinPayments: 0,
    totalBillPayments: 0,
    calculatedTotal: 0,
    employee: user,
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate coin value correctly', () => {
    const coinName = 'oneCent';
    component.formGroup.get(coinName)?.setValue(5);
    expect(component.calculateCoinValue(coinName)).toBe(0.05);
  });

  it('should calculate bill value correctly', () => {
    const billName = 'fiveEuro';
    component.formGroup.get(billName)?.setValue(2);
    expect(component.calculateBillValue(billName)).toBe(10);
  });

  it('should throw error when calculating value of non-existent coin', () => {
    const coinName = 'nonExistentCoin';
    expect(() => component.calculateCoinValue(coinName)).toThrowError(
      `Form control ${coinName} does not exist`
    );
  });

  it('should throw error when calculating value of non-existent coin', () => {
    const billName = 'nonExistentCoin';
    expect(() => component.calculateBillValue(billName)).toThrowError(
      `Form control ${billName} does not exist`
    );
  });

  it('should calculate total coin value correctly', () => {
    component.formGroup.get('oneCent')?.setValue(5);
    component.formGroup.get('twoCent')?.setValue(5);
    expect(component.calculateTotalCoinValue()).toBe(0.15);
  });

  it('should calculate total bill value correctly', () => {
    component.formGroup.get('fiveEuro')?.setValue(2);
    component.formGroup.get('tenEuro')?.setValue(2);
    expect(component.calculateTotalBillValue()).toBe(30);
  });

  it('should calculate final total correctly', () => {
    component.formGroup.get('oneCent')?.setValue(5);
    component.formGroup.get('twoCent')?.setValue(5);
    component.formGroup.get('fiveEuro')?.setValue(2);
    component.formGroup.get('tenEuro')?.setValue(2);
    component.formGroup.get('totalCardPayments')?.setValue(10);
    component.formGroup.get('totalSpent')?.setValue(10);
    component.formGroup.get('cashInBox')?.setValue(10);

    const total = 40.15;
    expect(component.calculateFinalTotal()).toBe(total);
  });

  it('should calculate difference correctly', () => {
    component.formGroup.get('oneCent')?.setValue(5);
    component.formGroup.get('twoCent')?.setValue(5);
    component.formGroup.get('fiveEuro')?.setValue(2);
    component.formGroup.get('tenEuro')?.setValue(2);
    component.formGroup.get('totalCardPayments')?.setValue(10);
    component.formGroup.get('totalSpent')?.setValue(10);
    component.formGroup.get('cashInBox')?.setValue(10);
    component.formGroup.get('reportedTotal')?.setValue(30);

    const total = 40.15;
    const difference = total - 30;
    expect(component.calculateDifference()).toBe(
      parseFloat(difference.toFixed(2))
    );
  });

  describe('closeCashRegister', () => {
    it('should close cash register successfully', () => {
      mockCashRegisterService.createCashRegister.mockReturnValue(
        of(mockCashRegister)
      );

      Object.keys(component.formGroup.controls).forEach((key) => {
        component.formGroup.get(key)?.setValue(10);
      });

      component.closeCashRegister();

      expect(mockCashRegisterService.createCashRegister).toHaveBeenCalled();
    });

    it('should show error snackbar when form is invalid', () => {
      Object.keys(component.formGroup.controls).forEach((key) => {
        component.formGroup.get(key)?.setValue(null);
      });

      component.closeCashRegister();

      expect(snackbarService.showErrorSnackbar).toHaveBeenCalled();
    });
  });
});
