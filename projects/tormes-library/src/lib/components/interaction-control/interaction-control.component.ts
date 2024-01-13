import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'interaction-control',
  templateUrl: './interaction-control.component.html',
  styleUrls: ['./interaction-control.component.scss'],
})
export class InteractionControlComponent {
  @Input() amount: number = 0;
  @Output() deleteButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() removeButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() addButtonClick: EventEmitter<void> = new EventEmitter<void>();

  deleteItem() {
    this.deleteButtonClick.emit();
  }
  removeItem() {
    this.removeButtonClick.emit();
  }
  addItem() {
    this.addButtonClick.emit();
  }
}
