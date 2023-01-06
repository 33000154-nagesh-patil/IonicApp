import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { ModalController } from '@ionic/angular';
import { WithdrawFundsComponent } from '../withdraw-funds/withdraw-funds.component';
import { AddFundsComponent } from '../add-funds/add-funds.component';
import { TransactionHistory1Component } from '../transaction-history1/transaction-history1.component';
import { StockPledgingComponent } from '../stock-pledging/stock-pledging.component';
import { NewStkPledgeComponent } from '../new-stk-pledge/new-stk-pledge.component';
declare var RazorpayCheckout: any;
// import  stFunds from '../../../../../../../SuperApp/Operations/wealth/Stocks/dematfunds.json'
import stFunds from '../../../../../../../SuperApp/Operations/wealth/Stocks/dematfunds.json'

@Component({
  selector: 'lib-demat-funds',
  templateUrl: './demat-funds.component.html',
  styleUrls: ['./demat-funds.component.scss'],
})
export class DematFundsComponent implements OnInit {
  imageList: any = [];
  currencyList: any;
  currencySymbol: any;
  FundsData: any = [];
  data: any;
  data2: any;
  isclose: boolean = true;
  errorList: any;
  availableToInvest: number;
  openingBal: any =0;
  payin: any =0;
  optionPre: any;
  Span: any=0;
  DeliveryMargin: any=0;
  exposure: any=0;
  collateralLf: any=0;
  CollateralEquity: any=0;
  Totalcollateral: any=0;
  ClientCode: string;
  usedFunds: number;
  totalFunds: number;
  stockFunds: any;
  stockInfo: any;
  assets: any;
  actionbutton: any;
  changeComponent: any;
  marginbutton: any;
  marginInfo: any;
  paymenthitsory: any;
  button:[
    {
      title:"withdraw",
    value:WithdrawFundsComponent
  },{
    title:"Add Funds",
  value:AddFundsComponent
  }
  ]



  constructor(private loaderService: LoaderService, private commonFunctionService: CommonFunctionService,
    private http: HttpClient, private allConfigDataService: AllConfigDataService,
     private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.fundLimitDetailed();
    this.fundDetails()
    this.stockFunds = stFunds;
    this.stockInfo=stFunds.info;
    this.assets = stFunds.card;
    this.marginbutton = stFunds.action
    this.marginInfo = stFunds.text;
    this.paymenthitsory = stFunds.Redirect;

    // this.actionbutton = stFunds.addNwithdrawAction
    console.log(this.stockFunds,"-----rajesh8u94---");


    this.ClientCode = localStorage.getItem('ClientID');
    this.imageList = this.allConfigDataService.getConfig('images');
    this.currencyList = this.allConfigDataService.getConfig('listCodeCountry')
    this.currencySymbol = this.currencyList['IND']['currencySymbol']
  }

  fundLimitDetailed() {
    let param = {
      "entity_id": localStorage.getItem("ClientID"),
      "source": "M",
      "data": {
        "client_id": localStorage.getItem("ClientID")
      }
    }

    this.http.post('https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/FundLimit', param).subscribe((data: any) => {
      if(!this.availableToInvest)
      {
        this.availableToInvest=0
      } if(!this.usedFunds)
      {
        this.usedFunds=0;
      } if(!this.totalFunds){
        this.totalFunds =0;
      }

    this.availableToInvest = data.data[0].available_balance
      this.usedFunds = data.data[0].amount_utilized
      this.totalFunds = data.data[0].total_balance

    })
  }

  fundDetails() {
    let param = {
      "entity_id": "12348",
      "source": "N",
      "token_id": "",
      "data": {
        "client_id": localStorage.getItem("ClientID")
      }
    }

    this.http.post('https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/FundLimitDetailed', param).subscribe((data: any) => {
      this.openingBal = data.data[0].total_utilized_amt_eq
      this.payin = data.data[0].eq_cnc_pending
      this.Span = data.data[0].executed_eq_cnc
      this.DeliveryMargin = data.data[0].mtm_combined
      this.exposure = data.data[0].total_utilized_amt_eq
      this.collateralLf = data.data[0].eq_cnc_pending
      this.CollateralEquity = data.data[0].executed_eq_cnc
      this.Totalcollateral = data.data[0].mtm_combined

    })
  }

  withdrawFunction() { }
  // addFundFunction() {
  //   this.router.navigate(['add-fund']);
  // }
  // withdrawFunction() {
  //   this.router.navigate(['withdraw']);
  // }
  close() {
    this.isclose = false;
  }

  // getStocksFundsApi() {


  //   let headers: HttpHeaders = new HttpHeaders({
  //     "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi"

  //   });
  //   let params = {
  //     "entity_id": this.ClientCode.toString(),
  //     "source": "M",
  //     "data": {
  //         "client_id": this.ClientCode.toString()
  //     }
  // }
  //   this.http.post("http://uat.torusdigital.in:5000/api/v1/wealth/stock/Mpost/FundLimit", params, { headers }).subscribe((res: any) => {

