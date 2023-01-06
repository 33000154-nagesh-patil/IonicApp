
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  InAppBrowserOptions,
  InAppBrowser,
} from '@ionic-native/in-app-browser/ngx';
import { ModalController } from '@ionic/angular';

// import { InvestmentDetailsTransactionComponent } from 'projects/gold-investment-details/components/investment-details-transaction/investment-details-transaction.component';

import { urlFetch } from 'projects/core/src/lib/enums/comman.enum';

// import dummyInvestnowData from '../../../../../../src/assets/dummyInvestnowData (1).json';

import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var RazorpayCheckout: any;
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { KycStepsMFComponent } from 'projects/product-details/components/kyc-steps-mf/kyc-steps-mf.component';
import { AllConfigDataService, CommonFunctionService, CommonService, LoaderService, NetworkService, ToastService } from 'index';
import { MFService } from 'SuperApp/Shopping/Services/mf.serrvice';
import { MFServiceService } from 'projects/core/src/lib/services/mfservice.service';
@Component({
  selector: 'lib-invest-sip',
  templateUrl: './invest-sip.component.html',
  styleUrls: ['./invest-sip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class InvestSIPComponent implements OnInit {
  @Input() currentData: any;
  currentProductDatalib: any;
  offeringGuId;
  @Input() imageList: any;
  @Input() currentCountry: any;
  @Input() errorList: any;
  @Input() x: any;
  @Input() SelectedCard: any;
  @Output() sendDataKYC = new EventEmitter();
  @Input() ValidationDetail: any;
  showError: any = false;
  currentTypeSIP: any = 'sip';
  currentAmount: any = 0;
  showKYCPopUp: boolean;
  OrderStatusError: any;
  ConvertpopUp: boolean = false;
  btnTypeAll: any;
  msgpop: any = false;
  popUp: any = false;
  policyCheckBox: any = true;
  loggedInModal: boolean = false;
  ErrorMsg: any;
  SIPOrderData: any;
  loginCustomerGuId: any;
  currentProductTransaction: any;
  target: any;

  // ???????????????????????????????????????????????

  panFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  stepItems: any = [];

  @Input() stepData: any; //from api
  @Output() getPanNumber = new EventEmitter();
  @Input() panCardKYC: any;
  @Input() aadharKYC: any;
  @Input() bankKYC: any;
  isPanCardKYCComplete: any;
  isAadharKYCComplete: any;
  isBankDetailsKYCComplete: any;

  currentImg: any = false;
  currentInputPan: any;
  showRequiredError: boolean;
  showPatternError: boolean;
  isValid: boolean;
  currentType: boolean;
  currentInputEncoded: any;
  cd: any;
  currentNativeNetwork: any;
  panUserName: any;
  filePath: string;
  panDetailsData: any;
  showNextStep: boolean;
  showFirstStep: boolean;
  seeding: boolean;
  isCordovaStatus: any;

  // ??????????????????????????????????????????

  @ViewChild('commaInput') commaInput: ElementRef;
  public listener: () => void;
  currentDevice: any;
  sucess: any;
  ValidationForm: any;
  sum: number = 0;
  TransType: any;
  OrderGuId: any;
  TorusTranGuId: any;
  successData: any
  RezerPayPaymentId: any;
  addincart: boolean;
  selectfunAmount: number;
  minDate = new Date();
  kycComplete: boolean;
  UserEmail: any;
  UserName: any;
  UserNumber: any;
  cartCount:any=0;

  constructor(
    private MFService: MFServiceService,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    private router: Router,
    private allConfigDataService: AllConfigDataService,
    private fc: FormBuilder,
    private http: HttpClient,
    public modalCtrl: ModalController,
    private renderer: Renderer2,
    private loaderService: LoaderService,
    private commonService: CommonService,
    public toastService: ToastService,
    private commonFunctionService: CommonFunctionService,
    private theInAppBrowser: InAppBrowser,
    private networkService: NetworkService,
    private CartMfService:MFService
  ) { }

  ngOnInit() {
    this.imageList = this.router.getCurrentNavigation().extras.state.imageList;
    this.currentCountry = this.router.getCurrentNavigation().extras.state.currentCountry;
    this.SelectedCard = this.router.getCurrentNavigation().extras.state.SelectedCard;
    this.x = this.router.getCurrentNavigation().extras.state.x;
    this.commonService.getUserDetail().subscribe((data: any) => {
      if (data) {
        this.UserEmail = data?.EmailId
        this.UserNumber = data?.SocialClientId
        this.UserName = data?.FirstName
      }
    })



    // this.OrderStatus();
    setTimeout(() => {
      this.currentAmount = Number(this.SelectedCard.min_initial_investment)
      console.log(this.SelectedCard, this.currentAmount)
    });

    this.setValidationPattern();
    this.addStepperItems();
    this.currentCountry =
      this.allConfigDataService.getConfig('listCodeCountry')[
      this.allConfigDataService.getConfig('currentAppInitialized')
      ];
    // this.x = dummyInvestnowData.Mfcard;
    this.networkService.getCurrentPlatform().subscribe((data) => {
      this.currentDevice = data;
      console.log('Current Device', this.currentDevice);
    });
    this.checkRequied()
  }
  checkRequied() {
    if (this.currentTypeSIP === 'sip') {
      this.ValidationForm = this.fc.group({
        Payment: [this.currentAmount, Validators.required],
        Date: ['', Validators.required],
      });
    } else {
      this.ValidationForm = this.fc.group({
        Payment: [this.currentAmount, Validators.required],
        Date: [''],
      });
    }
  }

  addToCart(){
    let cart={
      title:"Mutual Funds",
      type:this.currentTypeSIP,
      amount:this.ValidationForm.value.Payment,
      icon:this.SelectedCard.img
    }
    let arr= [];
    this.CartMfService.cartData.subscribe(async (res:any) => {
      arr= res;
      this.cartCount= res.length;
    })
    arr.push(cart)
    this.CartMfService.cartData.next(arr);
    this.addincart = true
  }
  // this.loginCustomerGuId = localStorage.getItem('CustGuId')
  // if (!this.loginCustomerGuId) {
  //   this.commonService.getCustomerGuID().subscribe((data: any) => {
  //     if (data) {
  //       this.loginCustomerGuId = data;
  //     }
  //   })
  // }

  successModalClose() {
    this.showKYCPopUp = false;
  }
  segmentChanged(e) {
    setTimeout(() => {
      this.currentAmount = Number(this.SelectedCard.min_initial_investment)
    }, 100);
    this.currentTypeSIP = e.detail.value;
    if (this.currentTypeSIP == 'sip') {
      this.TransType = 'SIP';
    } else {
      this.TransType = 'One Time';
    }
    this.checkRequied();
    this.ValidationForm.updateValueAndValidity();


  }

  public onQtrInputChange(event: number) {

    this.checkRequied();
    this.ValidationForm.updateValueAndValidity();
    this.currentAmount = this.currentAmount + event
    // this.currentAmount=(this.currentAmount).replace(/,/g, '')+event;

    // this.sum = this.sum + event;
    // let p = this.sum;
    // this.currentAmount=this.currentAmount+event;

    // if (p < this.SelectedCard.min_initial_investment) {
    //   this.showError = true;
    // } else {
    //   this.showError = false;
    // }

    // if (p.toString().replace(/\D/g, '') === '') {
    //   this.currentAmount = 0;
    // } else {
    //   this.currentAmount = Number(p.toString().replace(/\D/g, ''));
    // }

  }

  public onFocusCommaInput() {
    this.showError = false;
    // ############### LISTENER ON ###############
    this.listener = this.renderer.listen('window', 'keyup', (event) => {
      this.commaInput.nativeElement.value =
        this.commaInput.nativeElement.value.replace(/[^\d,]/g, '');
    });
    console.log('Listening...');
  }

  public onBlurCommaInput() {
    this.showError = false;
    // ############### LISTENER OFF ###############
    this.listener();
  }

  checkboxClick(e) {
    this.policyCheckBox = !this.policyCheckBox;
  }
  submitInvest() {
    if (!this.kycComplete) {
      // if (this.ValidationDetail.type_name === "Closed-end" || this.ValidationDetail.type_name != null ) {
      //   this.ErrorMsg = "You can not invest in closed-end scheme";
      //   this.OrderStatusError = true
      // } else {
      if (this.ValidationForm.controls.Payment.value < this.SelectedCard.min_initial_investment
      ) {
        this.showError = 'invalid';
      } else {
        if (this.policyCheckBox) {
          this.openSuccessPage()
        } else {
          this.ErrorMsg = this.errorList?.tcError;
          this.loggedInModal = true;
          setTimeout(() => {
            this.loggedInModal = false;
          }, 3000);
        }
      }
      // }
    } else {
      this.showKYCPopUp = true;
    }
  }

  checkValidationAmount() {
    // this.currentAmount = 1000;
    if (this.currentAmount > 0) {
      //this.checkKYCStatus()

      this.getProductTransaction();
      // this.payWithRazorpay(this.currentAmount)

      // this.dismiss()
    } else {
      this.showError = true;
    }
  }

  getProductTransaction() {
    let localProductionTransaction = {
      CustGuId: this.loginCustomerGuId,
      OfferingGuId: this.offeringGuId,
      ProductName: this.currentProductDatalib?.productDetails?.Title,
      ProductId: this.currentProductDatalib?.productDetails?.Id,
      Units: '1',
      MetalType:
        this.currentProductDatalib?.currentModule == 'Mutual Fund'
          ? 'MF'
          : this.currentProductDatalib?.currentModule,
      Amount: this.currentAmount,
      BlockId: '',
      CGSST: '0',
      SGST: '0',
      Transaction: 'Buy',
      PricePerGram: '0',
      TransCode: 'NEW', //MF Parameters
      OrderId: 0,
      ClientCode: 'TDPL009',
      SchemeCd: 'SBI072SG-GR',
      SchemeID: 2633,
      BuySell: 'P',
      BuySellType: 'FRESH',
      DPTxn: 'P',
      OrderVal: this.currentAmount, //Amount
      Qty: 0,
      AllRedeem: 'N',
      FolioNo: '',
      Remarks: 'Order from jade',
      KYCStatus: 'Y',
      RefNo: '',
      SubBrCode: '',
      MinRedeem: 'N',
      DPC: 'N',
      ClientID: 20427,
      Source: 'JADE',
    };

    if (localProductionTransaction) {
      // this.payWithRazorpay(this.currentAmount)
      this.fetchProductionTransaction(localProductionTransaction);
    }
  }

  fetchProductionTransaction(obj) {
    this.loaderService.showLoader();
    // this.commonService.getGoldProductTransaction(obj).subscribe((data: any) => {
    if (obj) {
      this.loaderService.hideLoader();
      this.currentProductTransaction = obj;
      if (this.currentAmount > 0) {
        this.payWithRazor1(this.currentAmount, obj?.OrderGuId);

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
    } else {
      this.errorShow(
        'Buy product',
        'fetchProductionTransaction -> data status'
      );
    }
    // },
    (error: any) => {
      this.errorShow(error, 'fetchProductionTransaction -> Http response');
    };
    // )
  }

  async openPaymentPopUp(data, SuccessData) {
    this.router.navigate(['/Fullfillment/MutualFunds/paymentConfimation'], {
      state: {
            transactionData: data,
            imageList: this.imageList,
            x: this.x,
            currentCountry: this.currentCountry,
            FundTitle: this.SelectedCard.basic_name,
            SuccessData: data,
            RezerPayPaymentId: this.RezerPayPaymentId,
            OrderId: this.OrderGuId
      }
    });

  }

  // async openOrderList() {
  //   this.loaderService.showLoader();
  //   const modal = await this.modalCtrl.create({
  //     component: InvestmentDetailsTransactionComponent,
  //     componentProps: {
  //       imageList: this.imageList,
  //       currentCountry: this.currentCountry,
  //       errorList: this.errorList,
  //       investmentDetails: '',
  //     },
  //     backdropDismiss: false,
  //   });
  //   modal.onDidDismiss().then((data) => {
  //     if (data && data?.data) {
  //     }
  //   });
  //   this.loaderService.hideLoader();
  //   return await modal.present();
  // }

  checkKYCStatus() {
    this.sendDataKYC.emit('kycPending');
  }
  setAmount(e: number) {


    this.onQtrInputChange(e);
  }
  dismissInvest() {
    this.modalCtrl.dismiss();
    window.history.back();
  }
  goToCart(){
    this.dismissInvest();
    this.router.navigate(['Fullfilment/cart'])
  }
  dismiss() {
    let investData = {
      currentAmount: this.currentAmount,
      currentData: this.currentData,
      currentType: this.currentTypeSIP,
    };
    this.modalCtrl.dismiss(investData);
  }
  payWithRazor1(amount, orderId) {
    var self: any = this;
    var options = {
      description: 'Credits towards consultation',
      image:
        'https://cdn.zeplin.io/60a5fc059289442bc47e7527/assets/727E125B-F005-459F-AB50-9453AAC9134E.svg', //this.imageList?.companyLogo,
      order_id: '', //optional
      currency: 'INR', // your 3 letter currency code
      key: 'rzp_test_5B5z6dC8eP2FCD', // your Key Id from Razorpay dashboard
      amount: Number(Math.round(amount * 100)), // Payment amount in smallest denomiation e.g. cents for USD
      name: 'Torus',
      // successCallback: successCallback,
      // cancelCallback: cancelCallback,
      handler: function (response) {
        self.success = response.razorpay_payment_id;
        self.transactionId = response.razorpay_order_id;
        self.RezerAPI(self.success);

      },
      prefill: {
        email: this.UserEmail, //optional
        contact: this.UserNumber, //optional
        name: this.UserName, //optional
      },
      theme: {
        color: '#003399',
      },
      modal: {
        ondismiss: function () {
          //alert('dismissed')
        },
      },
    };

    // var successCallback = function (success) {

    //   console.log("payment_id",success)
    //   if(success.razorpay_payment_id){
    //     this.success=success;
    //     self.getProductionTransactionPayment(success.razorpay_payment_id,success.razorpay_signature,"Success")

    //   }else{
    //     self.getProductionTransactionPayment('','',"Failed")
    //     self.errorShow('Payment Failed, Please Try Again',"payWithRazorpay -> successCallback");
    //   }

    //console.log('payment_id: ' + payment_id);
    // };

    var successCallback = function (success) {
      self.RezerAPI(success.razorpay_payment_id, success.razorpay_signature, success.razorpay_order_id);
    };
    var cancelCallback = function (error) {
      console.log('error', error);
      // self.getProductionTransactionPayment('', '', 'Cancelled');
      self.errorShow(error.description, 'payWithRazorpay -> cancelCallback');
    };


    //  RazorpayCheckout.on('payment.success',successCallback)
    //   RazorpayCheckout.on('payment.cancel',cancelCallback)
    //   RazorpayCheckout.open(options)
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let rzp1 = new this.commonService.nativeWindow.Razorpay(options);
    rzp1.open();
    rzp1.on('payment.failed', function (response) {
      console.log('fail', response);
    });
    rzp1.on('payment.success', function (response) {
      console.log('success', response);
    });
  }

  openSuccessPage() {

    let Amount = parseFloat(this.currentAmount).toFixed(1);
    let DateType = new Date(
      this.ValidationForm.controls.Date.value
    ).toLocaleDateString('en-GB');
    let custGuID = localStorage.getItem('CustGuId');
    if (this.currentTypeSIP == 'lumpsum') {
      this.successData = {
        CustGuId: custGuID,
        OfferingGuId: 'a3d10040-02b0-44de-a0cc-37bb59ea2966',
        TransType: 'Lumpsum',
        transactionCode: 'NEW',
        plan_id: String(this.SelectedCard.plan_id),
        orderValue: Amount,
      };
    } else {

      this.successData = {
        CustGuId: custGuID,
        OfferingGuId: 'a3d10040-02b0-44de-a0cc-37bb59ea2966',
        TransType: 'SIP',
        transactionCode: 'NEW',
        plan_id: String(this.SelectedCard.plan_id),
        installmentAmount: Amount,
        startDate: DateType,
        frequencyType: 'MONTHLY',
        noOfInstallments: 20,
      };
    }


    this.getOrder(this.successData);


  }
  getOrder(obj) {

    this.loaderService.showLoader();
    this.MFService.getMFOrder(obj).subscribe(
      (data) => {
        this.loaderService.hideLoader();
        if (data) {
          this.checkValidationAmount();
          this.OrderGuId = data?.OrderGuId;
          this.TorusTranGuId = data?.TorusTranGuId;
          // this.RezerAPI(OrderGuId, TorusTranGuId, obj);
        } else {
          this.errorShow(data?.Message, 'MutuafundOrderData -> status');
        }
      },
      (error: any) => {
        this.errorShow(error?.Message, 'MutuafundOrderData -> Http request');
      }
    );
  }

  RezerAPI(Payment_Id, Order_Id) {
    this.RezerPayPaymentId = Payment_Id
    let custGuID = localStorage.getItem('CustGuId');
    let rezData = {
      CustGuId: custGuID,
      OrderGuId: this.OrderGuId,
      TorusTranGuId: this.TorusTranGuId,
      RazorpayPaymentId: "njxj",
      RzorpayOrderId: 'njxj',
      RazorpaySignature: 'jxsxks',
    };
    this.getUpdateOrder(rezData, this.successData);


  }
  getUpdateOrder(obj, successData) {
    this.loaderService.showLoader();
    console.log(this.successData);

    this.MFService.getMFUpdateOrder(obj).subscribe(
      (data) => {
        this.loaderService.hideLoader();
        if (data) {
          this.loaderService.hideLoader();
          this.openPaymentPopUp(successData, data?.receit);
        } else {
          this.errorShow(data?.Message, 'MutuafundUpdateOrderData -> status');
        }
      },
      (error: any) => {
        this.errorShow(
          error?.Message,
          'MutuafundUpdateOrderData -> Http request'
        );
      }
    );
  }

  clickDisclaimerURL() {
    this.commonFunctionService.inAppBrowser(urlFetch.disclaimerURL);
  }
  clickTncUrl() {
    this.commonFunctionService.inAppBrowser(urlFetch.tncURL);
  }

  getDummayApi() {
    let data = {
      CFT: 'Shopping',
      Product: 'MF',
      FileName: 'getSIPOrder',
    };
    this.http
      .post('https://apixcug.heytorus.com/api/v1/Dummy/get/generalApi', data)
      .subscribe((data: any) => {
        if (data) {
          this.SIPOrderData = data;
        }
      });
  }
  checkPayment(e) {

    if (e.target.value) {
      if ((e.target.value < this.SelectedCard.min_initial_investment)) {
        this.showError = true;
      } else {
        this.showError = false;
      }
      this.currentAmount = parseInt(e.target.value)
    } else {
      this.currentAmount = 0;
    }

    console.log(typeof (parseInt(e.target.value)), this.currentAmount);

  }

  Cancel() {
    this.showKYCPopUp = false;
  }

  convert() {
    this.ConvertpopUp = true;
    this.popUp = true;
  }

  hidePopUp() {
    this.popUp = false;
    this.msgpop = false;
  }

  hidemsgpop() {
    this.msgpop = false;
  }
  DoCompleteKyc() {
    this.modalCtrl.dismiss('1');
    this.router.navigate(['/Profile']);
  }

  // ?????????????????????????????????????????????????????????????????

  setValidationPattern() {
    this.panFormGroup = this.fc.group({
      PanNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$'),
        ],
      ],
    });
  }

  public checkErrorPAN = (controlName: string, errorName: string) => {
    return this.panFormGroup.controls[controlName].hasError(errorName) &&
      (this.panFormGroup.controls[controlName].dirty ||
        this.panFormGroup.controls[controlName].touched)
      ? this.panFormGroup.controls[controlName].hasError(errorName)
      : '';
  };
  // goForward(stepper: MatStepper) {
  //   stepper.next();
  // }

  onSubmitPAN() { }
  openCamra() { }
  addStepperItems() {
    this.stepItems = [
      {
        stepNos: 'Step 1',
        stepImg: this.imageList?.detailIcon,
        stepName: 'Give PAN Details',
      },
      {
        stepNos: 'Step 2',
        stepImg: this.imageList?.uploadIcon,
        stepName: 'Upload Aadhar Card',
      },
      {
        stepNos: 'Step 2',
        stepImg: this.imageList?.linkIcon,
        stepName: 'Link Bank Account',
      },
    ];
  }

  currentPANStatus(e) {
    if (e) {
      this.panCardKYC = true;
    }
  }

  currentAadharStatus(e) {
    if (e) {
      this.aadharKYC = true;
    }
  }

  currentBankStatus(e) {
    if (e) {
      this.bankKYC = true;
    }
  }

  validatePan() {
    let custReg = /[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
    if (!this.currentImg && !this.currentInputPan) {
      this.showRequiredError = true;
      return false;
    } else {
      this.showRequiredError = false;
      if (this.currentInputPan && !custReg.test(this.currentInputPan)) {
        this.showPatternError = true;
        return false;
      } else {
        this.showPatternError = false;
        return true;
      }
    }
  }

  changeInputType() {
    this.isValid = this.validatePan();
    if (this.isValid) this.currentType = !this.currentType;

    if (this.currentInputPan) {
      if (this.currentType) {
        this.currentInputEncoded = this.currentInputPan.replace(
          /.(?=.{4})/g,
          'x'
        );
        localStorage.setItem('pan', this.currentInputPan);
      } else {
        this.currentInputEncoded = this.currentInputPan;
      }
    }
  }

  onKeyPan(e) {
    console.log('e', e.target.value);
    this.getPanNumber.emit(e);
    this.showRequiredError = false;
    this.showPatternError = false;
    this.currentInputPan = e.target.value.toUpperCase();
    this.currentInputEncoded = e.target.value.toUpperCase();
    this.changeInputType();
  }

  async openKYCModal() {
    this.loaderService.hideLoader();
    let panData = [
      {
        DocumentGuId: '4afad26b-1ee6-4de3-bf13-c2d4b4ffeefd',
        Document: 'PAN',
        Offering: 'Onboarding',
        IsCompleted: 'False',
        AadharStatus: 'False',
        IsDerivative: '0',
      },
    ];
    let aadharData = [
      {
        DocumentGuId: '74dc49aa-cbc1-4321-a7e2-2541fb60abfa',
        Document: 'Aadhar',
        Offering: 'Onboarding',
        IsCompleted: 'False',
        AadharStatus: 'False',
        IsDerivative: '0',
      },
    ];
    let nameAddressData = [
      {
        DocumentGuId: 'b196712c-bba5-4e17-931b-37ed23fffb77',
        Document: 'NameAddressDetail',
        Offering: 'Onboarding',
        IsCompleted: 'False',
        AadharStatus: 'False',
        IsDerivative: '0',
      },
    ];
    let bankData = [
      {
        DocumentGuId: '0dbf360e-340b-4416-828c-244d8cf8f452',
        Document: 'Cheque',
        Offering: 'Onboarding',
        IsCompleted: 'False',
        AadharStatus: 'False',
        IsDerivative: '0',
      },
    ];
    let exchangeData = [
      {
        DocumentGuId: '43ce03d2-dc5c-4962-b15f-14ea88247ec1',
        Document: 'Exchange',
        Offering: 'Onboarding',
        IsCompleted: 'False',
        AadharStatus: 'False',
        IsDerivative: '0',
      },
    ];
    let incomeProofData = [
      {
        DocumentGuId: '0dbf360e-340b-4416-828c-244d8cf8f452',
        Document: 'IncomeProof',
        Offering: 'Onboarding',
        IsCompleted: 'False',
        AadharStatus: 'False',
        IsDerivative: '0',
      },
    ];
    let personalDetailsData = [
      {
        DocumentGuId: '4aecd238-aa1b-45b2-bab6-98c336510107',
        Document: 'PersonalDetails',
        Offering: 'Onboarding',
        IsCompleted: 'False',
        AadharStatus: 'False',
        IsDerivative: '0',
      },
    ];
    let nomineeData = [
      {
        DocumentGuId: 'a6ccddbe-8c87-410f-a139-b0c269fdc693',
        Document: 'Nominee',
        Offering: 'Onboarding',
        IsCompleted: 'False',
        AadharStatus: 'False',
        IsDerivative: '0',
      },
    ];
    let selfieData = [
      {
        DocumentGuId: '60ddfd1a-5f48-4bb9-a6a7-2df1cb3d33ab',
        Document: 'Selfie',
        Offering: 'Onboarding',
        IsCompleted: '',
        AadharStatus: 'False',
        IsDerivative: '0',
      },
    ];
    let signatureData = [
      {
        DocumentGuId: 'bce5674b-711e-4ac5-a2ef-9329e9d4527a',
        Document: 'WetSign',
        Offering: 'Onboarding',
        IsCompleted: 'False',
        AadharStatus: 'False',
        IsDerivative: '0',
      },
    ];

    let uploadDocData = [
      {
        DocumentGuId: '0dbf360e-340b-4416-828c-244d8cf8f452',
        Document: 'UploadPanAadhar',
        Offering: 'Onboarding',
        IsCompleted: 'False',
        AadharStatus: 'False',
        IsDerivative: '0',
      },
    ];
    let esignData = [
      {
        DocumentGuId: 'ee66199c-7807-4483-8dda-016163c59ba9',
        Document: 'Esgin',
        Offering: 'Onboarding',
        IsCompleted: 'False',
        AadharStatus: 'False',
        IsDerivative: '0',
      },
    ];

    let currentFetcherModule = {
      // "OfferingGuId": "a3d10040-02b0-44de-a0cc-37bb59ea2966",
      OfferingGuId: 'd46461be-da40-4b5c-bae0-3bcbbfb5afcf',
      Offering: 'Onboarding',
    };

    // this.loaderService.showLoader();

    this.loaderService.hideLoader();
    const modal = await this.modalCtrl.create({
      component: KycStepsMFComponent,
      componentProps: {
        currentInputPan: this.currentInputPan,
        panCardKYC: panData,
        aadharKYC: aadharData,
        nameAddressKYC: nameAddressData,
        bankKYC: bankData,
        exchangeKYC: exchangeData,
        incomeProofData: incomeProofData,
        personalDetailsKYC: personalDetailsData,
        nomineeKYC: nomineeData,
        selfieKYC: selfieData,
        signatureKYC: signatureData,
        uploadPanAadharKYC: uploadDocData,
        esignKYC: esignData,
        imageList: this.imageList,
        errorList: this.errorList,
        OnboardingProfile: true,

        // 'panCardKYC': this.getCurrentKYCData("PAN"),
        // 'aadharKYC': this.getCurrentKYCData("Aadhar"),
        // 'uploadPanAadharKYC': this.getCurrentKYCData("Aadhar"),
        // 'nameAddressKYC': this.getCurrentKYCData("NameAddressDetail"),
        // 'bankKYC': this.getCurrentKYCData("Cheque"),
        // 'exchangeKYC': this.getCurrentKYCData("ExchangeSelection"),
        // 'incomeProofData': this.getCurrentKYCData("IncomeProof"),
        // 'personalDetailsKYC': this.getCurrentKYCData("PersonalDetail"),
        // 'nomineeKYC': this.getCurrentKYCData("Nominee"),
        // 'selfieKYC': this.getCurrentKYCData("Selfie"),
        // 'signatureKYC': this.getCurrentKYCData("WetSign"),
        // 'esignKYC': this.getCurrentKYCData("Esign"),

        // 'imageList': this.imageList,
        // 'errorList': this.errorList,
        // 'currentModuleType': currentFetcherModule,
        // 'loginCustomerGuId': this.localCustGuId,
        // "customerPanName": this.customerPanName,
        // 'isKra': this.isKra,
        isKra: 1,
      },
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      if (data && data?.data) {
        this.router.navigate(['/Dashboard']);
      }
    });
    this.loaderService.hideLoader();
    return await modal.present();
  }

  async selectImage() {
    // console.log("cordova scan", this.isCordovaStatus);

    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();

    if (this.isCordovaStatus) {
      const actionSheet = await this.actionSheetController.create({
        header: 'Select Image source',
        buttons: [
          {
            text: 'Load from Library',
            handler: () => {
              this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
            },
          },
          {
            text: 'Use Camera',
            handler: () => {
              this.pickImage(this.camera.PictureSourceType.CAMERA);
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      });
      await actionSheet.present();
    } else {
      this.imagePreview('test', 1);
    }
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      // cameraDirection: this.camera.Direction.FRONT
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        // console.log("imageData", imageData)
        // imageData is either a base64 encoded string or a file URI
        this.currentImg = 'data:image/jpeg;base64,' + imageData;
        this.cd.detectChanges();
        let realData = this.currentImg.split(',')[1];
        let selfieImage = this.b64toBlob(realData, 'image/jpeg');

        if (this.currentNativeNetwork) {
          // this.loaderService.showLoader()
          this.panImageData(selfieImage);

          this.cd.detectChanges();
        } else {
          this.ErrorMsg = this.errorList?.networkError;
          this.loggedInModal = true;

          setTimeout(() => {
            this.loggedInModal = false;
          }, 3000);
        }
      },
      (err) => {
        // console.log("err", err)
        // Handle error
      }
    );
  }

  b64toBlob(b64Data: string, contentType: string) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  panImageData(file) {
    const formData = new FormData();
    formData.append('front_image', file);
    formData.append('back_image', file);
    formData.append('CustGuId', this.loginCustomerGuId);
    // this.loaderService.showLoader();

    this.commonService.getPanOcr(formData).subscribe(
      (data: any) => {
        if (data) {
          // console.log(data.msg);
          this.panUserName = data.msg.name;

          // this.showNextStep = true;
          // this.showFirstStep = false;
          this.currentInputPan = data.msg.doc_id;
          let dummyEvent = {
            target: {
              value: this.currentInputPan,
            },
          };
          // this.onKeyPan(dummyEvent)
          this.loaderService.hideLoader();
          // this.getPanName.emit(data.msg.name)
          this.changeInputType();
        }
      },
      (error: any) => {
        this.ErrorMsg = 'fail1 from getSelfieUpload';
        this.loggedInModal = true;
        setTimeout(() => {
          this.loggedInModal = false;
        }, 3000);
      }
    );
  }
  imagePreview(e, status) {
    // console.log("cordova scan", this.isCordovaStatus);
    const file = (e.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
      // console.log("filepath", this.filePath)
      this.currentImg = this.filePath;
      if (this.currentImg) {
        this.loaderService.showLoader();
        this.panImageData(e.target.files[0]);
        // console.log("filepath", this.filePath)
        // this.panImageData(
        //   this.b64toBlob(this.filePath, 'image/jpeg'));
      }
    };
    reader.readAsDataURL(file);
  }
  deleteImg() {
    this.currentImg = '';
    this.currentInputEncoded = null;
    this.cd.detectChanges();
  }
  // OpneOnbarding(){
  // this.openKYCModal();

  // }

  // ////////////////////////////////////////////////////////////////////////////

  processToNextStep(obj) {
    this.loaderService.showLoader();
    this.commonService.getPanDetails(obj).subscribe(
      (data: any) => {
        // this.loaderService.hideLoader();
        // console.log(data);

        if (data && data?.Status) {
          this.panDetailsData = data;
          this.panUserName = data?.msg
            ? data?.msg?.NameOnTheCard || data?.msg?.Name
            : '';
          // this.panUserName = data?.msg ? (data?.msg?.Name || data?.msg?.NameOnTheCard) : ''

          this.commonService.getAdhaarSeeding(obj).subscribe(
            (data: any) => {
              this.loaderService.hideLoader();
              // console.log("adhaarSEEDING", data);
              this.showNextStep = true;
              if (data && data?.Status) {
                if (
                  data.msg.AadharSeedingStatus ===
                  'Aadhaar Seeding is Successful'
                ) {
                  this.showNextStep = true;
                  this.showFirstStep = false;
                } else {
                  this.showNextStep = false;
                  this.seeding = true;
                }
              } else {
                this.showNextStep = false;
                this.ErrorMsg = data.Message;
                this.loggedInModal = true;
                setTimeout(() => {
                  this.loggedInModal = false;
                }, 3000);
              }
            },
            (error: any) => {
              this.showNextStep = false;
              this.errorShow(
                error?.Message,
                'processToNextStep -> Http request'
              );
            }
          );
        } else {
          this.showNextStep = false;
          this.errorShow(data?.Message, 'processToNextStep -> status');
        }
      },
      (error: any) => {
        this.showNextStep = false;
        this.errorShow(error?.Message, 'processToNextStep -> Http request');
      }
    );
  }

  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(
      this.errorList?.error,
      'Pan card component -> ' + functionName,
      message,
      this.errorList?.okText
    );
  }
  OpneOnbarding() {
    // this.ContainerViewPage.openKYCModal();
    this.openKYCModal();
  }
  HideKYCpopUp() {
    this.showKYCPopUp = false;
  }

  HideOrderError() {
    this.OrderStatusError = false;
  }



  OrderStatus() {
    let params = {
      "CustGuId": localStorage.getItem("CustGuId"),
    }
    this.MFService.getBuyStatus(params).subscribe((data: any) => {
      if (data && data.Status == '1') {

        this.kycComplete = true


      } else {
        this.errorShow(data?.Message, "processPANPostData -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "processPANPostData -> Http request");
    })

  }

  weekendsDatesFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6 ;
}

}
