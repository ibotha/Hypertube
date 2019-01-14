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
  links = { 'Facebook': false,
            'Twitter': false,
            '42': false,
            'Google': false,
            'Local': false
          };
  parsed = '';
  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getUser().subscribe(res => {
      console.log(res['passport']);
      this.parsed = res['passport'];
    });
  }

}
