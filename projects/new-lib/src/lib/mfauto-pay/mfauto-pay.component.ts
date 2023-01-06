import { Component, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import dummyInvestnowData from '../../../../../src/assets/mockData/dummyInvestnowData.json';

@Component({
  selector: 'app-mfauto-pay',
  templateUrl: './mfauto-pay.component.html',
  styleUrls: ['./mfauto-pay.component.scss'],
})
export class MFAutoPayComponent implements OnInit {
  imageList: any;
  x = dummyInvestnowData;

  constructor(private allConfigDataService:AllConfigDataService) { }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
  }
  dismiss(){
    
  }

}
