import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthenticationService } from './services/authentication.service';
import { HttpService } from './services/http-service.service';
import { RoleGuardService } from './guards/role-guard.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    AuthenticationService,
    HttpService,
    RoleGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  declarations: [],
  exports: [],
})
export class CoreModule {}
