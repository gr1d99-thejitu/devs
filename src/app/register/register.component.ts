import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../types';
import { Router } from '@angular/router';

// TOD0: Add confirm password validator

type FieldName = 'full_names' | 'email' | 'password' | 'confirm_password';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  accountForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    full_names: new FormControl('', Validators.minLength(3)),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl(''),
  });

  ngOnInit() {
    this.accountForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      full_names: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: [''],
    });
  }
  submitted = false;

  get f(): {
    [key in FieldName]: AbstractControl;
  } {
    return this.accountForm.controls;
  }

  winningError(fieldName: FieldName) {
    const errors: string[] = [];
    const controlErrors = this.f[fieldName].errors;

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
    this.submitted = true;

    if (!this.accountForm.valid) {
      return;
    }

    this.authService.register(this.accountForm.value as User).subscribe(() => {
      return this.router.navigate(['/login']);
    });
  }
  getControlError(controlName: FieldName): ValidationErrors | null {
    return this.f[controlName as FieldName].errors;
  }

  fieldErrors(controlName: FieldName) {
    const errors = this.getControlError(controlName);

    if (errors !== null) {
      return Object.values(errors);
    }

    return [];
  }

  errorMessage(error: { [key: string]: string }): string {
    const errors = Object.values(error);
    console.log(errors, error);
    return errors[0];
  }
}
