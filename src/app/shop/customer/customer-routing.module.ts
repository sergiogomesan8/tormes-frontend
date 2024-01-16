import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { CustomerComponent } from './customer.component';
import { LoginComponent } from './components/login/login.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { RoleGuard } from '@core/guards/role-guard.service';
import { UserType } from '@shop/models/user.model';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      { path: 'catalog', component: CatalogComponent },
      { path: 'catalogo', component: CatalogComponent },
      { path: 'home', component: CatalogComponent },
    ],
  },
  { path: 'signin', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'customer/place-order',
    component: PlaceOrderComponent,
    canActivate: [RoleGuard],
    data: { roles: [UserType.customer, UserType.employee, UserType.manager] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
