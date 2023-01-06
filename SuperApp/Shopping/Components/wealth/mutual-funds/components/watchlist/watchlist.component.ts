

import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { IonCardTitle } from '@ionic/angular';
import { BankDetailsComponent } from 'projects/core/src/lib/components/bank-details/bank-details.component';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { stringify } from 'querystring';
import { Router } from '@angular/router';
import { NgSelectOption } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { HeaderComponent } from 'projects/core/src/lib/components/header/header.component';
import { HttpClient } from '@angular/common/http';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { MFServiceService } from 'projects/core/src/lib/services/mfservice.service';

@Component({
  selector: 'lib-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
})
export class WatchlistComponent implements OnInit {
  imageList: any;
  x: any;
  jsonData: any;
  mfFooterData: any;
  currentMode: any = 1;
  title: any;
  notificationCount: any;
  labelIcon: any;
  DummayAPiData: any;
  cartCount: any;
  WatchListData: any;
  watchlistdataforshowa: any
  segment: any = 'Bookmark'
  // SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS

  WatchlistArray: any = [];
  currentWatchList: any = 'Recently viewed';
  stocksTab: any;
  searchStocks: any;
  watchlistData: any = []
  ClientCode: string;
  hideIndex: any = false;
  json2: any

  CurrentFund: number;
  DataNotAvailable: boolean = false;
  showNullMessage: boolean = false
  setdec: any;
  setDecimal: any = []
  num: number;
  create: boolean = false;
  SuccesFullCreate: boolean;
  newTabName: any;
  moreError: boolean;


  watchListChanged(event) {
    this.getWatchListData();
    this.currentWatchList = event.target.value;
  }


  constructor(private MFService:MFServiceService,private commonfunction: CommonFunctionService, private http: HttpClient, private loaderService: LoaderService, private allConfigDataService: AllConfigDataService, private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.WatchListData = ["Recently viewed", "watchlist1"]
    this.WatchlistArray = ["Recently viewed", "watchlist1"]
    this.currentWatchList = 'Recently viewed'
    this.getDummayApi()
    this.imageList = this.allConfigDataService.getConfig('images');
    this.mfFooterData = this.allConfigDataService.getConfig('mfTab');
    this.watchlistdataforshowa = Object.values(this.WatchListData);
    this.fundLimitDetailed()
    this.ClientCode = localStorage.getItem('ClientCode');
    console.log(this.ClientCode, "getwatchlist clientCode");

    this.getWatchListArray();
    this.getWatchListData();
  }

  // async dismiss(){
  //   await this.modalCtrl.dismiss("");
  // }


  // async go() {
  //   // this.loaderService.showLoader();
  //   const modal = await this.modalCtrl.create({
  //     component: SortComponent,
  //     componentProps: {

  //       'imageList': this.imageList

  //     },
  //     backdropDismiss: false
  //   });
  //   modal.onDidDismiss()
  //     .then((data) => {
  //       if (data && data?.data) {

  //       }
  //     });
  //   // this.loaderService.hideLoader();
  //   return await modal.present();
  // }







  getDummayApi() {
    let data={
      "strname": "",
     "category_id":"",
     "sorting":"",
     "type":"All",
     "pageNo":0,
     "nRows":10
       };
       this.MFService.getAllMFListByCategory(data).subscribe((data:any) => {
        if (data) {
          // this.TopRatedDataTitle="top rated fund"
          for(let x of data?.data){
            //  console.log("MYYYY");
            this.addData(x);
           }
        }
      });

  }
  addData(val){
    // this.mfCardData.push(val)
    }
  changeBookmark(x) {
  }

  segmentChanged(e) {
    this.segment = e.detail.value;
  }
  // ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
  showNoneMessage() {
    if (this.watchlistData.length == 0) {
      this.showNullMessage = false
    }
  }


  getWatchListArray() {
    // let param = {
    //   "entity_id": "123456",
    //   "source": "A",
    //   "token_id": "b72d763f83bb8393a493",
    //   "iv": "o5507uAmo3eDCZ1ZJ2Q+gA==]",
    //   "data": {
    //     "client_id": this.ClientCode
    //   }
    // }
    // this.http.post('https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/GetWatchListDetails', param).subscribe(async (res: any) => {
    //   for (let i = 0; i < res.data.length; i++) {
    //     this.WatchlistArray.push(res.data[i].WL_NAME);
    //   }
    //   this.WatchlistArray = this.WatchlistArray.filter(item => item !== 'Nifty 50');
    //   this.WatchlistArray.unshift('Nifty 50');
    //   console.log(this.WatchlistArray);

    // })
  }

