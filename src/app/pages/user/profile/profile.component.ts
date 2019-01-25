import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../../../modals/user.modal';
import { UserService } from '../../../service/user.service';


@Component ({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent  implements OnInit {
  parsed;
  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getUser().subscribe(res => {
      console.log(res);
      this.parsed = res;
    });
  }

}
