import { Component, OnInit } from '@angular/core';
import { TorrentService } from 'src/app/service/torrent.service';
import { DomSanitizer } from '@angular/platform-browser';



@Component ({
  selector: 'app-display-listarchive',
  templateUrl: './displaylistarchive.component.html',
  styleUrls: ['./displaylistarchive.component.css']
})


export class DisplayListArchiveComponent implements OnInit {
  loading: Boolean = true;
  info;
  data: JSON;
  constructor(private torrentService: TorrentService, public domSanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.torrentService.getTorrentARCHIVEList().subscribe(res => {
      this.info = res;
      this.data = this.info;
      this.data['items'].forEach(element => {
        if (element['content']) {
          const regex = '/<+/gm';
          element['content'] = element['content'].replace(regex, '&lt');
        }
      });
      this.loading = false;
    });
  }
}
