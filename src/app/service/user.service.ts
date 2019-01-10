import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../modals/user.modal';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private httpclient: HttpClient, private router: Router) {

  }

  addUser(user: FormGroup) {
    this.httpclient.post<{message: string}>('http://localhost:3000/user/create', user.value).subscribe(responsedata => {
      this.router.navigate(['/login']);
    });
  }

  loginUser(user: FormGroup) {
    this.httpclient.post<{message: string}>('http://localhost:3000/user/login', user.value).subscribe(responsedata => {
      this.router.navigate(['/signup']);
    });
  }
}
