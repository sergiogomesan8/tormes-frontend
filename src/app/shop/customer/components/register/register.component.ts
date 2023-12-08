import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CustomerService } from '../../../services/customer.service';
import { CreateUserDto } from '../../dtos/user.dto';
import { UserType } from '../../../models/user.model';
import { Router } from '@angular/router';

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
    public translate: TranslateService,
    public readonly formBuilder: FormBuilder,
    private readonly customerService: CustomerService,
    private readonly router: Router
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

  ngOnInit() {}

  async signin(): Promise<void> {
    if (this.formGroup.valid) {
      const createUserDto: CreateUserDto = {
        name: this.formGroup.value.name,
        email: this.formGroup.value.email,
        password: this.formGroup.value.pass,
      };

      await this.customerService.signin(createUserDto).subscribe({
        next: (result) => {
          console.log(result);
          // this.router.navigate(['/catalog']);
        },
      });
    }
  }
}
