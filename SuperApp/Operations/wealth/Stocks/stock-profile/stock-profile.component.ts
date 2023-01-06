import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'index';
import watchList from 'src/assets/watchListJson.json';
// import { AddFundsComponent } from '../add-funds/add-funds.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'index';
import appLayout from '../../../../Engagement/Dashboard Json/getLayout.json';
// import { NewListComponent } from '../../wealth-watchlist/new-list/new-list.component';
// import * as json from '../../stockProfile.json'
import  account from '../../../Account.json'
import { AddFundsComponent } from 'projects/wealth-wellness/src/component/component/wealth-profile/add-funds/add-funds.component';
import { ClientDetailsComponent } from 'projects/wealth-wellness/src/component/component/wealth-profile/client-details/client-details.component';
import { HistoricalReportComponent } from 'projects/wealth-wellness/src/component/component/wealth-profile/historical-report/historical-report.component';
import { SettingComponent } from 'projects/wealth-wellness/src/component/component/wealth-profile/setting/setting.component';
import { element } from 'protractor';
import { ClientdetailsComponent } from '../clientdetails/clientdetails.component';
import { DematFundsComponent } from 'projects/wealth-wellness/src/component/component/wealth-profile/demat-funds/demat-funds.component';
import { StFundsComponent } from '../st-funds/st-funds.component';


@Component({
  selector: 'lib-stock-profile',
  templateUrl: './stock-profile.component.html',
  styleUrls: ['./stock-profile.component.scss'],
})
export class StockProfileComponent implements OnInit {
  title = 'Stock';
  imageList: any;
  stocksTab: any;
  CurrentFund: number;
  hideIndex: any = false;
  json2 = watchList.index;
  cartCount: any;
  footerListData: any;
  loadingPageCount: number = 0;
  infiniteLoad: any;
  emptyCart: boolean;
  create: boolean = false;
  filterIcon = false;
  hideFooter = true;
  Stjson:any
  changeComponent: any;
  // DematFundsComponent
  // AddFundsComponent
  profileComponents= [
    {
      title:"client Details",
    value:ClientdetailsComponent
  },{
    title:"Funds",
  value:StFundsComponent
},{
  title:"Historical Reports",
value:HistoricalReportComponent
},{
  title:"Settings",
value:SettingComponent
}
  ]

  constructor(
    private allConfigDataService: AllConfigDataService,
    private modalCtrl: ModalController,
    private router: Router,
    private http: HttpClient,
    public commonService: CommonService,
  ) {
    this.commonService.footerData.subscribe(async (res: any) => {
      this.footerListData = appLayout[res].footer
    })
  }

  ngOnInit() {
    this.Stjson=account
    this.imageList = this.allConfigDataService.getConfig('images');
    this.stocksTab = this.allConfigDataService.getConfig('stocksTab');
    console.log(this.Stjson,"--------------------Rajeshyadav---------------");

  }
  showIndex() {
    this.hideIndex = !this.hideIndex;
  }

  // toDetail(e){
  //   console.log(e,"-----rajesh2024------");
  // }




  async toDetail(e) {
this.profileComponents.forEach(async (element)=>{
  if(e==element.title){
    this.changeComponent = element.value;
 }
})
const modal = await this.modalCtrl.create({
 component: this.changeComponent,
});
modal.onDidDismiss().then((data) => {});
modal.present();

  }



  // async toDetail(e) {
  //   const modal = await this.modalCtrl.create({
  //     component: ClientdetailsComponent,
  //     componentProps: {
  //       'imageList': this.imageList,
  //     },
  //     backdropDismiss: false
  //   });
  //   modal.onDidDismiss()
  //     .then((data) => {
  //     });

  //   return await modal.present();
  // }



}
