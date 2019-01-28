import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class TorrentService {
  constructor(private httpclient: HttpClient, private router: Router) {

  }

  getTorrentYTSList(limit: number, page: number, query_term: String, sort: String) {
    return this.httpclient.get<{res: JSON}>('http://localhost:3000/torrent/getlist?limit='
      + limit + '&page=' + page + '&query_term=' + query_term + '&sort=' + sort);
  }

  getTorrentARCHIVEList() {
    return this.httpclient.get<{res: JSON}>('http://localhost:3000/torrent/getarchive');
  }
}
