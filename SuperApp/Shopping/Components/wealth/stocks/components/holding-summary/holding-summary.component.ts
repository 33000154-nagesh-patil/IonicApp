import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'holding-summary',
  templateUrl: './holding-summary.component.html',
  styleUrls: ['./holding-summary.component.scss'],
})
export class HoldingSummaryComponent implements OnInit {
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
  LTPvalueOfHoldings: any;
  investedStockValue: any =0;
  currentStockValue: any =0;
  total: number;
  totalArr: any=[];
  currentStockValueArr: any=[];
  currentStock: any =0;

  constructor(
    private router: Router,
    private http: HttpClient,
    private allConfigDataService: AllConfigDataService
  ) {
    this.environmentAPIList = this.allConfigDataService.getCurrentApiList();
  }

  ngOnInit() {
    this.getproductList();
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

  Explore() {
    this.router.navigate(['stocks/newportFolio']);
  }
}
