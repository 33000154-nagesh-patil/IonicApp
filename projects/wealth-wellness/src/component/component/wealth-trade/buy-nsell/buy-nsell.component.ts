import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, Input, } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { WealthWellnessService } from 'projects/wealth-wellness/src/public-api';
import BuyNSell from 'src/assets/BuySell.json';
import { AddFundsComponent } from '../../wealth-profile/add-funds/add-funds.component';
import { MrktOrder5Component } from '../mrkt-order5/mrkt-order5.component';
import { OrderAcknowledgementComponent } from '../order-acknowledgement/order-acknowledgement.component';

@Component({
  selector: 'lib-buy-nsell',
  templateUrl: './buy-nsell.component.html',
  styleUrls: ['./buy-nsell.component.scss'],
})
export class BuyNsellComponent implements OnInit {
  @Input() stockData: any;
  @Input() setDecimal: any = []
  @Input() type: any;
  checkMe: boolean = false;
  deliveryCss: any;
  marginCss: any;
  intradayCss: any;
  title = "watchlist";
  textName = "watchlist";
  imageList: any;
  notificationCount: any = 0;
  cartCount: any = 0;
  labelIcon: any;
  currencyList: any;
  currencySymbol: any;
  Trigger: any;
  errmsg: any = false;
  currentTypeOrder: any;
  currentTextType: any = 'BSE';
  currentType: any = "On";
  CurrentSelect: any;
  isShown: boolean = false;
  isStepper: boolean = false;
  isStepper3: boolean = false;
  TriggerPriceOn: boolean = false;
  Fury: boolean = true;
  minusIcon: boolean = false;
  plusIcon: boolean = true;
  isTrigger: boolean = true;
  CoverOrder: boolean = false;
  MarketOrder: boolean = true;
  BracketOrder: boolean = false;
  LimitOrder: any = false;
  data: any;
  currentMode: any = 0;
  showPopUp: any = false
  checked: boolean = false;
  radioItems: Array<string>;
  model = { option: 'Day' };
  myModel = 3;
  value: number;
  TriggerValue: Number;
  isMargin: boolean = false;
  isAvailable: boolean = false;
  isMarginRequired: boolean = false;
  isConfirmation: boolean = false;
  color = true;
  @Input() page: any;
  counter: number;
  qtyval: any = ""
  isCancelButton: boolean = false;
  MarginReuired: any;
  AvailableFunds: number = 2500;
  placeOrder: any;
  BestkAskSellvalue: any;
  BestkAskBuyvalue: any;
  BSECMP: any;
  NSECMP: any;
  BseExchange: any
  NseExchange: any
  bracket: any;
  cover: any;
  isSell: boolean = false;
  isBuy: boolean = true;
  stockText: any = "NSE";
  coverOrderconfirmation: boolean = false
  marketValue: boolean = false;
  placeHolder: string = 'Market'
  buyDisable: boolean = true;
  checkHere
  passme: boolean = true
  openingBal: any;
  exposure: any;
  availableToInvest: any;
  environmentAPIList: any;
  responceData: any;
  WatchlistArray: any;
  ClientCode: any;
  hideBuySell: boolean= true
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;


  constructor(private allConfigDataService: AllConfigDataService,
    private router: Router, private modalctrl: ModalController,
    private http: HttpClient) {

      this.apiCatalog={
        ...this.allConfigDataService.getConfig('apiCatalog'),
      };
      this.appEnviron = this.allConfigDataService.getConfig('environmentType');
      this.breadCrumb='Shopping/Wealth/ST';
     }

