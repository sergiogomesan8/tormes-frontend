import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from './search/search.component';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { InteractionControlComponent } from './interaction-control/interaction-control.component';
import { ShoppingCartButton } from './shopping-cart/cart-button.component';
import { LangSelectorComponent } from './lang-selector/lang-selector.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule],
  declarations: [
    ButtonComponent,
    SearchComponent,
    FileUploadComponent,
    InteractionControlComponent,
    ShoppingCartButton,
    LangSelectorComponent,
  ],
  exports: [
    ButtonComponent,
    SearchComponent,
    FileUploadComponent,
    InteractionControlComponent,
    ShoppingCartButton,
    LangSelectorComponent,
  ],
})
export class ComponentsModule {}
