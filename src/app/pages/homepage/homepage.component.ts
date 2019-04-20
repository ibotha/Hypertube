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
  idAvail: boolean = false;
  torrent: Torrent;
  started: boolean = false;
  ID: string;

  constructor(private jsLoader: DynamicScriptLoaderService, private route: ActivatedRoute, private torService: TorrentService) {
    this.route.queryParams.subscribe(parm => {
      this.ID = parm['ID'].toLowerCase();
      this.searchDownload();
    })
  }

  searchDownload()
  {
    if (this.ID)
    {
      this.torService.isDownloaded(this.ID).subscribe(complete => {
        //console.log(complete);
        if (complete)
        {
          this.torrent = complete;
          if (this.torrent)
          {
            if (this.torrent.status == "COMPLETE" || this.torrent.status == "READY")
            {
              this.idAvail = true;
              this.torId = "http://localhost:3001/torrent/stream/" + complete.movieID
            }
            else if (this.torrent.status == "STARTED")
            {
              this.idAvail = false
              this.started = true;
              setInterval(() => this.searchDownload(), 100000);
            }else
              this.idAvail = false;
          }
          else
            this.idAvail = false;
        }
      })
    }
  }

  ngOnInit() {
    this.jsLoader.loadScript('videoerror');
  }
}
