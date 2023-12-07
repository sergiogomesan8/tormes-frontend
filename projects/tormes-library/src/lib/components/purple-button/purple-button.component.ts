import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-purple-button',
  templateUrl: './purple-button.component.html',
  styleUrls: ['./purple-button.component.scss'],
})
export class PurpleButtonComponent {
  @Input()
  label: string = '';
}
