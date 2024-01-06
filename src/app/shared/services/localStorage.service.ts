import { Injectable } from '@angular/core';
import { AppComponent } from '../../../app/app.component';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements Storage {
  length: number;

  constructor() {
    this.length = 0;

    AppComponent.isBrowser.subscribe((isBrowser) => {
      if (isBrowser) {
        this.length = localStorage.length;
      }
    });
  }

  [name: string]: any;

  clear(): void {
    localStorage.clear();
    this.length = 0;
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  key(index: number): string | null {
    return localStorage.key(index);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
    this.length = localStorage.length;
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
    this.length = localStorage.length;
  }
}
