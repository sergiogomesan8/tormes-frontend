/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductComponent } from './product.component';
import { Product } from '@shop/models/product';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let product: Product;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    let product: Product = {
      id: '1',
      image: 'root/to/product.jpg',
      name: 'product name',
      price: 100,
      section: 'product section'
    };
    component.product = product;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
