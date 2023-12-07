import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoldButtonComponent } from './gold-button/gold-button.component';
import { PurpleButtonComponent } from './purple-button/purple-button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [GoldButtonComponent, PurpleButtonComponent],
})
export class ComponentsModule {}
