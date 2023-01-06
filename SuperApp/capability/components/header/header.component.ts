import { notificationCountService } from './../../../Engagement/Services/notificationCount.service';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'index';
import appLayout from '../../../Engagement/Dashboard Json/getLayout.json';
import { ModalController } from '@ionic/angular';


import { CommonFunctionService } from 'index';
import { Logs } from 'selenium-webdriver';
import { AllConfigDataService } from 'index';

import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { AddFundsComponent } from 'projects/wealth-wellness/src/component/component/wealth-profile/add-funds/add-funds.component';
@Component({
  selector: 'cap-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
@Input() title:any;
@Input() showArrow:any;
@Input() showLabel:any;
@Input() showImg:any;
@Input() imgURL:any;
@Input() showIndex:any;
@Input() showNotification:any;
@Input() showCartWithName:any;
@Input() notificationCount:any;
@Input() cartCount:any;
@Input() showSideMenu:any;
@Input() showSearch:any;
@Input() showClose:any;
@Input() showShare:any;
@Input() showWatchList:any;
@Input() showCartWithoutName:any;
@Input() showStories:any;
@Input() otherTextName:any;
@Input() showOtherText:any;
@Input() imageList:any
@Input() superMode:any;
@Input() backUrlName:any;
@Input() DigiGold:any
@Input() Education:any
@Input() MutualFund:any;
@Input() Health:any;
@Input() Wealth:any;
@Input() showTorusClub:any;
@Input() padding:any=false;
@Input() paddingSize:any=1;
profileName:any;
apiCatalog: any = {
  ...this.allConfigDataService.getConfig('apiCatalog'),
  environment: this.allConfigDataService.getConfig('environmentType'),
};
titleBool: boolean = false;
// notificationCount:any;
////Akshay///
search:any;
clickSearch:boolean=true
@Output() searchEmit = new EventEmitter();
  routing: any;
  route: any;

onKeySearch(){
  this.searchEmit.emit(this.search);
}
onClickSearch(){
  this.clickSearch=false;
  this.showClose=true;
}
onClickClose(){
  this.clickSearch=true;
  this.showClose=false;
  this.search='';
  this.onKeySearch();
}
navigateCart(){
    this.router.navigate(['Fullfilment/cart']);
}
///Akshay///
  constructor(
    private allConfigDataService: AllConfigDataService,
    private eduService : eduService,
    private router:Router,
    private http:HttpClient,
    private modalCtrl: ModalController,
    private commonService:CommonService,private commonFunctionService:CommonFunctionService,private notiCountService : notificationCountService) { }

  ngOnInit() {

    this.showTorusClub = true;
    this.showSearch=true;
    //console.log("imageList",this.imageList)
    this.commonService.getUserDetail().subscribe((data: any) => {
      if (data) {
        this.profileName = this.commonFunctionService.getShortName(
          data?.firstName.replace(/\s/g, '').concat(
            ' ',
            data?.lastName.replace(/\s/g, '')
          )
        );
      }
    });

    const subscription = this.eduService.categoryValueForAPI.subscribe(
      (val) => {
        this.routing = val['productLanding'];
      })

      this.route = this.router.url;

    // console.log(this.otherTextName);
  }
  ionViewDidEnter() {
    this.http.post('https://apixuat.heytorus.com/SuperApp/Fullfilment/orderDetails?getCartItemCount',{
      "tokenid": localStorage.getItem("id_token"),
      "Flag": "Count"
    })
    .subscribe(async (res:any) => {
      this.cartCount=res.ItemsCount
    })
  }
  openSubMenu() {}
  goToBack() {
    // this.router.navigate(['/' + this.backUrlName]);
    window.history.back()
  }
  goToGobalSearch(){
    this.router.navigate(['Engagement/EngagementGobalSearch/getGlobalSearch']);


  }
  goToNotificationpage() {
    this.router.navigate(['Engagement/EngagementNotification/getAllNotification']);

    // if (this.DigiGold) {
    //   this.router.navigate(['/notification']);
    // }
    // if (this.Education) {
    //   this.router.navigate(['/notification']);
    // }
    // if (this.MutualFund) {
    //   this.router.navigate(['/notification']);
    // }
    // if (this.Health) {
    //   this.router.navigate(['/notification']);
    // }
    // if (this.Wealth) {
    //   this.router.navigate(['Engagement/Notification']);
    // }
  }

  // getNotificationUnReadConut(){

  //    this.notiCountService.setNotification();

  //    setTimeout(() => {
  //      this.notificationCount = this.notiCountService.getNotificationUnreadCount();
  //      console.log( "count",this.notificationCount);

  //    }, 2000);

  // }



   async addFunds() {
    const modal = await this.modalCtrl.create({
      component: AddFundsComponent,
      componentProps: {
        'imageList': this.imageList,
      },
      backdropDismiss: true
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log("hiiii");
      });
    return await modal.present();
  }
}