  //     this.availableToInvest= res.total_balance


  //   // console.log("funds Data", res);
  //     // console.log(res.available_to_invest);
  //     // this.availableToInvest = res.available_to_invest;
  //     // console.log(res.payment_history);
  //     // this.data = res.payment_history;
  //     // this.openingBal = this.data[0].opening_balance;
  //     // this.payin = this.data[0].paying;
  //     // this.Span = this.data[0].SPAN;
  //     // this.DeliveryMargin = this.data[0].delivery_margin;
  //     // this.exposure = this.data[0].exposure;
  //     // this.collateralLf = this.data[0].collateral_liquid_funds;
  //     // this.CollateralEquity = this.data[0].collateral_equity;
  //     // this.Totalcollateral = this.data[0].total_collateral;
  //     // console.log(this.payin);
  //     //  this.Span=this.data[0].SPAN;
  //     //  this.DeliveryMargin=this.data[0].delivery_margin;
  //     //  this.exposure=this.data[0].exposure;
  //     //  this.optionPre=this.data[0].option_premium;
  //     //  console.log(this.openingBal);
  //   }, (error: any) => {
  //     this.errorShow(error?.Message, "productList -> Http request");
  //   })

  // }


  // getStocksFundsApi(){
  //   let param = {
  //     "entity_id": this.ClientCode.toString(),
  //     "source": "M",
  //     "data": {
  //         "client_id": this.ClientCode.toString()
  //     }
  // }
  //   this.http.post("http://uat.torusdigital.in:5000/api/v1/wealth/stock/Mpost/FundLimit", param).subscribe(async (res: any) => {

  //   })
  // }

  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, null, message, this.errorList?.okText);
  }

  goBack() {
    this.modalCtrl.dismiss()
    // window.history.back()
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




  // goToWithdraw(e) {
  //   this.button.forEach(async (element)=>{
  //     if(e==element.title){
  //       this.changeComponent = element.value;
  //    }
  //   const modal = await this.modalCtrl.create({
  //    component: this.changeComponent,
  //   });
  //   modal.onDidDismiss().then((data) => {});
  //   modal.present();
  //   })
  //     }




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



  //Razor Pay


  // payWithRazor1(amount,orderId) {
  //   var self:any = this;
  //   var options = {
  //     description: 'Credits towards consultation',
  //     image: 'https://cdn.zeplin.io/60a5fc059289442bc47e7527/assets/727E125B-F005-459F-AB50-9453AAC9134E.svg',//this.imageList?.companyLogo,
  //     order_id: '', //optional
  //     currency: "INR", // your 3 letter currency code
  //     key: "rzp_test_pBI3b5vibunYxn", // your Key Id from Razorpay dashboard
  //     amount: Number(Math.round(this.InitialPrice*100)), // Payment amount in smallest denomiation e.g. cents for USD
  //     name: 'Torus',
  //     prefill: {
  //       email: 'pankaj.gupta@heytrous.com', //optional
  //       contact: '7737879061', //optional
  //       name: 'pankaj received payment' //optional
  //     },
  //     theme: {
  //       color: '#003399'
  //     },
  //     modal: {
  //       ondismiss: function () {
  //         //alert('dismissed')
  //       }
  //     }
  //   };

  //   var successCallback = function (success: { razorpay_payment_id: any; razorpay_signature: any; }) {

  //     console.log("payment_id",success)
  //     if(success.razorpay_payment_id){
  //       self.getProductionTransactionPayment(success.razorpay_payment_id,success.razorpay_signature,"Success")

  //     }else{
  //       self.getProductionTransactionPayment('','',"Failed")
  //       self.errorShow('Payment Failed, Please Try Again',"payWithRazorpay -> successCallback");
  //     }

  //     //console.log('payment_id: ' + payment_id);
  //   };

  //   var cancelCallback = function (error: { description: any; }) {
  //     console.log("error",error)
  //     self.getProductionTransactionPayment('','',"Cancelled")
  //     self.errorShow(error.description,"payWithRazorpay -> cancelCallback");
  //   };

  //   // android

  //   RazorpayCheckout.on('payment.success', this.openSuccessPage())
  //   RazorpayCheckout.on('payment.cancel', cancelCallback)
  //   RazorpayCheckout.open(options);


  //  Razorpay for web uncomment below line

  //   let rzp1=new this.CommonService.nativeWindow.Razorpay(options,this.openSuccessPage(),cancelCallback);
  //   rzp1.open();
  //   rzp1.on('payment.failed', function (response: any){
  //     console.log("fail",response);
  // })
  // rzp1.on('payment.success', function (response: any){
  //     console.log("success",response);
  // })
  async IncreaseMargin(){
    const modal = await this.modalCtrl.create({
      component: NewStkPledgeComponent,
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


}


