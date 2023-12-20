import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { TranslateService } from '@ngx-translate/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tormes-frontend';

  constructor(
    public translate: TranslateService,
    faIconLibrary: FaIconLibrary
  ) {
    translate.setDefaultLang('es');
    faIconLibrary.addIconPacks(fas, far);
  }
}
