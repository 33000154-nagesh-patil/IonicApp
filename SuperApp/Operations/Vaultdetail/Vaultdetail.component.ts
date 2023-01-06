import { WebSocketServiceForStocks } from './../../Shopping/Services/stockswebsocket.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AllConfigDataService, LoaderService } from 'index';
import { Router } from '@angular/router';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { UnsubBehaviour } from 'src/app/unsubscribe.class';

@Component({
  selector: 'app-detail',
  templateUrl: './Vaultdetail.component.html',
  styleUrls: ['./Vaultdetail.component.scss'],
})
export class DetailComponentOperation extends UnsubBehaviour implements OnInit {
  [x: string]: any;
  imageList: any;
  Params: any
  notificationCount: any
  Data: any = {}
  routing: any = "";
  cartCount: any
  orderMessage: any;
  successMsg: boolean= false;
  breadCrumb4: string = "Wealth/ST";
  my:any="custColorWhite custFontFamilyMuliBold muli-16pt"
  apiCatalog: any = {
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "environment": this.allConfigDataService.getConfig('environmentType'),
  };
  listing: any;
  environment:any=this.allConfigDataService.getConfig('environmentType')
  linechart9: any;
  formPopUp: boolean = false;
  neoBank: any
  Vault: any
  action: any;
  orderId: any;
  billpaymentCards: any;
  vault: {};


  constructor(private loaderService: LoaderService,
    private stockWebsocket: WebSocketServiceForStocks,

    private eduService: eduService, private router: Router, private http: HttpClient,
    private allConfigDataService: AllConfigDataService) {
super()
  }
  ngOnDestroy(): void {
    
  }
  ngOnInit() {
    this.getbreadCrumb()
    this.imageList = this.allConfigDataService.getConfig('images');
    setTimeout(() => {
      this.getvalue()
    });


    this.imageList = this.allConfigDataService.getConfig('images');
  }

  getbreadCrumb() {
    this.eduService.categoryValueForAPI
    .pipe(takeUntil(this.UnSubscribe))
    .subscribe(val => {
      this.apiCatalog['breadCrumb'] = "Operations/" + val["categoryLanding"] + "/" + val['productLanding']
      this.apiCatalog['breadCrumb1'] = "Shopping/" + val["categoryLanding"] + "/" + val['productLanding']
      this.routing = val['productLanding']

    })
  }

