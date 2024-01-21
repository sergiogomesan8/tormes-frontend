import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Order, OrderStatus } from '@shop/models/order';
import { OrderService } from '@shop/services/order.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent implements OnInit {
  processingOrders: Order[] = [];
  shippedOrders: Order[] = [];
  delayedOrders: Order[] = [];
  deliveredOrders: Order[] = [];
  cancelledOrders: Order[] = [];

  orders: Order[] = [];

  constructor(
    public translate: TranslateService,
    private readonly orderService: OrderService
  ) {}

  ngOnInit() {
    this.findAllOrders();
  }

  findAllOrders() {
    this.orderService.findAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.filterAndSortOrders();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateOrderStatus(order: Order, orderStatus: OrderStatus): void {
    console.log('updateOrderStatus');
    this.orderService
      .updateOrderStatus(order.id, { status: orderStatus })
      .subscribe({
        error: (error) => {
          console.log(error);
        },
      });
  }

  filterAndSortOrders() {
    this.orders.forEach((order) => {
      switch (order.status) {
        case OrderStatus.processing:
          this.processingOrders.push(order);
          break;
        case OrderStatus.shipped:
          this.shippedOrders.push(order);
          break;
        case OrderStatus.delayed:
          this.delayedOrders.push(order);
          break;
        case OrderStatus.delivered:
          this.deliveredOrders.push(order);
          break;
        case OrderStatus.cancelled:
          this.cancelledOrders.push(order);
          break;
      }
    });

    this.processingOrders.sort((a, b) => a.date - b.date);
    this.shippedOrders.sort((a, b) => a.date - b.date);
    this.delayedOrders.sort((a, b) => a.date - b.date);
    this.deliveredOrders.sort((a, b) => a.date - b.date);
    this.cancelledOrders.sort((a, b) => a.date - b.date);
  }

  drop($event: CdkDragDrop<any[]>) {
    if ($event.previousContainer === $event.container) {
      moveItemInArray(
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
    } else {
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );

      const movedOrder = $event.item.data;
      const newStatus =
        OrderStatus[$event.container.id as keyof typeof OrderStatus];
      this.updateOrderStatus(movedOrder, newStatus);
    }
  }
}
