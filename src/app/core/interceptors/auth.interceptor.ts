import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from '@core/services/authentication.service';
import { AuthUser, TokenPayload } from '@core/models/auth.user';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authenticationService.getToken();
    if (!token) {
      return next.handle(request);
    }
    const decodedToken: any = jwtDecode(token);
    const expirationDate = decodedToken.exp * 1000;
    const now = new Date().getTime();

    if (now < expirationDate) {
      const requestWithToken = this.addTokenToRequest(request, token);
      return next.handle(requestWithToken);
    }
    console.log('token is expired');

    if (this.authenticationService.isRefreshingToken) {
      return next.handle(request);
    }
    return this.handleExpiredToken(request, next);
  }

  private handleExpiredToken(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authenticationService.refreshToken().pipe(
      switchMap((response: AuthUser) =>
        next.handle(this.addTokenToRequest(request, response.access_token))
      ),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  private addTokenToRequest(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
}
