import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { CustomerComponent } from './customer.component';
import { LoginComponent } from './components/login/login.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { RoleGuard } from '@core/guards/role-guard.service';
import { UserType } from '@shop/models/user.model';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      { path: '', component: CatalogComponent },
      { path: 'catalog', component: CatalogComponent },
      { path: 'home', component: HomeComponent },
      {
        path: 'customer/place-order',
        component: PlaceOrderComponent,
        canActivate: [RoleGuard],
        data: {
          roles: [UserType.customer, UserType.employee, UserType.manager],
        },
      },
      {
        path: 'customer/my-orders',
        component: MyOrdersComponent,
        canActivate: [RoleGuard],
        data: {
          roles: [UserType.customer, UserType.employee, UserType.manager],
        },
      },
      {
        path: 'customer/my-orders/:id',
        component: OrderComponent,
        canActivate: [RoleGuard],
        data: {
          roles: [UserType.customer, UserType.employee, UserType.manager],
        },
      },
    ],
  },
  { path: 'signin', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
