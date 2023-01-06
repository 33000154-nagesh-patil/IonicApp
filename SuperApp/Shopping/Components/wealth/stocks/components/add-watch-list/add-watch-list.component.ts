import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { ToastService } from 'projects/core/src/lib/services/toast.service';

@Component({
  selector: 'app-add-watch-list',
  templateUrl: './add-watch-list.component.html',
  styleUrls: ['./add-watch-list.component.scss'],
})
export class AddWatchListComponent implements OnInit {
  imageList: any;
  data: any;
  addWatchlistData: any;
  clickVal: boolean = false;
  val: any;
  @Input() clientId: any;
  getCardRecord;
  addWatchlistDataSymbol: any;
  addWatchlistDataExchange: any;
  @Input() watchList: any;
  ClientCode: any;
  selectedStock: any = [];
  search: any;
  setdec: any;
  setDecimal: any = [];
  num: number;
  constructor(
    private allConfigDataService: AllConfigDataService,
    private router: Router,
    public modalController: ModalController,
    private http: HttpClient,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.ClientCode = localStorage.getItem('ClientID');
    console.log(this.ClientCode, 'ClientID');
    this.getStockData();

    this.imageList = this.allConfigDataService.getConfig('images');

    this.getWatchListData();
  }
  getWatchListData() {
    let data = {
      entity_id: '123456',
      source: 'M',
      data: {
        client_id: this.ClientCode,
        wl_name: this.watchList,
      },
    };
    this.http
      .post(
        'https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/GetWatchListDetails',
        data
      )
      .subscribe((res: any) => {
        for (let i = 0; i < res.data.length; i++) {
          this.selectedStock.push(res.data[i].SEC_ID);
        }
        console.log(this.selectedStock, 'get watchlist Details');

        for (let i = 0; i < res.data.length; i++) {
          this.setdec = res.data[i].LOWER_LIMIT;
          this.num = +this.setdec;
          this.setDecimal.push(this.num.toFixed(2));
        }
        console.log(this.setDecimal, '=======>SET DECIMAL DATA');
      });
  }

  ToggleImg(val) {
    console.log(val);
    let param = {
      entity_id: '100000',
      source: 'A',
      token_id: 'b72d763f83bb8393a493',
      iv: 'o5507uAmo3eDCZ1ZJ2Q+gA==]',
      data: {
        client_id: this.ClientCode,
        wl_name: this.watchList,
        sec_id: val.SEC_ID,
        exch: val.EXCHANGE,
        segment: 'E',
      },
    };

    if (this.selectedStock.includes(val.SEC_ID)) {
      this.selectedStock.splice(this.selectedStock.indexOf(val.SEC_ID), 1);
      this.http
        .post(
          'https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/DeleteSymbolWatchList',
          param
        )
        .subscribe(async (res: any) => {
          console.log(res);
          this.toastService.showAutoToast('Stock Deleted Successfully');
        });
    } else {
      this.selectedStock.push(val.SEC_ID);
      this.http
        .post(
          'https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/AddMktWatchList',
          param
        )
        .subscribe(async (res: any) => {
          console.log(res);
          this.toastService.showAutoToast('Stock Added Successfully');
        });
    }
  }
  getStockData() {
    let data = {
      entity_id: '123456',
      source: 'M',
      data: {
        client_id: this.ClientCode,
        wl_name: 'Nifty 50',
      },
    };

    this.http
      .post(
        'https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/GetWatchListDetails',
        data
      )
      .subscribe((res: any) => {
        this.addWatchlistData = res.data;
      });
  }

  async dismiss() {
    this.modalController.dismiss('data');
  }
}
