import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../../service/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent  implements OnInit {

pattern = /^(?=.*\d)(?=.*[^a-zA-Z\d])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
signup: FormGroup;
loading: Boolean = false;

constructor (private userService: UserService) {

}

  onSubmit() {
    if (this.signup.invalid) {
      return ;
    }
    this.loading = true;
    this.userService.addUser(this.signup);
    // this.signup.reset();
  }

  ngOnInit() {
    this.signup = new FormGroup({
      'username': new FormControl(null, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(150)]}),
      'firstname': new FormControl(null, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(150)] }),
      'lastname': new FormControl(null, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(150)] }),
      'email': new FormControl(null, { validators: [Validators.required, Validators.email] } ),
      'password': new FormControl(null, { validators: [Validators.required, Validators.pattern(this.pattern)] }),
      'confirmPassword': new FormControl(null, { validators: [Validators.required, Validators.pattern(this.pattern)]})
    });
  }

}
