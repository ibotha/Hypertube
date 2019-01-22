import { Component, OnInit, NgModule } from '@angular/core';
import { TorrentService } from 'src/app/service/torrent.service';
import { Torrent } from 'src/app/modals/torrent.modal';
import { MatChipsModule, PageEvent } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  imports: [MatChipsModule]
})

@Component ({
  selector: 'app-display-list-yts',
  templateUrl: './displaylistyts.component.html',
  styleUrls: ['./displaylistyts.component.css']
})


export class DisplayListYTSComponent implements OnInit {
  loading: Boolean = false;
  searching: Boolean = false;
  unexpected: Boolean = false;
  totalPosts = 0;
  currPage = 1;
  postPerPage = 5;
  pageSizeOptions = [1, 5, 10, 15, 20];
  query: String;
  sort: String;
  errmsg: String;
  sortBy = ['Title', 'Year', 'Rating', 'Peers', 'Seeds', 'Download Count', 'Like Count', 'Date Added'];
  info;
  data: JSON;
  search: FormGroup;
  constructor(private torrentService: TorrentService, private router: Router, private route: ActivatedRoute,
    public domSanintizer: DomSanitizer) {

  }

  onSubmit() {
    if (this.query !== this.search.value.query_term || this.search.value.sort !== this.sort) {
      this.searching = true;
      this.loading = true;
      this.unexpected = false;
      this.router.navigate(['/listyts'], { queryParams: { query: this.search.value.query_term, sort: this.search.value.sort } });
      this.ft_search();
    }
  }

  onChanged(pageData: PageEvent) {
    this.ft_search();
  }

  ft_search(): void {
    if (!this.searching) {
      this.searching = true;
      this.route.queryParams.subscribe(query_term => {
        this.query = query_term['query'];
        this.sort = query_term['sort'];
        this.loading = true;
        this.torrentService.getTorrentYTSList(this.postPerPage, this.currPage, this.query, this.search.value.sort).subscribe(res => {
          this.info = res;
          if (this.info === JSON) {
            this.data = JSON.parse(this.info);
            if (this.data['data']['movies']) {
              this.data['data']['movies'].forEach(element => {
                console.log(element);
                if (element === 'yt_trailer_code') {
                  element = 'https://www.youtube.com/embed/' + element;
                  console.log(element);
                }
              });
            }
            this.loading = false;
            this.totalPosts = this.data['data']['movie_count'];
          } else {
            this.unexpected = true;
            this.loading = false;
            this.data = JSON.parse(JSON.stringify(''));
            this.searching = false;
          }
        });
      });
    }
  }

  ngOnInit() {
    this.search = new FormGroup({
      'query_term': new FormControl(null, {}),
      'sort': new FormControl(null, {})
    });
    this.ft_search();
  }
}
