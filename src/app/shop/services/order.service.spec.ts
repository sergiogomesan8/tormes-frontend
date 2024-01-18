/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderService } from './order.service';
import { HttpService } from '@core/services/http-service.service';
import { OrderEndPoint } from '@shared/end-points';
import { SnackbarService } from '@shared/services/snackbar.service';
import { User } from '@shop/models/user.model';
import { Order, OrderStatus } from '@shop/models/order';
import { of, throwError } from 'rxjs';
import {
  CreateOrderDto,
  UpdateOrderStatusDto,
} from '@shop/admin/dtos/order.dto';

describe('Service: Order', () => {
  let service: OrderService;
  let httpService: jest.Mocked<HttpService>;
  let snackbarService: jest.Mocked<SnackbarService>;

  let orderEndPoint: OrderEndPoint;

  beforeEach(() => {
    httpService = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
      patch: jest.fn(),
    } as any;
    snackbarService = {
      showSuccessSnackbar: jest.fn(),
      showErrorSnackbar: jest.fn(),
    } as any;
    orderEndPoint = new OrderEndPoint();
    service = new OrderService(httpService, snackbarService);
  });

  const user: User = {
    id: 'id',
    name: 'Test User',
    email: 'test@mail.com',
  };

  const orders: Order[] = [
    {
      id: 'id',
      orderId: 'orderId',
      status: OrderStatus.shipped,
      date: 123,
      total: 321,
      customer: user,
      orderedProducts: [{ productId: 'product.id1', amount: 1 }],
    },
    {
      id: 'id',
      orderId: 'orderId',
      status: OrderStatus.delivered,
      date: 123,
      total: 321,
      customer: user,
      orderedProducts: [{ productId: 'product.id2', amount: 3 }],
    },
  ];

  describe('findAllOrders', () => {
    it('should return an array of orders if the http call is successful', () => {
      httpService.get.mockReturnValue(of(orders));

      service.findAllOrders().subscribe((res) => {
        expect(res).toEqual(orders);
      });
      expect(httpService.get).toHaveBeenCalled();
    });

    it('should return an empty array if the http call fails', () => {
      httpService.get.mockReturnValue(throwError(() => new Error('Error')));

      service.findAllOrders().subscribe((res) => {
        expect(res).toEqual([]);
      });

      expect(httpService.get).toHaveBeenCalled();
    });
  });

  describe('findOrderById', () => {
    it('should return an order if the http call is successful', () => {
      httpService.get.mockReturnValue(of(orders[0]));

      service.findOrderById(orders[0].id).subscribe((res) => {
        expect(res).toEqual(orders[0]);
      });
      expect(httpService.get).toHaveBeenCalledWith(
        orderEndPoint.FIND_BY_ID + orders[0].id
      );
    });

    it('should return undefined if the http call fails', () => {
      httpService.get.mockReturnValue(throwError(() => new Error('Error')));

      service.findOrderById(orders[0].id).subscribe(
        () => {},
        () => {
          expect(httpService.get).toHaveBeenCalledWith(
            orderEndPoint.FIND_BY_ID + orders[0].id
          );

          expect(snackbarService.showSuccessSnackbar).toHaveBeenCalledWith(
            'shop.admin.dashboard.options.orders.updateError'
          );
        }
      );
    });
  });

  describe('findAllOrdersByUser', () => {
    it('should return an array of orders by user if the http call is successful', () => {
      httpService.get.mockReturnValue(of(orders));

      service.findAllOrdersByUser().subscribe((res) => {
        expect(res).toEqual(orders);
      });
      expect(httpService.get).toHaveBeenCalled();
    });

    it('should return an empty array if the http call fails', () => {
      httpService.get.mockReturnValue(throwError(() => new Error('Error')));

      service.findAllOrdersByUser().subscribe((res) => {
        expect(res).toEqual([]);
      });

      expect(httpService.get).toHaveBeenCalled();
    });
  });

  describe('createOrder', () => {
    const createOrderDto: CreateOrderDto = {
      customerName: 'Test Name',
      customerContact: 678912345,
      deliveryAddress: 'Test Delivery Address',
      billingAddress: 'Test Billing Address',
      paymentMethod: 'Test Method',
      orderedProducts: [{ productId: 'product.id', amount: 1 }],
    };

    it('should return an order if the http call is successful', () => {
      httpService.post.mockReturnValue(of(orders[0]));

      service.createOrder(createOrderDto).subscribe();

      expect(httpService.post).toHaveBeenCalledWith(
        orderEndPoint.ADD,
        createOrderDto
      );
      expect(snackbarService.showSuccessSnackbar).toHaveBeenCalledWith(
        'shop.admin.dashboard.options.orders.addSuccess'
      );
    });

    it('should show error snackbar and return undefined if the http call fails', () => {
      const errorResponse = new Error('Error');
      httpService.post.mockReturnValue(throwError(errorResponse));

      service.createOrder(createOrderDto).subscribe(
        () => {},
        (error) => {
          expect(error).toEqual(errorResponse);
          expect(snackbarService.showErrorSnackbar).toHaveBeenCalledWith(
            'shop.admin.dashboard.options.orders.addError'
          );
        }
      );

      expect(httpService.post).toHaveBeenCalledWith(
        orderEndPoint.ADD,
        createOrderDto
      );
    });
  });

  describe('updateOrderStatus', () => {
    const updateOrderStatusDto: UpdateOrderStatusDto = {
      status: OrderStatus.delivered,
    };
    const orderId: string = 'orderId';

    it('should return undefined if the http call is successful', () => {
      httpService.patch.mockReturnValue(of(undefined));

      service
        .updateOrderStatus(orderId, updateOrderStatusDto)
        .subscribe((res) => {
          expect(res).toBeUndefined();
        });
      expect(httpService.patch).toHaveBeenCalledWith(
        `${orderEndPoint.UPDATE_STATUS}${orderId}`,
        updateOrderStatusDto
      );
      expect(snackbarService.showSuccessSnackbar).toHaveBeenCalledWith(
        'shop.admin.dashboard.options.orders.updateSuccess'
      );
    });

    it('should return undefined if the http call fails', () => {
      httpService.patch.mockReturnValue(throwError(() => new Error('Error')));

      service
        .updateOrderStatus(orderId, updateOrderStatusDto)
        .subscribe((res) => {
          expect(res).toBeUndefined();
          expect(snackbarService.showErrorSnackbar).toHaveBeenCalledWith(
            'shop.admin.dashboard.options.orders.updateError'
          );
        });

      expect(httpService.patch).toHaveBeenCalledWith(
        `${orderEndPoint.UPDATE_STATUS}${orderId}`,
        updateOrderStatusDto
      );
    });
  });

  describe('deleteOrder', () => {
    it('should return undefined if the http call is successful', () => {
      httpService.delete.mockReturnValue(of(undefined));

      service.deleteOrder(orders[0]).subscribe((res) => {
        expect(res).toBeUndefined();
      });
      expect(httpService.delete).toHaveBeenCalled();
    });

    it('should return undefined if the http call fails', () => {
      httpService.delete.mockReturnValue(throwError(() => new Error('Error')));

      service.deleteOrder(orders[0]).subscribe((res) => {
        expect(res).toBeUndefined();
      });

      expect(httpService.delete).toHaveBeenCalled();
    });
  });
});
