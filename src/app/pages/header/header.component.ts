import { Component, OnInit, Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { DisplayListYTSComponent } from '../displaylistyts/displaylistyts.component';

@Component ({
  providers: [ DisplayListYTSComponent ],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

@Injectable({providedIn: 'root'})
export class HeaderComponent implements OnInit {
  title: String = 'Hyperest of the Hypertoobes&trade;';
  parsed;
  preparsed;
  constructor(private userService: UserService, private router: Router) {
  }

  checkLogin(): void {
    this.userService.getUser().subscribe(res => {
      this.preparsed = res;
      this.parsed = (this.preparsed) ? res : null;
    });
  }

  ngOnInit() {
  this.router.events.subscribe((thing) => {
      if (thing instanceof NavigationEnd) {
          this.checkLogin();
      }
    });
  }
}
