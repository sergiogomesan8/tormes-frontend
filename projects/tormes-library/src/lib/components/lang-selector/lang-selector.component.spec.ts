/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangSelectorComponent } from './lang-selector.component';

describe('LangSelectorComponent', () => {
  let component: LangSelectorComponent;
  let fixture: ComponentFixture<LangSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LangSelectorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LangSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit useLanguageChange event with correct language when useLanguage is called', () => {
    const emitSpy = jest.spyOn(component.useLanguageChange, 'emit');

    const testLanguage = 'es';
    component.useLanguage(testLanguage);

    expect(emitSpy).toHaveBeenCalledWith(testLanguage);
  });

  it('should update language when useLanguage is called', () => {
    const testLanguage = 'en';
    component.useLanguage(testLanguage);

    expect(component.language).toBe(testLanguage);
  });
});
