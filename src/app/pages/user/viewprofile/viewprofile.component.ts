import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../../../modals/user.modal';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute } from '@angular/router';


@Component ({
  selector: 'app-view-profile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})


export class ViewProfileComponent  implements OnInit {
  parsed: String = '';
  constructor(private userService: UserService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    let id: String = '';
    this.route.queryParams.subscribe(res => {
      id = res['id'];
    });
    this.userService.getUserById(id).subscribe(res => {
      this.parsed = res['user'];
    });
  }

}
