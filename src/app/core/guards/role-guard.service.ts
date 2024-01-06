import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  CanActivateFn,
} from '@angular/router';
import { AuthenticationService } from '@core/services/authentication.service';
import { UserType } from '@shop/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
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

export const RoleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(RoleGuardService).canActivate(route, state);
};
