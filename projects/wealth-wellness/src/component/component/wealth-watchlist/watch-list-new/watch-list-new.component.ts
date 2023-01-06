import { DomSanitizer } from '@angular/platform-browser';
import { EditWatchListComponent } from './../edit-watch-list/edit-watch-list.component';
import { AddWatchListComponent } from './../add-watch-list/add-watch-list.component';
import { CreateWatchListComponent } from './../create-watch-list/create-watch-list.component';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { StockDetailsComponent } from '../../wealth-trade/stock-details/stock-details.component';
import { Router } from '@angular/router';
import watchList from 'src/assets/watchListJson.json';
import { AddFundsComponent } from '../../wealth-profile/add-funds/add-funds.component';
// import { WealthWellnessService } from 'projects/wealth-wellness/src/public-api';
import { WealthWellnessService } from 'projects/wealth-wellness/src/lib/lib/wealth-wellness.service';
import { NewListComponent } from '../new-list/new-list.component';
import { FilterComponent } from '../../filter/filter.component';
// import { TcsStock } from 'projects/wealth-wellness/src/lib/tcsStock';
import { TcsStock } from 'projects/wealth-wellness/src/lib/lib/tcsStock';
@Component({
  selector: 'lib-watch-list-new',
  templateUrl: './watch-list-new.component.html',
  styleUrls: ['./watch-list-new.component.scss'],
})
export class WatchListNewComponent implements OnInit {
  imageList: any;
  WatchlistArray: any = [];
  currentWatchList: any = 'Nifty 50';
  stocksTab: any;
  searchStocks: any;
  watchlistData: any = [];
  ClientCode: string;
  hideIndex: any = false;
  json2 = watchList.index;
  CurrentFund: number;
  DataNotAvailable: boolean = false;
  showNullMessage: boolean = false;
  setdec: any;
  setDecimal: any = [];
  num: number;
  emptyList: boolean;
  LtpVal: any;
  tcsBuy: number;
  webSocket: WebSocket;
  percentChange: any;
  LTPvalue: any = 0;
  watchListChanged(event) {
    this.getWatchListData();
    // this.currentWatchList = event;
  }
  constructor(
    private cdn: ChangeDetectorRef,
    private allConfigDataService: AllConfigDataService,
    private http: HttpClient,
    private modalCtrl: ModalController,
    private router: Router,
    public sanitizer: DomSanitizer,
    private wellnessService: WealthWellnessService,
    private tcsStock: TcsStock
  ) {
    this.imageList = this.allConfigDataService.getConfig('images');
    this.stocksTab = this.allConfigDataService.getConfig('stocksTab');
  }

  ngOnInit() {
    this.ClientCode = localStorage.getItem('ClientID');
  }

  showNoneMessage() {
    if (this.watchlistData.length == 0) {
      this.showNullMessage = false;
    }
  }

  getWatchListArray() {
    let param = {
      entity_id: '123456',
      source: 'A',
      token_id: 'b72d763f83bb8393a493',
      iv: 'o5507uAmo3eDCZ1ZJ2Q+gA==]',
      data: {
        client_id: this.ClientCode,
      },
    };
    this.http
      .post(
        'https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/GetWatchList',
        param
      )
      .subscribe(async (res: any) => {
        for (let i = 0; i < res.data.length; i++) {
          this.WatchlistArray.push(res.data[i].WL_NAME);
        }
        this.WatchlistArray = this.WatchlistArray.filter(
          (item) => item !== 'Nifty 50'
        );

        this.WatchlistArray.unshift('Nifty 50');
        console.log(this.WatchlistArray);
        this.getWatchListData();
      });
  }

  fundLimitDetailed() {
    let param = {
      entity_id: '123456',
      source: 'M',
      data: {
        client_id: localStorage.getItem('ClientID'),
      },
    };
    this.http
      .post(
        'https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/FundLimit',
        param
      )
      .subscribe((data: any) => {
        if (!this.CurrentFund) {
          this.CurrentFund = 0;
        }
        this.CurrentFund = data.data[0].available_balance;
      });
  }

  showIndex() {
    this.hideIndex = !this.hideIndex;
  }

  openWebsocket() {
    this.tcsStock.callApiAuth();

    this.tcsStock.currentMessage.subscribe(async (res: any) => {
      // this.tcsBuy = await res.val;

      let objIndex = this.watchlistData.findIndex((obj) => {
        return obj.SEC_ID == res.secid;
      });

      this.watchlistData[objIndex].LTPvalue = res.val;
      if (res.fClose > 1)
        this.watchlistData[objIndex].fClose = res.fClose?.toFixed(2);
      this.watchlistData[objIndex].change = (
        res.val - this.watchlistData[objIndex].fClose
      )?.toFixed(2);
      this.watchlistData[objIndex].percentChange = (
        ((res.val - this.watchlistData[objIndex].fClose) * 100) /
        this.watchlistData[objIndex].fClose
      )?.toFixed(2);
      this.watchlistData[objIndex].UCkt = res.UCkt?.toFixed(2);
      this.watchlistData[objIndex].LCkt = res.LCkt?.toFixed(2);
      this.watchlistData[objIndex].ATP = res.ATP?.toFixed(2);
      this.watchlistData[objIndex].OI = res.OI?.toFixed(2);
      this.watchlistData[objIndex].LTT = res.LTT?.toFixed(2);
      this.watchlistData[objIndex].VOL = res.VOL?.toFixed(2);
      this.watchlistData[objIndex].LTQ = res.LTQ?.toFixed(2);
      this.watchlistData[objIndex].fOpen = res.fOpen?.toFixed(2);
      this.watchlistData[objIndex].fHigh = res.fHigh?.toFixed(2);
      this.watchlistData[objIndex].fLow = res.fLow?.toFixed(2);

      this.update();
    });
  }

