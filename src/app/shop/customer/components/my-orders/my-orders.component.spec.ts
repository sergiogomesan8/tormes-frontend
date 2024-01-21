/* tslint:disable:no-unused-variable */
import { MyOrdersComponent } from './my-orders.component';
import { OrderService } from '@shop/services/order.service';
import { Order, OrderStatus } from '@shop/models/order';
import { of, throwError } from 'rxjs';
import { User } from '@shop/models/user.model';
import { Product } from '@shop/models/product';
import { Router } from '@angular/router';

describe('MyOrdersComponent', () => {
  let component: MyOrdersComponent;
  let mockOrderService: jest.Mocked<OrderService>;
  let mockRouter: jest.Mocked<Router>;

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
    orderedProducts: [{ product: product, amount: 1 }],
  };
  const orders = [order];

  beforeEach(() => {
    mockOrderService = {
      findAllOrdersByUser: jest.fn().mockReturnValue(of(orders)),
    } as any;

    mockRouter = {
      navigate: jest.fn(),
    } as any;

    component = new MyOrdersComponent(mockOrderService, mockRouter);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call findAllOrdersByUser on ngOnInit', () => {
      component.ngOnInit();
      expect(mockOrderService.findAllOrdersByUser).toHaveBeenCalled();
    });
  });

  describe('findAllOrdersByUser', () => {
    it('should find all orders by user', () => {
      component.findAllOrdersByUser();

      expect(mockOrderService.findAllOrdersByUser).toHaveBeenCalled();
      expect(component.orders).toEqual(orders);
    });

    it('should log error on failure', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const error = new Error('Test error');

      mockOrderService.findAllOrdersByUser.mockReturnValue(
        throwError(() => error)
      );

      component.findAllOrdersByUser();

      expect(consoleSpy).toHaveBeenCalledWith(error);
    });
  });
});
