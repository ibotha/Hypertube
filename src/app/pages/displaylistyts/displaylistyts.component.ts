import { Component, OnInit } from '@angular/core';
import { TorrentService } from 'src/app/service/torrent.service';
import { Torrent } from 'src/app/modals/torrent.modal';

@Component ({
  selector: 'app-display-list-yts',
  templateUrl: './displaylistyts.component.html',
  styleUrls: ['./displaylistyts.component.css']
})


export class DisplayListYTSComponent implements OnInit {
  loading: Boolean = true;
  info;
  data: JSON;
  constructor(private torrentService: TorrentService) {

  }

  ngOnInit() {
    this.torrentService.getTorrentYTSList(5).subscribe(res => {
      this.info = res;
      this.data = JSON.parse(this.info);
      this.loading = false;
    });
  }
}
