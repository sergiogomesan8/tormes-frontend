import { Component, OnInit } from '@angular/core';
import { Product } from '@shop/models/product';
import { ProductService } from '@shop/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  displayedColumns = ['ID', 'Name', 'Price', 'Section'];

  constructor(private readonly productService: ProductService) {}

  ngOnInit() {
    this.findAllProducts();
  }

  findAllProducts() {
    this.productService.findAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  delete(product: Product): void {
    this.productService.delete(product).subscribe({
      next: () => {
        this.findAllProducts();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  update(product: Product): void {
    this.productService.update(product).subscribe({
      next: () => {
        this.findAllProducts();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
