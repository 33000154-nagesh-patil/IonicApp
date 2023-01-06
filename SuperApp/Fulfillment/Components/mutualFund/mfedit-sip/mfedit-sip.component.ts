import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController } from '@ionic/angular';
// import { InvestmentDetailsTransactionComponent } from 'projects/gold-investment-details/components/investment-details-transaction/investment-details-transaction.component';
// import { PaymentConfirmationComponent } from 'projects/gold-investment-details/components/payment-confirmation/payment-confirmation.component';
import { urlFetch } from 'projects/core/src/lib/enums/comman.enum';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { NetworkService } from 'projects/core/src/lib/services/network.service';
import { ToastService } from 'projects/core/src/lib/services/toast.service';
import dummyInvestnowData from '../../../../../src/assets/mockData/dummyInvestnowData.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { PaymentConfirmationComponent } from 'projects/gold-investment-details/components/payment-confirmation/payment-confirmation.component';
declare var RazorpayCheckout: any;
@Component({
  selector: 'app-mfedit-sip',
  templateUrl: './mfedit-sip.component.html',
  styleUrls: ['./mfedit-sip.component.scss'],
})
export class MFEditSipComponent implements OnInit {
  @Input() currentData: any;
  @Input() currentProductDatalib: any;
  @Input() offeringGuId;
  @Input() imageList: any;
  @Input() currentCountry: any;
  @Input() errorList: any;
  @Input() x:any;
  @Output() sendDataKYC = new EventEmitter();
  showError: any = false;
  currentTypeSIP: any = 'sip';
  currentAmount: any;
  policyCheckBox: any = true;
  y:any

  loginCustomerGuId: any;
  currentProductTransaction: any;
  target: any;
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

  @ViewChild('commaInput') commaInput: ElementRef;
  public listener: () => void;
  currentDevice: any;
  btnEnable: any;
  proccesforDeleteSIP: boolean;
  PauseSIPPopUp: boolean;
  ValidationForm: FormGroup;
  sum:number=0;
  constructor(private allConfigDataService:AllConfigDataService,private fc:FormBuilder,public modalCtrl: ModalController, private renderer: Renderer2, private loaderService: LoaderService, private commonService: CommonService, public toastService: ToastService, private commonFunctionService: CommonFunctionService, private theInAppBrowser: InAppBrowser, private networkService: NetworkService) { }

  ngOnInit() {
    this.currentCountry = this.allConfigDataService.getConfig('listCodeCountry')[this.allConfigDataService.getConfig('currentAppInitialized')]

    this.x=dummyInvestnowData.Mfcard;
    this.networkService.getCurrentPlatform().subscribe((data) => {
      this.currentDevice = data;
      console.log("Current Device", this.currentDevice)
    })
    this.ValidationForm =this.fc.group({
      Payment: ['', Validators.required],
       Date: ['', Validators.required],

});

    this.loginCustomerGuId = localStorage.getItem('CustGuId')
    if (!this.loginCustomerGuId) {
      this.commonService.getCustomerGuID().subscribe((data: any) => {
        if (data) {
          this.loginCustomerGuId = data;
        }
      })
    }
  }

  segmentChanged(e) {
    console.log(e)
    this.currentTypeSIP = e.detail.value
  }

  public onQtrInputChange(event: number) {
    this.showError = false;
    this.sum = this.sum + event;
    let p=this.sum;
    console.log(event);
    if (p.toString().replace(/\D/g, '') === '') {
      this.currentAmount = 0;
    } else {
      this.currentAmount = Number(p.toString().replace(/\D/g, ''));
    }
  }

  public onFocusCommaInput() {
    this.showError = false;
    // ############### LISTENER ON ###############
    this.listener = this.renderer.listen('window', 'keyup', event => {
      this.commaInput.nativeElement.value = this.commaInput.nativeElement.value.replace(/[^\d,]/g, '');
    });
    console.log('Listening...');
  }

  public onBlurCommaInput() {
    this.showError = false;
    // ############### LISTENER OFF ###############
    this.listener();
    console.log('Quiet...');
  }

  checkboxClick(e) {
    this.policyCheckBox = !this.policyCheckBox
  }
  submitInvest() {
    if(this.ValidationForm.controls.Payment.value<1000){
      this.showError="invalid"
    }else{
    if (this.policyCheckBox) {
      // this.checkValidationAmount()
      this.Buyit()

    } else {
      this.toastService.showAutoToast(this.errorList?.tcError)
    }
  }
  }

