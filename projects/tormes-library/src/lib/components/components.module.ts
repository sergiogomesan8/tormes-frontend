import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoldButtonComponent } from './gold-button/gold-button.component';
import { PurpleButtonComponent } from './purple-button/purple-button.component';
import { BorderPurpleButtonComponent } from './border-purple-button/border-purple-button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [GoldButtonComponent, PurpleButtonComponent, BorderPurpleButtonComponent],
  exports: [GoldButtonComponent, PurpleButtonComponent, BorderPurpleButtonComponent],
})
export class ComponentsModule {}
