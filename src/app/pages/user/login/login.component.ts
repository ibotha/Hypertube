import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/modals/user.modal';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  pattern = /^(?=.*\d)(?=.*[^a-zA-Z\d])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  loginform: FormGroup;
  msg: String = '';
  goodmsg: String = '';
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private head: HeaderComponent) {

  }

  onSubmit() {
    const U: User = {
      username: this.loginform.value.username,
      firstname: '',
      lastname: '',
      email: '',
      password: this.loginform.value.password
    };
    this.userService.loginUser(U);
  }

  ngOnInit() {
    this.loginform = new FormGroup({
      'username': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] } ),
      'password': new FormControl(null, { validators: [Validators.required, Validators.pattern(this.pattern)]})
    });
    this.route.queryParams.subscribe(res => {
      if (!res['msg']) {
        this.head.checkLogin();
      }
      this.msg = res['msg'];
      this.goodmsg = res['verifymsg'];
    });
  }
}