  fundLimitDetailed() {
    // let param = {
    //   "entity_id": "123456",
    //   "source": "M",
    //   "data": {
    //     "client_id": localStorage.getItem("ClientCode")
    //   }
    // }
    // this.http.post('https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/FundLimit', param).subscribe((data: any) => {
    //   if (!this.CurrentFund) {
    //     this.CurrentFund = 0;
    //   }
    //   this.CurrentFund = data.data[0].available_balance;
    // })
  }


  showIndex() {
    // this.wellnessService.openWebSocket()
    // this.hideIndex = !this.hideIndex;
  }

  async goToAddFunds() {
    // const modal = await this.modalCtrl.create({
    //   component: AddFundsComponent,
    //   backdropDismiss: true
    // });
    // modal.onDidDismiss().then((data) => {
    //   if (data.data) this.WatchlistArray.push(data.data);
    // })
    // modal.present();

  }

  closeWS() {
    // this.wellnessService.closeWebSocket()
  }

  async editWatchList(val) {

    // const modal = await this.modalCtrl.create({
    //   component: EditWatchListComponent,
    //   componentProps: {
    //     watchList: val,
    //     imageList: this.imageList
    //   }
    // })
    // modal.onDidDismiss().then((data) => {
    //   this.WatchlistArray = [];
    //   this.watchlistData = []
    //   this.getWatchListArray();
    //   this.getWatchListData();
    //   // this.WatchlistArray.push(data.data);
    // })
    // modal.present();
  }



  async addWatchList() {
    if (this.WatchlistArray.length > 5) {
      this.moreError = true
    } else {
      this.create = true
    }
  }
  ViewAll() {
    this.moreError = false
  }


  async goToAddStocks(): Promise<void> {

    //  let eventEmitter = new EventEmitter();
    //  eventEmitter.subscribe((res)=>{
    //    console.log(res);

    //  })

    //  const modal = await this.modalCtrl.create({
    //    component:WatchlistComponent,
    //    componentProps:{
    //    },
    //    backdropDismiss:false
    //  });
    //  modal.onDidDismiss().then((data) => {

    //  })
    //  return await modal.present();


  }



  async gotoFilter() {

  }



  async openStockDetails(val) {


  }
  getWatchListData() {

    // let param = {
    //   "entity_id": "123456",
    //   "source": "M",
    //   "data": {
    //     "client_id": this.ClientCode,
    //     "wl_name": this.currentWatchList
    //   }

    // }
    // this.http.post("https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/GetWatchListDetails", param).subscribe(async (res: any) => {
    //   {
    //     this.watchlistData = await res.data;
    //     let params:any
    //     if (this.currentWatchList == "Nifty 50") this.addStock(params)
    //   }
    //   for (let i = 0; i < res.data.length; i++) {
    //     this.setdec = res.data[i].LOWER_LIMIT
    //     this.num = +(this.setdec)
    //     this.setDecimal.push(this.num.toFixed(2))
    //   }
    //   console.log(this.setdec, "=======>SET DECIMAL DATA");
    // })
  }

  // addStock(params) {

  //     if (this.watchlistData.length < 24 && this.currentWatchList == 'Nifty 50') this.http.post('https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/AddMktWatchList', params).subscribe(res => { });

  // }

  async goToNotification(val) {

  }


  async goToEditIndex() {

  }

  CreatebuttonWatchList() {

    if (this.newTabName) {
      this.create = false
      this.SuccesFullCreate = true
      this.WatchlistArray.push(this.newTabName)
    }
    // this.ClientCode = localStorage.getItem('ClientCode');
    // let data = {
    //   "entity_id": "123456",
    //   "source": "A",
    //   "token_id": "b72d763f83bb8393a493",
    //   "iv": "o5507uAmo3eDCZ1ZJ2Q+gA==]",
    //   "data": {
    //     "client_id": this.ClientCode,
    //     "wl_name": this.APIWatchlistName
    //   }
    // }
    // this.http.post("https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/CreateWatchList", data).subscribe(
    //   (res: any) => {
    //     this.create = !this.create
    //     if (res) {
    //       this.message = res.message;
    //     }

    //     if (this.APIWatchlistName == '') {
    //       this.message = res.message;
    //     }
    //   }
    // )
  }

  dismiss() {
    this.SuccesFullCreate = false
  }

  NewTabCreat(e) {

    this.newTabName = e.target.value
  }
}
