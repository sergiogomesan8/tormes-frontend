import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AdminComponent } from './admin.component';
import { ProductsComponent } from './components/products/products.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { CashRegistersComponent } from './components/cash-registers/cash-registers.component';
import { CloseCashRegisterComponent } from './components/close-cash-register/close-cash-register.component';
import { UpdateCashRegisterComponent } from './components/update-cash-register/update-cash-register.component';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, SharedModule, DragDropModule],
  declarations: [
    AdminComponent,
    ProductsComponent,
    CreateProductComponent,
    UpdateProductComponent,
    OrderTableComponent,
    CashRegistersComponent,
    CloseCashRegisterComponent,
    UpdateCashRegisterComponent,
  ],
})
export class AdminModule {}
