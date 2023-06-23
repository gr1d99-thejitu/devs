import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProgrammingLanguageService } from '../../../services/programming-language.service';

@Component({
  selector: 'app-new-developer',
  templateUrl: './new-developer.component.html',
  styleUrls: ['./new-developer.component.scss'],
})
export class NewDeveloperComponent implements OnInit {
  form = this.formBuilder.group({
    createUser: [false],
    user: this.formBuilder.group({
      fullNames: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
    }),
    developer: this.formBuilder.group({
      title: ['', Validators.required],
      skills: [''],
    }),
  });

  constructor(
    private formBuilder: FormBuilder,
    private programmingLanguagesService: ProgrammingLanguageService
  ) {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.form.value);
  }
}
