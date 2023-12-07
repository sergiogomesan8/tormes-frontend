import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../projects/tormes-library/src/public-api';

@NgModule({
  imports: [CommonModule, ComponentsModule],
  declarations: [],
  exports: [ComponentsModule],
})
export class SharedModule {}