  ngOnInit() {
    this.stockData = this.router.getCurrentNavigation().extras.state.stockData;
    this.getWatchListArray()
    this.fundLimitDetailed()

    if (!this.page) {
      this.page = 'C';
    }
    if (this.page == 'C') {
      this.changeButtonCssDelivery();
    }
    else {
      this.changeButtonCssIntraday();
    }
    this.placeOrder = BuyNSell;
    this.bracket = this.placeOrder.Intraday.Bracket
    console.log(this.type);
    this.cover = this.placeOrder.Intraday.cover
    console.log(this.cover);

    this.BSECMP = this.placeOrder.BSECMP;
    this.NSECMP = this.placeOrder.NSECMP;
    this.BseExchange = this.placeOrder.BseExchange;
    this.NseExchange = this.placeOrder.NseExchange;

    this.BestkAskSellvalue = this.placeOrder.BestkAskSellvalue;
    this.BestkAskBuyvalue = this.placeOrder.BestkAskBuyvalue;

    console.log(this.placeOrder.value2);
    console.log(this.placeOrder.NSECMP);
    console.log(this.placeOrder.BSECMP);


    this.imageList = this.allConfigDataService.getConfig('images');
    this.currencyList = this.allConfigDataService.getConfig('listCodeCountry')
    this.currencySymbol = this.currencyList['IND']['currencySymbol']
    this.page = 'C';
    this.currentTextType = 'BSE'

  }

  changeButtonCssIntraday() {
    this.deliveryCss = '';
    this.marginCss= '';
    this.intradayCss = 'active'
    this.page = 'I';
    console.log(this.page);

  }

  changeButtonCssDelivery() {
    this.deliveryCss = 'active';
    this.intradayCss = '';
    this.marginCss= '';
    this.page = 'C';
    console.log(this.page);

  }
  changeButtonCssMargin() {
    this.marginCss= 'active';
    this.deliveryCss = '';
    this.intradayCss = ''
    this.page = 'C';
    console.log(this.page);

  }
  changeColor(e) {
    console.log("e", e);
    if (!this.color) {
      this.stockText = "NSE"
      // this.MarginReuired= this.counter * this.NseCmp;
    }
    else {
      this.stockText = "BSE"
      //  this.MarginReuired= this.counter * this.BseCmp;
    }
    this.color = !this.color;
    // if (this.color) {
    //   this.currentTextType = "BSE"
    // } else {
    //   this.currentTextType = "NSE"
    // }
  }

  segmentChanged(val) {
    this.currentTypeOrder = val.detail.value
  }
  segmentOnOff(val) {
    this.currentType = val.detail.value
  }
  //   increment() {
  //     if(this.MarginReuired > this.AvailableFunds){
  //       this.isMargin = true;
  //     }
  //     else{
  //     this.counter++;

  //     this.MarginReuired= this.counter * this.BseCmp;
  //   }
  // }
  //   decrement() {
  //     if(this.counter===0){
  //       this.counter=0;
  //       this.MarginReuired= this.counter * this.BseCmp;
  //       // console.log("hiiiiiiii")
  //     }
  //     else{
  //       this.counter--;
  //       this.MarginReuired= this.counter * this.BseCmp;
  //     }
  //   }


  increment() {
    if (!this.counter) this.counter = 0
    if (this.MarginReuired > this.AvailableFunds) {
      this.isMargin = true;
      this.hideBuySell =false;
    }
    else if (this.stockText == "BSE") {
      this.counter++;
      this.MarginReuired = this.counter * this.stockData.LTPvalue;
      this.MarginReuired.toFixed(2)

      console.log(this.BSECMP);
    }
    else if (this.stockText == "NSE") {
      this.counter++;
      this.MarginReuired = this.counter * this.stockData.LTPvalue;
      this.MarginReuired.toFixed(2)

      console.log(this.NSECMP);
    }
  }

  decrement() {
    if (this.counter === 0) {
      this.counter = 0;
    }
    else if (this.stockText == "BSE") {
      this.counter--;
      this.MarginReuired = this.counter * this.stockData.LTPvalue;
      this.MarginReuired.toFixed(2)

    }
    else if (this.stockText == "NSE") {
      this.counter--;
      this.MarginReuired = this.counter * this.stockData.LTPvalue;
      this.MarginReuired.toFixed(2)
    }
  }



