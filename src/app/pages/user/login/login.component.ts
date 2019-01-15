import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Login } from 'src/app/modals/login.modal';
import { Router, ActivatedRoute } from '@angular/router';


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
      const lU: Login = {
        email: this.loginform.value.email,
        password: this.loginform.value.password
      };
      this.userService.loginUser(lU);
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
