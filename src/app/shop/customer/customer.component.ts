import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/services/authentication.service';
import { User } from '@shop/models/user.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {
  isLoggedIn: boolean = false;
  userInfo: User | undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.userInfo = this.authenticationService.getUserInfo();
    this.isLoggedIn = !!this.userInfo;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/catalog']).then(() => {
      window.location.reload();
    });
  }
}