  TriggerCounter = 0;
  Triggerincrement() {
    if (this.TriggerCounter === 10) {
      this.TriggerCounter = 10;
      console.log("Dis qty cannot be more than 10% of product quantity");
    }
    else {
      this.TriggerCounter++;

    }

  }
  Triggerdecrement() {
    if (this.TriggerCounter === 0) {
      this.TriggerCounter = 0;
    }
    else {
      this.TriggerCounter--;
    }
  }
  onClick() {
    console.log("hiii everyone");
  }
  toggleShow() {
    this.isShown = !this.isShown;
    this.minusIcon = true;
    this.plusIcon = false;

  }
  toggleHide() {
    this.isShown = !this.isShown;
    this.minusIcon = false;
    this.plusIcon = true;

  }
  Delivery() {
    console.log("sfthupathy");

  }

  back(){
    this.modalctrl.dismiss();
  }


  Intraday() {
    console.log("Rajesh");
  }
  // @Input() imageList:any;
  @ViewChild('hiddenText') textEl: ElementRef;
  minWidth: number = 100;
  width: number = this.minWidth;

  async resize(val) {

    if (val) {
      this.checkMe = true;
    } else {
      this.checkMe = false;
    }

    if (val.key === 'Backspace') {
      this.width = this.width - this.minWidth;
      if (this.width <= this.minWidth) this.width = this.minWidth;
    }
    else this.width = this.width + 15;
  }

  inputFiled() {
    this.checkMe = !this.checkMe
  }

  async AddFunds() {
    const modal = this.modalctrl.create({
      component: AddFundsComponent,
      componentProps: {
        'imageList': this.imageList,
        StatusPending: true,
        stockData: this.stockData,
      },
      backdropDismiss: true
    })
      ; (await modal).present()
  }


  stepperBracket() {

    // this.isStepper = !this.isStepper;
    // this.BracketOrder = true;
    // this.LimitOrder = false;
    // this.CoverOrder = false;
    // this.MarketOrder = false;
    // this.placeOrder = BuyNSell;
    // this.bracket = this.placeOrder.Intraday.Bracket
  }
  stepperCover() {
    // this.isStepper3 = !this.isStepper3;
    // this.CoverOrder = true;
    // this.BracketOrder = false;
    // this.LimitOrder = false;
    // this.MarketOrder = false;
    // this.placeOrder = BuyNSell;
    // this.cover = this.placeOrder.Intraday.cover;

  }
  OnnOff() {
    this.TriggerPriceOn = false
  }
  OffOnn() {
    this.TriggerPriceOn = !this.TriggerPriceOn;
  }
  clickToPop() {
    console.log("Fury");
    this.Fury = !this.Fury;
  }
  profileModalClose() {
    this.modalctrl.dismiss();
  }
  HideTrigger() {
    this.isTrigger = false;
  }
  ShowTrigger() {
    this.isTrigger = true;
  }

  Available() {
    this.isAvailable = true;
  }


  Confirm() {
    if (this.availableToInvest === 0) {
      this.errmsg = true
      // this.isMargin = true;
    }
    else if (this.MarginReuired > this.AvailableFunds) {
      this.isMargin = true;
      this.hideBuySell = false;
    }
    else if (this.page === "I" && this.CoverOrder === true) {
      this.coverOrderconfirmation = true;
    }
    else if (this.page === "I" && this.CoverOrder === true) {
      this.coverOrderconfirmation = true;
    }
    else {
      this.isConfirmation = true;
      this.isSell = false;
      this.isBuy = true;
      this.passme = false;
    }
  }

  async sell() {
    this.isSell = true;
    this.isConfirmation = true;
    this.isBuy = false;
    this.passme = false;

    // const modal = this.modalctrl.create({
    //   component: MrktOrder5Component,
    //   componentProps: {
    //     'imageList': this.imageList,
    //     StatusPending: true,
    //     stockData: this.stockData,
    //   },
    //   cssClass: 'create-watch-list-modal',
    //   backdropDismiss: true
    // })
    //   ; (await modal).present()
  }

