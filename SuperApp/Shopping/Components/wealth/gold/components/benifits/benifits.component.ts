import { Router } from '@angular/router';
// import { AllConfigDataService } from './../../services/all-config-data.service';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-benifits',
  templateUrl: './benifits.component.html',
  styleUrls: ['./benifits.component.scss'],
})
export class BenifitsComponent implements OnInit {
  imageList: any;
  getCurrency:any;
  rupeesSymbol:any;

  constructor(private allConfigDataService: AllConfigDataService, private router: Router) { }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
    this.getCurrency=this.allConfigDataService.getConfig('listCodeCountry'); 
    this.rupeesSymbol=this.getCurrency['IND']['currencySymbol'];
  }

}
