import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateOrderDto } from '@shop/admin/dtos/order.dto';
import { OrderService } from '@shop/services/order.service';
import { ShoppingCartService } from '@shop/services/shopping-cart.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
})
export class PlaceOrderComponent implements OnInit {
  formGroup: FormGroup;
  loading: boolean = false;

  shoppingCart$ = this.shoppingCartService.shoppingCart$;

  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    private readonly orderService: OrderService,
    private readonly formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      deliveryAddress: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      billingAddress: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      paymentMethod: ['', [Validators.required]],
      customerName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      customerContact: [
        '',
        [Validators.required, Validators.pattern('^[6789][0-9]{8}$')],
      ],
    });
  }

  ngOnInit(): void {
    this.shoppingCartService.getShoppingCart();
  }

  placeOrder() {
    if (this.formGroup.valid) {
      this.shoppingCart$.pipe(take(1)).subscribe((shoppingCart) => {
        const orderedProducts = shoppingCart.shoppingCartProducts.map(
          (shoppingCartProduct) => ({
            productId: shoppingCartProduct.product.id as string,
            amount: shoppingCartProduct.amount,
          })
        );

        const createOrderDto: CreateOrderDto = {
          customerName: this.formGroup.value.customerName,
          customerContact: this.formGroup.value.customerContact,
          deliveryAddress: this.formGroup.value.deliveryAddress,
          billingAddress: this.formGroup.value.billingAddress,
          paymentMethod: this.formGroup.value.paymentMethod,
          orderedProducts: orderedProducts,
        };

        this.orderService.createOrder(createOrderDto).subscribe({
          next: () => {
            this.router.navigate(['/catalog']);
          },
          error: (error) => {
            console.log(error);
          },
        });
      });
    }
  }
}
