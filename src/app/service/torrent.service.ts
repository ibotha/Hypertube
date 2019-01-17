import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { User } from '../modals/user.modal';

@Injectable({providedIn: 'root'})
export class TorrentService {
  constructor(private httpclient: HttpClient, private router: Router) {

  }

  getTorrentYTSList(limit: number) {
    return this.httpclient.get<{res: JSON}>('http://localhost:3000/torrent/getlist?limit=' + limit);
  }

  getTorrentARCHIVEList() {
    return this.httpclient.get<{res: JSON}>('http://localhost:3000/torrent/getarchive');
  }
}
