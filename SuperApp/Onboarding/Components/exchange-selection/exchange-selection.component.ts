import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AllConfigDataService } from 'index';
import { LoadingController, ModalController } from '@ionic/angular';
import { CommonService } from 'index';
import { LoaderService } from 'index';
import { CommonFunctionService } from 'index';
import { NetworkService } from 'index';
import { Router } from '@angular/router';
import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';

@Component({
  selector: 'app-exchange-selection',
  templateUrl: './exchange-selection.component.html',
  styleUrls: ['./exchange-selection.component.scss'],
})
export class ExchangeSelectionComponent implements OnInit {
  showNextStep: any = false;
  continueNext = true;
  storeSegments: any = {}
  terms = true
  checkClicked = false;

  @Input() imageList: any;
  @Input() errorList: any;
  @Input() currentModuleType: any;
  @Input() exchangeKYC: any;
  @Input() loginCustomerGuId: any;
  @Output() getExchangeStatus = new EventEmitter();
  appName: any;
  ErrorMsg: any
  loggedInModal: boolean = false

  derivativeSelStatus: any;

  segments: any = [];
  segmentsData: any = [];
  // sendSegmentData = {
  //   "MFGuid": "3DED7810-E7B0-470C-B595-0BD07E0939F0",
  //   "EquityGuid": "2E51B5F3-C8F4-4942-99AB-5C5E634AA2C9"
  // }
  sendSegmentData: string[] = [];
  currentNativeNetwork: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;

  constructor(private allConfigDataService: AllConfigDataService, private loadingController: LoadingController, private modalCtrl: ModalController,
    private commonservice: CommonService, private loaderService: LoaderService, private commonFunctionService: CommonFunctionService, 
    private networkService: NetworkService, private http:HttpClient, private router:Router,
    private onboardingService:OnboardingService
    ) { 
      this.loaderService.hideLoader()
      this.apiCatalog={
        ...this.allConfigDataService.getConfig('apiCatalog'),
      };
      this.appEnviron = this.allConfigDataService.getConfig('environmentType');
      this.breadCrumb='Onboarding/OnboardingSteps/ProductSelection';
      
    }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
    this.appName = this.allConfigDataService.getConfig('appName');

    // this.sendSegmentData["CustGuId"] = this.loginCustomerGuId;

