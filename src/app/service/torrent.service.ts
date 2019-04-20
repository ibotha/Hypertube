import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class TorrentService {
  constructor(private httpclient: HttpClient, private router: Router) {

  }

  isDownloaded(hash: String) {
    console.log("Searching " + hash);
    return this.httpclient.get<{}>('http://localhost:3000/torrent/isAvailible/' + hash)
  }

  download(hash: String) {
    const body = {
      torrentLink: hash
    }
    console.log(body);
    this.httpclient.post<{}>('http://localhost:3001/torrent/download/', body).subscribe(res => {
      console.log(res);
    })
  }

  getTorrentYTSList(limit: number, page: number, query_term: String, sort: String) {
    return this.httpclient.get<{res: JSON}>('http://localhost:3000/torrent/getlist?limit='
      + limit + '&page=' + page + '&query_term=' + query_term + '&sort=' + sort);
  }

  getTorrentARCHIVEList() {
    return this.httpclient.get<{res: JSON}>('http://localhost:3000/torrent/getarchive');
  }
}
