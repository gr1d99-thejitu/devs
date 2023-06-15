import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

// TOD0: Add confirm password validator

type FieldName = 'fullName' | 'email' | 'password' | 'confirmPassword';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  accountForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    fullName: new FormControl('', Validators.minLength(3)),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl(''),
  });

  ngOnInit() {
    this.accountForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      fullName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: [''],
    });
  }
  submitted = false;

  get f(): {
    [key in FieldName]: AbstractControl;
  } {
    return this.accountForm.controls;
  }

  winningError(fieldName: FieldName) {
    let errors: string[] = [];
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

    console.log(JSON.stringify(this.accountForm.value));
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
