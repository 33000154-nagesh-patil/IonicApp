import { CommonFunctionService } from './../../../../projects/core/src/lib/services/common-function.service';
import { SubBrandPopUpComponent } from './../sub-brand-pop-up/sub-brand-pop-up.component';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Clipboard} from '@angular/cdk/clipboard'
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'lib-all-rewards',
  templateUrl: './all-rewards.component.html',
  styleUrls: ['./all-rewards.component.scss'],
})
export class AllRewardsComponent implements OnInit {

  notificationDataToday = [];
  cashBackCard:boolean;
  imageList: any;
  buttonText: any;
  allRewardsCards: any;
  cssSize:any;
  data: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  headerData: any;
  tabName: any = "All types";

  constructor(private commonFunctionService:CommonFunctionService,private modalCtrl:ModalController, private clipboard: Clipboard,private allConfigDataService: AllConfigDataService, private http: HttpClient,private location:Location ) {
    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Engagement/EngagementTorusClub';
  }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
    this.headerData = this.commonFunctionService.getClubHeader();
    let params ={
      "TokenId":"bbbbbbbcccc"
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getStatus + "?torusRewards",params).subscribe(
      (data: any) => {
        this.buttonText = data.allrewardsbtn;
        this.allRewardsCards = data.allrewardscarddata;
      })
  }


  onTabClick(e) {
    this.tabName = e;
    let params ={
      "TokenId":"bbbbbbbcccc",
      "CardType": e
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getStatus + "?torusRewards",params).subscribe(
      (data: any) => {
        this.buttonText = data.allrewardsbtn;
        this.allRewardsCards = data.allrewardscarddata;
      })
  }


  goBack(){
    this.location.back()
  }


  copyCardCode(cardCode){
this.clipboard.copy(cardCode)
  }

  async openSubBrandPopUp(data){
    if (data.cardType=='cashBack') {
      this.cssSize='cashBack-modal'
    }else{
this.cssSize='all-brands-modal'
    }

    const modal = await this.modalCtrl.create({
      component: SubBrandPopUpComponent,
      cssClass: this.cssSize,
      componentProps:{
        'allData':data
      },
      backdropDismiss: true
    });
    modal.onDidDismiss()
      .then((data) => {

      });
    return await modal.present();
 }

}

