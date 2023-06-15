import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  EmailValidator,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';

// TOD0: Add confirm password validator

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
      fullName: ['', Validators.minLength(3)],
      password: ['', Validators.required],
      confirmPassword: [''],
    });
  }
  submitted = false;

  get f(): { [key: string]: AbstractControl } {
    return this.accountForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (!this.accountForm.valid) {
      return;
    }

    console.log(JSON.stringify(this.accountForm.value));
  }
  getControlError(controlName: string): ValidationErrors | null {
    return this.f[controlName].errors;
  }

  fieldErrors(
    controlName: 'fullName' | 'email' | 'password' | 'confirmPassword'
  ) {
    const errors = this.getControlError(controlName);

    if (errors !== null) {
      return Object.values(errors);
    }

    return [];
  }
}
