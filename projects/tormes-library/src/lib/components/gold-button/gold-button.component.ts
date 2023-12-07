import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gold-button',
  templateUrl: './gold-button.component.html',
  styleUrls: ['./gold-button.component.scss'],
})
export class GoldButtonComponent {
  @Input()
  label: string = '';
}
