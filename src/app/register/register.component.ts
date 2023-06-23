import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NewUserFormValue } from '../types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onSubmit(value: NewUserFormValue) {
    this.authService.register(value);
  }
}
