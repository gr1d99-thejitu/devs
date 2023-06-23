import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProgrammingLanguageService } from '../../../services/programming-language.service';

@Component({
  selector: 'app-new-developer',
  templateUrl: './new-developer.component.html',
  styleUrls: ['./new-developer.component.scss'],
})
export class NewDeveloperComponent implements OnInit, OnChanges {
  canCreateNewUser = false;

  form = this.formBuilder.group({
    createUser: [false],
    user: this.formBuilder.group({
      existingUser: ['', Validators.required],
      fullNames: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
    }),
    developer: this.formBuilder.group({
      title: ['', Validators.required],
      skills: [''],
      activateAccount: [false],
    }),
  });

  constructor(
    private formBuilder: FormBuilder,
    private programmingLanguagesService: ProgrammingLanguageService
  ) {}

  ngOnInit() {
    this.form.controls.createUser.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.canCreateNewUser = value;

        this.updateValidators();
      }
    });
  }

  updateValidators() {
    if (this.canCreateNewUser) {
      this.form.controls.user.controls.existingUser.removeValidators(
        Validators.required
      );
    } else {
      this.form.controls.user.controls.fullNames.removeValidators(
        Validators.required
      );
      this.form.controls.user.controls.email.removeValidators([
        Validators.required,
        Validators.email,
      ]);
    }
  }

  ngOnChanges() {}

  onSubmit() {
    console.log(this.form.value);
  }
}
