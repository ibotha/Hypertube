import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  title: String = 'Hyperest of the Hypertoobes&trade;';
  parsed: String = '';
   constructor(private userService: UserService, private router: Router) {
   }

  ngOnInit() {
    this.userService.getUser().subscribe(res => {
      this.parsed = res['passport'];
    });
    this.router.events.subscribe(() => {
      this.userService.getUser().subscribe(res => {
        this.parsed = res['passport'];
      });
    });
  }
}
