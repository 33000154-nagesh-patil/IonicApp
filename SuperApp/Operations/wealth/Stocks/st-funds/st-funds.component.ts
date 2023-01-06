import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { ModalController } from '@ionic/angular';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';

// import { WithdrawFundsComponent } from '../withdraw-funds/withdraw-funds.component';
// import stFunds from '../../../../../../../SuperApp/Operations/wealth/Stocks/dematfunds.json'
import stFunds from '../../Stocks/dematfunds.json'
// import { StAddFundsComponent } from 'SuperApp/Operations/wealth/Stocks/st-add-funds/st-add-funds.component';
import { WithdrawFundsComponent } from 'projects/wealth-wellness/src/component/component/wealth-profile/withdraw-funds/withdraw-funds.component';
import { TransactionHistory1Component } from 'projects/wealth-wellness/src/component/component/wealth-profile/transaction-history1/transaction-history1.component';
import { AddFundsComponent } from 'projects/wealth-wellness/src/component/component/wealth-profile/add-funds/add-funds.component';
declare var RazorpayCheckout: any;




@Component({
  selector: 'app-st-funds',
  templateUrl: './st-funds.component.html',
  styleUrls: ['./st-funds.component.scss'],
})
export class StFundsComponent implements OnInit {
  apiCatalog: any = {
    ...this.allConfigDataService.getConfig('apiCatalog'),
    environment: this.allConfigDataService.getConfig('environmentType'),
  };
  appEnviron: any;
  breadCrumb: string;
  rajesh: any;
  stockFunds: any;
  isclose: boolean = true;
  stockInfo: any;
  assets: any;
  marginbutton: any;
  marginInfo: any;
  paymenthitsory: any;
  imageList: any;
  Funds: any;
  constructor(private loaderService: LoaderService, private commonFunctionService: CommonFunctionService,
    private http: HttpClient, private allConfigDataService: AllConfigDataService,
     private router: Router, private modalCtrl: ModalController,private eduService : eduService ) {
      // appEnvironment = this.allConfigDataService.getConfig('environmentType');

      // this.breadCrumb='Operations/Wealth/ST';

     }

  ngOnInit() {
    // this.getfund()
    this.eduService.categoryValueForAPI.subscribe(val => {
      this.apiCatalog['breadCrumb'] = "Operations/" + val["categoryLanding"] + "/" + val['productLanding']
    })
    this.callApi()
    this.stockFunds = stFunds;
    this.stockInfo=stFunds.info;
    this.assets = stFunds.card;
    this.marginbutton = stFunds.action
    this.marginInfo = stFunds.text;
    this.paymenthitsory = stFunds.Redirect;

    // this.actionbutton = stFunds.addNwithdrawAction
    console.log(this.stockFunds,"-----rajesh8u94---");
    this.imageList = this.allConfigDataService.getConfig('images');
  }

  goBack() {
    // this.modalCtrl.dismiss()
    // window.history.back()
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async goToWithdraw() {
    const modal = await this.modalCtrl.create({
      component: WithdrawFundsComponent,
      componentProps: {
        // watchList: this.currentWatchList
      },
      backdropDismiss: false
    });
    modal.onDidDismiss().then((data) => {
      // this.wathListChanged(this.currentWatchList);
    })
    modal.present();
  }

  async goToAddFunds() {
    const modal = await this.modalCtrl.create({
      component: AddFundsComponent,
      componentProps: {
        // watchList: this.currentWatchList
      },
      backdropDismiss: false
    });
    modal.onDidDismiss().then((data) => {
      // this.watchListChanged(this.currentWatchList);
    })
    modal.present();
  }

  getfund(){
    let params = {
     "TokenId":localStorage.getItem('id_token')
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+"/getFund", params).subscribe((data: any) => {
      if (data ) {
        this.rajesh=data
        console.log(this.rajesh,'gjgghjgjhgjhghjgj');

        // console.log(this.salutationList);
      }
    })

  }
  IncreaseMargin(){

  }
  close() {
    this.isclose = false;
  }

  async transaction(){
    const modal = await this.modalCtrl.create({
      component: TransactionHistory1Component,
      componentProps: {
        // watchList: this.currentWatchList
      },
      backdropDismiss: false
    });
    modal.onDidDismiss().then((data) => {
      // this.watchListChanged(this.currentWatchList);
    })
    modal.present();
  }

  callApi(){
    let Params = {
      "TokenId": localStorage.getItem("id_token"),
    }
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog['breadCrumb'] + this.apiCatalog.getPortfolio +'?AddFunds', Params)
        .subscribe((data) => {
          this.Funds = data
          console.log(this.Funds.funds,"this.Funds");
        })
  }

}
