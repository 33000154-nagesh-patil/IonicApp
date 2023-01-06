import { SnapshotModelComponent } from './../../capability/components/snapshot-model/snapshot-model.component';
import { WebSocketServiceForStocks } from 'SuperApp/Shopping/Services/stockswebsocket.service';
// import { element } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService, CommonService } from 'index';
import { LoaderService } from 'index';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
// import dgVault from '../../../src/assets/vault/dgVault.json'
// import vault from '../../../src/assets/vault/vault.json'
// import mfvault from '../../../src/assets/vault/mfvault.json'
// import learn from '../../../src/assets/vault/eduLearn.json'
// import assessment from '../../../src/assets/vault/assessmentLearn.json'
// import jobs from '../../../src/assets/vault/jobsLearn.json'
// import stocksTrade from '../../../src/assets/vault/stocksTrade.json'
import appLayout from '../../Engagement/Dashboard Json/getLayout.json';
import { UnsubBehaviour } from 'src/app/unsubscribe.class';
import { finalize, takeUntil } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
// import healthLabtest from '../../../src/assets/vault/labtestTrack.json'


@Component({
  selector: 'app-vault',
  templateUrl: './vault.component.html',
  styleUrls: ['./vault.component.scss'],
})
export class VaultComponent extends UnsubBehaviour implements OnInit,OnDestroy {

  SellData: any;
  Invesment: any
  Data: any;
  routing: any
  appEnvironment = this.allConfigDataService.getConfig("environmentType");
  imageList = this.allConfigDataService.getConfig("images");
  cartCount
  notificationCount
  @Input() segment: any;
  listing: any
  getPositionPL: boolean = false
  orderCard: boolean = true
  trade: boolean = false
  position: boolean = false
  @Input() singleRowCardData: any
  breadCrumb: any;
  apiCatalog: any = {
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "environment": this.allConfigDataService.getConfig('environmentType'),
  };
  footerListData: any;
  stOrderBook: any;
  OrderId: any;



 

  constructor(

    private allConfigDataService: AllConfigDataService,
    private http: HttpClient,
    private router: Router,
    private eduService: eduService,
    public commonService: CommonService,
    private loaderService: LoaderService,
    private stockWebsocket: WebSocketServiceForStocks,
    private modalCtrl:ModalController
  ) {
    super()

  }

  ngOnInit() {
  
    this.imageList = this.allConfigDataService.getConfig('images');

    this.commonService.footerData.subscribe(async (res: any) => {
      this.footerListData = appLayout[res].footer
    })

    this.eduService.categoryValueForAPI.subscribe(val => {
      this.apiCatalog['breadCrumb'] = 'Operations/' + val['categoryLanding'] + '/' + val['productLanding']
      console.log("Listing",this.apiCatalog['breadCrumb'])
      this.routing = val['productLanding']
    })



    if (this.routing == 'ST') this.segment = 'Orders'

    if (this.routing == 'stock') this.segment = this.Data?.objectContent[0].segmentValues[0]?.title


 
  }

ionViewDidEnter(){
    this.websocketStocks()
  }
 
  websocketStocks() {


    let param = {
      "TokenId": localStorage.getItem('id_token')
    }


    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog['breadCrumb'] + this.apiCatalog.getPortFolioList, param)
      .subscribe((data) => {
        this.Data = data
        this.Data?.objectContent[0]?.Orders.forEach(element => {
          if (this.routing == 'ST') this.subToWS(element)

        })
      })
      }
    

subToWS(element: any) {
  let name = element.row1.symbol.split("-")
  if (["FUT", "PE", "CE"].includes(name[name.length - 1])) {
    this.stockWebsocket.sendData(12,element.row1.id,2)
  }
  else this.stockWebsocket.sendData(12,element.row1.id,element.row2.ExchangeName=="NSE"?1:4)

  this.stockWebsocket.currentMessage
    .pipe(
      takeUntil(this.UnSubscribe),
      finalize(()=>{
        if (["FUT", "PE", "CE"].includes(name[name.length - 1])) {
          this.stockWebsocket.sendData(13,element.row1.id,2)
        }
        else this.stockWebsocket.sendData(13,element.row1.id,element.row2.ExchangeName=="NSE"?1:4)
      }
    )
    )
    .subscribe(async (res: any) => {
        if (res.SEC_ID == element.row1.id) {
          if(res.msgCode==1)element.price=res.LTP
          if (this.stockWebsocket.time> 55800&&res.msgCode1 == 3) element.fClose = res.PClose
          else if(this.stockWebsocket.time<=55800&&res.fifthmsgCode == 32) element.fClose = res.fClose
          let per = Number(element.price - element.fClose).toFixed(2);
          element.row1.price = Number(element.price ).toFixed(2) + " (" + ((Number(per)/element.price)*100).toFixed(2) + "%)";
      }
    });
}

  homeEvent(val) {
        // this.changeBannerData('1')
        this.commonService.goToLandingHome.next("home");
        this.router.navigate([val])
      }
  MainCardAction(element) {
        let OrderTitle = {
      name: (this.Data?.Cards[element]?.title)?this.Data?.Cards[element]?.title:"",
      price: (this.Data?.Cards[element]?.price)?this.Data?.Cards[element]?.price:"",
          id: "",
          button: "",
        }
    this.eduService.pricePerUnit.next(OrderTitle)
    this.eduService.fromVault.next("True")
    this.router.navigate([this.Data?.Cards[element]?.redirect]);
      }
  ListCardAction(params) {
        let obj = {
          "id": (params?.id) ? Number(params?.id) : "",
          "title": (params?.title) ? (params?.title) : "",
          "favList": (params?.favList) ? (params?.favList) : "",
          "TokenId": localStorage.getItem('id_token'),
      "order_id":(params?.order_id) ? Number(params?.order_id) : undefined,
        }
    this.eduService.detailParams.next(obj)
    this.eduService.fromVault.next("True")
    this.router.navigate(['/Shopping/Details']);
      }

  toStirng(val) {
        return JSON.parse(JSON.stringify(val).replace('â‚¹', '₹').toString());
      }
  segmentChanged(ev: any) {
    if (this.segment == 'order') {
      this.orderCard = true
      // this.stTradeBook()
    }
    if (this.segment == 'trade') {
      this.trade = true
      this.orderCard = false
      this.position = false
    }
    else {
      this.trade = false
    }
    if (this.segment == 'position') {
      this.getPositionPL = true;
      this.position = true
      this.trade = false
      this.orderCard = false
    }
    else {
      this.position = false
    }

  }
  StartInvesting(){
    this.router.navigate(['/Shopping/listing']);
  }

  async snapShot(val) {
    const modal = await this.modalCtrl.create({
      component: SnapshotModelComponent,
      componentProps: {
      data: val

      },
      backdropDismiss: false
    });


    return await modal.present();
  }

 

}
