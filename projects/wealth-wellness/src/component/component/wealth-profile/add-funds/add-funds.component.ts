import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import stFunds from '../../../../../../../SuperApp/Operations/wealth/Stocks/dematfunds.json';

declare var RazorpayCheckout: any;

@Component({
  selector: 'app-add-funds',
  templateUrl: './add-funds.component.html',
  styleUrls: ['./add-funds.component.scss'],
})
export class AddFundsComponent implements OnInit {
  imageList: any = [];
  isConfirmation: boolean = false;
  isUPI: boolean = true;
  isNetBanking: boolean = false;
  isNeft: boolean = false;
  checked: boolean = false;
  value: number = 0;
  currentAmount: any;
  showError: boolean = true;
  isStepClose: boolean = false;
  UPI: any;
  breadCrumb: string = 'Wealth/ST';
  NetBanking: any;
  NEFTRTGSIMPS: any;
  availableToInvest: number;
  usedFunds: number;
  totalFunds: number;
  stockFunds: any;
  addFundText: any;
  addFundChips: any;
  Funds: any;
  appEnvironment = this.allConfigDataService.getConfig('environmentType');

  apiCatalog: any = {
    ...this.allConfigDataService.getConfig('apiCatalog'),
    environment: this.allConfigDataService.getConfig('environmentType'),
  };

  constructor(
    private allConfigDataService: AllConfigDataService,
    private modalCtrl: ModalController,
    private http: HttpClient,
    private commonservices: CommonService,
    private router: Router,
    private eduService : eduService,
    private loaderService: LoaderService
  ) {}
  //  AddFunds
  ngOnInit() {
    // this.payInFunds()
    this.eduService.categoryValueForAPI.subscribe(val => {
      this.apiCatalog['breadCrumb'] = "Operations/" + val["categoryLanding"] + "/" + val['productLanding']
    })

    this.callApi();
    this.stockFunds = stFunds;
    this.addFundText = stFunds.AddFunds.Title;
    this.addFundChips = stFunds.AddFunds.chips;
    console.log(this.stockFunds, 'rajeshAAdFunds');

    // this.fundLimitDetailed();
    this.imageList = this.allConfigDataService.getConfig('images');


  }
  create() {
    //  alert('hi...');
    this.isStepClose = true;
  }
  handleOnClick() {}

  onChange(event) {
    console.log(event.target.value);
    if (event.target.value === 'UPI') {
      this.isUPI = true;
      this.isNeft = false;
      this.isNetBanking = false;
    } else if (event.target.value === 'NetBanking') {
      this.isUPI = false;
      this.isNetBanking = true;
      this.isNeft = false;
    } else if (event.target.value === 'NEFTRTGSIMPS') {
      this.isUPI = false;
      this.isNetBanking = false;
      this.isNeft = true;
    }
  }

  public onQtrInputChange(event: any) {
    this.showError = false;
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

  stepClose() {
    this.isStepClose = !this.isStepClose;
  }

  goBack() {
    this.modalCtrl.dismiss();
    // window.history.back()
  }

  payWithRazor1(amount, orderId) {
    // var self: any = this;
    // var options = {
    //   description: 'Credits towards consultation',
    //   image: 'https://cdn.zeplin.io/60a5fc059289442bc47e7527/assets/727E125B-F005-459F-AB50-9453AAC9134E.svg',//this.imageList?.companyLogo,
    //   order_id:self.appEnviron=='proto'? '': self.razorPayOrderId, //optional
    //   currency: "INR", // your 3 letter currency code
    //   key:self.appEnviron=='cug'? "rzp_live_EMvU5ON9y3t1zp":"rzp_test_5B5z6dC8eP2FCD", // your Key Id from Razorpay dashboard
    //   amount:self.appEnviron=='proto'? Number(Math.round(self.grandTotal * 100)):1, // Payment amount in smallest denomiation e.g. cents for USD
    //   name: 'Torus',
    //     handler: function (response) {
    //       // self.educationOrder();
    //       // self.buyNow();//  New construct global cart
    //       self.success = response.razorpay_payment_id;
    //       console.log(self.success);
    //       // self.success=response.razorpay_order_id
    //       // self.openSuccessPage(self.success);
    //     },
    //   prefill: {
    //     email: 'pankaj.gupta@heytrous.com', //optional
    //     contact: '7737879061', //optional
    //     name: 'pankaj received payment' //optional
    //   },
    //   theme: {
    //     color: '#003399'
    //   },
    //   modal: {
    //     ondismiss: function () {
    //     }
    //   }
    // };

    // var successCallback = function (success) {

    //   console.log("payment_id", success)
    //   if (success.razorpay_payment_id) {
    //     this.success = success;
    //     self.getProductionTransactionPayment(success.razorpay_payment_id, success.razorpay_signature, "Success")

    //   } else {
    //     self.getProductionTransactionPayment('', '', "Failed")
    //     self.errorShow('Payment Failed, Please Try Again', "payWithRazorpay -> successCallback");
    //   }
    // };

    // var cancelCallback = function (error) {
    //   console.log("error", error)
    //   self.getProductionTransactionPayment('', '', "Cancelled")
    //   self.errorShow(error.description, "payWithRazorpay -> cancelCallback");
    // };

    //   //Razorpay for android --------------------------------------

    //   // RazorpayCheckout.on('payment.success',successCallback)
    //   // RazorpayCheckout.on('payment.cancel', cancelCallback)
    //   // RazorpayCheckout.open(options);

    //   // Razorpay for web uncomment below line for Windows -----------------------------------

    //   let rzp1=new this.commonservices.nativeWindow.Razorpay(options,successCallback,cancelCallback);
    //   rzp1.open();
    //   rzp1.on('payment.failed', function (response){
    //     console.log("fail",response);
    // })
    // rzp1.on('payment.success', function (response){
    //     console.log("success",response);
    // })
    this.payInFunds(amount);
  }

  payInFunds(val) {
    let param = {
      TokenId: localStorage.getItem('id_token'),
      ItemName: 'AddFunds',
      ItemCode: '',
      Product: 'ST',
      Category: 'Wealth',
      TxnType: 'AddFunds',
      Quantity: 1,
      UnitPrice: val,
      TaxAmount: 0,
      TotalAmount: val,
      Consumer: '',
      Location: '',
      Frequency: '',
      QuantityUnit: '',
      AmountUnit: 'INR',
      OtherDetails: '{}',
    };
    this.loaderService.showLoader()
    this.http
      .post(
        this.apiCatalog.baseURL[this.appEnvironment] +
          'Shopping/' +
          this.breadCrumb +
          this.apiCatalog.placeCart,
        param
      )

      .subscribe((res: any) => {
       this.loaderService.hideLoader()

        if (res.Status == '1') {
          this.router.navigate(['Fullfilment/cart']);
          this.modalCtrl.dismiss();
        }
        console.log(res, 'this.payin');
      });
  }

  callApi(){
    let Params = {
      "TokenId": localStorage.getItem("id_token"),
      // "amount": this.value
    }
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog['breadCrumb'] + this.apiCatalog.getPortfolio +'?AddFunds', Params)
        .subscribe((data: any) => {
          this.Funds = data
          console.log(this.Funds.funds,"this.Funds");
        })
  }
}



