import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  pattern = /^(?=.*\d)(?=.*[^a-zA-Z\d])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  loginform: FormGroup;

  constructor(private userService: UserService) {

  }

    onSubmit() {
      this.userService.loginUser(this.loginform);
    }

    ngOnInit() {
      this.loginform = new FormGroup({
        'email': new FormControl(null, { validators: [Validators.required, Validators.email] } ),
        'password': new FormControl(null, { validators: [Validators.required, Validators.pattern(this.pattern)]})
      });
    }

  }
