import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from 'src/app/service/jsLoader.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomePageComponent implements OnInit {

  constructor(private jsLoader: DynamicScriptLoaderService) {}

  ngOnInit() {
    this.jsLoader.loadScript('videoerror');
  }
}
