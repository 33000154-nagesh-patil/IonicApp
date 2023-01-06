import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { ToastService } from 'projects/core/src/lib/services/toast.service';

@Component({
  selector: 'lib-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss'],
})
export class NewListComponent implements OnInit {
  imageList: any;
  data: any;
  addWatchlistData: any;
  clickVal: boolean = false;
  val: any;
  getCardRecord
  addWatchlistDataSymbol: any;
  addWatchlistDataExchange: any;
  @Input() watchList: any;
  ClientCode: any;
  selectedStock: any = [];
  search: any;
  modalCtrl: any;
  WatchlistArray: any;
  selectedExchange: boolean =false;
  environmentAPIList: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  constructor(
    private allConfigDataService: AllConfigDataService,
    private router: Router,
    public modalController: ModalController,
    private http: HttpClient,
    private toastService: ToastService) {
    this.environmentAPIList = this.allConfigDataService.getCurrentApiList();
    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Shopping/Wealth/ST';
     }


  lists = [
    {
      "title": "Stock Broker",
      "data": "INZ 000172433",
    },
    {
      "title": "CDSL",
      "data": "IN-DP-257-2016",
    },
  ];
  options = [
    {
      "title": "Sensex",
      "data": "NSE",
    },
    {
      "title": "USD",
      "data": "NSE",
    },
    {
      "title": "SGX Nifty",
      "data": "NSE",
    },
    {
      "title": "Nifty 100",
      "data": "NSE",
    },
    {
      "title": "Nifty 200",
      "data": "NSE",
    },
  ];


  ngOnInit() {

    this.ClientCode = localStorage.getItem('ClientID');
    this.getStockData();

    this.imageList = this.allConfigDataService.getConfig('images')


    this.getWatchListData();
  }
  getWatchListData() {
    let data = {
      "entity_id": "123456",
      "source": "M",
      "data": {
        "client_id": this.ClientCode,
        "wl_name": this.watchList
      }
    }

  }


  // getproductList() {
  //   let data = {
  //     "CFT": "Shopping",
  //     "Product": "Stocks",
  //     "FileName": "getAllStock"
  //   }
  //   this.http.post("http://uat.torusdigital.in/api/v1/Dummy/get/generalApi", data).subscribe(
  //     (res: any) => {
  //       this.addWatchlistData = res.productListStocks;
  //       console.log("Al-------ADD WATCHLIST----------->", this.addWatchlistData);
  //     }
  //   )
  // }

  ToggleImg(val) {
    console.log(val);

    let param = {
      "entity_id": "100000",
      "source": "A",
      "token_id": "b72d763f83bb8393a493",
      "iv": "o5507uAmo3eDCZ1ZJ2Q+gA==]",
      "data": {
        "client_id": this.ClientCode,
        "wl_name": this.watchList,
        "sec_id": val.SEC_ID,
        "exch": val.EXCHANGE,
        "segment": "E"
      }
    }

    if (this.selectedStock.includes(val.SEC_ID)) {
      this.selectedStock.splice(this.selectedStock.indexOf(val.SEC_ID), 1);
      this.http.post('https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/DeleteSymbolWatchList', param).subscribe(async (res: any) => {
        console.log(res);
        this.toastService.showAutoToast("Stock Deleted Successfully")
      })
    }
   
    else {
      this.selectedStock.push(val.SEC_ID);

      this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.addWatchList, param).subscribe(async (res: any) => {
      // this.http.post('https://apixuat.heytorus.com/api/v1/wealth/stock/Mpost/AddMktWatchList', param).subscribe(async (res: any) => {
      //   this.toastService.showAutoToast("Stock Added Successfully")
      // })

      // this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.AddMktWatchList,param).subscribe(async (res: any) => {
          this.toastService.showAutoToast("Stock Added Successfully")
        })


    }
  }
  getStockData() {
    let data = {
      "entity_id": "123456",
      "source": "M",
      "data": {
        "client_id": this.ClientCode,
        "wl_name": "Nifty 50"
      }
    }

    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getWatchList, data).subscribe(async (res: any) => {
    // this.http.post("https://apixuat.heytorus.com/api/v1/wealth/stock/Mpost/GetWatchListDetails", data).subscribe(
    //   (res: any) => {
    //     this.addWatchlistData = res.data;
    //   })

    // this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.GetWatchListDetails,data).subscribe(
    //     (res: any) => {
          this.addWatchlistData = res.data;
        })
  }
  async goTonewList() {
    const modal = await this.modalCtrl.create({
      component: NewListComponent,
      backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {
    })
    modal.present();
  }
  async dismiss() {
    this.modalController.dismiss("data")
  }
  selectExc(){
    this.selectedExchange=!this.selectedExchange
  }
}
