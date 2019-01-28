import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DisplayListYTSComponent } from '../displaylistyts/displaylistyts.component';

@Component ({
  providers: [ DisplayListYTSComponent ],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  title: String = 'Hyperest of the Hypertoobes&trade;';
  parsed;
  preparsed;
  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.userService.getUser().subscribe(res => {
        this.preparsed = res;
        this.parsed = (this.preparsed) ? res : null;
      });
    });
  }
}
