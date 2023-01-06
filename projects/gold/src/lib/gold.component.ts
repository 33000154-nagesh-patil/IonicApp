import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { Router } from '@angular/router';
@Component({
  selector: 'lib-gold',
  templateUrl: './gold.component.html',
  styleUrls: ['./gold.component.scss'],
})
export class GoldComponent implements OnInit {
@Input() imageList:any;
@Input() errorList:any;
@Input() investmentStatus:any;
@Input() currentMoneySymbols:any;
@Input() goldData:any;
@Input() silverData:any;
@Input() goldSilverData:any;
@Input() currentDigiDataOrderList:any;
  constructor(private commonService:CommonService, private router:Router) { }

  ngOnInit() {
    this.commonService.setProductData({productDetails:[],currentModule:'Gold'});
  }

  reDirectToInvestMentPage(type){
    this.commonService.setDigiType(type);
    this.router.navigate(['/InvestmentDetails']);
  }

}
