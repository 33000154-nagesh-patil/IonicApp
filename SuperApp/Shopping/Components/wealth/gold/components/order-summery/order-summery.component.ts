import { getDigiGoldRates } from 'SuperApp/Shopping/Services/getDigiGoldRates';
import { Router } from '@angular/router';
import { modalController } from '@ionic/core';
import { HttpClient } from '@angular/common/http';
import { retry, timeout } from 'rxjs/operators';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
// import { AllConfigDataService } from './../../../core/src/lib/services/all-config-data.service';

import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import Ordersummery from 'src/assets/OrderSummery.json'
import { urlFetch } from 'projects/core/src/lib/enums/comman.enum';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { NetworkService } from 'projects/core/src/lib/services/network.service';
import { getLocaleTimeFormat } from '@angular/common';
// import { PaymentConfirmationComponent } from '../payment-confirmation/payment-confirmation.component';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { PaymentConfirmationComponent } from 'SuperApp/Fulfillment/Components/gold/payment-confirmation/payment-confirmation.component';
// import { PaymentConfirmationComponent } from 'projects/digi-shoping/components/payment-confirmation/payment-confirmation.component';




declare var RazorpayCheckout: any;
@Component({
  selector: 'lib-order-summery',
  templateUrl: './order-summery.component.html',
  styleUrls: ['./order-summery.component.scss'],
})

