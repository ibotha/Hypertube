import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from 'src/app/service/jsLoader.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TorrentService } from 'src/app/service/torrent.service';
import { Torrent } from 'src/app/modals/torrent.modal';

@Component({
  selector: 'app-home-page',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})


export class HomePageComponent implements OnInit {
  downloadInfo: FormGroup;
  torId: string;
  idAvail:  boolean = false;
  torrent: Torrent;

  constructor(private jsLoader: DynamicScriptLoaderService, private route: ActivatedRoute, private torService: TorrentService) {
    this.route.queryParams.subscribe(parm => {
      console.log(parm)
      if (parm['ID'])
      {
        this.torService.isDownloaded(parm['ID']).subscribe(complete => {
          this.idAvail = true;
          console.log(complete);
          this.torrent = complete;
          if (this.torrent)
          {
            if (this.torrent.status == "COMPLETE")
              this.torId = "http://localhost:3001/torrent/stream/" + parm['ID']
            else
              this.idAvail = false;
            }else
              this.idAvail = false;
        })
      }
    })
  }

  ngOnInit() {
    this.jsLoader.loadScript('videoerror');
  }
}
