import { Component, Input } from '@angular/core';

type AllowedClassValues = 'gold-button' | 'purple-button' | 'border-gold-button' | 'border-purple-button';

@Component({
  selector: 'button-component',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input()
  class: AllowedClassValues = null as any;

  @Input()
  label: string = '';

  @Input()
  disabled: boolean = false;
}
