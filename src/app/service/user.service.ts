import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../modals/user.modal';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private httpclient: HttpClient, private router: Router) {

  }

  getUser() {
    return this.httpclient.get<{message: any}>('http://localhost:3000/user/currUser',  { withCredentials: true });
  }

  addUser(user: FormGroup) {
    this.httpclient.post<{message: string}>('http://localhost:3000/user/create', user.value, { withCredentials: true } )
    .subscribe(responsedata => {
      console.log(responsedata);
      this.router.navigate(['/signup']);
    });
  }

  loginUser(user: FormData) {
    this.httpclient.post<any>('http://localhost:3000/user/login', user, { withCredentials: true }).subscribe(responsedata => {
      console.log(responsedata);
      responsedata['message'] === true ? this.router.navigate(['/profile']) : this.router.navigate(['/login']);
    });
  }
}
