import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '@shared/services/snackbar.service';
import { UpdateProductDto } from '@shop/admin/dtos/product.dto';
import { Product } from '@shop/models/product';
import { Section } from '@shop/models/section';
import { ProductService } from '@shop/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  product!: Product;
  formGroup: FormGroup;

  sections: Section[] = [
    { name: 'Embutidos', image: 'image' },
    { name: 'Carnes', image: 'image' },
    { name: 'Fiambres', image: 'image' },
    { name: 'Quesos', image: 'image' },
  ];

  constructor(
    private readonly productService: ProductService,
    private readonly snackbarService: SnackbarService,
    private readonly formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
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

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.findProductById(productId).subscribe((product) => {
        if (product) {
          this.product = product;
          this.formGroup.patchValue({
            name: this.product.name,
            section: this.product.section,
            price: +this.product.price,
            description: this.product.description,
            image: this.product.image,
          });
        } else {
          this.router.navigate(['/admin/products']);
        }
      });
    } else {
      this.router.navigate(['/admin/products']);
    }
  }

  updateProduct(): void {
    if (this.formGroup.valid) {
      const updateProductDto = this.buildUpdateProductDto();

      if (updateProductDto) {
        this.productService
          .updateProduct(this.product.id, updateProductDto)
          .subscribe({
            next: () => {
              this.router.navigate(['/admin/products']);
            },
            error: (error) => {
              console.log(error);
            },
          });
      } else {
        this.snackbarService.showErrorSnackbar(
          'shop.admin.dashboard.options.products.noChanges'
        );
      }
    }
  }

  private buildUpdateProductDto(): UpdateProductDto | null {
    const updateProductDto: UpdateProductDto = {};

    this.addIfChanged(
      'name',
      this.formGroup.value.name,
      this.product.name,
      updateProductDto
    );
    this.addIfChanged(
      'section',
      this.formGroup.value.section,
      this.product.section,
      updateProductDto
    );
    this.addIfChanged(
      'price',
      +this.formGroup.value.price,
      +this.product.price,
      updateProductDto
    );
    this.addIfChanged(
      'description',
      this.formGroup.value.description,
      this.product.description,
      updateProductDto
    );
    this.addIfChanged(
      'image',
      this.formGroup.value.image,
      this.product.image,
      updateProductDto
    );

    return Object.keys(updateProductDto).length > 0 ? updateProductDto : null;
  }

  private addIfChanged(
    key: keyof UpdateProductDto,
    formValue: any,
    originalValue: any,
    updateProductDto: UpdateProductDto
  ): void {
    if (formValue !== originalValue) {
      updateProductDto[key] = formValue;
    }
  }

  handleFile(file: File) {
    this.formGroup.get('image')?.setValue('/image/' + file.name);
  }
}
