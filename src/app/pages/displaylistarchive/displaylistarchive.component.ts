import { Component, OnInit } from '@angular/core';
import { TorrentService } from 'src/app/service/torrent.service';
import { Torrent } from 'src/app/modals/torrent.modal';


@Component ({
  selector: 'app-display-listarchive',
  templateUrl: './displaylistarchive.component.html',
  styleUrls: ['./displaylistarchive.component.css']
})


export class DisplayListArchiveComponent implements OnInit {
  loading: Boolean = true;
  info;
  data: JSON;
  constructor(private torrentService: TorrentService) {

  }

  ngOnInit() {
    this.torrentService.getTorrentARCHIVEList().subscribe(res => {
      console.log(res);
      this.info = res;
      this.data = this.info;
      this.loading = false;
    });
  }
}
