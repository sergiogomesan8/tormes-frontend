import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

type AllowedClassValues =
  | 'gold-button'
  | 'purple-button'
  | 'border-gold-button'
  | 'border-purple-button'
  | 'granate-button'
  | 'border-granate-button';

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
  matIcon: string = '';

  @Input()
  disabled: boolean = false;

  @Input()
  routerLink: string = '';

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router) {}
  onClick() {
    if (!this.disabled) {
      this.buttonClick.emit();
      if (this.routerLink) {
        this.router.navigateByUrl(this.routerLink);
      }
    }
  }
}
