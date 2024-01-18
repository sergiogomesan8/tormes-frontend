import { Component, OnInit } from '@angular/core';
import { Order } from '@shop/models/order';
import { OrderService } from '@shop/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];

  displayedColumns = [
    'OrderId',
    'Date',
    'Tracking Number',
    'Delivery Address',
    'Total',
  ];

  constructor(private readonly orderService: OrderService) {}

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
}
