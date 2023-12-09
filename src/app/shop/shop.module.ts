import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { ShopRoutingModule } from './shop-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    ShopRoutingModule,
    TranslateModule,
    SharedModule
  ],
  declarations: [],
})
export class ShopModule {}
