import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Order } from '@shop/models/order';
import { User } from '@shop/models/user.model';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent implements OnInit {
  toDoOrders: Order[] = toDoOrdersMock;
  shippedOrders: Order[] = shippedOrdersMock;
  cancelledOrders: Order[] = cancelledOrdersMock;

  listNumbers1: number[] = [];
  listNumbers2: number[] = [];

  ngOnInit() {
    for (let index = 0; index < 10; index++) {
      this.listNumbers1.push(index);
    }

    for (let index = 10; index < 20; index++) {
      this.listNumbers2.push(index);
    }
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
    }
  }
}

export const toDoOrdersMock: Order[] = [
  {
    id: 'i9000111',
    customer: { name: 'Sergio' } as User,
    total: 54.09,
  } as Order,
  {
    id: 'i9000222',
    customer: { name: 'Sergio' } as User,
    total: 24.32,
  } as Order,
  {
    id: 'i9000333',
    customer: { name: 'Sergio' } as User,
    total: 104.1,
  } as Order,
  {
    id: 'i9000444',
    customer: { name: 'Sergio' } as User,
    total: 31.25,
  } as Order,
  {
    id: 'i9000333',
    customer: { name: 'Sergio' } as User,
    total: 104.1,
  } as Order,
  {
    id: 'i9000444',
    customer: { name: 'Sergio' } as User,
    total: 31.25,
  } as Order,
];

export const shippedOrdersMock: Order[] = [
  {
    id: 'i9000000',
    customer: { name: 'Sergio' } as User,
    total: 54.09,
  } as Order,
  {
    id: 'i9000000',
    customer: { name: 'Sergio' } as User,
    total: 54.09,
  } as Order,
];

export const cancelledOrdersMock: Order[] = [
  {
    id: 'i9000000',
    customer: { name: 'Sergio' } as User,
    total: 20.09,
  } as Order,
];
