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
  let mockLocalStorage: any;

  beforeEach(() => {
    service = new LocalStorageService();
    mockLocalStorage = (function () {
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
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear localStorage', () => {
    service.clear();
    expect(mockLocalStorage.clear).toHaveBeenCalled();
    expect(service.length).toBe(0);
  });

  it('should get item from localStorage', () => {
    const key = 'test';
    service.getItem(key);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(key);
  });

  it('should get key from localStorage', () => {
    const index = 1;
    service.key(index);
    expect(mockLocalStorage.key).toHaveBeenCalledWith(index);
  });

  it('should remove item from localStorage', () => {
    const key = 'test';
    service.removeItem(key);
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(key);
    expect(service.length).toBe(mockLocalStorage.length);
  });

  it('should set item to localStorage', () => {
    const key = 'test';
    const value = 'value';
    service.setItem(key, value);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(key, value);
    expect(service.length).toBe(mockLocalStorage.length);
  });
});
