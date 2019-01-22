import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/modals/user.modal';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  pattern = /^(?=.*\d)(?=.*[^a-zA-Z\d])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  loginform: FormGroup;
  msg = '';
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {

  }

  onSubmit() {
    const U: User = {
      username: this.loginform.value.username,
      firstname: '',
      lastname: '',
      email: this.loginform.value.email,
      password: this.loginform.value.password
    };
    this.userService.loginUser(U);
  }

  ngOnInit() {
    this.loginform = new FormGroup({
      'email': new FormControl(null, { validators: [Validators.required, Validators.email] } ),
      'password': new FormControl(null, { validators: [Validators.required, Validators.pattern(this.pattern)]})
    });
    this.route.queryParams.subscribe(res => {
      this.msg = res['msg'];
    });
  }
}
