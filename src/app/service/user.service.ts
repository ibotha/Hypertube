import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../modals/user.modal';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private httpclient: HttpClient, private router: Router) {

  }

  addUser(user: User) {
    console.log(user);
    const post = new FormData();
    post.append('firstname', user.firstname);
    post.append('lastname', user.lastname);
    post.append('email', user.email);
    post.append('password', user.password);
    console.dir(post);
    // this.httpclient.post<{message: string, user: User}>('http://localhost:3000/user/create', post).subscribe(responsedata => {
    //   this.router.navigate(['/' + responsedata]);
    // });
  }
}
