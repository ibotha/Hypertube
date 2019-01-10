import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent  implements OnInit {

pattern = /^(?=.*\d)(?=.*[^a-zA-Z\d])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
signup: FormGroup;

  ngOnInit() {
    this.signup = new FormGroup({
      'firstname': new FormControl(null, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(150)] }),
      'lastname': new FormControl(null, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(150)] }),
      'email': new FormControl(null, { validators: [Validators.required, Validators.email] } ),
      'password': new FormControl(null, { validators: [Validators.required, Validators.pattern(this.pattern)] }),
      'confirm-password': new FormControl(null, { validators: [Validators.required, Validators.pattern(this.pattern)]})
    });
  }

}
