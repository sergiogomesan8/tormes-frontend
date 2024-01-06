import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { LoginUserDto } from '@shop/customer/dtos/user.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formGroup: FormGroup;
  loading: boolean = false;
  hidePass = true;

  constructor(
    public translate: TranslateService,
    public readonly formBuilder: FormBuilder,
    private readonly authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required]],
    });
  }

  login() {
    if (this.formGroup.valid) {
      const loginUserDto: LoginUserDto = {
        email: this.formGroup.value.email,
        password: this.formGroup.value.pass,
      };

      this.authenticationService.login(loginUserDto).subscribe({
        next: (result) => {
          this.router.navigate(['/catalog']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
