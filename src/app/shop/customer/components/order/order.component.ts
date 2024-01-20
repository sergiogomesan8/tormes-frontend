import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env';
import { Order } from '@shop/models/order';
import { Product } from '@shop/models/product';
import { OrderService } from '@shop/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  order!: Order;
  isLoading: boolean = true;

  constructor(
    private readonly orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.findOrderById();
  }

  findOrderById() {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.orderService.findOrderById(orderId).subscribe((order) => {
        if (order) {
          this.order = order;
          this.isLoading = false;
        } else {
          this.router.navigate(['/cutomer/my-orders']);
        }
      });
    } else {
      this.router.navigate(['/cutomer/my-orders']);
    }
  }

  getproductImageUrl(product: Product) {
    return environment.production
      ? product.image
      : `${environment.tormes_backend_images}/products/${product.image}`;
  }
}
