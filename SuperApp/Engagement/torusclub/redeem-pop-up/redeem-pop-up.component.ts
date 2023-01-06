import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonFunctionService } from 'index';


@Component({
  selector: 'lib-redeem-pop-up',
  templateUrl: './redeem-pop-up.component.html',
  styleUrls: ['./redeem-pop-up.component.scss'],
})
export class RedeemPopUpComponent implements OnInit {
  imageList: any;
  redeemstep: any;
  redeemdetails:any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  @Input() redeemSteps:any;

  constructor(private router:Router,private http:HttpClient,private commonFunctionService:CommonFunctionService,private commonModule:CommonModule,private allConfigDataService:AllConfigDataService,private mdlctrl:ModalController) { 
    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Engagement/EngagementTorusClub';
  }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
    this.redeemstep = this.redeemSteps.redeemsteps;
    this.redeemdetails = this.redeemSteps.offerdetails; 
  }
  goBack(){
this.mdlctrl.dismiss()
  }
}
function params(arg0: string, params: any) {
  throw new Error('Function not implemented.');
}

