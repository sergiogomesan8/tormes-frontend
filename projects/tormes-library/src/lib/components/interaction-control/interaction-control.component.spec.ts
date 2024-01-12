/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InteractionControlComponent } from './interaction-control.component';

describe('InteractionControlComponent', () => {
  let component: InteractionControlComponent;
  let fixture: ComponentFixture<InteractionControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InteractionControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InteractionControlComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit deleteButtonClick event when clicked and not disabled', () => {
    component.deleteButtonClick.emit = jest.fn();
    component.deleteItem();
    expect(component.deleteButtonClick.emit).toHaveBeenCalled();
  });

  it('should emit removeButtonClick event when clicked and not disabled', () => {
    component.removeButtonClick.emit = jest.fn();
    component.removeItem();
    expect(component.removeButtonClick.emit).toHaveBeenCalled();
  });

  it('should emit addButtonClick event when clicked and not disabled', () => {
    component.addButtonClick.emit = jest.fn();
    component.addItem();
    expect(component.addButtonClick.emit).toHaveBeenCalled();
  });
});
