import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService, CommonService } from 'index';
import { ModalController } from '@ionic/angular';
// import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { WebSocketServiceForStocks } from 'SuperApp/Shopping/Services/stockswebsocket.service';
import { takeUntil } from 'rxjs/operators';
import { UnsubBehaviour } from 'src/app/unsubscribe.class';


@Component({
  selector: 'app-explore-portfolio',
  templateUrl: './explore-portfolio.component.html',
  styleUrls: ['./explore-portfolio.component.scss'],
})
export class ExplorePortfolioComponent extends UnsubBehaviour implements OnInit {
  @Input() data: any;
  singleRowCardData: any;
  segment: any;
  imageList: any = this.allConfigDataService.getConfig("images");
  allconfig: any;
  Data: any = {};
  holdingData: any;
  apiCatalog: any = {
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "environment": this.allConfigDataService.getConfig('environmentType'),
    "breadCrumb": "Operations/Wealth/ST"
  };
  subHeading: any;
  percentChange: string;
  CloseValue: any;
  price: string;
  totalValue: any = 0;
  totalLossNgain: any;

  constructor(
    private router: Router,
    private https: HttpClient,
    private allConfigDataService: AllConfigDataService,
    private eduservice: eduService,
    private modalController: ModalController,
    private stockWebsocket: WebSocketServiceForStocks,
    private commonService: CommonService

  ) {
    super()
  }

  ngOnInit() {
    this.holdingDetails()
    // this.getCurrentPl()

    this.singleRowCardData = this.data;
    // this.segment = this.singleRowCardData.segmentValues[0]?.title;
    this.imageList = this.allConfigDataService.getConfig('images');
  }
  showDetails(x){
    x.showDetails?x.showDetails=false:x.showDetails=true;
  }
  gotoDetails(val) {
    this.commonService.setExchangeValue(val.qty)
    // let value11=this.commonService.getExchangeValue()
    console.log(val, "Rajesh2023");




    let myObj = {};
    this.eduservice.categoryValueForAPI.subscribe((obj) => {
      obj['productLanding'] = 'ST';
      myObj = obj;
    });
    let obj = {
      "id": Number(val[ "nseSecurityId"]),
      "title": (val?.symbol),
      "favList": "",
      "TokenId": localStorage.getItem('id_token')
    }
    this.commonService.setExchangeValue(val.exchange)
    this.eduservice.detailParams.next(obj)
    this.eduservice.fromVault.next("True")
    this.router.navigate(['Shopping/Detail'], {
      state: { listing: '', listing1: '' },
    });
    console.log("bhjfubgv");
    this.modalController.dismiss();

  }
  goBack() {
    this.modalController.dismiss();
  }

  holdingDetails() {
    let param = {
      "TokenId": localStorage.getItem("id_token")
    }
    this.https.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog['breadCrumb'] + this.apiCatalog.getPortFolioSummary, param).subscribe((res: any) => {
      this.holdingData = res.portfolioSummary;
      console.log(this.holdingData, "this.holdingData");


      // let currentTotal=0
      for (let x of this.holdingData) {
        let name = x.symbol.split("-");
        if (["FUT", "PE", "CE"].includes(name[name.length - 1])) {
          this.stockWebsocket.sendData(12, x["nseSecurityId"], 2)
        }
        else this.stockWebsocket.sendData(12, x["nseSecurityId"], x.exchange? 1 : 4)
      }
      if(this.holdingData)this.stockWebsocket.currentMessage
        .pipe(takeUntil(this.UnSubscribe),)
        .subscribe(async (item: any) => {
          for (let x of this.holdingData) {
            if (item.SEC_ID == x["nseSecurityId"]) {
              if (this.stockWebsocket.time > 55800 && item.msgCode1 == 3) x.fClose = item.PClose
              else if (this.stockWebsocket.time <= 55800 && item.fifthmsgCode == 32) x.fClose = item.fClose


              if (item.msgCode == 1) {
                x.price = Number(item.LTP?.toFixed(2))
                x.priceChange = Number(x.price - (x.avgPrice ? x.avgPrice : x.costPrice));
                x.percentChange = (((x.price - Number(x.fClose)) / x.price) * 100)?.toFixed(2);
                x.MktUpDown = Number(x.price - x.fClose).toFixed(2);
              }
            }


            // }
          }


        });


    })


  }

  getCurrentValue() {
    if (!this.holdingData) return
    let currentTotal = 0
    for (let x of this.holdingData) {
      currentTotal += parseFloat((x.qty * x.price).toFixed(2))
    }
    return currentTotal;
  }

  getInvestedvalue() {
    if (!this.holdingData) return
    let investedvalue = 0
    for (let x of this.holdingData) {
      investedvalue += parseFloat((x.qty * x.avgPrice).toFixed(2))
    }
    return investedvalue;
  }


  getUnrealisedValue() {
    if (!this.holdingData) return
    let unrealisedValue = 0
    for (let x of this.holdingData) {
      unrealisedValue += parseFloat(((x.qty * x.price) - (x.qty * x.avgPrice)).toFixed(2))
    }
    return unrealisedValue;
  }

  getTodaysGainLoss() {
    if (!this.holdingData) return
    let todaysGainLoss = 0
    for (let x of this.holdingData) {
      todaysGainLoss += parseFloat((x.qty * x.MktUpDown).toFixed(2))
    }
    return todaysGainLoss;
  }


  InvestNow() {

  }

  @HostListener('unloaded')
    ngOnDestroy(): void {
      for (let x of this.holdingData) {
        let name = x.symbol.split("-");
        if (["FUT", "PE", "CE"].includes(name[name.length - 1])) {
          this.stockWebsocket.sendData(13, x["nseSecurityId"], 2)
        }
        else this.stockWebsocket.sendData(13, x["nseSecurityId"], x.exchange? 1 : 4)
      }
    }


}
