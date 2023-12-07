import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/authentication.service';

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
    public readonly formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required]],
      passConfirmation: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  async signin(): Promise<void> {
    const result = this.authenticationService.signin(this.formGroup.value);
    console.log(result);
  }
}
