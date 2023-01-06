import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service'
import { CommonService } from 'projects/core/src/lib/services/common.service';
import stFunds from '../../../../Operations/wealth/Stocks/dematfunds.json'


@Component({
  selector: 'app-st-add-funds',
  templateUrl: './st-add-funds.component.html',
  styleUrls: ['./st-add-funds.component.scss'],
})
export class StAddFundsComponent implements OnInit {
  stockFunds: any;
  addFundText: any;
  addFundChips: any;
  imageList: any;
  currentAmount: any;
  Funds: any;
  value: number=0 ;
  appEnvironment = this.allConfigDataService.getConfig('environmentType');

  apiCatalog: any = {
    ...this.allConfigDataService.getConfig('apiCatalog'),
    environment: this.allConfigDataService.getConfig('environmentType'),
  };

  constructor(private allConfigDataService: AllConfigDataService,
    private modalCtrl: ModalController,
    private http:HttpClient, private commonservices: CommonService,
    private eduService : eduService
    ) { }

  ngOnInit() {
    this.eduService.categoryValueForAPI.subscribe(val => {
      this.apiCatalog['breadCrumb'] = "Operations/" + val["categoryLanding"] + "/" + val['productLanding']
    })
    this.callApi()
    this.stockFunds = stFunds;
    this.addFundText = stFunds.AddFunds.Title
    this.addFundChips = stFunds.AddFunds.chips

    console.log(this.stockFunds,"rajeshAAdFunds");

    // this.fundLimitDetailed();
    this.imageList = this.allConfigDataService.getConfig('images');
  }
  public onQtrInputChange(event: any) {
    // this.showError = false;
    console.log(event);
    if (event.replace(/\D/g, '') === '') {
      this.currentAmount = 0;
    } else {
      this.currentAmount = Number(event.replace(/\D/g, ''));
    }
  }

  setAmount(e) {
    this.onQtrInputChange(e);
    this.value = e;
  }

  goBack(){
    this.modalCtrl.dismiss()
  }

  payWithRazor1(amount, orderId) {
    var self: any = this;
    var options = {
      description: 'Credits towards consultation',
      image: 'https://cdn.zeplin.io/60a5fc059289442bc47e7527/assets/727E125B-F005-459F-AB50-9453AAC9134E.svg',//this.imageList?.companyLogo,
      order_id: '', //optional
      currency: "INR", // your 3 letter currency code
      key: "rzp_test_pBI3b5vibunYxn", // your Key Id from Razorpay dashboard
      amount: Number(Math.round(amount * 100)), // Payment amount in smallest denomiation e.g. cents for USD
      name: 'Torus',
        handler: function (response) {
          // self.educationOrder();
          // self.buyNow();//  New construct global cart
          self.success = response.razorpay_payment_id;
          console.log(self.success);
          // self.success=response.razorpay_order_id
          // self.openSuccessPage(self.success);
        },
      prefill: {
        email: 'pankaj.gupta@heytrous.com', //optional
        contact: '7737879061', //optional
        name: 'pankaj received payment' //optional
      },
      theme: {
        color: '#003399'
      },
      modal: {
        ondismiss: function () {
        }
      }
    };

    var successCallback = function (success) {

      console.log("payment_id", success)
      if (success.razorpay_payment_id) {
        this.success = success;
        self.getProductionTransactionPayment(success.razorpay_payment_id, success.razorpay_signature, "Success")

      } else {
        self.getProductionTransactionPayment('', '', "Failed")
        self.errorShow('Payment Failed, Please Try Again', "payWithRazorpay -> successCallback");
      }
    };

    var cancelCallback = function (error) {
      console.log("error", error)
      self.getProductionTransactionPayment('', '', "Cancelled")
      self.errorShow(error.description, "payWithRazorpay -> cancelCallback");
    };


      //Razorpay for android --------------------------------------

      // RazorpayCheckout.on('payment.success',successCallback)
      // RazorpayCheckout.on('payment.cancel', cancelCallback)
      // RazorpayCheckout.open(options);

      // Razorpay for web uncomment below line for Windows -----------------------------------

      let rzp1=new this.commonservices.nativeWindow.Razorpay(options,successCallback,cancelCallback);
      rzp1.open();
      rzp1.on('payment.failed', function (response){
        console.log("fail",response);
    })
    rzp1.on('payment.success', function (response){
        console.log("success",response);
    })
  }

  callApi(){
    let Params = {
      "TokenId": localStorage.getItem("id_token"),
      // "amount": this.value
    }
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog['breadCrumb'] + this.apiCatalog.getPortfolio +'?AddFunds', Params)
        .subscribe((data) => {
          this.Funds = data
          console.log(this.Funds.funds,"this.Funds");


        })
  }


}
