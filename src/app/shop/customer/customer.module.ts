import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';

import { SharedModule } from '@shared/shared.module';

import { RegisterComponent } from './components/register/register.component';
import { CustomerComponent } from './customer.component';
import { LoginComponent } from './components/login/login.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductComponent } from './components/product/product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';

@NgModule({
  imports: [CommonModule, CustomerRoutingModule, SharedModule],
  declarations: [
    CustomerComponent,
    RegisterComponent,
    LoginComponent,
    CatalogComponent,
    HomeComponent,
    ProductComponent,
    ShoppingCartComponent,
    PlaceOrderComponent,
    MyOrdersComponent,
    OrderComponent,
  ],
})
export class CustomerModule {}
