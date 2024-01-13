/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { Router } from '@angular/router';

describe('ButtonComponent', () => {
  let buttonComponent: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let router: Router;
  let routerSpy = { navigateByUrl: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    buttonComponent = fixture.componentInstance;

    buttonComponent.type = 'button';
    buttonComponent.label = 'button label';
    buttonComponent.disabled = false;
    buttonComponent.routerLink = 'route';

    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(buttonComponent).toBeTruthy();
  });

  it('should emit buttonClick event when clicked and not disabled', () => {
    buttonComponent.buttonClick.emit = jest.fn();
    buttonComponent.onClick();
    expect(buttonComponent.buttonClick.emit).toHaveBeenCalled();
  });

  it('should navigate to routerLink when clicked and not disabled', () => {
    buttonComponent.onClick();
    expect(router.navigateByUrl).toHaveBeenCalledWith(
      buttonComponent.routerLink
    );
  });

  it('should not emit buttonClick event when clicked and disabled', () => {
    buttonComponent.buttonClick.emit = jest.fn();
    buttonComponent.disabled = true;
    buttonComponent.onClick();
    expect(buttonComponent.buttonClick.emit).not.toHaveBeenCalled();
  });

  it('should not navigate to routerLink when clicked and disabled', () => {
    buttonComponent.disabled = true;
    buttonComponent.onClick();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });
});
