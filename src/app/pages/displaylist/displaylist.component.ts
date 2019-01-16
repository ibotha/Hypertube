import { Component, OnInit } from '@angular/core';
import { TorrentService } from 'src/app/service/torrent.service';

@Component ({
  selector: 'app-display-list',
  templateUrl: './displaylist.component.html',
  styleUrls: ['./displaylist.component.css']
})


export class DisplayListComponent implements OnInit {
  info = [];
  loading: Boolean = true;
  constructor(private torrentService: TorrentService) {

  }

  ngOnInit() {
    this.torrentService.getTorrentList().subscribe(res => {
      this.info[0] = res;
      console.log(this.info);
      this.loading = false;
    });
  }
}
