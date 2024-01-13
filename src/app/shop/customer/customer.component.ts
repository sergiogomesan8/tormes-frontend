import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/services/authentication.service';
import { User } from '@shop/models/user.model';
import { ShoppingCartService } from '@shop/services/shopping-cart.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  isLoggedIn: boolean = false;
  userInfo: User | undefined;
  sidebarExpanded = false;

  shoppingCart$ = this.shoppingCartService.shoppingCart$;

  constructor(
    private authenticationService: AuthenticationService,
    private readonly shoppingCartService: ShoppingCartService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.userInfo = this.authenticationService.getUserInfo();
    this.isLoggedIn = !!this.userInfo;
    this.shoppingCartService.getShoppingCart();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/catalog']).then(() => {
      window.location.reload();
    });
  }

  handleShoppingCart() {
    this.sidebarExpanded = !this.sidebarExpanded;
  }

  get shoppingCartItems() {
    let total = 0;
    this.shoppingCart$.subscribe((cart) => {
      cart.shoppingCartProducts.forEach((shoppingCartProduct) => {
        total += shoppingCartProduct.amount;
      });
    });
    return total;
  }
}
