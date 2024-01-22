import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableColumn } from '@shared/models/tableColumn';
import { Product } from '@shop/models/product';
import { ProductService } from '@shop/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  displayedColumns: TableColumn[] = [
    {
      id: 'name',
      name: 'Name',
    },
    {
      id: 'prices',
      name: 'Price',
    },
    {
      id: 'section',
      name: 'Section',
    },
  ];

  constructor(
    private readonly productService: ProductService,
    private router: Router
  ) {}

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
  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product).subscribe({
      next: () => {
        this.findAllProducts();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateProduct(product: Product): void {
    this.router.navigate(['/admin/products/update-product', product.id]);
  }
}
