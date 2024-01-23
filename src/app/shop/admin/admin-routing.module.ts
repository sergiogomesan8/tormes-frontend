import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@shop/customer/components/login/login.component';
import { RegisterComponent } from '@shop/customer/components/register/register.component';
import { AdminComponent } from './admin.component';
import { CatalogComponent } from '@shop/customer/components/catalog/catalog.component';
import { ProductsComponent } from './components/products/products.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { CashRegistersComponent } from './components/cash-registers/cash-registers.component';
import { CashRegisterComponent } from './components/cash-register/cash-register.component';
import { SectionsComponent } from './components/sections/sections.component';
import { SectionComponent } from './components/section/section.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'catalog', component: CatalogComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/create-product', component: CreateProductComponent },
      {
        path: 'products/update-product/:id',
        component: UpdateProductComponent,
      },
      { path: 'orders', component: OrderTableComponent },
      { path: 'cash-registers', component: CashRegistersComponent },
      {
        path: 'cash-registers/close',
        component: CashRegisterComponent,
      },
      {
        path: 'cash-registers/update/:id',
        component: CashRegisterComponent,
      },
      {
        path: 'sections',
        component: SectionsComponent,
      },
      {
        path: 'sections/create-section',
        component: SectionComponent,
      },
      {
        path: 'sections/update-section/:id',
        component: SectionComponent,
      },
    ],
  },
  { path: 'signin', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
