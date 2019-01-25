import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { DynamicScriptLoaderService } from 'src/app/service/jsLoader.service';



@Component ({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent  implements OnInit {
  parsed;
  constructor(private userService: UserService, private jsLoader: DynamicScriptLoaderService) {

  }

  ngOnInit() {
    this.userService.getUser().subscribe(res => {
      console.log(res);
      this.parsed = res;
    });
    this.jsLoader.loadScript('profilepicture');
  }

}
