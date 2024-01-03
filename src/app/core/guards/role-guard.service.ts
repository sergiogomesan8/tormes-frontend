import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '@core/services/authentication.service';
import { UserType } from '@shop/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: UserType[] = route.data['roles'];

    const userInfo = this.auth.getUserInfo();

    if (userInfo) {
      const userRole: UserType | undefined = userInfo.userType;

      if (userRole) {
        if (expectedRoles.includes(userRole)) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      } else {
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
