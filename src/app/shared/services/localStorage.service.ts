import { Injectable } from '@angular/core';
import { AppComponent } from '../../../app/app.component';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements Storage {
  private storage: Storage;
  length: number;

  constructor() {
    this.storage = new LocalStorage();
    this.length = 0;

    AppComponent.isBrowser.subscribe((isBrowser) => {
      if (isBrowser) {
        this.storage = localStorage;
        this.length = localStorage.length;
      }
    });
  }

  [name: string]: any;

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    return this.storage.setItem(key, value);
  }
}

class LocalStorage implements Storage {
  [name: string]: any;
  readonly length: number;

  constructor() {
    this.length = 0;
  }

  clear(): void {}

  getItem(key: string): string | null {
    return null;
  }

  key(index: number): string | null {
    return null;
  }

  removeItem(key: string): void {}

  setItem(key: string, value: string): void {}
}
