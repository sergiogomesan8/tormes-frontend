import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { ShopRoutingModule } from './shop-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    ShopRoutingModule,
    TranslateModule,
  ],
  declarations: [],
})
export class ShopModule {}
