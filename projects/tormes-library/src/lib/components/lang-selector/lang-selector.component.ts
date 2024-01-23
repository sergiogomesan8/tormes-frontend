import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.scss'],
})
export class LangSelectorComponent {
  @Output() useLanguageChange: EventEmitter<string> =
    new EventEmitter<string>();

  @Input() language: string = 'es';
  englandImage: string = 'assets/images/icons/en.svg';
  spainImage: string = 'assets/images/icons/es.svg';

  useLanguage(language: string): void {
    this.language = language;
    this.useLanguageChange.emit(language);
  }
}
