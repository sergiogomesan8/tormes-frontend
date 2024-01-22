import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '@shared/services/snackbar.service';
import { UpdateCashRegisterDto } from '@shop/admin/dtos/cash-register.dto';
import {
  BillValue,
  Bills,
  CashRegister,
  CoinValue,
  Coins,
} from '@shop/models/cash-register';
import { CashRegisterService } from '@shop/services/cash-register.service';

@Component({
  selector: 'app-update-cash-register',
  templateUrl: './update-cash-register.component.html',
  styleUrls: ['./update-cash-register.component.scss'],
})
export class UpdateCashRegisterComponent implements OnInit {
  cashRegister!: CashRegister;
  formGroup: FormGroup;
  loading: boolean = false;

  coins: Coins = {
    oneCent: 0,
    twoCent: 0,
    fiveCent: 0,
    tenCent: 0,
    twentyCent: 0,
    fiftyCent: 0,
    oneEuro: 0,
    twoEuro: 0,
  };

  bills: Bills = {
    fiveEuro: 0,
    tenEuro: 0,
    twentyEuro: 0,
    fiftyEuro: 0,
    hundredEuro: 0,
  };

  coinNames = [...Object.keys(this.coins)];
  billNames = [...Object.keys(this.bills)];

  constructor(
    private readonly cashRegisterService: CashRegisterService,
    private readonly formBuilder: FormBuilder,
    private readonly snackbarService: SnackbarService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const coinsValidators = this.generateValidators(this.coins);
    const billsValidators = this.generateValidators(this.bills);

    this.formGroup = this.formBuilder.group({
      ...coinsValidators,
      ...billsValidators,
      totalCardPayments: [
        null,
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')],
      ],
      totalSpent: [
        null,
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')],
      ],
      cashInBox: [
        null,
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')],
      ],
      reportedTotal: [
        null,
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')],
      ],
    });
  }

  ngOnInit(): void {
    const cashRegisterId = this.route.snapshot.paramMap.get('id');
    if (cashRegisterId) {
      this.cashRegisterService
        .findCashRegisterById(cashRegisterId)
        .subscribe((cashRegister) => {
          if (cashRegister) {
            this.cashRegister = cashRegister;
            this.formGroup.patchValue({
              ...this.cashRegister.coins,
              ...this.cashRegister.bills,
              totalCardPayments: this.cashRegister.totalCardPayments,
              totalSpent: this.cashRegister.totalSpent,
              cashInBox: this.cashRegister.cashInBox,
              reportedTotal: this.cashRegister.reportedTotal,
            });
          } else {
            this.router.navigate(['/admin/cash-registers']);
          }
        });
    } else {
      this.router.navigate(['/admin/cash-registers']);
    }
  }

  generateValidators(obj: any): { [key: string]: any[] } {
    let validators: { [key: string]: any[] } = {};
    for (let key in obj) {
      validators[key] = [
        null,
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')],
      ];
    }
    return validators;
  }

  updateCashRegister() {
    if (this.formGroup.valid) {
      const formValues = this.formGroup.value;

      for (let coinName of this.coinNames) {
        this.coins[coinName as keyof Coins] = formValues[coinName];
      }

      for (let billName of this.billNames) {
        this.bills[billName as keyof Bills] = formValues[billName];
      }

      const updateCashRegisterDto: UpdateCashRegisterDto = {
        coins: this.coins,
        bills: this.bills,
        totalCardPayments: this.formGroup.value.totalCardPayments,
        totalSpent: this.formGroup.value.totalSpent,
        cashInBox: this.formGroup.value.cashInBox,
        reportedTotal: this.formGroup.value.reportedTotal,
      };

      this.cashRegisterService
        .updateCashRegister(this.cashRegister.id, updateCashRegisterDto)
        .subscribe({
          next: () => {
            // this.router.navigate(['/admin/products']);
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      this.snackbarService.showErrorSnackbar(
        'shop.admin.dashboard.options.products.fileTypeError'
      );
    }
  }

  calculateCoinValue(coinName: string): number {
    const coinValue = CoinValue[coinName as keyof typeof CoinValue];
    const control = this.formGroup.get(coinName);

    if (!control) {
      throw new Error(`Form control ${coinName} does not exist`);
    }

    const coinCount = control.value;
    return this.calculateValue(coinValue, coinCount);
  }

  calculateBillValue(billName: string): number {
    const billValue = BillValue[billName as keyof typeof BillValue];
    const control = this.formGroup.get(billName);

    if (!control) {
      throw new Error(`Form control ${billName} does not exist`);
    }

    const billCount = control.value;
    return this.calculateValue(billValue, billCount);
  }

  calculateValue(coinOrBill: CoinValue | BillValue, quantity: number): number {
    const result = coinOrBill * quantity;
    return parseFloat(result.toFixed(2));
  }

  calculateTotalCoinValue(): number {
    let total = 0;
    for (let coinName of this.coinNames) {
      total += this.calculateCoinValue(coinName);
    }
    return parseFloat(total.toFixed(2));
  }

  calculateTotalBillValue(): number {
    let total = 0;
    for (let billName of this.billNames) {
      total += this.calculateBillValue(billName);
    }
    return parseFloat(total.toFixed(2));
  }

  calculateFinalTotal() {
    const totalCoins = this.calculateTotalCoinValue();
    const totalBills = this.calculateTotalBillValue();
    const finalTotal =
      totalCoins +
      totalBills +
      this.formGroup.value.totalCardPayments +
      this.formGroup.value.totalSpent -
      this.formGroup.value.cashInBox;
    return parseFloat(finalTotal.toFixed(2));
  }

  calculateDifference() {
    const difference =
      this.calculateFinalTotal() - this.formGroup.value.reportedTotal;
    return parseFloat(difference.toFixed(2));
  }
}
