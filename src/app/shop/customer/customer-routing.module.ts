import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { CustomerComponent } from './customer.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: CustomerComponent },
  { path: 'signin', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'catalog', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
