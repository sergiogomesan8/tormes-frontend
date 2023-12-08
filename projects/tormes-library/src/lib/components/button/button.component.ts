import { Component, EventEmitter, Input, Output } from '@angular/core';

type AllowedClassValues =
  | 'gold-button'
  | 'purple-button'
  | 'border-gold-button'
  | 'border-purple-button';

@Component({
  selector: 'button-component',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss', '../../../styles/styles.scss'],
})
export class ButtonComponent {
  @Input()
  class: AllowedClassValues = null as any;

  @Input()
  type: string = '';

  @Input()
  label: string = '';

  @Input()
  disabled: boolean = false;

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }
}
