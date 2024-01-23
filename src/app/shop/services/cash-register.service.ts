import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http-service.service';
import { CashRegisterEndPoint } from '@shared/end-points';
import { SnackbarService } from '@shared/services/snackbar.service';
import {
  CreateCashRegisterDto,
  UpdateCashRegisterDto,
} from '@shop/admin/dtos/cash-register.dto';
import { CashRegister } from '@shop/models/cash-register';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CashRegisterService {
  private cashRegisterEndPoint = new CashRegisterEndPoint();

  constructor(
    private readonly httpService: HttpService,
    private readonly snackbarService: SnackbarService
  ) {}

  findCashRegisterById(
    cashRegisterId: string
  ): Observable<CashRegister | undefined> {
    return this.httpService
      .get(`${this.cashRegisterEndPoint.FIND_BY_ID}${cashRegisterId}`)
      .pipe(
        map((response: undefined) => {
          return response;
        }),
        catchError((error: undefined) => {
          this.snackbarService.showErrorSnackbar(
            'shop.admin.cashRegister.getByIdError'
          );
          return of(error);
        })
      );
  }

  findAllCashRegisters(): Observable<CashRegister[]> {
    return this.httpService.get(this.cashRegisterEndPoint.FIND_ALL).pipe(
      catchError((error: undefined) => {
        return of([]);
      })
    );
  }

  createCashRegister(
    createCashRegisterDto: CreateCashRegisterDto
  ): Observable<CashRegister | undefined> {
    return this.httpService
      .post(this.cashRegisterEndPoint.ADD, createCashRegisterDto)
      .pipe(
        map((response: CashRegister) => {
          this.snackbarService.showSuccessSnackbar(
            'shop.admin.cashRegister.addSuccess'
          );
          return response;
        }),
        catchError((error: undefined) => {
          this.snackbarService.showErrorSnackbar(
            'shop.admin.cashRegister.addError'
          );
          return of(error);
        })
      );
  }

  updateCashRegister(
    cashRegisterId: string,
    updateCashRegisterDto: UpdateCashRegisterDto
  ): Observable<CashRegister | undefined> {
    return this.httpService
      .patch(
        `${this.cashRegisterEndPoint.UPDATE}${cashRegisterId}`,
        updateCashRegisterDto
      )
      .pipe(
        map((response: undefined) => {
          this.snackbarService.showSuccessSnackbar(
            'shop.admin.cashRegister.updateSuccess'
          );
          return response;
        }),
        catchError((error: undefined) => {
          this.snackbarService.showErrorSnackbar(
            'shop.admin.cashRegister.updateError'
          );
          return of(error);
        })
      );
  }

  deleteCashRegister(cashRegister: CashRegister): Observable<undefined> {
    return this.httpService
      .delete(
        `${this.cashRegisterEndPoint.DELETE}${cashRegister.id}`,
        cashRegister
      )
      .pipe(
        map((response: undefined) => {
          this.snackbarService.showSuccessSnackbar(
            'shop.admin.cashRegister.deleteSuccess'
          );
          return response;
        }),
        catchError((error: undefined) => {
          this.snackbarService.showErrorSnackbar(
            'shop.admin.cashRegister.deleteError'
          );
          return of(error);
        })
      );
  }
}
