import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from './search/search.component';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { InteractionControlComponent } from './interaction-control/interaction-control.component';
import { ShoppingCartButton } from './shopping-cart/cart-button.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule],
  declarations: [
    ButtonComponent,
    SearchComponent,
    FileUploadComponent,
    InteractionControlComponent,
    ShoppingCartButton,
  ],
  exports: [
    ButtonComponent,
    SearchComponent,
    FileUploadComponent,
    InteractionControlComponent,
    ShoppingCartButton,
  ],
})
export class ComponentsModule {}
