import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, CustomerRoutingModule, SharedModule],
  declarations: [RegisterComponent],
})
export class CustomerModule {}