  async getvalue() {
    this.Params = {}
    this.eduService.fromVault
    .pipe(takeUntil(this.UnSubscribe))
    .subscribe((val) => {
      this.Vault = val
    })
    this.eduService.detailParams
    .pipe(takeUntil(this.UnSubscribe))
    .subscribe((val) => {
      this.Params = val
      this.vault = val
      this.orderId = this.Params.id
      this.Params.order_id?this.Params.id = this.Params.order_id:''
    })
    if (this.Vault == "False") {
      this.loaderService.showLoader();
      this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog["breadCrumb1"] + this.apiCatalog.getDetail, this.Params)
      .pipe(takeUntil(this.UnSubscribe))
        .subscribe((data) => {
          this.Data = data
          this.loaderService.hideLoader();
          this.billpaymentCards=this.Data[this.Params.title]
            this.setStock()
        }, (error) => {
          this.loaderService.hideLoader();
          this.alertService.showAlert("Error", "", error.toString(), "Ok")
        })
    } else {
      this.loaderService.showLoader();
      this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog["breadCrumb"] + this.apiCatalog.getPortfolio, this.Params)
      .pipe(takeUntil(this.UnSubscribe))
        .subscribe((data) => {
          this.Data = data
          this.setStock()
          this.loaderService.hideLoader();
        }, (error) => {
          this.loaderService.hideLoader();
          this.alertService.showAlert("Error", "", error.toString(), "Ok")
        })

    }
  }

  InvestNow(e) {
    if(e == "Cancel"){
      this.action = "Cancel"
    }
    if(e == "Add More"){
      this.action = "BUY"
    }
    if(e == "Sell"){
      this.action = "SELL"
    }
    console.log(e,"Rajesh2020");

    let obj = {
      name: this.Data.heading,
      price: this.Data.price,
      id: this.orderId,
      button: this.action
    }
    if(e=="Cancel"){
      this.successMsg = true;
      this.cancelOrder()
    }else {

      this.eduService.pricePerUnit.next(obj)
      this.router.navigate(["/Shopping/OrderBook"])
    }

  }
  toString(val) {
    return JSON.parse(JSON.stringify(val).replace('â‚¹', '₹').toString());
  }
  setStock() {
    let name = this.Data.title.split("-")

  if (["FUT", "PE", "CE"].includes(name[name.length - 1])) {
    this.stockWebsocket.sendData(12,this.orderId,2)
  }
else this.stockWebsocket.sendData(12,this.orderId,this.Data.ExchangeName=="NSE"?1:4)
  //   this.stockWebsocket.sendData(this.orderId, "FO")
  // }
  // else this.stockWebsocket.sendData(this.orderId, this.Data.ExchangeName ?this.Data.ExchangeName : "NSE");
    if (this.routing=="ST")
      this.stockWebsocket.currentMessage
      .pipe(takeUntil(this.UnSubscribe),
      finalize(() => {
        if (["FUT", "PE", "CE"].includes(name[name.length - 1])) {
          this.stockWebsocket.sendData(13,this.orderId,2)
        }
      else this.stockWebsocket.sendData(13,this.orderId,this.Data.ExchangeName=="NSE"?1:4)
      }))
      .subscribe(async (res: any) => {
        // for (let x of res) {
          if (res.SEC_ID == this.orderId) {
            // for (let i in this.Data.Chart.value) {
            //   this.Data.Chart.value = Number(x.LTP).toFixed(2) + " | " + Number(x?.Change).toFixed(2) + " | " + " (" + Number(x?.PerChange).toFixed(2) + "%)";
            // }
            this.Data.Cards[0].row[0]["Current Price"] = Number(res.LTP).toFixed(2);
            // this.Data.Cards[0].row[0]["Current percentge"] = Number(x?.PerChange).toFixed(2) + "%";
            // this.Data.Cards[0].row[1]["High"] = Number(x.fHigh).toFixed(2);
            // this.Data.Cards[0].row[1]["Open"] = Number(x.fOpen).toFixed(2);
            // this.Data.Cards[0].row[2]["52 Week High"] = Number(x.F52WKHIGH).toFixed(2);
            // this.Data.Cards[0].row[2]["Low"] = Number(x.fLow).toFixed(2);
            // this.Data.Cards[0].row[3]["Lower-circuit"] = Number(x.LCkt).toFixed(2);
            // this.Data.Cards[0].row[3]["Pre Close"] = x.PClose;
            // this.Data.Cards[0].row[4]["Upper-circuit"] = Number(x.UCkt).toFixed(2);
            // this.Data.Cards[0].row[4]["52 Week Low"] = Number(x.F52WKLOW).toFixed(2);
            // this.Data.Cards.row[5]["Avg Traded Price"] = Number(x?.ATP)?.toFixed(2);
          // }
        }
        // if (res.secid == this.orderId) {
        //   date.getHours() >= 15 && date.getMinutes() >= 30 ? '' : this.Data.Cards.row[0]["Current Price"] = Number(res.val).toFixed(2);
        //   // date.getHours() >= 15 && date.getMinutes() >= 30 ? '' : this.Data.Cards.row[0]["Current percentge"] = Number( (res.val - (this.Data.Cards.row[1]["Pre Close"]))/ (this.Data.Cards.row[1]["Pre Close"]) * 100).toFixed(2);
        //   // this.Data.Cards.row[5]["Traded Qty"] = Number(res.VOL).toFixed(2);
        // }
      });
  }
  cancelOrder(){
    let param = {
      "TokenId": localStorage.getItem("id_token"),
      "off_mkt_flag": "false",
      "Internal Order No.": this.Data.Cards[0].row[1]["Internal Order No."]
    }
    this.http.post(this.apiCatalog.baseURL[this.environment] + "Fullfilment/" + this.breadCrumb4 +this.apiCatalog.StcancelOrder,param)
    .pipe(takeUntil(this.UnSubscribe))
    .subscribe((res: any) => {
      this.orderMessage = res.message
    console.log(res,"cancelOrder");
    })
  }
  close(){
    this.successMsg = false;
    this.router.navigate(['/Operation/Vault']);
  }


}



