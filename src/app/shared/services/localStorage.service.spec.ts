/* tslint:disable:no-unused-variable */
import { of } from 'rxjs';
import { LocalStorageService } from './localStorage.service';

jest.mock('../../../app/app.component', () => ({
  AppComponent: {
    isBrowser: of(true),
  },
}));

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let localStorage: LocalStorage;

  beforeEach(() => {
    service = new LocalStorageService();
    Object.defineProperty(window, 'localStorage', {
      value: new LocalStorage(),
      writable: true,
    });
    localStorage = (function () {
      let store: { [key: string]: string } = {};
      return {
        getItem: jest.fn(function (key: string | number) {
          return store[key] || null;
        }),
        setItem: jest.fn(function (
          key: string | number,
          value: { toString: () => string }
        ) {
          store[key] = value.toString();
        }),
        removeItem: jest.fn(function (key: string | number) {
          delete store[key];
        }),
        clear: jest.fn(function () {
          store = {};
        }),
        get length() {
          return Object.keys(store).length;
        },
        key: jest.fn(function (i: number) {
          return Object.keys(store)[i] || null;
        }),
      };
    })();
    Object.defineProperty(window, 'localStorage', { value: localStorage });
  });
  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with length 0', () => {
    expect(service.length).toEqual(0);
  });

  it('should return null when key is called with an index that does not exist', () => {
    expect(service.key(1)).toBeNull();
  });

  it('should set an item when setItem is called', () => {
    service.setItem('key', 'value');
    expect(service.getItem('key')).toEqual('value');
  });

  it('should remove an item when removeItem is called', () => {
    service.setItem('key', 'value');
    service.removeItem('key');
    expect(service.getItem('key')).toBeNull();
  });

  it('should clear all items when clear is called', () => {
    service.setItem('key1', 'value1');
    service.setItem('key2', 'value2');
    service.clear();
    expect(service.getItem('key1')).toBeNull();
    expect(service.getItem('key2')).toBeNull();
  });
});

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
