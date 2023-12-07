import { Component, Input } from '@angular/core';

@Component({
  selector: 'purple-button',
  templateUrl: './purple-button.component.html',
  styleUrls: ['./purple-button.component.scss'],
})
export class PurpleButtonComponent {
  @Input()
  label: string = '';

  @Input()
  disabled: boolean = false;
}
