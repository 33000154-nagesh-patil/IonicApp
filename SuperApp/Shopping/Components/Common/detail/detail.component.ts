import { WebSocketServiceForStocks } from 'SuperApp/Shopping/Services/stockswebsocket.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllConfigDataService, CommonService, LoaderService } from 'index';
import { Router } from '@angular/router';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { UnsubBehaviour } from 'src/app/unsubscribe.class';
import { AlertService } from 'projects/core/src/lib/services/alert.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent extends UnsubBehaviour implements OnInit,OnDestroy {
  // [x: string]: any;
  imageList: any;
  Params: any
  notificationCount: any
  Data: any = {}
  routing: any = "";
  cartCount: any
  foTitle: any;

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
  vault: {};
  orderId: any;
  billpaymentCards: any;


  constructor(private loaderService: LoaderService,
    private stockWebsocket: WebSocketServiceForStocks,
    private alertService:AlertService,
    private eduService: eduService, private router: Router, private http: HttpClient,
    private allConfigDataService: AllConfigDataService,
    private commonService:CommonService) {
super()
  }
  ngOnInit() {

    this.getbreadCrumb()
    this.imageList = this.allConfigDataService.getConfig('images');
    


    this.imageList = this.allConfigDataService.getConfig('images');
  }
ionViewDidEnter(){
  setTimeout(() => {
    this.getvalue()
  });
}
  getbreadCrumb() {
    this.eduService.categoryValueForAPI.subscribe(val => {
      this.apiCatalog['breadCrumb'] = "Operations/" + val["categoryLanding"] + "/" + val['productLanding']
      this.apiCatalog['breadCrumb1'] = "Shopping/" + val["categoryLanding"] + "/" + val['productLanding']
      this.routing = val['productLanding']

    })
  }

  async getvalue() {
    this.Params = {}
    this.eduService.fromVault.subscribe((val) => {
      this.Vault = val
    })
    this.eduService.detailParams.subscribe((val) => {
      this.Params = val
      this.vault = val
      this.orderId = this.Params.id
      this.foTitle = this.Params.title
    this.commonService.setTitle(this.foTitle)

    })
    if (this.Vault == "False") {
      this.loaderService.showLoader();
      this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog["breadCrumb1"] + this.apiCatalog.getDetail, this.Params)
        .subscribe((data) => {
          this.Data = data
          this.loaderService.hideLoader();
          this.billpaymentCards=this.Data[this.Params.title]
           if(this.Data) this.setStock()
        }, (error) => {
          this.loaderService.hideLoader();
          this.alertService.showAlert("Error", "", error.toString(), "Ok")
        })
    } else {
      this.loaderService.showLoader();
      this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog["breadCrumb"] + this.apiCatalog.getPortfolio, this.Params)
        .subscribe((data) => {
          this.Data = data;

          if(this.Data)this.setStock()
          this.loaderService.hideLoader();
        }, (error) => {
          this.loaderService.hideLoader();
          this.alertService.showAlert("Error", "", error.toString(), "Ok")
        })

    }
  }

  InvestNow(e) {
    let obj = {
      name: this.Data.heading,
      price: this.Data.price,
      // value:this.Data.Chart.value,
      id: this.orderId,
      button: e,
    }
    this.eduService.pricePerUnit.next(obj)
    this.router.navigate(["/Shopping/OrderBook"])
  }
  toString(val) {
    return JSON.parse(JSON.stringify(val).replace('â‚¹', '₹').toString());
  }


  setStock() {
    
    let name = this.Data.title.split("-");
    if(["FUT","PE","CE"].includes(name[name.length - 1])){
      this.stockWebsocket.sendData(12,this.orderId,2)
    }
  else this.stockWebsocket.sendData(12,this.orderId,this.commonService.getExchangeValue()=="NSE"?1:4)
    if (this.routing=="ST")
      this.stockWebsocket.currentMessage
      .pipe(takeUntil(this.UnSubscribe),
      
      finalize(()=>{
        let name = this.Data.title.split("-");
    if(["FUT","PE","CE"].includes(name[name.length - 1])){
      this.stockWebsocket.sendData(13,this.orderId,2)
    }
  else this.stockWebsocket.sendData(13,this.orderId,this.commonService.getExchangeValue()=="NSE"?1:4)
      }))
      .subscribe(async (item: any) => {
        
          // const found = res.some(e => e.SEC_ID == this.orderId)
          // if(!found){
          //   setTimeout(() => {
          //     if(["FUT","PE","CE"].includes(name[name.length - 1])){
          //       this.stockWebsocket.sendData(this.orderId,"FO")
          //     }
          //   else this.stockWebsocket.sendData(this.orderId,this.Data.Exchange?this.Data.Exchange:"NSE")
          //   }, 1000);
          // }else{
          //   res.map(item =>{
              if(item.SEC_ID == this.orderId){
                if(item.msgCode1 == 3){
                  this.Data.PClose=item.PClose
                }if(item.fifthmsgCode == 32){
                  this.Data.fClose=item.fClose
                }
                let lossAndGainPer,lossAndGain
                if(item.msgCode==1)this.Data.Cards[0].row[0]["Current Price"] = item.LTP.toFixed(2);
                let price = this.Data.Cards[0].row[0]["Current Price"]
                if (this.stockWebsocket.time> 55800) {
                   lossAndGainPer =  (((price - this.Data.PClose)/price)*100).toFixed(2)
                 lossAndGain = (price - this.Data.PClose).toFixed(2);
                }
                else if(this.stockWebsocket.time<=55800){
                  
                   lossAndGainPer =  (((price - this.Data.fClose)/price)*100).toFixed(2)
                    lossAndGain = (price - this.Data.fClose).toFixed(2);
                }
                //  lossAndGainPer =  (((item.LTP - item.fClose)/item.LTP)*100).toFixed(2)
                //  lossAndGain = (item.LTP - item.fClose).toFixed(2);
                this.Data.Cards[0].row[0]["Current percentge"] = lossAndGainPer + " %";
                if(item.msgCode1==3){
                  this.Data.Cards[0].row[1]["High"] = item?.fHigh?.toFixed(2);
                  this.Data.Cards[0].row[1]["Open"] = item?.fOpen?.toFixed(2);
                  this.Data.Cards[0].row[2]["Low"] = item?.fLow?.toFixed(2);
                }
                if(item.sixthmsgCode==36){
                  this.Data.Cards[0].row[2]["52 Week High"] = item?.F52WKHIGH.toFixed(2);
                  this.Data.Cards[0].row[4]["52 Week Low"] = item?.F52WKLOW?.toFixed(2);
                }if(item.sixth2msgCode == 33){
                  this.Data.Cards[0].row[3]["Lower-circuit"] = item?.LCkt?.toFixed(2);
                this.Data.Cards[0].row[4]["Upper-circuit"] = item?.UCkt?.toFixed(2);
                }
                
                this.Data.Cards[0].row[3]["Pre Close"] = this.Data?.PClose?.toFixed(2);
                // this.Data.Cards[0].row[5]["Avg Traded Price"] = parseFloat(i?.ATP)?.toFixed(2);
                this.Data.Chart.value = price + " | " + lossAndGain + " | "  + lossAndGainPer +" %" ;
              }
            // });
          // }
        

        ////////////////////////////////////////////
        // for (let x of this.Data.Cards[0].row) {
         
        //   if (res.previousClose.length > 0) {
        //     const found = res.previousClose.some(e => e.SEC_ID == this.orderId)
        //     // console.log(found,this.orderId);
        //     if (!found) this.stockWebsocket.sendData(this.orderId,this.Data.Exchange?this.Data.Exchange:"NSE")
           
            
            
        //     for (let i of res.previousClose) {
        //       if (i.SEC_ID == this.orderId) {
        //         let fClose
        //         if (i.fClose > 0.5)  fClose = i.fClose
        //         if (i.LTPval > 0.5) {
        //           // x.row1.price = Number(i.LTPval).toFixed(2);
        //           let lossAndGainPer =  Number(((Number(i.LTPval) - Number(fClose)) / Number(i.LTPval)) * 100)?.toFixed(2) ;
        //           let lossAndGain = Number(parseFloat(i.LTPval) - parseFloat(fClose)).toFixed(2);
        //           this.Data.Cards[0].row[0]["Current Price"] = parseFloat(i.LTPval).toFixed(2);
        //           this.Data.Cards[0].row[0]["Current percentge"] = lossAndGainPer + " %";
        //           this.Data.Cards[0].row[1]["High"] = parseFloat(i.fHigh).toFixed(2);
        //           this.Data.Cards[0].row[1]["Open"] = parseFloat(i.fOpen).toFixed(2);
        //           this.Data.Cards[0].row[2]["52 Week High"] = parseFloat(i.fiftyweekhigh).toFixed(2);
        //           this.Data.Cards[0].row[2]["Low"] = parseFloat(i.fLow).toFixed(2);
        //           this.Data.Cards[0].row[3]["Lower-circuit"] = parseFloat(i.LCkt).toFixed(2);
        //           this.Data.Cards[0].row[3]["Pre Close"] = fClose;
        //           this.Data.Cards[0].row[4]["Upper-circuit"] = parseFloat(i.UCkt).toFixed(2);
        //           this.Data.Cards[0].row[4]["52 Week Low"] = parseFloat(i.fiftyweeklow).toFixed(2);
        //           // this.Data.Cards[0].row[5]["Avg Traded Price"] = parseFloat(i?.ATP)?.toFixed(2);
        //           this.Data.Chart.value = parseFloat(i.LTPval).toFixed(2) + " | " + parseFloat(lossAndGain).toFixed(2) + " | "  + Number(((Number(i.LTPval) - Number(fClose)) / Number(i.LTPval)) * 100).toFixed(2) ;
        //           break;
        //         }
        //       }//open //Current percentge//52 Week High
        //     }
        //   }
        //   else {
        //     // setTimeout(() => {
        //     //   this.stockWebsocket.sendData(this.orderId, x?.row2?.ExchangeName)
        //     // }, 1000);
        //   }
        // // }

      });
  }


}





