/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrderTableComponent } from './order-table.component';
import { of, throwError } from 'rxjs';
import { Order, OrderStatus } from '@shop/models/order';
import { Product } from '@shop/models/product';
import { User } from '@shop/models/user.model';
import { OrderService } from '@shop/services/order.service';
import { TranslateService } from '@ngx-translate/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

jest.mock('@angular/cdk/drag-drop', () => ({
  moveItemInArray: jest.fn(),
  transferArrayItem: jest.fn(),
}));

describe('OrderTableComponent', () => {
  let component: OrderTableComponent;
  let mockOrderService: jest.Mocked<OrderService>;
  let translateService: jest.Mocked<TranslateService>;

  const user: User = {
    id: 'id',
    name: 'Test User',
    email: 'test@mail.com',
  };

  const product: Product = {
    id: 'id',
    name: 'test',
    section: 'test',
    price: 10,
    description: 'test',
    image: 'test',
  };

  const order: Order = {
    id: 'id',
    orderId: 'orderId',
    status: OrderStatus.shipped,
    date: 123,
    total: 321,
    customer: user,
    orderedProducts: [{ productId: product.id, amount: 1 }],
  };
  const orders = [order];

  beforeEach(() => {
    mockOrderService = {
      findAllOrders: jest.fn().mockReturnValue(of(orders)),
      updateOrderStatus: jest.fn(),
    } as any;

    translateService = {} as any;

    component = new OrderTableComponent(translateService, mockOrderService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call findAllOrders on ngOnInit', () => {
      component.ngOnInit();
      expect(mockOrderService.findAllOrders).toHaveBeenCalled();
    });
  });

  describe('findAllOrders', () => {
    it('should find all orders by user', () => {
      component.findAllOrders();

      expect(mockOrderService.findAllOrders).toHaveBeenCalled();
      expect(component.orders).toEqual(orders);
    });

    it('should log error on failure', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const error = new Error('Test error');

      mockOrderService.findAllOrders.mockReturnValue(throwError(() => error));

      component.findAllOrders();

      expect(consoleSpy).toHaveBeenCalledWith(error);
    });
  });

  describe('filterAndSortOrders', () => {
    it('should filter and sort orders correctly', () => {
      component.orders = [order];
      component.filterAndSortOrders();

      expect(component.shippedOrders).toEqual([order]);
      expect(component.processingOrders).toEqual([]);
      expect(component.delayedOrders).toEqual([]);
      expect(component.deliveredOrders).toEqual([]);
      expect(component.cancelledOrders).toEqual([]);
    });

    it('should filter and sort orders by processing status', () => {
      const processingOrder = { ...order, status: OrderStatus.processing };
      component.orders = [processingOrder];
      component.filterAndSortOrders();

      expect(component.processingOrders).toEqual([processingOrder]);
    });

    it('should filter and sort orders by delayed status', () => {
      const delayedOrder = { ...order, status: OrderStatus.delayed };
      component.orders = [delayedOrder];
      component.filterAndSortOrders();

      expect(component.delayedOrders).toEqual([delayedOrder]);
    });

    it('should filter and sort orders by delivered status', () => {
      const deliveredOrder = { ...order, status: OrderStatus.delivered };
      component.orders = [deliveredOrder];
      component.filterAndSortOrders();

      expect(component.deliveredOrders).toEqual([deliveredOrder]);
    });

    it('should filter and sort orders by cancelled status', () => {
      const cancelledOrder = { ...order, status: OrderStatus.cancelled };
      component.orders = [cancelledOrder];
      component.filterAndSortOrders();

      expect(component.cancelledOrders).toEqual([cancelledOrder]);
    });

    it('should sort orders by date', () => {
      const olderOrder = { ...order, date: 100 };
      const newerOrder = { ...order, date: 200 };
      component.orders = [newerOrder, olderOrder];
      component.filterAndSortOrders();

      expect(component.shippedOrders).toEqual([olderOrder, newerOrder]);
    });
  });

  describe('updateOrderStatus', () => {
    it('should update order status', () => {
      const newStatus = OrderStatus.delivered;
      mockOrderService.updateOrderStatus.mockReturnValue(of(undefined));
      component.updateOrderStatus(order, newStatus);

      expect(mockOrderService.updateOrderStatus).toHaveBeenCalledWith(
        order.id,
        { status: newStatus }
      );
    });

    it('should log error on failure', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const error = new Error('Test error');

      mockOrderService.updateOrderStatus.mockReturnValue(
        throwError(() => error)
      );

      component.updateOrderStatus(order, OrderStatus.delivered);

      expect(consoleSpy).toHaveBeenCalledWith(error);
    });
  });

  describe('drop', () => {
    it.skip('should move item in array if previous container is the same as the current container', () => {
      const order1: Order = {
        id: '1',
        orderId: '',
        status: OrderStatus.processing,
        date: 0,
        total: 0,
        customer: user,
        orderedProducts: [],
      };
      const order2: Order = {
        id: '2',
        orderId: '',
        status: OrderStatus.processing,
        date: 0,
        total: 0,
        customer: user,
        orderedProducts: [],
      };
      const order3: Order = {
        id: '3',
        orderId: '',
        status: OrderStatus.processing,
        date: 0,
        total: 0,
        customer: user,
        orderedProducts: [],
      };

      const processingOrders = [order1, order2, order3];
      component.processingOrders = processingOrders;

      const event = {
        previousContainer: { data: processingOrders, id: 'processing' },
        container: { data: processingOrders, id: 'processing' },
        previousIndex: 0,
        currentIndex: 2,
        item: { data: order1 },
      } as unknown as CdkDragDrop<any[]>;

      const moveItemInArraySpy = jest.spyOn(<any>window, 'moveItemInArray');

      component.drop(event);

      expect(moveItemInArraySpy).toHaveBeenCalledWith(
        processingOrders,
        event.previousIndex,
        event.currentIndex
      );
    });
  });

  it('should transfer item and update order status if previous container is not the same as the current container', () => {
    const event = {
      previousContainer: { data: [order], id: 'shipped' },
      container: { data: [], id: 'delivered' },
      previousIndex: 0,
      currentIndex: 0,
      item: { data: order },
    } as unknown as CdkDragDrop<any[]>;

    const newStatus = OrderStatus.delivered;
    mockOrderService.updateOrderStatus.mockReturnValue(of(undefined));
    component.drop(event);

    expect(mockOrderService.updateOrderStatus).toHaveBeenCalledWith(order.id, {
      status: newStatus,
    });
  });
});
