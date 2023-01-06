import { Component, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'lib-pledge241',
  templateUrl: './pledge241.component.html',
  styleUrls: ['./pledge241.component.scss'],
})
export class Pledge241Component implements OnInit {
  imageList: any;

  constructor(private allConfigDataService: AllConfigDataService) { }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
  }

}
