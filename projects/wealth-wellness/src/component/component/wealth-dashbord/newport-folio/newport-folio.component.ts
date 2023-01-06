import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'lib-newport-folio',
  templateUrl: './newport-folio.component.html',
  styleUrls: ['./newport-folio.component.scss'],
})
export class NewportFolioComponent implements OnInit {
  title = 'Portfolio';
  textName = 'Portfolio';
  imageList: any;
  notificationCount: any = 0;
  cartCount: any = 0;
  labelIcon: any;
  searchStocks: any;
  investValue: any;
  currentValue: any = 0;
  UnrealizedGainAndLossValue: any = 0;
  UnrealizedGainAndLossPercent: any = 0;
  todayGainAndLossValue: any = 0;
  todayGainAndLossValuePercent: any = 0;
  ExploreScreen: boolean;
  environmentAPIList: any;
  totalInvestedVal: any = 0;
  getHoldings: any;
  getTotalInvestedValue: number;
  total: any = 0;
  stockName: any;
  stockqty: any;
  stockPrice: any;
  investedStockValue: number=0;
  currentStockValue: any =[];
  totalArr: any = [];
  investedStockValueArr: any =[];
  currentStock: any =0;
  currentStockValueArr: any =[];

  constructor(
    private allConfigDataService: AllConfigDataService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
    this.getproductList();
  }
  goBack() {
    window.history.back();
  }

  getproductList() {
    let data = {
      entity_id: '1234',
      source: 'N',
      data: {
        client_id: localStorage.getItem('ClientID'),
      },
    };
    this.http
      .post(
        'https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/HoldingDetails',
        data
      )
      .subscribe((res: any) => {
        this.getHoldings = res.data;

        this.getHoldings.map((e) => {
          this.currentStockValue = e.last_traded_price * e.quantity;
          this.currentStockValueArr.push(this.currentStockValue)
          console.log(this.currentStockValueArr,"currentarr");

        });

        this.getHoldings.forEach((e) => {
          this.total = e.quantity * e.cost_price;
          this.totalArr.push(this.total);
        });

        this.totalArr.forEach((element) => {
          this.investedStockValue += element;
        });

        this.currentStockValueArr.forEach((element) => {
          this.currentStock += element;
        });

        this.UnrealizedGainAndLossValue = this.currentStock - this.investedStockValue

      });
  }
}
