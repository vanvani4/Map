import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { AuthenticationService } from '../../guard/authentication.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  user: User = new User('', '');
  loginForm: FormGroup;

  formErrors = {
    login: '',
    password: ''
  };

  validationMessages = {
    login: {
      required: 'Field login can not be empty'
    },
    password: {
      required: 'Field password can not be empty',
      minlength: 'Password must be at least 6 characters long'
    }
  };


  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginForm.valueChanges.subscribe(data => this.valueChanged(data));
  }

  valueChanged(data) {
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = this.loginForm.get(field);
      if (control.dirty) {
        for (const key in control.errors) {
          this.formErrors[field] = this.validationMessages[field][key];
        }
      }
    }
  }

  log(loginForm) {
    this.authenticationService.login(this.loginForm.value.login, this.loginForm.value.password)
      .subscribe(
        data => {
          this.router.navigate(['main']);
        }
      );
  }
}
