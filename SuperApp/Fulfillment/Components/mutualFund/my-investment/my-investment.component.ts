import { Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import {Chart as ChartJS,Chart,registerables  } from 'chart.js';
Chart.register(...registerables);
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
// import dummyInvestnowData from '../../../../../src/assets/mockData/dummyInvestnowData.json';
import { MfRedemptionComponent } from '../mf-redemption/mf-redemption.component';
// import { SwitchFundComponent } from '../switch-fund/switch-fund.component';

@Component({
  selector: 'app-my-investment',
  templateUrl: './my-investment.component.html',
  styleUrls: ['./my-investment.component.scss'],
})
export class MyInvestmentComponent implements OnInit {
  x: { Banner: ({ img1: string; img2: string; img3: string; img6: string; img7: string; img8: string; img9: string; img10: string; img11: string; img13: string; img14: string; img15: string; img16: string; img17: string; img18: string; img19: string; topRated?: undefined; fund?: undefined; Categoury?: undefined; winners?: undefined; newfund?: undefined; offers?: undefined; betterThan?: undefined; fds?: undefined; top?: undefined; amcs?: undefined; higher?: undefined; returns?: undefined; thebiggestrisk?: undefined; warrenbuffet?: undefined; upsanddowns?: undefined; dontcancel?: undefined; } | { topRated: string; fund: string; Categoury: string; winners: string; newfund: string; offers: string; betterThan: string; fds: string; top: string; amcs: string; higher: string; returns: string; thebiggestrisk: string; warrenbuffet: string; upsanddowns: string; dontcancel: string; img1?: undefined; img2?: undefined; img3?: undefined; img6?: undefined; img7?: undefined; img8?: undefined; img9?: undefined; img10?: undefined; img11?: undefined; img13?: undefined; img14?: undefined; img15?: undefined; img16?: undefined; img17?: undefined; img18?: undefined; img19?: undefined; })[]; Mfcard: { logo: string; title1: string; title2: string; mininvest: string; percent1: string; percent2: string; returnspercent: string; }[]; gridcards: { title: string; icon: string; title1: string; icon1: string; title2: string; icon2: string; }[]; };
  currentCountry: any;
  currencySymbol:any
  currencyList: any;
  Buttondata: any='1d';
  linechart: any;
  chartIndex: number=0;
  chartvalue:any;
  imageList:any;
  @Input() SelectedCard:any
  // @Input() DummayApi:any;
  currentAmount: any;
  CurrentDate:any
  ProfitLoss:any=0;
  CardValue:any=[]

  constructor(private router:Router,private modalctrl:ModalController,private allConfigDataService:AllConfigDataService) {

  }

  ngOnInit() {
    this.CardValue={
        heading:"Fund Information",
        action1:"Reedem",
        action2:"Switch Fund",
        card:{
          "heading": "Basic Information",
          "description": "",
          "sub_heading": "HDFC Focused 30-G",
          "image": "assets/Images/Thyrocare.png",
          "row": [{
              "P&L": "0",
              "XIRR": "2.72%"
            },
            {
              "Invesment Amount": "Rs.5000",
              "Current Amount": "Rs.5500"
            },
            {
              "Nav Date": "17 mar 2021",
              "Units": "24"
            },
            {
              "Folio Number": "53G$DH83",
              "Transaction ID": "A-dfrg-HGUGHJ-derff-dsdff"
            }
          ]
        },
    }




    this.imageList=this.allConfigDataService.getConfig("images");
    // this.SelectedCard = this.router.getCurrentNavigation().extras.state.SelectedCard;
    // // this.DummayApi = this.router.getCurrentNavigation().extras.state.DummayAPi;
    // this.imageList = this.router.getCurrentNavigation().extras.state.imageList;
    // this.currencyList = this.allConfigDataService.getConfig('listCodeCountry')
    // this.currencySymbol = this.currencyList['IND']['currencySymbol']
    // this.CurrentDate=new Date()
    // this.currentAmount = this.SelectedCard.allocatedUnit * this.SelectedCard.nav;
    // this.currentAmount = this.currentAmount.toFixed(2);
    // this.ProfitLoss=((this.SelectedCard.currentValue-this.SelectedCard.totalAmountInvested)).toFixed(2)


    this.chartMap()
    // this.x=dummyInvestnowData
    this.imageList = this.allConfigDataService.getConfig('images')


  }
  dismiss(){
    window.history.back();
  }

async Buyit() {
  // let eventEmitter = new EventEmitter();
  // eventEmitter.subscribe((res)=>{
  //   console.log(res);

  // })
  // const modal = await this.modalctrl.create({
  //   component:SwitchFundComponent,
  //   componentProps:{
  //     'imageList':this.imageList,
  //     'x':this.x,
  //     'currentCountry': this.currentCountry,
  //     'event':eventEmitter
  //   },
  //   backdropDismiss:false
  // });
  // modal.onDidDismiss().then((data) => {
  //   // console.log(data);
  // })
  // return await modal.present();
}


RedeemNow() {
  this.router.navigate(['/Fullfilment/MutualFunds/Reedem'],
  {
    state: {
      imageList:this.imageList,
      currentCountry:this.currentCountry,
      SelectedCard:this.SelectedCard,
      availableAmount:this.currentAmount,
      x:this.x
    }})
  // let eventEmitter = new EventEmitter();
  // eventEmitter.subscribe((res)=>{
  //   console.log(res);

  // })
  // const modal = await this.modalctrl.create({
  //   component:MfRedemptionComponent,
  //   componentProps:{
  //     'imageList':this.imageList,
  //     'x':this.x,
  //     'currentCountry': this.currentCountry,
  //     'event':eventEmitter,
  //     "SelectedCard":this.SelectedCard,
  //     "availableAmount":this.currentAmount
  //   },
  //   backdropDismiss:false
  // });
  // modal.onDidDismiss().then((data) => {
  //   if(data.data=="1"){
  //     setTimeout(() => {
  //       this.modalctrl.dismiss("1");

  //     });
  //      }
  // })
  // return await modal.present();
}

async Reedem() {
  this.router.navigate(['Fullfilment/SellOrderBook']);

  // let eventEmitter = new EventEmitter();
  // eventEmitter.subscribe((res)=>{
  //   console.log(res);

  // })
  // const modal = await this.modalctrl.create({
  //   component:TransactionHistoryComponent,
  //   componentProps:{
  //     'imageList':this.imageList,
  //     'x':this.x,
  //     'currentCountry': this.currentCountry,
  //     'event':eventEmitter
  //   },
  //   backdropDismiss:false
  // });
  // modal.onDidDismiss().then((data) => {
  //   // console.log(data);
  // })
  // return await modal.present();
}

activebutton(e,index:number){

  this.Buttondata=e
  this.chartIndex=index
  this.linechart.destroy();
  this.chartMap();

}
chartMap(){
  this.chartvalue=[[10,50,40,50,20,40,70,10,50,40,50,20,40,70,10,50,40,50,20,40],[77,50,40,40,20,33,20,40,70,10,50,66,50,20,90],[10,50,40,50,20,40,55,10,50,60,50,20,40,70,88,50,77,50,20,40],[5,50,40,10,20,40,70,10,50,18,50,20,40,70,10,50,40,20,20,40],[10,20,40,50,90,40,70,10,50,40,50,20,40,70,10,50,40,50,20,40],[10,50,40,50,20,40,70,10,50,40,60,20,40,70,10,50,40,50,10,20],[10,50,40,50,20,40,70,10,50,40,50,20,40,70,50,20,40]]

  this.linechart = new Chart("linechart1", {
    type: 'line',
    data: {
      labels: ['', '', '', '', '', '', '','', '', '', '', '', '', '', '', '','', '', '', ''],
      datasets: [{
        data: this.chartvalue[0],
        pointRadius: 0,
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

Switch(){

}

}
