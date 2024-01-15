import { OrderStatus, OrderedProduct } from '@shop/models/order';

export class CreateOrderDto {
  customerName: string;
  customerContact: number;
  deliveryAddress: string;
  billingAddress: string;
  paymentMethod: string;
  orderedProducts: OrderedProduct[];

  constructor(
    customerName: string,
    customerContact: number,
    deliveryAddress: string,
    billingAddress: string,
    paymentMethod: string,
    orderedProducts: OrderedProduct[]
  ) {
    this.customerName = customerName;
    this.customerContact = customerContact;
    this.deliveryAddress = deliveryAddress;
    this.billingAddress = billingAddress;
    this.paymentMethod = paymentMethod;
    this.orderedProducts = orderedProducts;
  }
}

export class UpdateOrderStatusDto {
  status: OrderStatus;

  constructor(status: OrderStatus) {
    this.status = status;
  }
}
