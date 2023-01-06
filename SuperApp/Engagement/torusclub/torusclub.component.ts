import { Component, OnInit } from '@angular/core';
import { AllBrandPopUpComponent } from '../torusclub/all-brand-pop-up/all-brand-pop-up.component';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CommonFunctionService } from 'index';
//import torusClubDashBoard from '../torusClubDashBoard.json'
import { Location } from '@angular/common';
import getStatus from '../getStatus.json'
// import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { ReferNowPopUpComponent } from '../torusclub/refer-now-pop-up/refer-now-pop-up.component';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { HttpClient } from '@angular/common/http';
import { ReferContactsComponent } from './refer-contacts/refer-contacts.component';

@Component({
  selector: 'lib-torusclub',
  templateUrl: './torusclub.component.html',
  styleUrls: ['./torusclub.component.scss'],
})
export class TorusclubComponent implements OnInit {
    rewards:any;
    Header:any;
    apiCatalog: any;
    appEnviron: any;
    breadCrumb: string;
    tabName: any = "All";
    gamesDetail: any;
    scrollTitles: any;
    file: any;
    coins: any;

  constructor(private router:Router,private commonFunctionService:CommonFunctionService,private location:Location,private modalCtrl:ModalController,private allConfigDataService: AllConfigDataService,private http:HttpClient) {
    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Engagement/EngagementTorusClub';
   }

  ngOnInit() {
    this.getData();
  }

  getData() {

    let params =
    {
      "TokenId": "rd2+KoNXWty+hUCQ1Pmp6k7TfnWMmyJQfXN8XhwdVQaI3+JlFsGL64nMOFT6JwipG5K2AGqd5UCzOjCaKWlg+Va+AkIKUY9ZEDvb8IiFLlxBMJlerkBKxEcE2wd1C3HHT/4oRE4=",
      "Category": this.tabName
    }
    // this.rewards=torusClubDashBoard.allData
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getStatus + "?torusClubDashboard",params).subscribe(
      (data: any) => {
        this.rewards = data.allData;
        this.Header = data.Header;
        this.scrollTitles = this.Header.scrollTitles
        this.commonFunctionService.setClubHeader(this.Header)
        this.coins = (data.Header.coins).toLocaleString("en-US")
      })
  }


  categoryClick(e){
    this.tabName = e;
    this.getData()
  }


  backPage() {
    this.location.back()
  }


  goToRewards(){
   this.router.navigate( ['Engagement/EngagementTorusClub/allrewards'])
  }
  goToSpinner(data){
    console.log(data.cardType,"cardType");

    if(data.btnName=='Refer Now'){
      this.opnReferPopUp()
      // var options = {
      //   message: 'share this',
      // }
      // this.socialSharing.shareWithOptions(options)
    }
    else{
    this.commonFunctionService.setClubCard(data)

    let params = {
      "TokenId": "",
      "game": data.cardType
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getStatus + "?gamesDetail",params).subscribe(
      (datas: any) => {
       this.gamesDetail = datas;
       this.routeGames(this.gamesDetail,data);
      })

    }
  }

  routeGames(e,es) {
    this.router.navigate(['Engagement/EngagementTorusClub/'+'games'+'/'+ es.cardType],{state:{games:e}})

  }

  async openPopUp(data){
    const modal = await this.modalCtrl.create({
      component: AllBrandPopUpComponent,
      cssClass: 'all-brands-modal',
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


 gotoBrandPage(data){
  this.router.navigate(['Engagement/EngagementTorusClub/subBrand'],{state:{allCard:data}})
 }

 async opnReferPopUp(){
  const modal = await this.modalCtrl.create({
    component: ReferNowPopUpComponent,
    cssClass: 'refer-now-pop',
    componentProps:{
      'allData':getStatus.torusReferDetail
    },
    backdropDismiss: true
  });
  modal.onDidDismiss()
    .then(async (data) => {
      const modal =  await this.modalCtrl.create({
        component: ReferContactsComponent,
        cssClass: 'all-brands-modaler',
        componentProps: {
          'contact': data.data,
        },
        backdropDismiss: true
      });
      modal.onDidDismiss()
        .then(() => {

        });
      return await modal.present();
    });
  return await modal.present();
}
}
