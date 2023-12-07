import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { ShopRoutingModule } from './shop-routing.module';

@NgModule({
  imports: [CommonModule, MatFormFieldModule, ShopRoutingModule],
  declarations: [],
})
export class ShopModule {}
