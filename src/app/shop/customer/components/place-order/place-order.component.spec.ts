/* tslint:disable:no-unused-variable */
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { PlaceOrderComponent } from './place-order.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingCartService } from '@shop/services/shopping-cart.service';
import { OrderService } from '@shop/services/order.service';
import { of } from 'rxjs';
import { CreateOrderDto } from '@shop/admin/dtos/order.dto';

describe('PlaceOrderComponent', () => {
  let component: PlaceOrderComponent;
  let formBuilder: FormBuilder;
  let router: jest.Mocked<Router>;
  let shoppingCartService: jest.Mocked<ShoppingCartService>;
  let orderService: jest.Mocked<OrderService>;

  beforeEach(() => {
    formBuilder = new FormBuilder();
    shoppingCartService = {
      getShoppingCart: jest.fn(),
      shoppingCart$: of({
        id: '1',
        shoppingCartProducts: [
          { product: { id: '1', price: 10 }, amount: 1 },
          { product: { id: '2', price: 20 }, amount: 2 },
        ],
      }),
    } as any;
    orderService = {
      createOrder: jest.fn().mockReturnValue(of({})),
    } as any;
    router = { navigate: jest.fn() } as any;

    component = new PlaceOrderComponent(
      shoppingCartService,
      orderService,
      formBuilder,
      router
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getShoppingCart on ngOnInit', () => {
    component.ngOnInit();
    expect(shoppingCartService.getShoppingCart).toHaveBeenCalled();
  });

  it('should place order when form is valid', () => {
    const shoppingCartProducts = [
      { product: { id: '1', price: 10 }, amount: 1 },
      { product: { id: '2', price: 20 }, amount: 2 },
    ];

    shoppingCartService.shoppingCart$ = of({ id: '1', shoppingCartProducts });

    const orderedProducts = shoppingCartProducts.map((product) => ({
      productId: product.product.id,
      amount: product.amount,
    }));

    const createOrderDto: CreateOrderDto = {
      customerName: 'Test Name',
      customerContact: 678912345,
      deliveryAddress: 'Test Delivery Address',
      billingAddress: 'Test Billing Address',
      paymentMethod: 'Test Method',
      orderedProducts: orderedProducts,
    };

    component.formGroup.setValue({
      customerName: createOrderDto.customerName,
      customerContact: createOrderDto.customerContact,
      deliveryAddress: createOrderDto.deliveryAddress,
      billingAddress: createOrderDto.billingAddress,
      paymentMethod: createOrderDto.paymentMethod,
    });

    component.placeOrder();

    expect(orderService.createOrder).toHaveBeenCalledWith(createOrderDto);
    expect(router.navigate).toHaveBeenCalledWith(['/catalog']);
  });
});
