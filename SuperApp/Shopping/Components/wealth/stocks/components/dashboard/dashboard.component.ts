import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TcsStock } from 'projects/wealth-wellness/src/lib/lib/tcsStock';
import { AllConfigDataService } from 'index';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  json2;
  title = "Stocks";
  textName = "Stocks"
  imageList: any;
  stocksTab:any
  dashboardData: any;
  data: any;
  index: any;
  holdingSummary: any;
  marketMovers: any;
  events: any;
  blockDeal: any;
  hideIndex: boolean =false;
  // json2 = watchList.index;
  CurrentFund : number;
  environmentAPIList: any;

  constructor(private allConfigDataService: AllConfigDataService, private router: Router,
    private modalctrl:ModalController, private http:HttpClient, private wsdata:TcsStock){ }

    ngOnInit() {
      this.fundLimitDetailed()
      this.getproductList()
      this.imageList = this.allConfigDataService.getConfig('images')
      this.stocksTab = this.allConfigDataService.getConfig('stocksTab');
    }
    showIndex() {
      this.hideIndex = !this.hideIndex;
    }

    goToEditIndex(){}
    fundLimitDetailed() {
      let param = {
        "entity_id": "123456",
        "source": "M",
        "data": {
          "client_id": localStorage.getItem("ClientID")
        }
      }
      this.http.post('https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/FundLimit', param).subscribe((data: any) => {
        if (!this.CurrentFund) {
          this.CurrentFund = 0;
        }
        this.CurrentFund = data.data[0].available_balance;
      })
    }
  
  
    // async goToAddFunds() {
    //   const modal = await this.modalctrl.create({
    //     component: AddFundsComponent,
    //     backdropDismiss: true
    //   });
    //   modal.onDidDismiss().then((data) => {
  
    //   })
    //   modal.present();
  
    // }
    goToAddFunds(){
      this.router.navigate(['Stocks/addfunds']) 
    }
  
  
    navigateToIpo(){
      this.router.navigate(['stocks/ipo'])
    }
    getproductList() {
      let data = {
        "CFT": "Shopping",
        "Product": "Stocks",
        "FileName": "getStockDashboard"
      }
      this.http.post("http://uat.torusdigital.in:5000/api/v1/Dummy/get/generalApi", data).subscribe(
        (res: any) => {
          this.dashboardData = res.ProductListStocks;
          console.log("Al---DASHBOARD--------------->", this.dashboardData);
  
  
          this.index=this.dashboardData[0].title1
          console.log("GOT DATA FROM ____________________"+this.index);
  
          this.marketMovers=this.dashboardData[1].title2
          console.log("GOT DATA FROM ____________________"+this.marketMovers);
  
          this.events=this.dashboardData[2].title3
          console.log("GOT DATA FROM ____________________"+this.events);
  
          this.blockDeal=this.dashboardData[3].title4
          console.log("GOT DATA FROM ____________________"+this.blockDeal);
  
          this.holdingSummary=this.dashboardData[4].title5
          console.log("GOT DATA FROM ____________________"+this.holdingSummary);
  
  
        }
      )
    }
  
    goToNotification(){
      this.router.navigate(['/notification'])
    }
  
    // async goToEditIndex() {
    //   const modal = await this.modalctrl.create({
    //     component: NewListComponent,
    //     componentProps: {
    //     },
    //     backdropDismiss: true
    //   });
    //   modal.onDidDismiss().then((data) => {
  
    //   })
    //   modal.present();
    // }
  



  }