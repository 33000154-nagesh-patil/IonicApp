import { CommonService } from 'projects/core/src/lib/services/common.service';
import { Router } from '@angular/router';
import { retry } from 'rxjs/operators';
// import { AllConfigDataService } from './../../services/all-config-data.service';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Chart } from 'chart.js';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'lib-silver-investments',
  templateUrl: './silver-investments.component.html',
  styleUrls: ['./silver-investments.component.scss'],
})
export class SilverInvestmentsComponent implements OnInit {
  rupeesSymbol: any;
  getCurrency: any;
  data:any;
  labels:any;
  datas:any;
  silverholding:any;
  silverholdinggram:any;
  labelsData:any;
  dataData:any;
  data1:any
  price:any;
  labelCount: any;
  aboveValue: boolean = false;
  belowValue: boolean = true;
  newDate:any=new Date()
  appEnviron: any;
  breadCrumb: any;
  apiCatalog:any
  getTransactionBreadCrumb: string;


  constructor(private http : HttpClient,private allConfigDataService: AllConfigDataService,
     private router: Router ,private commonservice:CommonService) {
      this.apiCatalog={
        ...this.allConfigDataService.getConfig('apiCatalog'),

    };
    this.appEnviron =this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Shopping/Wealth/DG'
    this.getTransactionBreadCrumb='Fullfilment/Wealth/DG'
     }

  ngOnInit() {
    this.getChartData();
    this.getCurrency = this.allConfigDataService.getConfig('listCodeCountry');
    this.rupeesSymbol = this.getCurrency['IND']['currencySymbol'];
    // this.data= chartdata;

    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getDigiGoldRate,{}).pipe(retry(3)).subscribe(async (res:any) => {
      // if(res.status!=200) this.ngOnInit()

      this.data1=await res.result.data.rates
           this.price =(this.data1.sBuy)
           // if(res.productListGoldSilver) this.loderservices.hideLoader()
    });
  }


  getChartData() {

    let params = {
        "uniqueId":localStorage.getItem('ClientCode'),
        "metalType":"silver",

    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.getTransactionBreadCrumb+this.apiCatalog.getTransactionDetail,params).pipe(retry(3)).subscribe(async (res:any) => {

      // console.log(res);
      this.data = res;
      this.silverholding = res.totalInvestmentAmount;
      this.silverholdinggram = res.totalgrams;

      this.labels = this.data.listofgold.map(item => item.createdOnDate.substring(0,10));
      this.labelsData = this.labels.reverse();
      this.datas = this.data.listofgold.map(item => item.amount);
      this.dataData = this.datas.reverse();


      this.labelCount = this.labelsData.length;

      if (this.labelCount > 7) {
        this.aboveValue = true;
        this.belowValue = false;
      }

      // console.log(this.labels);
      // console.log(this.datas);
      this.getChart(this.labelsData,this.dataData)


    }, (error: any) => {
      // this.errorShow(error?.message, "productList --> Http request");
    })
  }



  getChart(labels, datas) {

    Chart.register(zoomPlugin);
    var linechart2 = new Chart("linechart2", {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          data: datas,
          pointRadius: 4,
          pointBorderWidth: 3,
          pointBackgroundColor: '#D23D50',
          fill:true,
          tension: 0.3,
          borderColor : '#D23D50',
          backgroundColor:"#e89b9b",
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
              autoSkip: false,
              maxRotation: 90,
              minRotation: 90,
              font: {
                size: 14,
              }
            },
            grid: {
              display: false,
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

