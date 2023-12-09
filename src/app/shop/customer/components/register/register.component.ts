import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CreateUserDto } from '../../dtos/user.dto';
import { AuthenticationService } from '@core/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  loading: boolean = false;
  hidePass = true;

  constructor(
    private renderer: Renderer2,
    public translate: TranslateService,
    public readonly formBuilder: FormBuilder,
    private readonly authenticationService: AuthenticationService
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
  ngOnInit(): void {
    this.renderer.setStyle(
      document.body,
      'background',
      'linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(to right, #f5ac2f, #6a3c99)'
    );
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
          console.log(result);
          // this.router.navigate(['/catalog']);
        },
      });
    }
  }
}
