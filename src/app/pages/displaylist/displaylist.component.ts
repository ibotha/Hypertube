import { Component, OnInit } from '@angular/core';
import { TorrentService } from 'src/app/service/torrent.service';
import { Torrent } from 'src/app/modals/torrent.modal';

@Component ({
  selector: 'app-display-list',
  templateUrl: './displaylist.component.html',
  styleUrls: ['./displaylist.component.css']
})


export class DisplayListComponent implements OnInit {
  loading: Boolean = true;
  info;
  data: JSON;
  constructor(private torrentService: TorrentService) {

  }

  ngOnInit() {
    this.torrentService.getTorrentList(5).subscribe(res => {
      this.info = res;
      this.data = JSON.parse(this.info);
      this.loading = false;
    });
  }
}
