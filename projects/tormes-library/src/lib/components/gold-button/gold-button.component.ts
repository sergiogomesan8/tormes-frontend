import { Component, Input } from '@angular/core';

@Component({
  selector: 'gold-button',
  templateUrl: './gold-button.component.html',
  styleUrls: ['./gold-button.component.scss'],
})
export class GoldButtonComponent {
  @Input()
  label: string = '';

  @Input()
  disabled: boolean = false;
}
