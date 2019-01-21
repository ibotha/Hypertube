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
  parsed: String = '';
  searching: Boolean = false;
  query: String;
  search: FormGroup;
  constructor(private userService: UserService, private router: Router, private display: DisplayListYTSComponent) {
  }

  onSubmit() {
    this.query = (this.search.value.query_term) ? this.search.value.query_term : '';
    this.router.navigate(['/listyts'], { queryParams: { query: this.query } });
    this.display.loading = true;
    this.display.ngOnInit();
  }


  onYTSClick() {
    this.searching = !this.searching;
  }

  ngOnInit() {
    this.search = new FormGroup({
      'query_term': new FormControl(null, {})
    });
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
