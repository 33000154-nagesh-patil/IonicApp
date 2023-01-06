// import { BuyNsellComponent } from './../buy-nsell/buy-nsell.component';
// import { BuyNsellComponent } from '../buy-nsell/buy-nsell.component';
import { BuyNsellComponent } from '../buy-nsell/buy-nsell.component';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'projects/core/src/lib/services/common.service';
// import { CandlechartComponent } from '../candlechart/candlechart.component';
import { WealthWellnessService } from 'projects/wealth-wellness/src/public-api';
import { Router } from '@angular/router';
import { CandlechartComponent } from 'projects/wealth-wellness/src/component/component/wealth-trade/candlechart/candlechart.component';

@Component({
  selector: 'lib-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss'],
})
export class StockDetailsComponent implements OnInit {
  @Input() stockData: any;
  imageList: any;

  segmentModel1: any = 'Overview';
  buyTable = [
    { bid: 0, orders: 0, Qty: 0, sellOffer: 0, sellOrders: 0, sellQty: 0 },
    { bid: 0, orders: 0, Qty: 0, sellOffer: 0, sellOrders: 0, sellQty: 0 },
    { bid: 0, orders: 0, Qty: 0, sellOffer: 0, sellOrders: 0, sellQty: 0 },
    { bid: 0, orders: 0, Qty: 0, sellOffer: 0, sellOrders: 0, sellQty: 0 },
  ];
  displayedColumns: string[] = ['bid', 'orders', 'Qty', 'sellOffer', 'sellOrders', 'sellQty'];
  authMobileGuard: any;
  color: boolean;
  stockText: any = "true";
  currentTextType: string;
  tcsBuy: number;

  constructor(private http: HttpClient, private router:Router,private wellnessService:WealthWellnessService,
     private allConfigDataService: AllConfigDataService, private modalCtrl: ModalController) {
    this.imageList = this.allConfigDataService.getConfig('images');
    //this.stockData = this.router.getCurrentNavigation().extras.state.stockData;
  }

  ngOnInit() {
    this.wellnessService.currentStock.subscribe(async (res:any) => {
      this.stockData=res
    })
    console.log(this.stockData, "stockdata value.....");
    // this.getWatchListData()
  }
ionViewDidEnter(){

}
  changeColor(e) {
    console.log("e", e);
    if (!this.color) {
      this.stockText = "NSE"
    }
    else {
      this.stockText = "BSE"
    }
    this.color = !this.color;
  }



  async openBuySellModal(e) {
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: BuyNsellComponent,
      // cssClass: 'buy-nsell-modal',
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

  // openBuySellModal(e){
  //   this.router.navigate(['Stocks/placeOrder'],{state:{stockData: this.stockData,type: e}})
  // }








  getMobileStatus($event) { }
  segmentChanged($event) { }


  async goToCharts() {
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: CandlechartComponent,
      componentProps: {
        stockData: this.stockData,
      },
      backdropDismiss: true
    });
    modal.present();
  }


  back(){
    // this.modalCtrl.dismiss();
    window.history.back()
  }

  changeColorr(e) {
    console.log("e", e);
    if (!this.color) {
      this.stockText = "NSE"
    }
    else {
      this.stockText = "BSE"
    }
    this.color = !this.color;

  }
}

