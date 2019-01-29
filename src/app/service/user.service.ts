import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { User } from '../modals/user.modal';

@Injectable({providedIn: 'root'})
export class UserService {
  error: String = '';
  constructor(private httpclient: HttpClient, private router: Router) {

  }

  resendVerify(email) {
    const obj = { email: email };
    this.httpclient.post<{message: any}>('http://localhost:3000/user/resendVerify', obj,
      { withCredentials: true } ).subscribe(responsedata => {
        if (responsedata['msg'] !== 'OK') {
          this.error = responsedata['msg'];
        }
      });
  }

  getUser() {
    return this.httpclient.get<{message: any}>('http://localhost:3000/user/currUser',  { withCredentials: true });
  }

  getUserById(id: String) {
    return this.httpclient.get<{message: any}>('https://localhost:3000/user/currUser', { withCredentials: true });
  }

  addUser(user: FormGroup) {
    this.httpclient.post<{message: string}>('http://localhost:3000/user/create', user.value, { withCredentials: true } )
    .subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  loginUser(user: User) {
    const url = 'http://localhost:3000/user/login?username=' + user.username + '&password=' + user.password;
    this.httpclient.get<{message: any}>(url, { withCredentials: true }).subscribe(responsedata => {
      const extras: NavigationExtras = {
        queryParams: {
          'msg': 'WHERE IS THE LAMB SAUCE - Gordam Ransay'
        }
      };
      responsedata['msg'] === 'OK' ? this.router.navigate(['/profile']) : this.router.navigate(['/login'], extras);
    });
  }
}