  MarginClose() {
    this.hideBuySell = true;
    this.isMargin = false;
    this.isAvailable = false;
    this.errmsg = false;
  }

  // rama(val){
  //  this.qtyval=val
  //   console.log(this.qtyval)
  // }

  modify() {
    this.coverOrderconfirmation =false;
    this.passme = false;
    this.isConfirmation = false;

    this.callApi()
  }

  callApi() {
    let ClientCode = localStorage.getItem('ClientID');
    let param = {
      "custGuId": "",
      "entity_id": "123458",
      "source": "N",
      "data": {
        "client_id": ClientCode,
        "user_id": "",
        "txn_type": this.type,
        "exchange": this.stockData.EXCHANGE,
        "segment": "E",
        "product": this.page,
        "security_id": this.stockData.SEC_ID,
        "quantity": this.counter,
        "price": "0.00",
        "validity": "DAY",
        "order_type": "MKT",
        "disc_quantity": "0",
        "trigger_price": "0.00",
        "off_mkt_flag": "false",
        "remarks": "hello",
        "mkt_type": "NL",
        "settlor": "",
        "group_id": "1",
        "platform": "Paytmmonney",
        "channel": "Mobile"
      }
    }
    this.http.post("https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/OrderEntry", param).subscribe(async (res: any) => {
    //   console.log(data);
    //   console.log(ClientCode, "orderentry ClientID");
    // })

    // this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.OrderEntry,param).subscribe(async (res: any) => {
      this.responceData =await res.data[0]
    })


  }


  slLimitOrder() {
    this.marketValue = !this.marketValue
    this.LimitOrder = true;
    this.CoverOrder = false;
    this.MarketOrder = false;
    this.BracketOrder = false;
    if (this.marketValue) this.placeHolder = this.stockData.TICK
    else this.placeHolder = 'Market'
  }

  closeThis() {
    console.log("hiii");
    this.Fury = true;
  }

  change(event) {
    console.log(event.target.value);
  }



  async confirmOrder() {
    this.callApi();
    console.log("hellooooooo");
    this.modalctrl.dismiss();
    const modal = this.modalctrl.create({
      component: OrderAcknowledgementComponent,
      componentProps: {
        'imageList': this.imageList,
        StatusPending: true,
        stockData: this.stockData,
      },
      cssClass: 'order-acknowledgement-modal',
      backdropDismiss: true
    })
      ; (await modal).present()
  }




  fundLimitDetailed() {
    let param = {
      "entity_id": localStorage.getItem("ClientID"),
      "source": "M",
      "data": {
        "client_id": localStorage.getItem("ClientID")
      }
    }
    this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.FundLimit,param).subscribe((data: any) => {

        if(!this.availableToInvest)
        {
          this.availableToInvest=0
        }
      this.availableToInvest = data.data[0].available_balance;
      })

  }

  margin(){

    this.marginCss= 'active';
    this.deliveryCss = '';
    this.intradayCss = ''
    this.page = 'C';
    console.log(this.page);

  }
  getWatchListArray() {
    let param = {
      "entity_id": "123456",
      "source": "A",
      "token_id": "b72d763f83bb8393a493",
      "iv": "o5507uAmo3eDCZ1ZJ2Q+gA==]",
      "data": {
        "client_id": this.ClientCode
      }
    }
   
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getWatchList, param).subscribe(async (res: any) => {

        for (let i = 0; i < res.data.length; i++) {
          this.WatchlistArray.push(res.data[i].WL_NAME);
        }
        this.WatchlistArray = this.WatchlistArray.filter(item => item !== 'Nifty 50');
        this.WatchlistArray.unshift('Nifty 50');
        console.log(this.WatchlistArray);
      })
  }
}

