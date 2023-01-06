import { CommonService } from './../../../core/src/lib/services/common.service';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexPlotOptions,
  ApexStates,
  ApexTheme,
  ApexTitleSubtitle,
  ChartComponent
} from "ng-apexcharts";
import { retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: any;
  stroke: ApexStroke;
  states: ApexStates;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  theme: ApexTheme;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'lib-silver-holdings',
  templateUrl: './silver-holdings.component.html',
  styleUrls: ['./silver-holdings.component.scss'],
})
export class SilverHoldingsComponent implements OnInit {
  rupeesSymbol: any;
  getCurrency: any;
  gold:any;
  silver:any;
  goldholding:any;
  silverholding:any;
  totalval:any;
  silverpercent:any;
  goldpercent:any;
  goldingrams:any;
  silveringrams:any;
  appEnviron: any;
  breadCrumb: any;
  apiCatalog:any


  @ViewChild("chartObj",{ static: true }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  toggleGold: boolean;
  chartShow: boolean;

  constructor(private http : HttpClient,private allConfigDataService: AllConfigDataService, private router: Router,
     private commonservice:CommonService) {
      this.apiCatalog={
        ...this.allConfigDataService.getConfig('apiCatalog'),

    };
    this.appEnviron =this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Fullfilment/Wealth/DG'
      }

  ngOnInit() {
    // this.getChartData();
    this.getGoldData();
    this.getCurrency = this.allConfigDataService.getConfig('listCodeCountry');
    this.rupeesSymbol = this.getCurrency['IND']['currencySymbol'];

    // this.totalval = this.goldholding + this.silverholding;
    // this.silver = ((this.silverholding/this.totalval) * 100).toFixed(2);
    // this.silverpercent = Number(this.silver);
    // this.gold = 100 - this.silver;

  }


  getGoldData() {

    let params = {
        "uniqueId":localStorage.getItem('ClientCode'),
        "metalType":"gold",

    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getTransactionDetail,params).pipe(retry(3)).subscribe(async (res:any) => {

      this.goldholding = res.totalInvestmentAmount;
      this.goldingrams = res.totalgrams;
      console.log(this.goldholding);
      this.getSilverData(this.goldholding);

    }, (error: any) => {
      // this.errorShow(error?.message, "productList --> Http request");
    })
  }


  getSilverData(goldvalue) {

    let params = {
        "uniqueId":localStorage.getItem('ClientCode'),
        "metalType":"silver",

    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getTransactionDetail,params).pipe(retry(3)).subscribe(async (res:any) => {

      this.silverholding = res.totalInvestmentAmount;
      this.silveringrams = res.totalgrams;
      // console.log(this.silverholding);
      this.totalval = goldvalue + this.silverholding;
      this.gold = ((goldvalue/this.totalval) * 100).toFixed(2);
      this.goldpercent = Number(this.gold);
      this.silver = ((this.silverholding/this.totalval) * 100).toFixed(2);
      this.silverpercent = Number(this.silver);
      this.getChart(this.goldpercent,this.silverpercent);


    }, (error: any) => {
      // this.errorShow(error?.message, "productList --> Http request");
    })
  }



  getChart(Gold,Silver) {
    var self=this;
    if(this.chart)this.chart.destroy();

    this.chartOptions = {
      series: [Gold,Silver],
      chart: {
        type: "donut",
        animations: {
          enabled: true,
          speed: 0
        },
        events: {
         animationEnd: function(ctx) {
          if(self.toggleGold==false){ctx.toggleSeries('Gold');
          }
          if(self.toggleGold==true){ctx.toggleSeries('Silver');
          }
         }
        }
      },


      plotOptions: {
        pie: {
          donut: {
            size:"65px",

            labels: {
              show: true,
              name: {
                show: true,
                color: '#020712',
                formatter: function (val) {
                  return val
                }
              },
              value: {
                show: true,
                fontSize: '25px',
                color: '#020712',
                formatter: function (val) {
                  return val + "%"
                }
              },

              total: {
                show: true,
                label: 'Total',
                fontSize: '13px',
                color: '#0a1721',
                formatter: function (w){
                  return w.globals.seriesTotals.reduce((a,b) => {
                    return (a + b) + "%"
                  })
                }
              },
            }
          },
          expandOnClick: true,
        }
      },

      labels: ["Gold","Silver"],

      responsive: [
        {
          breakpoint: 700,
          options: {
            states : {
                active: {
                  filter : {
                    type: 'none'
                  }
                },
                normal: {
                  filter: {
                    type: 'none',
                    value: 0,
                  }
                },
                hover: {
                  filter: {
                    type: 'none',
                  }
                }
            },

            chart: {
              width: 230,
              height: 230

            },
            dataLabels: {
              enabled: false,
            },

            legend: {
              show: false,
              offsetY: 40,
              offsetX: -60,
              fontSize: '12px',
              position: "right",
              onItemClick: {
                highlightDataSeries: false,
                toggleDataSeries: true,
              },

              chart: {
                dropShadow: {
                  enabled: true,
                  blur: 0,
                  top: 0,
                  opacity: 0
                }
              }
            },
            stroke: {
              show: true,
              curve: 'straight',
              lineCap: 'round',
              width: 1,
              dashArray: 0,

            },
            fill: {
              type: 'gradient',
              colors: ['#9579DA', '#FA6C51'],
              shadeIntensity: 0.5,
            },
          },

        }]

    }
    this.chartShow=true;
  }

  onGold() {
    // this.chart.toggleSeries('Gold');
    // this.chart.destroy();
    this.toggleGold=false;
    this.getChart(this.goldpercent,this.silverpercent);
    // this.chart.render();
  }

  onSilver() {
    // this.chart.toggleSeries('Silver');
    // this.chart.destroy();
    this.toggleGold=true;
    this.getChart(this.goldpercent,this.silverpercent);
    // this.chart.render();
  }
navigateToVault(){
  this.router.navigateByUrl('/VaultBoard/Vault')
}

}
