import { Component, OnInit, NgModule } from '@angular/core';
import { TorrentService } from 'src/app/service/torrent.service';
import { Torrent } from 'src/app/modals/torrent.modal';
import { MatChipsModule, PageEvent } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@NgModule({
  imports: [MatChipsModule]
})

@Component ({
  selector: 'app-display-list-yts',
  templateUrl: './displaylistyts.component.html',
  styleUrls: ['./displaylistyts.component.css']
})


export class DisplayListYTSComponent implements OnInit {
  loading: Boolean = true;
  totalPosts = 0;
  currPage = 1;
  postPerPage = 5;
  pageSizeOptions = [1, 5, 10, 15, 20];
  query: String;
  sortBy = ['title', 'year', 'rating', 'peers', 'seeds', 'download_count', 'like_count', 'date_added'];
  info;
  data: JSON;
  search: FormGroup;
  constructor(private torrentService: TorrentService, private router: Router, private route: ActivatedRoute) {

  }

  onSubmit() {
    if (this.query !== this.search.value.query_term) {
      this.loading = true;
      this.router.navigate(['/listyts'], { queryParams: { query: this.search.value.query_term } });
    }
  }

  onChanged(pageData: PageEvent) {
    this.route.queryParams.subscribe(query_term => {
      this.query = query_term['query'];
      this.loading = true;
      this.currPage = pageData.pageIndex + 1;
      this.postPerPage = pageData.pageSize;
      this.torrentService.getTorrentYTSList(this.postPerPage, this.currPage, this.query, 'download_count').subscribe(res => {
        this.info = res;
        this.data = JSON.parse(this.info);
        this.loading = false;
        this.totalPosts = this.data['data']['movie_count'];
      });
    });
  }

  ngOnInit() {
    this.loading = true;
    this.search = new FormGroup({
      'query_term': new FormControl(null, {})
    });
    this.route.queryParams.subscribe(query_term => {
      this.query = query_term['query'];
      this.torrentService.getTorrentYTSList(5, 1, (this.query) ? this.query : '', 'download_count').subscribe(res => {
        this.info = res;
        this.data = JSON.parse(this.info);
        this.loading = false;
        this.totalPosts = this.data['data']['movie_count'];
      });
   });
  }
}
