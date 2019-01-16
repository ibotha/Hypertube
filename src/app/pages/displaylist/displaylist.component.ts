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
  info = [];
  constructor(private torrentService: TorrentService) {

  }

  ngOnInit() {
    this.torrentService.getTorrentList(1).subscribe(res => {
      this.info[0] = res;
      this.loading = false;
    });
  }
}
