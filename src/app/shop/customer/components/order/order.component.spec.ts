/* tslint:disable:no-unused-variable */
import { OrderComponent } from './order.component';
import { OrderService } from '@shop/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderStatus } from '@shop/models/order';
import { User } from '@shop/models/user.model';
import { of } from 'rxjs';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let mockOrderService: jest.Mocked<OrderService>;
  let mockOrder: Order;
  let mockRouter: jest.Mocked<Router>;
  let route: ActivatedRoute;

  beforeEach(() => {
    mockOrderService = {
      findOrderById: jest.fn(),
    } as any;

    mockRouter = {
      navigate: jest.fn(),
    } as any;

    route = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue('1'),
        },
      },
    } as any;

    const user: User = {
      id: 'id',
      name: 'Test User',
      email: 'test@mail.com',
    };

    mockOrder = {
      id: '1',
      orderId: 'orderId',
      status: OrderStatus.processing,
      date: 123456789,
      total: 100,
      trackingNumber: 'Tracking Number',
      customer: user,
      customerName: user.name,
      customerContact: 666666666,
      deliveryAddress: 'Delivery Address',
      billingAddress: 'Billing Address',
      paymentMethod: 'Payment Method',

      orderedProducts: [
        {
          product: {
            id: '1',
            image: 'image.jpg',
            name: 'Mock Product',
            price: 100,
            section: 'Mock Section',
            description: 'Mock Description',
          },
          amount: 10,
        },
        {
          product: {
            id: '2',
            image: 'image.jpg',
            name: 'Mock Product',
            price: 100,
            section: 'Mock Section',
            description: 'Mock Description',
          },
          amount: 2,
        },
      ],
    };

    component = new OrderComponent(mockOrderService, mockRouter, route);

    component.order = mockOrder;
  });

  describe('ngOnInit', () => {
    it('should initialize form with product data if product id is present', () => {
      mockOrderService.findOrderById.mockReturnValue(of(mockOrder));

      component.ngOnInit();

      expect(mockOrderService.findOrderById).toHaveBeenCalledWith('1');
      expect(component.order).toEqual(mockOrder);
      expect(component.isLoading).toBeFalsy();
    });

    it('should navigate to /cutomer/my-orders if order id is not present', () => {
      route.snapshot.paramMap.get = jest.fn().mockImplementation(() => null);

      component.ngOnInit();

      expect(route.snapshot.paramMap.get).toHaveBeenCalledWith('id');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/cutomer/my-orders']);
    });

    it('should navigate to /cutomer/my-orders if product is not found', () => {
      mockOrderService.findOrderById.mockReturnValue(of(undefined));

      component.ngOnInit();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/cutomer/my-orders']);
    });
  });
});
