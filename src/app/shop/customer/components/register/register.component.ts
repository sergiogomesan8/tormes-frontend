import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CreateUserDto } from '../../dtos/user.dto';
import { AuthenticationService } from '@core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
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
      name: ['', [Validators.required]],
      // lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required]],
      passConfirmation: ['', [Validators.required]],
      // phoneNumber: ['', [Validators.required]],
      // deliveryAddress: ['', [Validators.required]],
      // billingAddress: ['', [Validators.required]],
      // postalCode: ['', [Validators.required]],
      // gender: ['', [Validators.required]],
      // birthdate: ['', [Validators.required]],
    });
  }

  signin() {
    if (this.formGroup.valid) {
      const createUserDto: CreateUserDto = {
        name: this.formGroup.value.name,
        email: this.formGroup.value.email,
        password: this.formGroup.value.pass,
      };

      this.authenticationService.signin(createUserDto).subscribe({
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