  async Buyit() {
    // let eventEmitter = new EventEmitter();
    // eventEmitter.subscribe((res)=>{
    //   console.log(res);

    // })
    // const modal = await this.modalCtrl.create({
    //   component:MFPaymentConfimationComponent,
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
  checkValidationAmount() {
    this.currentAmount = 1000;
    if (this.currentAmount > 0) {
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
      "Amount": this.currentAmount,
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
      "OrderVal": this.currentAmount, //Amount
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
    this.loaderService.showLoader()
    this.commonService.getGoldProductTransaction(obj).subscribe((data: any) => {
      if (data) {
        this.loaderService.hideLoader()
        this.currentProductTransaction = data;
        if (this.currentAmount > 0) {
          console.log(data?.OrderGuId);
          this.payWithRazorpay(this.currentAmount, data?.OrderGuId);
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
          this.openSuccessPage()
        }

      } else {
        this.errorShow("Buy product", "fetchProductionTransaction -> data status")
      }
    },
      (error: any) => {
        this.errorShow(error, "fetchProductionTransaction -> Http response")
      }
    )
  }


  async openPaymentPopUp(data) {
    this.loaderService.showLoader();
    const modal = await this.modalCtrl.create({
      component: PaymentConfirmationComponent,
      componentProps: {
        'transactionData': data,
        'imageList': this.imageList,
        'currentCountry': this.currentCountry,
        'errorList': this.errorList,
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data && data?.data) {
          // this.openOrderList();
        }
      });
    this.loaderService.hideLoader();
    return await modal.present();
  }

  // async openOrderList() {
  //   this.loaderService.showLoader();
  //   const modal = await this.modalCtrl.create({
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
  setAmount(e:number) {
    this.onQtrInputChange(e)
  }
  dismissInvest() {
    this.modalCtrl.dismiss()
  }
  dismiss() {
    let investData = {
      'currentAmount': this.currentAmount,
      'currentData': this.currentData,
      'currentType': this.currentTypeSIP
    }
    this.modalCtrl.dismiss(investData);
  }

  payWithRazorpay(amount, orderId) {
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
      self.getProductionTransactionPayment('', '', "Cancelled")
      self.errorShow(error.description, "payWithRazorpay -> cancelCallback");
    };

    // let rzp1 = new this.commonService.nativeWindow.Razorpay(options, successCallback, cancelCallback);
    RazorpayCheckout.on('payment.success', successCallback)
    RazorpayCheckout.on('payment.cancel', cancelCallback)
    RazorpayCheckout.open(options);
    // rzp1.open();
    // rzp1.on('payment.failed', function (response) {
    //   console.log("fail", response);
    // })
  }

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
      "Amount": this.currentAmount,
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
        "OrderVal": this.currentAmount,
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
      if (data ) {
        console.log("show success")
        this.loaderService.hideLoader()
        this.openSuccessPage()
      } else {
        this.errorShow("Buy product", "fetchProductionTransactionPayment -> data status")
      }
    },
      (error: any) => {
        this.errorShow(error, "fetchProductionTransactionPayment -> Http response")
      })
  }

  openSuccessPage() {
    this.loaderService.hideLoader()
    // let successData = {
    //   'currentAmount': this.currentAmount,
    //   'type': this.currentProductDatalib?.currentModule == 'Mutual Fund' ? 'MF' : this.currentProductDatalib?.currentModule,
    //   'currentData': {
    //     'Title': this.currentProductDatalib?.productDetails?.Title,
    //     'Date': new Date(),
    //     'Units': '1',
    //     'TotalPrice': this.currentAmount,
    //     'TransactionType': "Buy",
    //     'TransactionID': 'A-hm-Fh-347892',
    //     'GSTPrice': '3'
    //   }
    // }

    let successData = {
      'Title': this.currentProductDatalib?.productDetails?.Title,
      'Date': new Date(),
      'TransactionType': 'Buy',
      'totalAmount': this.currentAmount,
      'quantity': '1',
      'rate': this.currentAmount,
      'transactionId': 'A-hm-Fh-347892',
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
  PauseSIP(){
       this.PauseSIPPopUp=true
  }
  ConfirmForDeleteSIP(){
    this.proccesforDeleteSIP=false
   this.PauseSIPPopUp=true
  }
  enable(e) {
    this.btnEnable = e;
  }
  cancelSIP(){
    this.proccesforDeleteSIP=false
    this.PauseSIPPopUp=false
  }
  pauseNow(){
    console.log("DeleteSIP Clicked")
    this.proccesforDeleteSIP=false
    this.PauseSIPPopUp=false
  }

  checkPayment(e){
    if(e.target.value<1000){
    this.showError=true
    }else{
      this.showError=false
      this.currentAmount = Number(e.target.value.toString().replace(/\D/g, ''));
    }
  }

}
