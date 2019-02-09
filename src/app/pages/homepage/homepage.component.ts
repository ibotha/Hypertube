import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from 'src/app/service/jsLoader.service';
import { TorrentService } from 'src/app/service/torrent.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomePageComponent implements OnInit {
  downloadInfo: FormGroup;
  constructor(private jsLoader: DynamicScriptLoaderService, private torrent: TorrentService) {
      this.downloadInfo = new FormGroup({
        'hash': new FormControl(null, {})
      });
    }

  download() : void {
    console.log('Hello');
    this.torrent.download(this.downloadInfo.get('hash').value);
  }

  ngOnInit() {
    this.jsLoader.loadScript('videoerror');
  }
}
