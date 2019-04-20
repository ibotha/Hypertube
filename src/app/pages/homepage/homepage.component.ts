import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from 'src/app/service/jsLoader.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomePageComponent implements OnInit {
  downloadInfo: FormGroup;
  torId: string;
  idAvail:  boolean = false;
  constructor(private jsLoader: DynamicScriptLoaderService, private route: ActivatedRoute) {
      this.route.queryParams.subscribe(parm => {
        if (parm['ID']) this.idAvail = true;
        this.torId = "http://localhost:3001/torrent/stream/" + parm['ID']
      })
  }

  ngOnInit() {
    this.jsLoader.loadScript('videoerror');
  }
}
