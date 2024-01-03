import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { TranslateService } from '@ngx-translate/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tormes-frontend';

  static isBrowser = new BehaviorSubject<boolean | null>(null);

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    public translate: TranslateService,
    faIconLibrary: FaIconLibrary
  ) {
    AppComponent.isBrowser.next(isPlatformBrowser(platformId));
    translate.setDefaultLang('es');
    faIconLibrary.addIconPacks(fas, far);
  }
}
