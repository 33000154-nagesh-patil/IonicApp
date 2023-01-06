import { CommonModule, Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { RedeemPopUpComponent } from '../redeem-pop-up/redeem-pop-up.component';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { HttpClient } from '@angular/common/http';
import { CommonFunctionService } from 'index';

@Component({
  selector: 'lib-sub-brand-pop-up',
  templateUrl: './sub-brand-pop-up.component.html',
  styleUrls: ['./sub-brand-pop-up.component.scss'],
})
export class SubBrandPopUpComponent implements OnInit {
  @Input() allData: any;
  imageList: any;
  redeem: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  getCardDetails:any
  objectDate: any;
  @Input() redeemData:any;
  currentDate: any;
  Date1: any;
  Date2: any;
  slideValue

  constructor(private commonFunctionService:CommonFunctionService,private commonmodule: CommonModule,private allConfigDataService: AllConfigDataService, private mdlCtrl: ModalController, private location: Location, private http:HttpClient) {
    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Engagement/EngagementTorusClub';
   }

  multipleQuestion = [
    {
      "icon": "/assets/icon/giftBlueIcon.svg",
      "question": "How to redeem"
    },
    {
      "icon": "/assets/icon/offerDetailIcon.svg",
      "question": "Offer Details"
    }
  ]
  ngOnInit() {
    this.getCardDetails=this.commonFunctionService.getClubCard();
    this.imageList = this.allConfigDataService.getConfig('images');
    this.redeem = this.redeemData.redeemcode;     
    this.objectDate = new Date();
    this.currentDate = (this.objectDate.getMonth() + "/" +  this.objectDate.getDate() + "/" + this.objectDate.getFullYear())
    this.Date1 = new Date(this.currentDate);
    this.Date2 = new Date('08/12/2023');
    const diffTime = Math.abs(this.currentDate - this.Date2);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  }


  onCancel() {
    this.mdlCtrl.dismiss()
    this.location.back()
  }
  onConfirmNo() {

  }

  async goToRedeem() {

    const modal = await this.mdlCtrl.create({
      component: RedeemPopUpComponent,
      cssClass: 'all-brands-modalerWin',
      componentProps: {
        'redeemSteps': this.redeemData
      },
      backdropDismiss: true
    });
    modal.onDidDismiss()
      .then((data) => {

      });
    return await modal.present();
  }


  
}


