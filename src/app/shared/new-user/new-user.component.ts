import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewUserFormValue } from '../../types';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent {
  @Input('submit') submit!: (value: NewUserFormValue) => void;

  @Output() onSubmitNotify: EventEmitter<NewUserFormValue> =
    new EventEmitter<NewUserFormValue>();

  submitted = false;

  constructor() {}

  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    full_names: new FormControl('', Validators.minLength(3)),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl(''),
  });

  onSubmit() {
    this.submitted = true;

    if (!this.form.valid) {
      return;
    }

    this.onSubmitNotify.emit(this.form.value as NewUserFormValue);
  }
}
