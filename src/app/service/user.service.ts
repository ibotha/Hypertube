import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../modals/login.modal';
import { Router, NavigationExtras } from '@angular/router';
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

  loginUser(user: Login) {
    const url = 'http://localhost:3000/user/login?username=' + user.email + '&password=' + user.password;
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
