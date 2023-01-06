import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { KycStepsMFComponent } from 'projects/product-details/components/kyc-steps-mf/kyc-steps-mf.component';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
// import { PaymentConfirmationComponent } from 'projects/gold-investment-details/components/payment-confirmation/payment-confirmation.component';
declare var RazorpayCheckout: any;
@Component({
  selector: 'lib-productDetails',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() currentProductDatalib: any;
  @Input() imageList: any
  @Input() currentCountry: any;
  @Input() errorList: any;
  @Input() currentDigiDataOrderList: any;
  showModal: any = false;
  isKYCCompleted: any = false;
  listOfKYC: any;
  currentFetcherModule: any;

  loginCustomerGuId: any;
  productData: any;
  returnPercent: any;
  category: any;
  rank: any;
  currentProductTransaction: any;
  amount: any;

  constructor(public modalController: ModalController, private loaderService: LoaderService, private commonService: CommonService, private commonFunctionService: CommonFunctionService) { }

  ngOnInit() {
    this.amount = (this.currentProductDatalib?.productDetails?.Price) ? this.currentProductDatalib?.productDetails?.Price : 0;
    this.commonService.getOfferListData().subscribe((data: any) => {
      // console.log("getFetchParentModule", data)
      if (data && data?.OfferList && data?.OfferList.length > 0) {
        let localMode = this.currentProductDatalib?.currentModule == 'Mutual Fund' ? 'MF' : this.currentProductDatalib?.currentModule; //temp solution
        let localCurrentModule = data.OfferList.filter(x => x?.Offering == localMode);
        if (localCurrentModule && localCurrentModule.length > 0) {
          this.currentFetcherModule = localCurrentModule[0]
        }

      }
    })
    this.commonService.getGetOfferingDocList().subscribe((data: any) => {
      if (data && data?.length > 0) {
        // console.log("data", data)
        this.listOfKYC = data;
        let localMode = this.currentProductDatalib?.currentModule == 'Mutual Fund' ? 'MF' : this.currentProductDatalib?.currentModule; //temp solution
        // console.log("localMode", localMode)
        if (localMode) {
          let localKYCObject = this.listOfKYC.filter(x => x?.Offering == localMode && x?.IsCompleted == 'False');
          if (localKYCObject && localKYCObject.length == 0) {
            // console.log("localKYCObject", localKYCObject)
            this.isKYCCompleted = true
          }
        }

      }
    })
    this.loginCustomerGuId = localStorage.getItem('CustGuId')
    if (!this.loginCustomerGuId) {
      this.commonService.getCustomerGuID().subscribe((data: any) => {
        if (data) {
          this.loginCustomerGuId = data;
        }
      })
    }
    // console.log("details param", this.currentFetcherModule)
    if (this.currentFetcherModule) {
      let reqParams = {
        "OfferingGuId": this.currentFetcherModule.OfferingGuId,
        "ProductId": this.currentProductDatalib?.productDetails?.Id
      }
      // console.log("details param", reqParams)
      this.getProductDetails(reqParams);
    }
  }

  getProductDetails(reqParams) {
    //this.loaderService.showLoader();
    this.commonService.getHealthProductDetails(reqParams).subscribe((data: any) => {
      // console.log("product details", data)
      if (data && data?.Status) {
        // this.loaderService.hideLoader();
        this.productData = data.Result[0];
        if (this.currentProductDatalib?.currentModule == 'Mutual Fund') {
          this.returnPercent = this.productData?.Props?.mfReturns.filter(x => x.description == this.productData?.Description);
          this.category = this.productData?.Props?.mfReturns.filter(x => x.description == 'Category Average');
          this.rank = this.productData?.Props?.mfReturns.filter(x => x.description == 'Rank within category');
          // console.log("this.productData", this.returnPercent)
        }
      } else {
        this.errorShow(data?.Message, "GetOfferingDocList -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "GetOfferingDocList -> Http request");
    })
  }

  openModal() {
    this.showModal = !this.showModal;
    // console.log("this.showModal", this.showModal)
  }
  openSIPEvent(e) {
    this.showModal = false;
    this.investNow()
  }
  processSIPEvent() {

  }
  async openInvestPopup() {
    // this.loaderService.showLoader();
    // const modal = await this.modalController.create({
    //   component: InvestSIPComponent,
    //   componentProps: {
    //     'currentData': this.currentProductDatalib?.productDetails,
    //     'imageList': this.imageList,
    //     'currentProductDatalib': this.currentProductDatalib,
    //     'offeringGuId': this.currentFetcherModule.OfferingGuId,
    //     'currentCountry': this.currentCountry,
    //     'errorList': this.errorList
    //   },
    //   backdropDismiss: false
    // });
    // modal.onDidDismiss()
    //   .then((data) => {
    //     if (data && data?.data) {
    //       // console.log("kyc");
    //       if (this.isKYCCompleted) {
    //         this.processToNextStep();
    //       } else {
    //         this.openKYCModal();
    //       }
    //     }
    //   });
    // this.loaderService.hideLoader();
    // return await modal.present();
  }
  async openKYCModal() {
    this.loaderService.showLoader();
    const modal = await this.modalController.create({
      component: KycStepsMFComponent,
      componentProps: {
        'panCardKYC': this.getCurrentKYCData("PAN"),
        'bankKYC': this.getCurrentKYCData("Cheque"),
        'imageList': this.imageList,
        'errorList': this.errorList,
        'currentModuleType': this.currentFetcherModule,
        'loginCustomerGuId': this.loginCustomerGuId
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data && data?.data) {
          this.openInvestPopup()
        }
      });
    this.loaderService.hideLoader();
    return await modal.present();
  }

  async openPaymentPopUp(data) {
    // this.loaderService.showLoader();
    // const modal = await this.modalController.create({
    //   component: PaymentConfirmationComponent,
    //   componentProps: {
    //     'transactionData': data,
    //     'imageList': this.imageList,
    //     'currentCountry': this.currentCountry,
    //     'errorList': this.errorList,
    //   },
    //   backdropDismiss: false
    // });
    // modal.onDidDismiss()
    //   .then((data) => {
    //     if (data && data?.data) {
    //       this.openOrderList();
    //     }
    //   });
    // this.loaderService.hideLoader();
    // return await modal.present();
  }

  async openOrderList() {
    // this.loaderService.showLoader();
    // const modal = await this.modalController.create({
    //   component: InvestmentDetailsTransactionComponent,
    //   componentProps: {
    //     'imageList': this.imageList,
    //     'currentCountry': this.currentCountry,
    //     'errorList': this.errorList,
    //     "investmentDetails": ''
    //   },
    //   backdropDismiss: false
    // });
    // modal.onDidDismiss()
    //   .then((data) => {
    //     if (data && data?.data) {
    //     }
    //   });
    // this.loaderService.hideLoader();
    // return await modal.present();
  }

  getCurrentKYCData(type) {
    return this.listOfKYC ? this.listOfKYC.filter(x => x?.Document == type) : []
  }
  processToNextStep() {
    // console.log("testMF")
    // this.getProductTransaction()
  }

  investNow() {
    if (this.currentProductDatalib?.currentModule == 'Health') {
      this.getProductTransaction();
    } else {
      if (this.isKYCCompleted) {
        this.openInvestPopup();
      } else {
        this.openKYCModal()
      }
    }

  }

  getProductTransaction() {
    let localProductionTransaction = {
      "CustGuId": this.loginCustomerGuId,
      "OfferingGuId": this.currentFetcherModule.OfferingGuId,
      "ProductName": this.currentProductDatalib?.productDetails?.Title,
      "ProductId": this.currentProductDatalib?.productDetails?.Id,
      "Units": "1",
      "MetalType": this.currentProductDatalib?.currentModule,
      "Amount": this.amount,
    }
    if (localProductionTransaction) {
      // this.payWithRazorpay(this.currentAmount)
      this.fetchProductionTransaction(localProductionTransaction)
    }
  }

  fetchProductionTransaction(obj) {
    this.loaderService.showLoader()
    this.commonService.getGoldProductTransaction(obj).subscribe((data: any) => {
      if (data && data.Status) {
        this.loaderService.hideLoader()
        this.currentProductTransaction = data;
        if (this.amount > 0) {
          this.payWithRazorpay(this.amount, data?.OrderGuId);
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

  payWithRazorpay(amount, orderId) {
    var self: any = this;
    var options = {
      description: 'Credits towards consultation',
      image: 'https://cdn.zeplin.io/60a5fc059289442bc47e7527/assets/727E125B-F005-459F-AB50-9453AAC9134E.svg',//this.imageList?.companyLogo,
      order_id: "", //optional
      currency: "INR", // your 3 letter currency code
      key: "rzp_test_pBI3b5vibunYxn", // your Key Id from Razorpay dashboard
      amount: Number(Math.round(amount * 100)), // Payment amount in smallest denomiation e.g. cents for USD
      name: 'Aqube',
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
      // console.log("payment_id", success)
      if (success.razorpay_payment_id) {
        self.getProductionTransactionPayment(success.razorpay_payment_id, success.razorpay_signature, "Success")
      } else {
        self.getProductionTransactionPayment('', '', "Failed")
        self.errorShow('Payment Failed, Please Try Again', "payWithRazorpay -> successCallback");
      }
      // console.log('payment_id: ' + success.razorpay_payment_id);
    };

    var cancelCallback = function (error) {
      console.log("error", error)
      self.getProductionTransactionPayment('', '', "Cancelled")
      self.errorShow(error.description, "payWithRazorpay -> cancelCallback");
    };
    RazorpayCheckout.on('payment.success', successCallback)
    RazorpayCheckout.on('payment.cancel', cancelCallback)
    RazorpayCheckout.open(options);
  }

  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, null, message, this.errorList?.okText);
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
      "Amount": this.amount,
      "BlockId": "",
      "MetalType": this.currentProductDatalib?.currentModule,
      "orderStatus": status,
      "ModeOfPayment": "NEFT"
    }
    if (localProductionTransactionPaymentResponse) {
      this.fetchProductionTransactionPayment(localProductionTransactionPaymentResponse)
    }
  }

  fetchProductionTransactionPayment(obj) {
    //this.loaderService.showLoader()
    this.commonService.getGoldPaymentProductTransaction(obj).subscribe((data: any) => {
      if (data && data.Status) {
        //this.loaderService.hideLoader()
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
    let successData = {
      'currentAmount': this.amount,
      'type': this.currentProductDatalib?.currentModule,
      'currentData': {
        'Title': this.currentProductDatalib?.productDetails?.Title,
        'Date': new Date(),
        'Units': '1',
        'TotalPrice': this.amount,
        'TransactionType': 'Buy',
        'TransactionID': 'A-hm-Fh-347892',
        'GSTPrice': '3'
      }
    }
    this.openPaymentPopUp(successData)
  }
}
