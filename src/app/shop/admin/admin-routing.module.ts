import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@shop/customer/components/login/login.component';
import { RegisterComponent } from '@shop/customer/components/register/register.component';
import { AdminComponent } from './admin.component';
import { CatalogComponent } from '@shop/customer/components/catalog/catalog.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [{ path: 'catalog', component: CatalogComponent }],
  },
  { path: 'signin', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
