import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { MarketIndicesComponent } from '../market-indices/market-indices.component';
import { Chart as ChartJS, Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'my-portfolio',
  templateUrl: './my-portfolio.component.html',
  styleUrls: ['./my-portfolio.component.scss'],
})
export class MyPortfolioComponent implements OnInit {

  Linechart: any
  currencySymbol: any;
  currencyList: any;
  imageList: any;
  gradientFill: any
  polarAreaLegend = true;
  niftyData: any;
  sensexData: any;
  bankNiftyData: any;
  stockData: any;
  value: any;
  segmentValue: any;
  niftyPerformanceDate: any;
  niftyPerformanceWeek: any;
  niftyPerformanceMonth: any;
  niftyPerformanceYear: any;
  graphImage: any;
  dates: any;
  day: any;
  week: any;
  month: any;
  year: any;
  colorSwitch: boolean;
  cartData: unknown[];
  chartvalue: any;
  linechart: ChartJS<"line", number[], string>;
  Buttondata: any;
  chartIndex: number;
  niftyValue: string;
  sensexValue: string;
  bankNiftyValue: string;
  excahngeValue: string;
  title: any;
  constructor(private allConfigDataService: AllConfigDataService, private modalCtrl: ModalController, private http: HttpClient) {
    this.chartMap()
  }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
    this.currencyList = this.allConfigDataService.getConfig('listCodeCountry');
    this.currencySymbol = this.currencyList['IND']['currencySymbol'];
    this.getproductList();
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.activebutton('1m', 0)
    }, 1000);
  }

  getproductList() {
    let data = {
      "CFT": "Shopping",
      "Product": "Stocks",
      "FileName": "getDashboardIndex"
    }
    this.http.post("http://uat.torusdigital.in:5000/api/v1/Dummy/get/generalApi", data).subscribe(
      (res: any) => {

        this.title=res.title
        console.log(this.title, "llllllllllllllllll");

        this.title="NIFTY 50"
        this.excahngeValue="NSE"
        this.niftyData = "₹15,810.85"
        this.value = "₹15,810.85"
        console.log("VAle-------------->", this.niftyData);

        this.sensexData = "₹53,134.35"
        console.log("Al------------------>", this.sensexData);


        this.bankNiftyData = "₹33,815.90"
        console.log("Al------------------>", this.bankNiftyData);
      }
    )
  }



  callNiftyApi() {
    this.title = "NIFTY 50";
    this.value = this.niftyData
    this.excahngeValue="NSE"
  }

  callSensexApi() {
    this.title = "SENSEX";
    this.value = this.sensexData
    this.excahngeValue="BSE"
  }


  callBankNiftyApi() {
    this.title = " BANK NIFTY";
    this.value = this.bankNiftyData
    this.excahngeValue="NSE"

    // this.bankNiftyValue="₹33,815.90"
  }




  async navigateMarketIndices() {
    const modal = await this.modalCtrl.create({
      component: MarketIndicesComponent,
      componentProps: {
        'imageList': this.imageList,
      },
      backdropDismiss: false
    })
    modal.onDidDismiss().then((data) => {
      console.log(data)
    })
    return await modal.present()
  }


  activebutton(e, index: number) {

    this.Buttondata = e
    this.chartIndex = index
    this.linechart.destroy();
    this.chartMap();

  }
  chartMap() {
    this.chartvalue = [[10, 50, 40, 50, 20, 40, 70, 10, 50, 40, 50, 20, 40, 70, 10, 50, 40, 50, 20, 40], [77, 50, 40, 40, 20, 33, 20, 40, 70, 10, 50, 66, 50, 20, 90], [10, 50, 40, 50, 20, 40, 55, 10, 50, 60, 50, 20, 40, 70, 88, 50, 77, 50, 20, 40], [5, 50, 40, 10, 20, 40, 70, 10, 50, 18, 50, 20, 40, 70, 10, 50, 40, 20, 20, 40], [10, 20, 40, 50, 90, 40, 70, 10, 50, 40, 50, 20, 40, 70, 10, 50, 40, 50, 20, 40], [10, 50, 40, 50, 20, 40, 70, 10, 50, 40, 60, 20, 40, 70, 10, 50, 40, 50, 10, 20], [10, 50, 40, 50, 20, 40, 70, 10, 50, 40, 50, 20, 40, 70, 50, 20, 40]]

    this.linechart = new Chart("linechart2", {
      type: 'line',
      data: {
        labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        datasets: [{
          data: this.chartvalue[this.chartIndex],
          pointRadius: 0,
          fill: true,
          tension: 0.3,
          borderColor: '#96CF5C',
          backgroundColor: "#bdf0ab"

        }]
      },

      options: {
        scales: {
          x: {
            ticks: {
              font: {
                size: 12,
              }
            },
            grid: {
              display: false
            }
          },
          y: {
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
          legend: {
            display: false
          }
        }
      }

    });

  }


}

