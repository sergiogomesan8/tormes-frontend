import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [MatMenuModule, NoopAnimationsModule],
      providers: [
        {
          provide: TranslateService,
          useValue: {
            use: jest.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open menu when someMethod is called', () => {
    jest.spyOn(component.trigger, 'openMenu');
    component.someMethod();
    expect(component.trigger.openMenu).toHaveBeenCalled();
  });

  it('should have a defined trigger', () => {
    expect(component.trigger).toBeDefined();
  });

  it('should emit addButtonClick event when clicked and not disabled', () => {
    component.shoppingCartButtonClick.emit = jest.fn();
    component.shoppingCart();
    expect(component.shoppingCartButtonClick.emit).toHaveBeenCalled();
  });

  it('should call translate.use with the correct language when useLanguage is called', () => {
    const translateService = TestBed.inject(TranslateService);
    const useSpy = jest.spyOn(translateService, 'use');

    component.useLanguage('en');

    expect(useSpy).toHaveBeenCalledWith('en');
  });
});
