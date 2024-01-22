import { Bills, Coins } from '@shop/models/cash-register';

export class CreateCashRegisterDto {
  coins: Coins;
  bills: Bills;
  totalCardPayments: number;
  totalSpent: number;
  cashInBox: number;
  reportedTotal: number;

  constructor(
    coins: Coins,
    bills: Bills,
    totalCardPayments: number,
    totalSpent: number,
    cashInBox: number,
    reportedTotal: number
  ) {
    this.coins = coins;
    this.bills = bills;
    this.totalCardPayments = totalCardPayments;
    this.totalSpent = totalSpent;
    this.cashInBox = cashInBox;
    this.reportedTotal = reportedTotal;
  }
}

export class UpdateCashRegisterDto {
  coins?: Coins;
  bills?: Bills;
  totalCardPayments?: number;
  totalSpent?: number;
  cashInBox?: number;
  reportedTotal?: number;

  constructor(partial: Partial<UpdateCashRegisterDto>) {
    Object.assign(this, partial);
  }
}