  async goToAddFunds() {
    const modal = await this.modalCtrl.create({
      component: AddFundsComponent,
      backdropDismiss: true,
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) this.WatchlistArray.push(data.data);
    });
    modal.present();
  }

  async editWatchList(val) {
    const modal = await this.modalCtrl.create({
      component: EditWatchListComponent,
      componentProps: {
        watchList: val,
        imageList: this.imageList,
      },
    });
    modal.onDidDismiss().then((data) => {
      this.WatchlistArray = [];
      this.watchlistData = [];
      this.getWatchListArray();
    });
    modal.present();
  }

  async addWatchList() {
    const modal = await this.modalCtrl.create({
      component: CreateWatchListComponent,
      cssClass: 'create-watch-list-modal',
      backdropDismiss: true,
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) this.WatchlistArray.push(data.data);
    });
    modal.present();
  }

  async goToAddStocks() {
    const modal = await this.modalCtrl.create({
      component: AddWatchListComponent,
      componentProps: {
        watchList: this.currentWatchList,
      },
      backdropDismiss: true,
    });
    modal.onDidDismiss().then((data) => {
      this.watchListChanged(this.currentWatchList);
    });
    modal.present();
  }

  async gotoFilter() {
    this.getWatchListData();
    let me = ['Exchange', 'Sort By'];
    let meVal = [
      ['NSE', 'BSE', 'NSECDS', 'MCX', 'NCDEX'],
      ['old to recent', 'recent to old', 'high to low', 'low to high'],
    ];
    const modal = this.modalCtrl.create({
      component: FilterComponent,
      componentProps: {
        filterKey: me,
        filter: {
          Exchange: [],
          'Sort By': [],
        },
        FilterData: meVal,
      },
      backdropDismiss: false,
    });
    (await modal).onDidDismiss().then((data) => {
      this.watchlistData = this.watchlistData.filter(function (el) {
        return el.EXCHANGE == data.data.Exchange[0];
      });
      console.log(data.data.Exchange);
    });
    (await modal).present();
  }

  getWatchListData() {
    let param = {
      entity_id: '123456',
      source: 'M',
      data: {
        client_id: this.ClientCode,
        wl_name: this.currentWatchList,
      },
    };
    this.http
      .post(
        'https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/GetWatchListDetails',
        param
      )
      .subscribe(async (res: any) => {
        {
          console.log(',,,,,,,,,,,,,,,,', res.data);
          this.openWebsocket();
          if (res.data.length !== 0) {
            this.emptyList = false;
          } else {
            this.emptyList = true;
          }
          //this.webSocket.send(this.watchStock(11536));
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].LOWER_LIMIT = res.data[i].LOWER_LIMIT.replace(
              /[^0-9\.]/g,
              ''
            );
          }
          this.watchlistData = await res.data;
        }
        for (let i = 0; i < res.data.length; i++) {
          this.setdec = res.data[i].LOWER_LIMIT;
          this.num = +this.setdec;
          this.setDecimal.push(this.num?.toFixed(2));
        }
        console.log(this.setDecimal, '=======>SET DECIMAL DATA');
      });
  }

  update() {
    this.setdec = this.watchlistData.LOWER_LIMIT;
    this.num = +this.setdec;
    this.setDecimal.push(this.num?.toFixed(2));
  }


  async goToNotification(val) {
    // const modal = await this.modalCtrl.create({
    //   component: NotificationpagePage,
    //   componentProps: {},
    //   backdropDismiss: true,
    // });
    // modal.onDidDismiss().then((data) => {});
    // modal.present();
  }

  async goToEditIndex() {
    const modal = await this.modalCtrl.create({
      component: NewListComponent,
      componentProps: {},
      backdropDismiss: true,
    });
    modal.onDidDismiss().then((data) => {});
    modal.present();
  }

  async openStockDetails(val) {
    const modal = await this.modalCtrl.create({
      component: StockDetailsComponent,
      componentProps: {
        stockData: this.watchlistData,
      },
      backdropDismiss: true,
    });
    modal.present();
    this.wellnessService.currentStock.next(val);
  }

  ionViewWiilLeave() {
    this.tcsStock.webSocket.close();
  }
  ionViewDidEnter() {
    this.fundLimitDetailed();
    this.getWatchListArray();
  }
}
