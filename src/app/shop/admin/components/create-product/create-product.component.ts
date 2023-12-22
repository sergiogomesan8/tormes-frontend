import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  formGroup: FormGroup;
  loading: boolean = false;
  hidePass = true;

  constructor(public readonly formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      section: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  ngOnInit() {}
}
