import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../projects/tormes-library/src/public-api';

@NgModule({
  imports: [CommonModule],
  declarations: [ComponentsModule],
  exports: [ComponentsModule],
})
export class SharedModule {}
