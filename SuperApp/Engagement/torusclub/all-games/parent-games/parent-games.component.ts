import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService, CommonService } from 'index';
import { CommonFunctionService } from 'index';
import { SubBrandPopUpComponent } from '../../sub-brand-pop-up/sub-brand-pop-up.component';


@Component({
  selector: 'lib-parent-games',
  templateUrl: './parent-games.component.html',
  styleUrls: ['./parent-games.component.scss'],
})
export class ParentGamesComponent implements OnInit {
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  val: any;
  imageList: any;
  getCardDetails:any
  cardTypeDet:any;
  slideValue:any;
  popupcss: boolean = false;
  RedeemPrizeData: any;
  redeem: any;
  animeRot: any;
  headerData: any;
  coins: any;
  title: any;
  prize: any;
  error: any;

  constructor(private modalCtrl:ModalController,private location:Location, private route:Router,private allconfig:AllConfigDataService,private commonFunctionService:CommonFunctionService, private http:HttpClient,private common:CommonService) {
    this.apiCatalog={
      ...this.allconfig.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allconfig.getConfig('environmentType');
    this.breadCrumb='Engagement/EngagementTorusClub';
   }


  ngOnInit() {
    this.getCardDetails=this.commonFunctionService.getClubCard()
    this.headerData = this.commonFunctionService.getClubHeader()
    this.imageList=this.allconfig.getConfig('images')
    this.cardTypeDet=this.getCardDetails.cardType
    this.title = this.cardTypeDet.toLowerCase()
    this.coins = this.headerData.coins;
  }
  goBack(){
    this.location.back()
  }
  getAllSlideValue(e){

    this.redeem = e.reward.torusReedem;
    this.slideValue=e.spinOn;
    this.error = e.error;
    this.RedeemPrizeData = e.reward;
    this.prize = this.RedeemPrizeData.prize;
    if(this.slideValue == "100") {
      if(this.prize.includes('coins')){
        console.log('coins')
      }else {
        setTimeout(() => {
          this.opnReferPopUp(this.redeem);
        },1500)
      }

    }else if(this.slideValue == 'spinned'){
      setTimeout(() => {
         this.animeRot = '100'
      },3000)
      if(this.prize.includes('coins')){
        console.log('coins')
     }else {
      setTimeout(() => {
        this.opnReferPopUp(this.redeem);
      },5000)
     }
    }else if(this.slideValue == 'jackpot'){
      setTimeout(() => {
        this.animeRot = '100'
     },2800)
     if(this.prize.includes('coins')){
      console.log('coins')
     }else {
      setTimeout(() => {
        this.opnReferPopUp(this.redeem);
      },7900)
     }
    }
  }

  getAllSlideValues(e){
    this.slideValue=e.spinOn
    this.RedeemPrizeData = e.reward;
    this.prize = this.RedeemPrizeData.prize;
    this.redeem = e.torusReedem;
    if(this.slideValue == '100') {
      if(this.prize.includes('coins')){
         console.log('coins')
    }else {
      setTimeout(() => {
        this.opnReferPopUpCash(this.redeem);
      },1800)
    }

    }
  }

  async opnReferPopUp(e){
    const modal = await this.modalCtrl.create({
      component: SubBrandPopUpComponent,
      cssClass: 'all-brands-modalerWin',
      componentProps:{
        'redeemData': e
      },
      backdropDismiss: true
    });
    modal.onDidDismiss()
      .then((data) => {

      });
    return await modal.present();
  }

  async opnReferPopUpCash(e){
    this.popupcss =true;
    const modal = await this.modalCtrl.create({
      component: SubBrandPopUpComponent,
      cssClass: this.popupcss ?'all-brands-modaler':'all-brands-modal',
      componentProps:{
        'redeemData': e
      },
      backdropDismiss: true
    });
    modal.onDidDismiss()
      .then((data) => {

      });
    return await modal.present();
  }

  // RedeemPrize(e) {
  //   let params = {
  //     "TokenID": "",
  //     "game": e
  //   }
  //   this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getStatus + "?torusWinnerPrize",params).subscribe(
  //     (data: any) => {
  //       if(e == 'jackPot') {
  //         this.RedeemPrizeData = data.jackPot
  //       }else if(e == 'voucher') {
  //         this.RedeemPrizeData = data.voucher
  //       }else if(e == 'gift') {
  //         this.RedeemPrizeData = data.giftBox
  //       }else if(e == 'cashBack') {
  //         this.RedeemPrizeData = data.cashBack
  //       }
  //     })
  // }
}
