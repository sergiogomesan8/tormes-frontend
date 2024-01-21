import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableColumn } from '@shared/models/tableColumn';
import { CashRegister } from '@shop/models/cash-register';
import { CashRegisterService } from '@shop/services/cash-register.service';

@Component({
  selector: 'app-cash-registers',
  templateUrl: './cash-registers.component.html',
  styleUrls: ['./cash-registers.component.scss'],
})
export class CashRegistersComponent implements OnInit {
  cashRegisters: CashRegister[] = [];

  displayedColumns: TableColumn[] = [
    {
      id: 'id',
      name: 'Id',
    },
    {
      id: 'date',
      name: 'Date',
    },
    {
      id: 'calculatedTotal',
      name: 'Calculated Total (€)',
    },
    {
      id: 'reportedTotal',
      name: 'Reported Total  (€)',
    },
  ];

  constructor(
    private readonly cashRegisterService: CashRegisterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.findAllCashRegisters();
  }

  findAllCashRegisters() {
    this.cashRegisterService.findAllCashRegisters().subscribe({
      next: (cashRegisters) => {
        this.cashRegisters = cashRegisters;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteCashRegister(cashRegister: CashRegister): void {
    this.cashRegisterService.deleteCashRegister(cashRegister).subscribe({
      next: () => {
        this.findAllCashRegisters();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateCashRegister(cashRegister: CashRegister): void {
    this.router.navigate([
      '/admin/cash-registers/update-cash-register',
      cashRegister.id,
    ]);
  }
}
