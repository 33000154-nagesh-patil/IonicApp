import { Component, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
// import { AllConfigDataService } from '../../services/all-config-data.service';

@Component({
  selector: 'lib-digital-sign',
  templateUrl: './digital-sign.component.html',
  styleUrls: ['./digital-sign.component.scss'],
})
export class DigitalSignComponent implements OnInit {
  imageList: any;

  constructor(private allConfigDataService: AllConfigDataService) { }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
  }

}
