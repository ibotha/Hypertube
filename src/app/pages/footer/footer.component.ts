import { Component, OnInit } from '@angular/core';

import { DynamicScriptLoaderService } from '../../service/jsLoader.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {
  copyright = 'iBotha, jDorner, jWolf, mMacdona';

  constructor(private jsLoader: DynamicScriptLoaderService) {

  }

  ngOnInit() {
    this.jsLoader.load('googlestuff', 'loadstuff', 'jQuery').then(dat => {}).catch(err => {});
  }
}