export class OrderSummeryComponent implements OnInit {
  arr: any = []
  alert: any = false
  min: any;
  sec: any;
  weight: any
  totalAmount: any
  transectionId: any
  orderSummery: any = []
  buydata: any
  @Input() currentTypeOrder: any
  @Input() currentMoneySymbols: any;
  @Input() amount;
  @Input() weightOfCommodity;
  @Input() time: any
  @Input() gst;
  @Input() grandTotal;
  @Input() commodity: any
  @Input() currentData: any;
  @Input() currentProductDatalib: any;
  @Input() offeringGuId;
  @Input() imageList: any;
  @Input() currentCountry: any;
  @Input() errorList: any;
  @Input() lockPrice: any;
  @Input() metalType: any;
  @Input() blockId: any;
  @Input() clientCode: any;
  @Output() sendDataKYC = new EventEmitter();
  showError: any = false;
  currentTypeSIP: any = 'sip';
  currentAmount: any;
  policyCheckBox: any = true;
  currencyList: any;
  currencySymbol: any;
  goldbalance: any;
  loginCustomerGuId: any;
  currentProductTransaction: any;
  appEnviron: any;
  breadCrumb: any;
  apiCatalog:any
  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no'
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'yes', //iOS only
    toolbar: 'yes', //iOS only
    enableViewportScale: 'no', //iOS only
    allowInlineMediaPlayback: 'no',//iOS only
    presentationstyle: 'fullscreen',//iOS only
    fullscreen: 'yes',//Windows only
    toolbarposition: 'top',
    suppressesIncrementalRendering: 'no',
    transitionstyle: 'crossdissolve',
    toolbarcolor: '#D3D3D3'


  };
  userDetail: {};





  constructor(private modalctrl:ModalController,
    private renderer: Renderer2,
    private loaderService: LoaderService,
     private commonService: CommonService,
      private commonFunctionService: CommonFunctionService,
       private networkService: NetworkService,
       private allConfigDataService: AllConfigDataService,
       private InAppBrowser: InAppBrowser,
       private router:Router,
       private getDigiGoldRates:getDigiGoldRates,
    private http:HttpClient) {

      this.apiCatalog={
        ...this.allConfigDataService.getConfig('apiCatalog'),

    };
    this.appEnviron =this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Fullfilment'
     }

  ngOnInit() {
    this.weight = this.weightOfCommodity
    this.totalAmount = this.grandTotal
    console.log(this.totalAmount,'this.totalAmount')
    // this.orderSummery = Ordersummery
    this.currencyList = this.allConfigDataService.getConfig('listCodeCountry')
    this.currencySymbol = this.currencyList['IND']['currencySymbol'];

    console.log("time issssssssss" + this.time);
    console.log(this.commodity, "sandeep")
    console.log(this.metalType, "sandeep")

    this.getLeftTime();

    this.amount = this.amount
    this.gst = this.gst

  }




  getLeftTime() {
    let arr = this.time.split(":")
    this.min = parseInt(arr[0])
    console.log(this.min)
    this.sec = parseInt(arr[1])
    let set = setInterval(() => {
      this.sec--;
      if (this.sec <= 0) {
        this.sec = 59
        this.min--;
      }
      if (this.min < 0) {
        this.min = 0
        this.sec = 0
        this.alert = true

        clearInterval(set)
      }
    }, 1000)
    console.log(arr[0]);

  }


  async back() {
    this.modalctrl.dismiss("data")
  }

  submitInvest() {
    if (this.policyCheckBox) {
      this.checkValidationAmount()
    }

    //   } else {
    //     this.ErrorMsg=this.errorList?.tcError
    // this.loggedInModal = true
    // setTimeout(() => {
    //   this.loggedInModal = false;
    // }, 3000);
    //   }
  }
  checkValidationAmount() {
    if (this.grandTotal > 0) {
      //this.checkKYCStatus()

      this.getProductTransaction()
      // this.payWithRazorpay(this.currentAmount)

      // this.dismiss()
    } else {
      this.showError = true;
    }
  }

  getProductTransaction() {
    let localProductionTransaction = {
      "CustGuId": this.loginCustomerGuId,
      "OfferingGuId": this.offeringGuId,
      "ProductName": this.currentProductDatalib?.productDetails?.Title,
      "ProductId": this.currentProductDatalib?.productDetails?.Id,
      "Units": "1",
      "MetalType": this.currentProductDatalib?.currentModule == 'Mutual Fund' ? 'MF' : this.currentProductDatalib?.currentModule,
      "Amount": this.grandTotal,
      "BlockId": "",
      "CGSST": "0",
      "SGST": "0",
      "Transaction": "Buy",
      "PricePerGram": "0",
      "TransCode": "NEW", //MF Parameters
      "OrderId": 0,
      "ClientCode": "TDPL009",
      "SchemeCd": "SBI072SG-GR",
      "SchemeID": 2633,
      "BuySell": "P",
      "BuySellType": "FRESH",
      "DPTxn": "P",
      "OrderVal": this.grandTotal, //Amount
      "Qty": 0,
      "AllRedeem": "N",
      "FolioNo": "",
      "Remarks": "Order from jade",
      "KYCStatus": "Y",
      "RefNo": "",
      "SubBrCode": "",
      "MinRedeem": "N",
      "DPC": "N",
      "ClientID": 20427,
      "Source": "JADE"
    }

    if (localProductionTransaction) {
      // this.payWithRazorpay(this.currentAmount)
      this.fetchProductionTransaction(localProductionTransaction)
    }
  }

  fetchProductionTransaction(obj) {
    // this.loaderService.showLoader()
    // this.commonService.getGoldProductTransaction(obj).subscribe((data: any) => {
    if (obj) {
      this.loaderService.hideLoader()
      this.currentProductTransaction = obj;
      if (this.grandTotal > 0) {
        this.payWithRazor(this.grandTotal, obj?.OrderGuId);
        // let bseParam = {
        //   "clientCode": "TDPL009",
        //   "logoutURL": "https://www.google.com"
        // }
        // this.commonService.getBseStar(bseParam).subscribe((data: any) => {
        //   console.log("bse star", data);
        //   if (data.status == 'S') {
        //     let target = (this.currentDevice === 'iOS' || this.currentDevice === 'iphone') ? '_blank' : '_self';
        //     this.theInAppBrowser.create(data.data, target, this.options);
        //   }
        // })
      }
      else {
        // this.openSuccessPage()
      }

    } else {
      this.errorShow("Buy product", "fetchProductionTransaction -> data status")
    }
    // },
    (error: any) => {
      this.errorShow(error, "fetchProductionTransaction -> Http response")
    }
    // )
  }





  async openPaymentPopUp(data) {
    this.modalctrl.dismiss('data')
    this.getDigiGoldRates.transactionData.next({
      'transactionData': data,

    })
    this.router.navigate(['Fullfilment/Gold/PaymentConfirmation/'+data.type+'/'+data.TransactionType]);
    // this.loaderService.showLoader();transactionData
    // const modal = await this.modalctrl.create({
    //   component: PaymentConfirmationComponent,

    //   componentProps: {
    //     'transactionData': data,
    //     'imageList': this.imageList,
    //     'currentCountry': this.currentCountry,
    //     'errorList': this.errorList,
    //     'commodity': this.commodity,
    //     'transectionId': 'gfhtdydfy',
    //     'goldbalance': this.goldbalance

    //   },
    //   backdropDismiss: false
    // });
    // modal.onDidDismiss()
    //   .then((data) => {
    //     if (data && data?.data) {
          // this.openOrderList();
        // }

      // });
    // this.loaderService.hideLoader();
    // return await modal.present();
  }

  // async openOrderList() {
  //   this.loaderService.showLoader();
  //   const modal = await this.modalctrl.create({
  //     component: InvestmentDetailsTransactionComponent,
  //     componentProps: {
  //       'imageList': this.imageList,
  //       'currentCountry': this.currentCountry,
  //       'errorList': this.errorList,
  //       "investmentDetails": ''
  //     },
  //     backdropDismiss: false
  //   });
  //   modal.onDidDismiss()
  //     .then((data) => {
  //       if (data && data?.data) {
  //       }
  //     });
  //   this.loaderService.hideLoader();
  //   return await modal.present();
  // }

  checkKYCStatus() {
    this.sendDataKYC.emit('kycPending')
  }
  setAmount(e) {
    this.onQtrInputChange(e)
  }
  onQtrInputChange(e: any) {
    throw new Error('Method not implemented.');
  }
  dismissInvest() {
    this.modalctrl.dismiss()
  }
  dismiss() {
    let investData = {
      'currentAmount': this.grandTotal,
      'currentData': this.currentData,
      'currentType': this.currentTypeSIP
    }
    this.modalctrl.dismiss(investData);
  }


  /* -------------------------------------------------------------------------
  payWithRazorpay(amount, orderId) {
    console.log(this.blockId);

    console.log(amount);

  //   let param = {
  //     "CustGuId": localStorage.getItem('CustGuId'),
  //     "transactionType":"buy",
  //     "data": {
  //         "lockPrice": this.lockPrice,
  //         "emailId": "",
  //         "metalType": this.metalType,
  //         "quantity": this.weightOfCommodity,
  //         "amount": "",
  //         "merchantTransactionId": "8c20a127-6e",
  //         "uniqueId": "123456",
  //         "blockId": this.blockId,

  //         "mobileNumber": localStorage.getItem('SocialClientId'),
  //         // "mobileNumber": "9137106263",
  //         "modeOfPayment": "NEFT"
  //     }

  // }

    let param ={
      "CustGuId": "9D350416-22A1-4AF5-9F51-0306C215130D",
      "transactionType":"buy",
      "data": {
          "lockPrice": "5205.06",
          "emailId": "",
          "metalType": "gold",
          "quantity": 0.1,
          "amount": "",
          "merchantTransactionId": "8c20a127-6e",
          "uniqueId": "123456",
          "blockId": "d9B8625q",
          "mobileNumber": "9137106263",
          "modeOfPayment": "NEFT"
      }
  }


    this.loaderService.hideLoader()
    var self: any = this;
    var options = {
      description: 'Credits towards consultation',
      image: 'https://cdn.zeplin.io/60a5fc059289442bc47e7527/assets/727E125B-F005-459F-AB50-9453AAC9134E.svg',//this.imageList?.companyLogo,
      order_id: '', //optional
      currency: "INR", // your 3 letter currency code
      key: "rzp_test_pBI3b5vibunYxn", // your Key Id from Razorpay dashboard
      amount: Number(Math.round(amount * 100)), // Payment amount in smallest denomiation e.g. cents for USD
      name: 'Torus',
      successCallback:this.insertBuyDataPost(param),
      cancelCallback:cancelCallback,
      prefill: {
        email: 'test@razorpay.com', //optional
        contact: '9990009991', //optional
        name: 'Razorpay' //optional
      },
      theme: {
        color: '#003399'
      },
      modal: {
        ondismiss: function () {
          //alert('dismissed')
        }
      }
    };

    var successCallback = function (success) {
      console.log("payment_id", success)
      if (success.razorpay_payment_id) {
        self.getProductionTransactionPayment(success.razorpay_payment_id, success.razorpay_signature, "Success")

      } else {
        self.getProductionTransactionPayment('', '', "Failed")
        self.errorShow('Payment Failed, Please Try Again', "payWithRazorpay -> successCallback");
      }

      //console.log('payment_id: ' + payment_id);
    };

    var cancelCallback = function (error) {
      console.log("error", error)
      self.getProductionTransactionPayment('', '', "Cancelled")
      self.errorShow(error.description, "payWithRazorpay -> cancelCallback");
    };

    let rzp1 = new this.commonService.nativeWindow.Razorpay(options);
    // RazorpayCheckout.on('payment.success', successCallback)
    // RazorpayCheckout.on('payment.cancel', cancelCallback)
    // RazorpayCheckout.open(options);
    rzp1.open();
    rzp1.on('payment.failed', function (response) {
      console.log("fail", response);
    })
    rzp1.on('payment.success', function (response){
      console.log("success",response);
    })
  }

  ------------------------------------------------------------------*/





  payWithRazor(amount, orderId) {
    this.userDetail={}
    this.commonService.userDetail.subscribe(data=>{
      this.userDetail=data
    })
    var self: any = this;
    var options = {
      description: 'Credits towards consultation',
      image: 'https://cdn.zeplin.io/60a5fc059289442bc47e7527/assets/727E125B-F005-459F-AB50-9453AAC9134E.svg',//this.imageList?.companyLogo,
      order_id: '', //optional
      currency: "INR", // your 3 letter currency code
      // key: "rzp_live_fYfrbf9hbNiT6Q", // your Key Id from Razorpay dashboard // this is for live
       key: "rzp_test_5B5z6dC8eP2FCD", // your Key Id from Razorpay dashboard // this is for test hogaya bandh karu ok


      amount: Number(Math.round(amount * 100)), // Payment amount in smallest denomiation e.g. cents for USD
      name: 'Torus',

      handler: function (response) {
        self.success = response.razorpay_payment_id;
        self.transectionId = self.success
        console.log(response);
        console.log(self.success);



        // this.insertBuyDataPost(param)
        self.myfun(self.success);

      },

      // successCallback:successCallback,
      // cancelCallback:cancelCallback,

      prefill: {
        email: (self.userDetail.EmailId)?self.userDetail.EmailId:'akp204@gm.com', //optional
        contact: self.userDetail.MobileNo, //optional
        name: '' //optional
      },
      theme: {
        color: '#003399'
      },
      modal: {
        ondismiss: function () {
          alert('dismissed')
        }
      }
    };

    //rzp_test_pBI3b5vibunYxn



    //rzp_live_fYfrbf9hbNiT6Q


    var successCallback = function (success) {
      console.log("payment_id", success)
      if (success.razorpay_payment_id) {

        this.success = success;
        self.myfun(success.razorpay_payment_id, success.razorpay_signature, "Success")


      } else {
        self.getProductionTransactionPayment('', '', "Failed")
        self.errorShow('Payment Failed, Please Try Again', "payWithRazorpay -> successCallback");

      }
      //console.log('payment_id: ' + payment_id);
    };



    var cancelCallback = function (error) {
      console.log("error", error)
      self.getProductionTransactionPayment('', '', "Cancelled")
      self.errorShow(error.description, "payWithRazorpay -> cancelCallback");

    };




    //Razorpay for android
    //  RazorpayCheckout.on('payment.success', successCallback)
    //   RazorpayCheckout.on('payment.cancel', cancelCallback)
    //   RazorpayCheckout.open(options);





    // Razorpay for web uncomment below line
    let rzp1 = new this.commonService.nativeWindow.Razorpay(options, successCallback, cancelCallback);
    rzp1.open();
    rzp1.on('payment.failed', function (response) {
      console.log("fail", response);
    })
    rzp1.on('payment.success', function (response) {
      console.log("success", response);
    })

  }



  // openSuccessPage(val) {
  //   let successData = {
  //     'Title': "indtro",
  //     'Date': new Date(),
  //     'TransactionType': 'Done',
  //     'totalAmount': "",
  //     'quantity': '1',
  //     'rate': this.amount,
  //     'transactionId': val,
  //     'order_id': "0123456789",
  //     'auto_capture': "true",
  //   }
  //   this.openPaymentPopUp(successData)

  // }

  getProductionTransactionPayment(payment_id, signature, status) {
    let localProductionTransactionPaymentResponse = {
      "TorusTranGuId": this.currentProductTransaction?.TorusTranGuId,
      "OrderGuId": this.currentProductTransaction?.OrderGuId,
      "PaymentId": payment_id,
      "Razorpay_Signature": signature,
      "CustGuId": this.currentProductTransaction?.CustGuId,
      "OfferingGuId": this.currentProductTransaction?.OfferingGuId,
      "Transaction": "Buy",
      "Units": "1",
      "Amount": this.grandTotal,
      "BlockId": "",
      "MetalType": this.currentProductDatalib?.currentModule == 'Mutual Fund' ? 'MF' : this.currentProductDatalib?.currentModule,
      "orderStatus": status,
      "ModeOfPayment": "NEFT",
      "MFOrder": {
        "TransCode": "NEW", //MF Parameters (trans code new for lumpsum & sip for sip)
        "OrderId": 0,
        "ClientCode": "TDPL009", // cliend code from profile ucc
        "SchemeCd": "SBI072SG-GR", //required new api (this can be handle by backend)
        "SchemeID": 2633, // need to get previous api response
        "BuySell": "P",
        "BuySellType": "FRESH",
        "DPTxn": "P",
        "OrderVal": this.grandTotal,
        "Qty": 0,
        "AllRedeem": "N",
        "FolioNo": "",
        "Remarks": "Order from jade", // not mandatory
        "KYCStatus": "Y",
        "RefNo": "",
        "SubBrCode": "",
        "MinRedeem": "N",
        "DPC": "N",
        "ClientID": 0, // should be 0
        "Source": "JADE" // not mandatory
      }
    }
    if (localProductionTransactionPaymentResponse) {
      this.fetchProductionTransactionPayment(localProductionTransactionPaymentResponse)
    }
  }

  fetchProductionTransactionPayment(obj) {
    this.loaderService.showLoader()
    this.commonService.getGoldPaymentProductTransaction(obj).subscribe((data: any) => {
      if (data) {
        console.log("show success")
        this.loaderService.hideLoader()
        this.openSuccessPage('')
      } else {
        this.errorShow("Buy product", "fetchProductionTransactionPayment -> data status")
      }
    },
      (error: any) => {
        this.errorShow(error, "fetchProductionTransactionPayment -> Http response")
      })
  }

  // insertBuyDataPost(obj) {
  //   this.loaderService.showLoader();
  //   this.commonService.setBuyData(obj).subscribe(async (data: any) => {
  //     if (data && data?.message.split(" ")[0] == "Successfully") {
  //       console.log("update", data);
  //       // return true;
  //       this.openSuccessPage('')
  //       this.loaderService.hideLoader();
  //     }
  //     else {
  //       this.errorShow(data?.Message, "somthing went wrong")
  //       this.loaderService.hideLoader();
  //       console.log("cancel", data)
  //       alert('somthing went wrong')
  //     }
  //   }, (error: any) => {
  //     this.errorShow(error?.Message, "setCustomerdata -> Http request");
  //     this.loaderService.hideLoader();
  //     return false;
  //   })
  // }

  myfun(val) {
    if (this.currentTypeOrder === 'grams') this.grandTotal = ""
    if (this.currentTypeOrder === 'amount') this.weightOfCommodity = 0


    let param = {
      // "CustGuId": "9D350416-22A1-4AF5-9F51-0306C215130D",
      "CustGuId": "A87FC5D3-0E54-4029-A8B6-CDCC321025AC",
      "transactionType": "buy",
      "data": {
        "lockPrice": this.lockPrice,
        "emailId": "",
        "metalType": this.metalType,
        "quantity": this.weightOfCommodity,
        "amount": this.grandTotal,
        "merchantTransactionId": "8c20a127-6e",
        "uniqueId": "TOR5729152",
        // "uniqueId": this.clientCode,
        "blockId": this.blockId,

        "mobileNumber":"9930455859",
        // "mobileNumber": "9137106263",
        "modeOfPayment": "NEFT"
      }
    }
    this.loaderService.showLoader();
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.createOrder+"?directBuy",param).pipe(retry(3)).subscribe(async (data: any) => {

      if (data && data?.Message?.split(" ")[0] == "Success") {
        this.loaderService.hideLoader();
        console.log("update", data);
        this.transectionId = data.Data?.transactionId
        this.goldbalance = data.result?.data.goldBalance

        console.log(this.transectionId + "hgfhdfghdsghfdshf")
        // return true;
        val = this.transectionId
        // this.openPaymentPopUp(data)
        this.openSuccessPage(val)
        // this.gotoNotification(data.message)


      }
      else {
        this.errorShow(data?.Message, "setCustomerdata -> status")
        this.loaderService.hideLoader();
        console.log("cancel", data)
      }
    },)
  }

  gotoNotification(description){

    if(this.metalType=="gold"){
      this.offeringGuId = 'A12E68A9-DA42-40C7-8156-20160DC31A72'
    }
    else{
      this.offeringGuId = '4AA4E455-3A20-4030-8A3E-1BBADF7261CA'
    }

    let param={
      "CustGuId":localStorage.getItem('CustGuId'),
      "NotificationTitle":"Order Confirmed",
      "NotificationDescription":description,
      "OfferingGuId":this.offeringGuId,
      "NotificationType":"Success"
    }

    this.http.post('https://apixuat.heytorus.com/api/v1/Call/Engagement/Notifications/Mapost/insertNotifications',param).subscribe((data:any)=>{
      console.log('data');
    })

  }
  openSuccessPage(val) {
    this.loaderService.hideLoader()

    let title;
    if(this.metalType=='gold')title='Augmont Digital Gold';
    if(this.metalType=='silver')title='Augmont Digital Silver';
    let successData = {
      'Title': title,
      'Date': new Date(),
      'TransactionType': 'Buy',
      'totalAmount': this.totalAmount,
      'quantity': this.weight,
      'rate': this.lockPrice,
      'transactionId': val,
      'type': this.metalType
    }
    this.openPaymentPopUp(successData)
  }



  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, null, message, this.errorList?.okText);
  }

  clickDisclaimerURL() {
    this.commonFunctionService.inAppBrowser(urlFetch.disclaimerURL);
  }
  clickTncUrl() {
    this.commonFunctionService.inAppBrowser(urlFetch.tncURL);
  }



}