    this.networkService.onNetworkChange().subscribe((data: any) => {
      this.currentNativeNetwork = data;
    })
    this.getExchangeDataList();
    this.loaderService.hideLoader()
  }
  successModalClose() {
    this.loggedInModal = false
  }

  gotoBack() {
    // if (this.showNextStep) {
    //   this.showNextStep = false;
    // } else {
    //   this.modalCtrl.dismiss();
    // }
    this.router.navigate(['/Dashboard']);
  }
  async getExchangeDataList() {
    // this.loaderService.showLoader();
    if (this.currentNativeNetwork) {
      await this.loadingController.create({
        duration: 1000,
        message: 'Please wait...'
      }).then(a => {
        a.present().then(() => {
          // console.log('ExchangeSelectionDataList presented');
        });
      });

      let param = {
        'TokenId':localStorage.getItem('id_token')
      }
      // this.commonservice.ExchangeSelectionDataList()
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getDetail, param)
      .subscribe(async (data: any) => {
        // this.loaderService.hideLoader();
        // console.log("ExchangeSelectionDataList", data)
        if (data && data?.Status) {
          let responseData = data.getExchangeList;
          
          for (let i = 0; i < responseData.length; i++) {
            let testSegment = {
              Exchange: "",
              Description: "",
              IsChecked: false,
              IsDisable: false
            };
            if (responseData[i].IsChecked) {
              testSegment.Exchange = responseData[i].Exchange;
              testSegment.Description = responseData[i].Description;
              testSegment.IsChecked = responseData[i].IsChecked;
              testSegment.IsDisable = true
              this.segments.push(testSegment);
              if (responseData[i].Exchange == "Equity") {
                this.sendSegmentData.push(responseData[i].Exchange)
              }
            } else {
              testSegment.Exchange = responseData[i].Exchange;
              testSegment.Description = responseData[i].Description;
              testSegment.IsChecked = responseData[i].IsChecked;
              testSegment.IsDisable = false
              this.segments.push(testSegment);
            }

          }
          this.segments.map((obj)=>{
            if(obj.Exchange == "Equity"){
              obj.IsChecked = true;
            // obj.IsDisable = true
            this.sendSegmentData.push(obj.Exchange)
            }
          })
          // await this.loadingController.dismiss().then(() => console.log('ExchangeSelectionDataList dismissed'));
        } else {
          await this.loadingController.dismiss().then(() => console.log('ExchangeSelectionDataList dismissed'));
          this.errorShow(data?.Message, "processBankVerifyPostData -> status");
        }
      }, async (error: any) => {
        await this.loadingController.dismiss().then(() => console.log('ExchangeSelectionDataList dismissed'));
        this.errorShow(error?.Message, "processBankVerifyPostData -> Http request");
      })
      // console.log(this.segments)
    } else {
      await this.loadingController.dismiss().then(() => console.log('ExchangeSelectionDataList dismissed'));
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true

      // setTimeout(() => {
      //   this.loggedInModal = false;
      // }, 3000);

    }
  }

  getSegment() {
    return this.segmentsData;
  }
  termsCheck(e) {
    if (!e.target.checked) {
      this.continueNext = true;
    } else {
      this.continueNext = false;
    }
  }

  getSegmentPara(event, element) {
    if (element.IsDisable) {

    } else {
      element.IsChecked = !element.IsChecked
    }

    // "EquityGuid": "2E51B5F3-C8F4-4942-99AB-5C5E634AA2C9"

    if (!event) {
      // if (element.Exchange == "Mutual Fund") {
        this.sendSegmentData.push(element.Exchange)
      // } else if (element.Exchange == "Equity") {
      //   this.sendSegmentData.push(element.Exchange)
      // } else {
      //   this.sendSegmentData.push(element.Exchange)
      //   this.derivativeSelStatus = "Selected"
      // }

    } else {
      
      this.sendSegmentData.splice(this.sendSegmentData.indexOf(element.Exchange),1)
      // if (element.Exchange == "Mutual Fund") {
      //   // this.sendSegmentData["MFGuid"] = element.ExchangeSelectionGuId
      //   this.sendSegmentData = this.sendSegmentData.filter(e=> e!="Mutual Fund")
      //   // delete this.sendSegmentData["MFGuid"]
      // } else if (element.Exchange == "Equity") {
      //   // this.sendSegmentData["EquityGuid"] = element.ExchangeSelectionGuId
      //   this.sendSegmentData = this.sendSegmentData.filter(e=> e!="Equity")
      //   // delete this.sendSegmentData["EquityGuid"]
      // } else if(element.Exchange == "Derivatives"){
      //   this.derivativeSelStatus = "NotSelected"
      //   this.sendSegmentData = this.sendSegmentData.filter(e=> e!="Derivatives")
      //   // delete this.sendSegmentData["DerivativeGuid"]
      // }
      // this.derivativeSelStatus = "NotSelected"
      // delete this.sendSegmentData["DerivativeGuid"]
    }
    
  }

  onContinue() {
    // this.router.navigate(['Onboarding/Selfie']);

    this.insertExchangeSelection()
    // if (this.currentNativeNetwork) {
    //   // console.log(this.sendSegmentData);
    //   // this.getExchangeStatus.emit('exchange')
    // } else {
    //   this.ErrorMsg = this.errorList?.networkError
    //   // this.loggedInModal = true

    //   // setTimeout(() => {
    //   //   this.loggedInModal = false;
    //   // }, 3000);

    // }
  }
  
  insertExchangeSelection() {
    if(this.sendSegmentData.length==0)return;
    // console.log(this.sendSegmentData);
    // this.loaderService.showLoader();
    let obj={
      "TokenId":localStorage.getItem('id_token'),
      "ExchangeType":this.sendSegmentData
    }
    this.commonservice.ExchangeSelectionDataInsertList(this.sendSegmentData)
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.submitDetails, obj)
    // this.http.get('assets/data/getNextSteps.json')
    .subscribe((data: any) => {
      // this.loaderService.hideLoader();
      if (data && data?.Status) {
        // console.log("Thanks")
        // this.router.navigate(['/Onboarding'+data['pageUrl']]);
        this.onboardingService.nextOnSuccess('ExchangeSelection');
        // this.processExchangePostData();
        // this.getExchangeStatus.emit('exchange')
      } else {
        this.errorShow(data?.Message, 'processToNextStep -> status');
      }
    }, (error: any) => {
      this.errorShow(error?.Message, 'processToNextStep -> Http request');
    })
  }

  processExchangePostData() {
    let localPostData = {
      "CustGuId": this.loginCustomerGuId,
      "DocumentGuId": this.exchangeKYC?.DocumentGuId,
      "OfferingGuId": this.currentModuleType?.OfferingGuId
    }
    // this.loaderService.showLoader();
    // this.commonservice.postPanDetails(localPostData)
    this.http.get('')
    .subscribe((data: any) => {
      this.loaderService.hideLoader();
      if (data && data?.StatusCode) {
        // this.getExchangeStatus.emit(this.derivativeSelStatus)
        // this.router.navigate(['/Onboarding'+data['URLtoRedirect']]);
      } else {
        this.errorShow(data?.Message, "processPANPostData -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "processPANPostData -> Http request");
    })
  }

  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, 'Exchange Selection Component -> ' + functionName, message, this.errorList?.okText)
  }

  skip(val){
    this.onboardingService.skip(val);
  }
}
