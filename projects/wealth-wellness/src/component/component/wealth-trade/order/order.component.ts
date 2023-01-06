import { OrderAcknowledgementComponent } from '../order-acknowledgement/order-acknowledgement.component';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Route, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { HttpClient } from '@angular/common/http';
import { StockDetailsComponent } from '../stock-details/stock-details.component';
import watchList from 'src/assets/watchListJson.json'
import { StkModCancelComponent } from '../stk-mod-cancel/stk-mod-cancel.component';
import { AddFundsComponent } from '../../wealth-profile/add-funds/add-funds.component';
import { ConvertComponent } from '../convert/convert.component';
import stocks from 'src/assets/Stocks.json'
import { BuyNsellComponent } from '../buy-nsell/buy-nsell.component';
import { NewListComponent } from '../../wealth-watchlist/new-list/new-list.component';
import { FilterComponent } from '../../filter/filter.component';
import { MrktOrder5Component } from '../mrkt-order5/mrkt-order5.component';

@Component({
  selector: 'lib-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  imageList: any
  labelIcon: any
  notificationCount: any = 0
  cartCount: any = 0
  currentMode: any = 0
  orderCard: boolean = true
  position: boolean = false
  trade: boolean = false
  pop: any = false
  secondPop: any = false
  modifyPage: any = false
  hidePage: any = true
  order: any
  popUp: any = false
  msgpop: any = false
  Total: any = false
  Realised: any = false
  Unrealised: any = false
  orderTypeCard: any
  title = "Order";
  textName = "Order";
  textLabel: any = "Order"
  search: any;
  filter: any;
  tabValue: any = "";
  @Input() segment: any;
  Stoplosss: any = false
  stocksTab: any;
  OrderData: any;
  tradeData;
  orderStockData = []
  tradeStockData = []
  orderDataPopup: any;
  clientCode: any;
  positionData: any;
  tradeDataPopUp: any;
  netPositionPopUp: any;
  tradePopUp: boolean;
  hideIndex: any = false;
  json2 = watchList.index;
  CurrentFund: number;
  searchStocks;
  Data: any = [];
  showConvert: boolean = false
  stockData: any;
  type: any;
  page: any;
  counter: any;

  environmentAPIList: any;
  responceData: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;

  constructor(private allconfigDataService: AllConfigDataService,
     private router: Router, private modalctrl: ModalController,
     private http: HttpClient, private route: ActivatedRoute)
     {
     this.environmentAPIList = this.allconfigDataService.getCurrentApiList();
     this.clientCode = localStorage.getItem('ClientID')
     this.apiCatalog={
      ...this.allconfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allconfigDataService.getConfig('environmentType');
    this.breadCrumb='Shopping/Wealth/ST';
  }
  goToAddStocks() { }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.tabValue = this.segment
    if (this.segment == 'order') {
      this.getOrderproductList();

      this.orderCard = true
    }
    if (this.segment == 'trade') {
      this.getTradeproductList();
      this.trade = true
      this.orderCard = false
      this.position = false
    }
    else {
      this.trade = false
    }
    if (this.segment == 'position') {
      this.getPositionProductList();
      this.position = true
      this.trade = false
      this.orderCard = false
    }
    else {
      this.position = false
    }

  }




  ngOnInit() {
    this.fundLimitDetailed()
    this.Data = stocks;
    this.segment = this.route.snapshot.paramMap.get('segment');
    if (this.segment != 'order') {
      this.segment = 'trade'
    }
    this.getOrderproductList();
    this.getTradeproductList();
    this.getPositionProductList();
    this.imageList = this.allconfigDataService.getConfig("images");
    this.stocksTab = this.allconfigDataService.getConfig('stocksTab');

  }

  fundLimitDetailed() {
    let param = {
      "entity_id": "123456",
      "source": "M",
      "data": {
        "client_id": localStorage.getItem("ClientID")
      }
    }
    this.http.post('https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/FundLimit', param).subscribe((data: any) => {
      if (!this.CurrentFund) {
        this.CurrentFund = 0;
      }
      this.CurrentFund = data.data[0].available_balance;
    })
  }

  showIndex() {
    this.hideIndex = !this.hideIndex;
  }

  getOrderproductList() {
    let param = {
      "entity_id": "123458",
      "source": "N",
      "data": {
        "client_id": this.clientCode
      }
    }

    // this.http.post('http://uat.torusdigital.in:5000/api/v1/wealth/stock/Mpost/OrderBook', param).subscribe(async (res: any) => {
    //   this.orderStockData = res.data;
    // })



    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.orderBook, param).subscribe(async (res: any) => {

    // this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.OrderBook,param).subscribe(async (res: any) => {
      this.responceData = res.data[0]

    })
  }


  getTradeproductList() {
    let param = {
      "entity_id": "123458",
      "source": "N",
      "data": {
        "client_id": this.clientCode
      }
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.tradeBook, param).subscribe(async (res: any) => {

    // this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.TradeBook,param).subscribe(async (res: any) => {
      this.responceData = res.data[0]
    })
  }

  getPositionProductList() {
    let param = {
      "entity_id": "123458",
      "source": "N",
      "data": {

        "client_id": this.clientCode,
        "cf_flag": ""
      }
    }

    // this.http.post('http://uat.torusdigital.in:5000/api/v1/wealth/stock/Mpost/NetPosition', param).subscribe(async (res: any) => {
    //   this.positionData = res.data;
    // })

    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.netPosition, param).subscribe(async (res: any) => {

    // this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.NetPosition,param).subscribe(async (res: any) => {
      this.responceData = res.data[0]
    })
  }
  async cancelOrder(val) {
    let param = {
      "entity_id": "123458",
      "source": "N",
      "data": {
        "client_id": this.clientCode,
        "user_id": "",
        "txn_type": val.txn_type,
        "exchange": val.exchange,
        "segment": val.segment,
        "product": val.product,
        "security_id": val.security_id,
        "quantity": val.quantity,
        "price": val.price,
        "validity": val.validity,
        "order_type": val.order_type,
        "disc_quantity": val.disc_quantity,
        "trigger_price": val.trigger_price,
        "off_mkt_flag": val.off_mkt_flag,
        "remarks": "hello",
        "mkt_type": val.mkt_type,
        "settlor": val.settlor,
        "platform": "Paytmmonney",
        "channel": "Mobile",
        "group_id": val.group_id,
        "order_no": val.order_no,
        "serial_no": val.serial_no
      }
    }

    console.log(val);
    const modal = this.modalctrl.create({
      component: OrderAcknowledgementComponent,
      componentProps: {
        imageList: this.imageList,
        StatusCancelled: true
      },
      backdropDismiss: true,
      cssClass: 'order-acknowledgement-modal',
    });
    (await modal).onDidDismiss().then(data => {

    })

    // this.http.post('http://uat.torusdigital.in:5000/api/v1/wealth/stock/Mpost/CancelOrder', param).subscribe(async (res: any) => {
    //   this.pop = false;
    //   return (await modal).present()
    // })

    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.cancelOrder, param).subscribe(async (res: any) => {

    // this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.CancelOrder,param).subscribe(async (res: any) => {
      this.responceData = res.data[0]
    })
  }
  openPopUp(val) {
    this.netPositionPopUp = val;
    this.popUp = true
  }

  // async goToSquareOff(val) {
  //   this.pop = false
  //   const modal = await this.modalctrl.create({

  //     component: BuyNsellComponent,
  //     cssClass: "stock-details-modal",
  //     componentProps: {
  //       'imageList': this.imageList,
  //       'filter': this.filter,
  //       'stockData': val
  //     },
  //     backdropDismiss: true
  //   })
  //   modal.onDidDismiss().then((data) => {

  //     if (data.data == "modify") {
  //       this.segmentChanged('')
  //     }
  //   })
  //   return await modal.present()
  // }



  // async goToSquareOff(val) {
  //   const modal = await this.modalctrl.create({
  //     component: BuyNsellComponent,
  //     cssClass: 'stock-details-modal',
  //     componentProps: {
  //       stockData: val
  //     },
  //     backdropDismiss: true
  //   });
  //   modal.onDidDismiss().then((data) => {

  //   })
  //   modal.present();
  // }
  //   goToSqOff(){
  // const modal = await this.modalctrl.create({
  //       component: StockDetailsComponent,
  //       componentProps: {
  //       },
  //       backdropDismiss: true
  //     });
  //     modal.onDidDismiss().then((data) => {

  //     })
  //     modal.present();
  //   }




  openPopUpTrade(val) {
    this.tradeDataPopUp = val
    this.tradePopUp = true;
  }
  showPopUpCard(val) {
    this.orderDataPopup = val;
    this.pop = true;
  }
  hidePopUpCard() {
    this.pop = false
  }


  buyMore(val) {
    this.pop = false;
    this.tradePopUp = false;
    this.popUp = false;
    let stock = {
      EXCHANGE: val.exchange,
      EXP_DATE: "NA",
      INST: val.instrument,
      ISIN_CODE: val.isin,
      LOT: val.lot_size,
      LOWER_LIMIT: "2437.9000",
      OPT_TYPE: "",
      SEC_ID: val.security_id,
      SEGMENT: "E",
      STRIKE_PRICE: "NA",
      SYMBOL: val.symbol,
      TICK: val.price,
      UPPER_LIMIT: val.tick_size,
    }
    this.openStockDetails1(stock);
  }

  async openStockDetails1(val) {
    const modal = await this.modalctrl.create({
      component: MrktOrder5Component,
      cssClass: 'create-watch-list-modal',
      componentProps: {
        stockData: val,
      },
      backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {

    })
    modal.present();
  }

  addMore(val) {
    this.pop = false;
    this.tradePopUp = false;
    this.popUp = false;
    let stock = {
      EXCHANGE: val.exchange,
      EXP_DATE: "NA",
      INST: val.instrument,
      ISIN_CODE: val.isin,
      LOT: val.lot_size,
      LOWER_LIMIT: "2437.9000",
      OPT_TYPE: "",
      SEC_ID: val.security_id,
      SEGMENT: "E",
      STRIKE_PRICE: "NA",
      SYMBOL: val.symbol,
      TICK: val.price,
      UPPER_LIMIT: val.tick_size,
    }
    this.openStockDetails(stock);
  }

  async openStockDetails(val) {
    const modal = await this.modalctrl.create({
      component: StockDetailsComponent,
      cssClass: 'stock-details-modal',
      componentProps: {
        stockData: val,
      },
      backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {

    })
    modal.present();
  }

  showSecondPopUp() {
    this.secondPop = true

  }
  hideSecondPopUp() {
    this.secondPop = false
    this.hidePage = true;

  }
  showModifyPage() {
    this.hidePage = !this.hidePage;
    this.modifyPage = !this.modifyPage
  }


  hidePopUp() {
    this.popUp = false
    this.msgpop = false
    this.tradePopUp = false;
  }

  hidemsgpop() {
    this.msgpop = false
  }

  async goToAddFunds() {
    const modal = await this.modalctrl.create({
      component: AddFundsComponent,
      backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {
    })
    modal.present();

  }

  onKeySearch(val) {
    this.search = val;
    console.log(this.search);
  }

  onKeySearch1(val) {
    this.search = val;
    console.log(this.search);

  }
  openmsg1() {
    this.Total = true
    this.msgpop = true
    this.Realised = false
    this.Unrealised = false
  }

  openmsg2() {
    this.Realised = true
    this.msgpop = true
    this.Total = false
    this.Unrealised = false
  }

  openmsg3() {
    this.Unrealised = true
    this.msgpop = true
    this.Realised = false
    this.Total = false
  }



  async navigateToFilter() {
    const modal = await this.modalctrl.create({
      // component: CoursecategoryComponent,
      component: FilterComponent,
      componentProps: {
        'imageList': this.imageList,
        'filter': this.filter,
        'data': this.tabValue
      },
      backdropDismiss: false
    })
    modal.onDidDismiss().then((data) => {
      console.log(data)
      this.filter = data.data
    })
    return await modal.present()
  }


  async dismiss() {
    window.history.back();
  }



  async goToModify(val) {
    this.pop = false
    const modal = await this.modalctrl.create({

      component: StkModCancelComponent,
      cssClass: "stock-details-modal",
      componentProps: {
        'imageList': this.imageList,
        'filter': this.filter,
        'stockData': val
      },
      backdropDismiss: false
    })
    modal.onDidDismiss().then((data) => {

      if (data.data == "modify") {
        this.segmentChanged('')
      }
    })
    return await modal.present()
  }




  async gotoFilter() {
    let me = ['Exchange', "Sort By"]
    let meVal = [
      ['NSE', 'BSE', 'NSECDS', 'MCX', 'NCDEX'],
      ['old to recent', 'recent to old', 'high to low', 'low to high',]
    ]
    const modal = this.modalctrl.create({
      component: FilterComponent,
      componentProps: {
        filterKey: me,
        filter: {
          "Exchange": [],
          "Sort By": []
        },
        FilterData: meVal
      },
      backdropDismiss: false
    });
    (await modal).onDidDismiss().then((data) => {
      console.log(data.data.Exchange);

    })
      ; (await modal).present();
  }


  hidePopUpConvert() {
    this.popUp = !this.popUp
  }


  async goToConvert() {
    // this.showConvert = !this.showConvert
    const modal = await this.modalctrl.create({
      component: ConvertComponent,
      cssClass: 'create-watch-list-modal',
      backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {
    })
    modal.present();

  }

  async goToEditIndex() {
    const modal = await this.modalctrl.create({
      component: NewListComponent,
      componentProps: {
      },
      backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {

    })
    modal.present();
  }







  async openBuySellModal(e) {

    this.modalctrl.dismiss();
    const modal = await this.modalctrl.create({
      component: BuyNsellComponent,
      cssClass: 'buy-nsell-modal',
      componentProps: {
        stockData: this.stockData,
        type: e,
      },
      backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {

    })
    modal.present();
  }




}
