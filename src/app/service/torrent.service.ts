import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { User } from '../modals/user.modal';

@Injectable({providedIn: 'root'})
export class TorrentService {
  constructor(private httpclient: HttpClient, private router: Router) {

  }

  getTorrentList() {
    return this.httpclient.get<{message: any}>('http://localhost:3000/torrent/getlist');
  }
}
