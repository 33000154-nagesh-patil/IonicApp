import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonFunctionService } from '../../services/common-function.service';
import { CommonService } from '../../services/common.service';
import { LoaderService } from '../../services/loader.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit {
  confirmGender: boolean = false;
  confirmMarital: boolean = false;
  continueNextPage: boolean = false;
  confirmIncome: boolean = false;
  confirmExp: boolean = false;

  @Input() imageList: any;
  @Input() errorList: any;
  @Input() currentModuleType: any;
  @Input() personalDetails: any;
  @Input() loginCustomerGuId: any;


  @Output() getPersonalStatus = new EventEmitter();
  appName: any;
  loggedInModal: boolean = false
  ErrorMsg: any;

  userValues = {
    gender: "",
    marital: "",
    trading: "",
    Income: ""
  }

  gender: any = [];
  maritalstatus: any = [];
  income: any = [];
  tradingExp: any = [];

  chosenItemForGender: any;
  chosenItemForTradingExp: any;
  chosenItemForMarital: any;
  chosenItemForIncome: any;
  currentNativeNetwork: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;

  constructor(private allConfigDataService: AllConfigDataService, private commonservice: CommonService, private loadingController: LoadingController,
    private loaderService: LoaderService, private commonFunctionService: CommonFunctionService, private networkService: NetworkService,
    private router: Router, private http: HttpClient) { 
      this.loaderService.hideLoader();
      this.apiCatalog={
        ...this.allConfigDataService.getConfig('apiCatalog'),
      };
      this.appEnviron = this.allConfigDataService.getConfig('environmentType');
      this.breadCrumb='Onboarding/OnboardingSteps/CustomerRegistration';
    }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
    this.appName = this.allConfigDataService.getConfig('appName');



    this.networkService.onNetworkChange().subscribe((data: any) => {
      this.currentNativeNetwork = data;
    })
  }

  ngAfterViewInit() {
    this.getCountryMasterDetails('Profile', null);
  }

  async getCountryMasterDetails(type, value) {
    await this.loadingController.create({
      duration: 1000,
      message: 'Please wait...'
    }).then(a => {
      a.present().then(() => {
        console.log('ExchangeSelectionDataList presented');
      });
    });

    let params = {
      "Type": type
    }
    this.commonservice.getMasterDetails(params).subscribe(async (data: any) => {
      this.loaderService.hideLoader();

      if (data && data?.Status) {
        // console.log(data)
        let responseData = data.Data;
        for (let i = 0; i < responseData.length; i++) {

          let listData = {
            name: "",
            id: ""
          }

          if (responseData[i].Type === "Gender") {
            listData.name = responseData[i].TEXT;
            listData.id = responseData[i].ID;
            this.gender.push(listData);
          } else if (responseData[i].Type === "IncomeGroup") {
            // console.log(responseData[i].TEXT)
            listData.name = responseData[i].TEXT;
            listData.id = responseData[i].ID;
            this.income.push(listData);
          } else if (responseData[i].Type === "MaritalStatus") {
            // console.log(responseData[i].TEXT)
            listData.name = responseData[i].TEXT;
            listData.id = responseData[i].ID;
            this.maritalstatus.push(listData);
          } else if (responseData[i].Type === "TradingExperience") {
            // console.log(responseData[i].TEXT)
            listData.name = responseData[i].TEXT;
            listData.id = responseData[i].ID;
            this.tradingExp.push(listData);
          }
        }
        this.chosenItemForGender = this.gender[0].name;
        this.chosenItemForMarital = this.maritalstatus[0].name;
        this.chosenItemForIncome = this.income[2].name;
        this.chosenItemForTradingExp = this.tradingExp[0].name;

        this.userValues.gender = this.gender[0].name;
        this.userValues.marital = this.maritalstatus[0].name;
        this.userValues.Income = this.income[2].name;
        this.userValues.trading = this.tradingExp[0].name;

        await this.loadingController.dismiss().then(() => console.log('ExchangeSelectionDataList dismissed'));
      } else {
        await this.loadingController.dismiss().then(() => console.log('ExchangeSelectionDataList dismissed'));
        this.errorShow(data?.Message, "processBankVerifyPostData -> status");
      }
    }, async (error: any) => {
      await this.loadingController.dismiss().then(() => console.log('ExchangeSelectionDataList dismissed'));
      this.errorShow(error?.Message, "processBankVerifyPostData -> Http request");
    })
  }
  
  successModalClose() {
    this.loggedInModal = false
  }

  getGender(status: any) {
    this.userValues.gender = status;
    // console.log(this.userValues)
    this.submitted()
  }

  getMarital(status: any) {
    this.userValues.marital = status;
    // console.log(this.userValues)
    this.submitted()
  }

  getIncome(status: any) {
    this.userValues.Income = status;
    // console.log(this.userValues)
    this.submitted()
  }
  getExp(status: any) {
    this.userValues.trading = status
    // console.log(this.userValues)
    this.submitted()
  }

  submitted() {
    if (this.userValues.gender && this.userValues.marital && this.userValues.Income && this.userValues.trading) {
      if (this.currentNativeNetwork) {
        this.continueNextPage = false
      } else {
        this.ErrorMsg = this.errorList?.networkError
        this.loggedInModal = true
        setTimeout(() => {
          this.loggedInModal = false;
        }, 3000);
      }
    }
  }

  onContinue() {
    if (this.currentNativeNetwork) {
      this.loaderService.showLoader();
      let params = {
        "CustGuId": this.loginCustomerGuId,
        "Gender": this.userValues.gender,
        "Maritalstatus": this.userValues.marital,
        "IncomeGroup": this.userValues.Income,
        "TradingExperience": this.userValues.trading,
        "flag": "UpdateProfile"
      }

      // this.commonservice.setProfileDetails(params)
      this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.updateCustomerDetail, params)
      .subscribe((data: any) => {
        // this.loaderService.hideLoader();
        // console.log("update", data)
        if (data && data.URLtoRedirect === "/Nominee") {
        this.router.navigate(['/Onboarding'+data['URLtoRedirect']]);
          // this.processPerDetailsPostData();
          // this.getPersonalStatus.emit('personal')
        } else {
          this.errorShow(data?.Message, "getProfileDetails -> status");
        }
      }, (error: any) => {
        this.errorShow(error?.Message, "getProfileDetails -> Http request");
      })
    } else {
      this.loaderService.hideLoader();
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
    }
  }

  processPerDetailsPostData() {
    let localPostData = {
      "CustGuId": this.loginCustomerGuId,
      "DocumentGuId": this.personalDetails?.DocumentGuId,
      "OfferingGuId": this.currentModuleType?.OfferingGuId
    }
    // this.loaderService.showLoader();
    // this.commonservice.postPanDetails(localPostData)
    this.http.get('assets/data/getNextSteps.json')
    .subscribe((data: any) => {
      this.loaderService.hideLoader();
      if (data && data?.StatusCode) {
        // this.getPersonalStatus.emit('personal')
        this.router.navigate(['/Onboarding'+data['URLtoRedirect']]);
      } else {
        this.errorShow(data?.Message, "processPANPostData -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "processPANPostData -> Http request");
    })
  }

  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, 'container-view page -> ' + functionName, message, this.errorList?.okText);
  }
}
