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
  ID: string;
  Welcome: string = "Welcome to the Hyperest of Hypertubes&trade;, This is a student made project that does just about nothing at the moment. We wish we could tell you more.";
  Busy: string = "Your download has started, please check back if its ready, you can achieve this by refreshing your browser";
  Message: string;
  constructor(private jsLoader: DynamicScriptLoaderService, private route: ActivatedRoute, private torService: TorrentService) {
    this.route.queryParams.subscribe(parm => {
      if (parm['ID'])
      {
        this.ID = parm['ID'].toLowerCase();
        this.searchDownload();
        this.Message = this.Welcome + "<br\>" + this.Busy;
      }
      else
        this.Message = this.Welcome;
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
              this.Message = "";
              this.idAvail = true;
              clearInterval()
              this.torId = "http://localhost:3001/torrent/stream/" + complete.movieID
            }
            else if (this.torrent.status == "STARTED")
            {
              this.idAvail = false;
              this.Message = this.Welcome + "<br\>" + this.Busy;
              clearInterval()
              setInterval(() => this.searchDownload(), 5000);
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

  ngOnDestroy() {
    clearInterval()
  }
}
