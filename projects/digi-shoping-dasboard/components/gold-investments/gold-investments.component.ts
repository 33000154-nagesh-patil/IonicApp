import { Router } from '@angular/router';
import { retry } from 'rxjs/operators';
// import { AllConfigDataService } from './../../services/all-config-data.service';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Chart } from 'chart.js';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
// import chartdata from 'src/assets/digiGold/digigold.json'
// import { DigigoldVaultPage } from 'src/app/features/digigold-vault/digigold-vault.page';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-gold-investments',
  templateUrl: './gold-investments.component.html',
  styleUrls: ['./gold-investments.component.scss'],
})
export class GoldInvestmentsComponent implements OnInit {

  rupeesSymbol: any;
  getCurrency: any;
  data: any;
  data1: any
  labels: any;
  datas: any;
  goldholding: any;
  goldholdinggram: any;
  labelsData: any;
  dataData: any;
  price: any;
  labelCount: any;
  aboveValue: boolean = false;
  belowValue: boolean = true;
  newDate: any = new Date()
  appEnviron: any;
  breadCrumb: any;
  getTransactionBreadCrumb:any
  apiCatalog:any

  constructor(private http: HttpClient, private allConfigDataService: AllConfigDataService,
    private router: Router, private loaderService: LoaderService,
     private commonservice: CommonService) {
      this.apiCatalog={
        ...this.allConfigDataService.getConfig('apiCatalog'),

    };
    this.appEnviron =this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Shopping/Wealth/DG',
    this.getTransactionBreadCrumb='Fullfilment/Wealth/DG'
      }

  ngOnInit() {
    this.getChartData();
    this.getCurrency = this.allConfigDataService.getConfig('listCodeCountry');
    this.rupeesSymbol = this.getCurrency['IND']['currencySymbol'];
    // this.data = chartdata;

    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getDigiGoldRate,{}).pipe(retry(3)).subscribe(async (res: any) => {
      // if(res.status!=200) this.ngOnInit()

      this.data1 = await res.result.data.rates
      this.price = (this.data1.gBuy)
      // if(res.productListGoldSilver) this.loderservices.hideLoader()
    });






  }


  getChartData() {

    let params = {
      "uniqueId": localStorage.getItem('ClientCode'),
      "metalType": "gold",

    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.getTransactionBreadCrumb+this.apiCatalog.getTransactionDetail,params).pipe(retry(3)).subscribe(async (res: any) => {

      // console.log(res);
      this.data = res;
      this.goldholding = res.totalInvestmentAmount.toFixed(4);
      this.goldholdinggram = parseFloat(res.totalgrams).toFixed(4);

      this.labels = this.data.listofgold.map(item => item.createdOnDate.substring(0, 10));
      this.labelsData = this.labels.reverse();
      this.datas = this.data.listofgold.map(item => item.amount);
      this.dataData = this.datas.reverse();

      //cal for scrollable and passing data to style
      this.labelCount = this.labelsData.length;

      if (this.labelCount > 7) {
        this.aboveValue = true;
        this.belowValue = false;
      }

      //  console.log(this.labels);
      //  console.log(this.datas);
      this.getChart(this.labelsData, this.dataData)

    }, (error: any) => {
      // this.errorShow(error?.message, "productList --> Http request");
    })
  }



  getChart(labels, datas) {
    Chart.register(zoomPlugin);

    var linechart = new Chart("linechart", {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          data: datas,
          pointRadius: 4,
          pointBorderWidth: 3,
          pointBackgroundColor: '#96CF5C',
          fill: true,
          tension: 0.3,
          borderColor: '#96CF5C',
          backgroundColor: "#bdf0ab",
          datalabels: {
            display: false
          }

        }]
      },

      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: false,
            position: 'bottom',
            ticks: {
              align: 'start',
              padding: 0,
              color: '#000000',
              autoSkip: true,
              maxRotation: 90,
              minRotation: 90,
              textStrokeColor: '#ffff',
              font: {
                size: 14,
              }
            },
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              display: false,
              font: {
                size: 12,
              }
            },
            grid: {
              display: false,
              drawBorder: false
            }
          }
        },
        plugins: {
          zoom: {
            pan: {
              enabled: false,
              mode: 'xy'
            },
            zoom: {
              wheel: {
                enabled: true
              },
              pinch: {
                enabled: false
              },
              mode: 'x'
            }
          },

          legend: {
            display: false
          }
        },
        animation: {
          duration: 500
        }
      }

    });
  }




}
