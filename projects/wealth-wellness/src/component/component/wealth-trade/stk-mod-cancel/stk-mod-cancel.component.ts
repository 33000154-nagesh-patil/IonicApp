import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
// import Modify from 'src/assets/Modify.json';

@Component({
  selector: 'lib-stk-mod-cancel',
  templateUrl: './stk-mod-cancel.component.html',
  styleUrls: ['./stk-mod-cancel.component.scss'],
})
export class StkModCancelComponent implements OnInit {
  @Input() stockData: any;
  imageList: any;
  minusIcon: boolean = false;
  plusIcon: boolean = true;
  isShown: boolean = false;
  currentType: any = "On";
  value: number = 255;
  isTrigger: boolean = true;
  TriggerPriceOn: boolean = false;
  MarginReuired: any;
  AvailableFunds: number = 2500;
  isMargin: boolean;
  counter:number = 0;
  BseCmp = 234.65;
  currencyList: any;
  currencySymbol: any;
  Data: any;
  limitPrice: any;
  limitPriceValue: boolean=false;
  SrNo: any;
  getSerialNumber: any;
  responceData: any;
  marketValue: boolean =false;
  checkMe: boolean=false;
  placeHolder:string='Market'
  MarketOrder
  BracketOrder
  CoverOrder
  environmentAPIList: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  constructor(private allConfigDataService: AllConfigDataService, private router: Router, private http: HttpClient, private modalCtrl: ModalController) {
    this.environmentAPIList = this.allConfigDataService.getCurrentApiList();
    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Shopping/Wealth/ST';
   }

  ngOnInit() {
    this.getOrderproductList()

    console.log(this.stockData);
    this.imageList = this.allConfigDataService.getConfig('images');
    this.currencyList = this.allConfigDataService.getConfig('listCodeCountry')
    this.currencySymbol = this.currencyList['IND']['currencySymbol']
    this.counter = this.stockData.quantity
  }

  profileModalClose() {
    this.modalCtrl.dismiss()
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
  segmentOnOff(val) {
    this.currentType = val.detail.value;

  }
  inputFiled(){
    this.checkMe = !this.checkMe
  }
  HideTrigger() {
    this.isTrigger = false;
    console.log("hiiii everyone");
  }
  ShowTrigger() {
    this.isTrigger = true;
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
  OnnOff() {
    console.log("hiiii everyone");
    this.TriggerPriceOn = false
  }
  OffOnn() {
    console.log("hiiii Rajesh");
    this.TriggerPriceOn = !this.TriggerPriceOn;
  }

  increment() {

    if (this.MarginReuired > this.AvailableFunds) {
      this.isMargin = true;
    }
    else {

      this.counter++;

      this.MarginReuired = this.counter * this.BseCmp;
    }
  }
  decrement() {
    if (this.counter === 0) {
      this.counter = 0;
      this.MarginReuired = this.counter * this.BseCmp;
    }
    else {

      this.counter--;
      this.MarginReuired = this.counter * this.BseCmp;
    }
  }

  getOrderproductList() {
    let param = {
      "entity_id": "123456",
      "source": "N",
      "data": {
        "client_id": localStorage.getItem("ClientID"),
        "order_no": this.stockData.order_no,
        "segment": "E"
      }
    }

    // this.http.post('http://uat.torusdigital.in:5000/api/v1/wealth/stock/Mpost/OrderDetails', param).subscribe(async (res: any) => {
    //   this.responceData = res.data[0]
    // })

    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.orderDetails, param).subscribe(async (res: any) => {

    // this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.OrderDetails, param).subscribe(async (res: any) => {

      this.responceData = res.data[0]

    })
  }

  buy() {
    let val = null;
    if (this.isTrigger) val = 'DAY'
    if (!this.isTrigger) val = 'IOC'
    else val = 'DAY'


    let param = {
      "custGuId": "",
      "entity_id": "123456",
      "source": "N",
      "data": {
        "client_id": localStorage.getItem("ClientID"),
        "user_id": "",
        "txn_type": this.responceData.txn_type,
        "exchange": this.responceData.exchange,
        "segment": "E",
        "product": this.responceData.product,
        "security_id": this.responceData.security_id,
        "quantity": this.counter?.toString(),
        "validity": val,
        "disc_quantity": "0",
        "trigger_price": this.responceData.trigger_price?.toString(),
        "off_mkt_flag": "false",
        "remarks": "hello",
        "mkt_type": this.responceData.mkt_type,
        "settlor": this.responceData.settlor?.toString(),
        "platform": "Paytmmonney",
        "channel": "Mobile",
        "group_id": "1",
        "order_no": this.responceData.order_no,
        "serial_no": this.responceData.serial_no?.toString()
      }

    }

    if (this.limitPrice){
       param.data["order_type"] = "LMT"
       param.data["price"]= this.limitPrice.toString();

      }
    else {
      param.data["order_type"] = "MKT"
      param.data["price"]= this.responceData.price?.toString();
     }
    this.http.post("https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/OrderModify", param).subscribe(async (res: any) => {
      this.modalCtrl.dismiss("modify")
      if (res) {
        console.log(res, "fshafbkhasbfkasbfksabk");
      }

    })

  }




  sell() {
    let val = null;
    if (this.isTrigger) val = 'DAY'
    if (!this.isTrigger) val = 'IOC'
    else val = 'DAY'


    let param = {
      "custGuId": "",
      "entity_id": "123456",
      "source": "N",
      "data": {
        "client_id": localStorage.getItem("ClientID"),
        "user_id": "",
        "txn_type": this.responceData.txn_type,
        "exchange": this.responceData.exchange,
        "segment": "E",
        "product": this.responceData.product,
        "security_id": this.responceData.security_id,
        "quantity": this.counter?.toString(),
        "validity": val,
        "disc_quantity": "0",
        "trigger_price": this.responceData.trigger_price?.toString(),
        "off_mkt_flag": "false",
        "remarks": "hello",
        "mkt_type": this.responceData.mkt_type,
        "settlor": this.responceData.settlor?.toString(),
        "platform": "Paytmmonney",
        "channel": "Mobile",
        "group_id": "1",
        "order_no": this.responceData.order_no,
        "serial_no": this.responceData.serial_no?.toString()
      }

    }

    if (this.limitPrice){
       param.data["order_type"] = "LMT"
       param.data["price"]= this.limitPrice.toString();

      }
    else {
      param.data["order_type"] = "MKT"
      param.data["price"]= this.responceData.price?.toString();
     }
    this.http.post("https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/OrderModify", param).subscribe(async (res: any) => {
      this.modalCtrl.dismiss("modify")
      if (res) {
      }

    })

  }
  @ViewChild('hiddenText') textEl: ElementRef;
  minWidth: number = 100;
  width: number = this.minWidth;

  async resize(val) {

    if(val){
      this.checkMe=true;
    }else
    {
      this.checkMe=false;
    }
    if (val.key === 'Backspace') {
      this.width = this.width - this.minWidth;
      if (this.width <= this.minWidth) this.width = this.minWidth;
    }
    else this.width = this.width + 15;
  }


  myfun(){

    this.marketValue = !this.marketValue
    if(this.marketValue)this.placeHolder=this.stockData.price
    else this.placeHolder='Market'

    this.limitPriceValue=!this.limitPriceValue
    console.log(this.limitPriceValue);

  }
  tickLimit(e)
  {
    if(e){
      this.checkMe=!this.checkMe;
    }
  }



}
