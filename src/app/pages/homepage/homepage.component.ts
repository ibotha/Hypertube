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
  constructor(private jsLoader: DynamicScriptLoaderService, private route: ActivatedRoute) {
      this.route.queryParams.subscribe(parm => {
        console.log(parm);
        this.torId = "http://localhost:3001/torrent/stream/" + parm['ID']
      })
  }

  ngOnInit() {
    this.jsLoader.loadScript('videoerror');
  }
}
