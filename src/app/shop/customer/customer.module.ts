import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';

import { SharedModule } from '@shared/shared.module';

import { RegisterComponent } from './components/register/register.component';
import { CustomerComponent } from './customer.component';
import { LoginComponent } from './components/login/login.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  imports: [CommonModule, CustomerRoutingModule, SharedModule],
  declarations: [
    CustomerComponent,
    RegisterComponent,
    LoginComponent,
    CatalogComponent,
    ProductComponent,
  ],
})
export class CustomerModule {}
