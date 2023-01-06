import { CommonService } from 'projects/core/src/lib/services/common.service';
import { Router } from '@angular/router';
// import { KycStepsDigiGoldComponent } from './../kyc-steps-digi-gold/kyc-steps-digi-gold.component';
// import { CustomerdataComponent } from './../customerdata/customerdata.component';
// import { modalController } from '@ionic/core';
import { BuyGoldComponent } from './../buy-gold/buy-gold.component';
import { AllConfigDataService } from './../../../core/src/lib/services/all-config-data.service';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Chart } from 'chart.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';
@Component({
  selector: 'lib-investment-deatails',
  templateUrl: './investment-deatails.component.html',
  styleUrls: ['./investment-deatails.component.scss'],
})
export class InvestmentDeatailsComponent implements OnInit {
  @Input() data: any;
  @Input () imageList:any
  @Input() metalType:any
  step = 1;
  @Input() currentDigiData:any;
@Input() currentCountry:any;
gradientFill:any;
getCurrency: any;
rupeesSymbol: any;
data2:any
data1:any;
labels:any;
datas:any;
goldholding:any;
goldholdinggram:any;
labelsData:any;
dataData: any;
silverholding:any;
  silverholdinggram:any;
  title:any="invest";
  goldFooterData:any
  notificationCount:any = 0;
  cartCount:any = 0;
  textName:any;
  labelIcon:any;
  currentMode:any=0;
  wellnessFooterData:any;
  currentNativeNetwork:any;
  currentWindowNetwork:any;
  isCordovaStatus:any;
  currentLanguage:any;
  errorList:any;
  custGuId:any;
  loggedInModal:boolean=false
  ErrorMsg:any;
  commodity:any// rama
  type:any// rama digi
  show:boolean=false// rama digi
  mfFooterData: any;
  @Input()Date:any
  stepperData:any;
  loginCustGuId:any;
  currentFetcherModule:any;
  currencyList: any;
  currencySymbol: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: any;
  getTransactionBreadCrumb: any;

  constructor(private allConfigDataService:AllConfigDataService, private modctrl:ModalController,
    private platform:Platform,private router:Router, private http : HttpClient,
    private CommonService:CommonService   ) {
      this.apiCatalog={
        ...this.allConfigDataService.getConfig('apiCatalog'),

    };
    this.appEnviron =this.allConfigDataService.getConfig('environmentType');

    this.getTransactionBreadCrumb='Fullfilment/Wealth/DG'
     }

  ngOnInit() {
    this.getChartData();
    this.getChartData1();
    this.platform.backButton.subscribeWithPriority(10, async (processNextHandler) => {
      this.modctrl.dismiss('data')
    });
    console.log(this.data);

    this.currencyList = this.allConfigDataService.getConfig('listCodeCountry')
    // this.currencySymbol = this.currencyList['IND']['currencySymbol']
    this.rupeesSymbol = this.currencyList['IND']['currencySymbol'];

  }

  setStep(index: number) {
    this.step = index;
  }

  async Buy() {
    this.modctrl.dismiss('data')
    let commodity='gold';
    if(this.data.title=='Augmont Digital Silver') commodity='silver'
    const modal = await this.modctrl.create({
      // component: CoursecategoryComponent,
      component:BuyGoldComponent ,
      componentProps: {
        'imageList': this.imageList,
        '_type':'buy',
        'metalType': this.metalType
      },
      backdropDismiss: false
    })
    modal.onDidDismiss().then((data) => {
      console.log(data)
    })
    return await modal.present()
  }

  dissmis(){
    this.modctrl.dismiss('data')
    this.router.navigateByUrl('/InvestGold/Invest')
  }


  getChartData() {

    let params = {
        "uniqueId":localStorage.getItem('ClientCode'),
        "metalType":"gold",

    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.getTransactionBreadCrumb+this.apiCatalog.getTransactionDetail,params).pipe(retry(3)).subscribe(async (res:any) => {

      // console.log(res);
      this.data1 = res;
      this.goldholding = res.totalInvestmentAmount;
      this.goldholdinggram = res.totalgrams;
      console.log(this.data1);


      this.labels = this.data1.listofgold.map(item => item.createdOnDate.substring(0,10));
      this.labelsData = this.labels.reverse();
      this.datas = this.data1.listofgold.map(item => item.amount);
      this.dataData = this.datas.reverse();

    //  console.log(this.labels);
    //  console.log(this.datas);
     this.getChart(this.labelsData,this.dataData)
     console.log("hi sethu=====================",this.labelsData,this.dataData);


    }, (error: any) => {
      // this.errorShow(error?.message, "productList --> Http request");
    })
  }



  getChart(labels,datas){
  var linechart = new Chart("linechartlive", {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        data: datas,
        pointRadius: 3,
        pointBackgroundColor: '#96CF5C',
        fill:true,
        tension: 0.3,
         borderColor : '#96CF5C',
         backgroundColor:"#bdf0ab"

      }]
    },

    options: {
      scales: {
        x: {
          ticks: {
            color: '#000000',
            autoSkip: false,
            maxRotation: 90,
            minRotation: 90,
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

  getChartData1() {

    let params = {
        "uniqueId":localStorage.getItem('ClientCode'),
        "metalType":"silver",

    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.getTransactionBreadCrumb+this.apiCatalog.getTransactionDetail,params).pipe(retry(3)).subscribe(async (res:any) => {

      // console.log(res);
      this.data2 = res;
      this.silverholding = res.totalInvestmentAmount;
      this.silverholdinggram = res.totalgrams;

      this.labels = this.data2.listofgold.map(item => item.createdOnDate.substring(0,10));
      this.labelsData = this.labels.reverse();
      this.datas = this.data2.listofgold.map(item => item.amount);
      this.dataData = this.datas.reverse();

      // console.log(this.labels);
      // console.log(this.datas);
      this.getChart1(this.labelsData,this.dataData)


    }, (error: any) => {
      // this.errorShow(error?.message, "productList --> Http request");
    })
  }



  getChart1(labels, datas) {
    var linechart2 = new Chart("linechart3", {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          data: datas,
          pointRadius: 3,
          pointBackgroundColor: '#D23D50',
          fill:true,
          tension: 0.3,
           borderColor : '#D23D50',
          backgroundColor:"#e89b9b"

        }]
      },

      options: {
        scales: {
          x: {
            ticks: {
              color: '#000000',
              autoSkip: false,
              maxRotation: 90,
              minRotation: 90,
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
