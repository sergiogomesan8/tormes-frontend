import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AdminComponent } from './admin.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  declarations: [AdminComponent, ProductsComponent],
})
export class AdminModule {}
