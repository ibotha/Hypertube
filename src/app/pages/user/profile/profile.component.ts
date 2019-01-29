import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { DynamicScriptLoaderService } from 'src/app/service/jsLoader.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';



@Component ({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent  implements OnInit {
  parsed;
  editingUsernameBool: Boolean = false;
  editingEmailBool: Boolean = false;
  changePassword: Boolean = false;
  passwordInfo: FormGroup;
  userInfo: FormGroup;
  password: String = 'Testing this shit';
  pattern = /^(?=.*\d)(?=.*[^a-zA-Z\d])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  constructor(private userService: UserService, private jsLoader: DynamicScriptLoaderService) {
    this.userInfo = new FormGroup({
      'firstname': new FormControl(null, { validators: [Validators.required, Validators.minLength(2)] } ),
      'lastname': new FormControl(null, { validators: [Validators.required, Validators.minLength(2)] } ),
      'username': new FormControl(null , { validators: [Validators.minLength(3), Validators.required] }),
      'email': new FormControl(null, { validators: [Validators.required, Validators.email] })
    });
    this.passwordInfo = new FormGroup({
      'oldPassword': new FormControl(null, { validators: [Validators.required, Validators.pattern(this.pattern)] } ),
      'newPassword': new FormControl(null, { validators: [Validators.required, Validators.pattern(this.pattern)] } ),
      'confirmPassowrd': new FormControl(null, { validators: [Validators.required, Validators.pattern(this.pattern) ] } )
    });
  }

  showPass(value): void {
    this.changePassword = value;
  }

  editingUsername(value: Boolean): void {
    this.editingUsernameBool = value;
  }

  editingEmail(value: Boolean): void {
    this.editingEmailBool = value;
  }

  ngOnInit() {
    this.userService.getUser().subscribe(res => {
      this.parsed = res;
      this.jsLoader.loadScript('profilepicture');
    });
  }

}
