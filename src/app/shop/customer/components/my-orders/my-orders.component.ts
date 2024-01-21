import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableColumn } from '@shared/models/tableColumn';
import { Order } from '@shop/models/order';
import { OrderService } from '@shop/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];

  displayedColumns: TableColumn[] = [
    {
      id: 'orderId',
      name: 'Order Id',
    },
    {
      id: 'date',
      name: 'Date',
    },
    {
      id: 'paymentMethod',
      name: 'Payment Method',
    },
    {
      id: 'status',
      name: 'Status',
    },
    {
      id: 'total',
      name: 'Total',
    },
  ];

  constructor(
    private readonly orderService: OrderService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.findAllOrdersByUser();
  }

  findAllOrdersByUser() {
    this.orderService.findAllOrdersByUser().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  viewOrder(order: Order): void {
    this.router.navigate(['/customer/my-orders/', order.id]);
  }
}
