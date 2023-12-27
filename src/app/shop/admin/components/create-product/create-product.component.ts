import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateProductDto } from '@shop/admin/dtos/product.dto';
import { Section } from '@shop/models/section';
import { ProductService } from '@shop/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {
  formGroup: FormGroup;
  loading: boolean = false;
  hidePass = true;

  sections: Section[] = [
    { name: 'Embutidos', image: 'image' },
    { name: 'Carnes', image: 'image' },
    { name: 'Fiambres', image: 'image' },
    { name: 'Quesos', image: 'image' },
  ];

  constructor(
    private readonly productService: ProductService,
    private readonly formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      section: ['', [Validators.required]],
      price: [
        null,
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')],
      ],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }
  
  handleFile(file: File) {
    this.formGroup.get('image')?.setValue('/image/' + file.name);
  }

  addProduct(): void {
    if (this.formGroup.valid) {
      const createProductDto: CreateProductDto = {
        name: this.formGroup.value.name,
        section: this.formGroup.value.section,
        price: +this.formGroup.value.price,
        description: this.formGroup.value.description,
        image: this.formGroup.value.image as string,
      };
      this.productService.addProduct(createProductDto).subscribe({
        next: () => {
          this.router.navigate(['/admin/products']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
