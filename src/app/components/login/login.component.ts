import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

import { AuthenticationService } from '../../core/services/authentication/authentication.service'
import { User } from '../../core/models/user'

@Component({
  selector: 'app-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private _scAuthentication: AuthenticationService,
    private _formBuilder: FormBuilder
  ) {
    this.formGroup = _formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
    })
  }

  ngOnInit() {
  }

  loginUser() {
    if (this.formGroup.valid) {
      this._scAuthentication.login(
        this.formGroup.value.email,
        this.formGroup.value.password).subscribe();
    }
  }

}
