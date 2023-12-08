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
    console.log('Entrando en signin()');

    if (this.formGroup.valid) {
      console.log('Formulario válido');

      const createUserDto: CreateUserDto = {
        name: this.formGroup.value.name,
        email: this.formGroup.value.email,
        password: this.formGroup.value.pass,
        userType: UserType.customer,
      };

      try {
        console.log('Intentando registrar usuario');
        await this.customerService.signin(createUserDto);

        this.router.navigate(['/catalog']);

        console.log('Usuario registrado exitosamente');
      } catch (error) {
        console.error('Error al registrar el usuario', error);
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}
