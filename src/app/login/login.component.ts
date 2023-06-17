import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserCredentials } from '../types';

type FieldName = 'email' | 'password';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    console.debug('Initialized');
  }

  winningError(fieldName: FieldName) {
    const errors: string[] = [];
    const controlErrors = this.form.controls[fieldName].errors;

    if (controlErrors !== null) {
      const errorList = Object.keys(controlErrors);

      errorList.forEach((errorKey) => {
        switch (errorKey) {
          case 'required': {
            return errors.push('Required!');
          }

          default: {
            return errors;
          }
        }
      });

      return errors;
    }

    return errors;
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.authService.login(this.form.value as UserCredentials);
  }
}
