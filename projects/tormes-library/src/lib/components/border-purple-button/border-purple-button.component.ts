import { Component, Input } from '@angular/core';

@Component({
  selector: 'border-purple-button',
  templateUrl: './border-purple-button.component.html',
  styleUrls: ['./border-purple-button.component.scss'],
})
export class BorderPurpleButtonComponent {
  @Input()
  label: string = '';

  @Input()
  disabled: boolean = false;
}
