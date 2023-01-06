import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { panDetails } from '../../interfaces/common.interface';
import { AllConfigDataService } from '../../services/all-config-data.service';
import { CommonFunctionService } from '../../services/common-function.service';
import { CommonService } from '../../services/common.service';
import { LoaderService } from '../../services/loader.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-display-bank-details',
  templateUrl: './display-bank-details.component.html',
  styleUrls: ['./display-bank-details.component.scss'],
})
export class DisplayBankDetailsComponent implements OnInit {
  imageList: any;
  bankData: { msg: { BankName: string; BankAccountNumber: any; IFSCCode: any; AccountHolderName: string; BankBranchAddress: { Branch: string; Address: string; City: string; State: string; District: string; Contact: string; }; }; };
  currentInputBank: any;
  currentInputBranch: any;
  loginCustomerGuId: any;
  bankDetails: any;
  currentModuleType: any;
  currentWindowNetwork: any;
  isCordovaStatus: any;
  currentNativeNetwork: any;
  loggedInModal: boolean;
  ErrorMsg: any;
  errorList: any;
  showThirdStep: boolean;
  showSecondStep: boolean = true;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;

  constructor(private allConfigDataService: AllConfigDataService, private networkService: NetworkService,
    private loaderService: LoaderService,private commonService: CommonService,
    private commonFunctionService: CommonFunctionService, private router: Router,private http: HttpClient) {
    this.imageList = this.allConfigDataService.getConfig('images');

    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Onboarding/OnboardingSteps/BankValidation';

  }

  ngOnInit() {
    this.networkService.onNetworkChange().subscribe((data: any) => {
      this.currentNativeNetwork = data;
    })

    this.networkService.getCordovaStatus().subscribe((data) => {
      this.isCordovaStatus = data;
    })
    this.networkService.updateNetworkStatusbrowserchange().subscribe((data) => {
      this.currentWindowNetwork = data;
    })


  }
ionViewDidEnter(){
 this.commonService.userBankData.subscribe((data) => {
  this.bankData = data;
 })
}

  onVerifyBank() {


    let postBankData = {
      "CustGuId": this.loginCustomerGuId,
      "DocumentGuId": this.bankDetails?.DocumentGuId,
      "OfferingGuId": this.currentModuleType?.OfferingGuId,
      "ifsc": this.bankData?.msg['IFSCCode'],
      "BankName": this.bankData?.msg['BankName'],
      "Branch": this.bankData?.msg['BankBranchAddress']?.Branch,
      "Address": this.bankData?.msg['BankBranchAddress']?.Address,
      "City": this.bankData?.msg['BankBranchAddress']?.City,
      "State": this.bankData?.msg['BankBranchAddress']?.State,
      "AccountNumber": this.bankData?.msg['BankAccountNumber']
    }
    if (this.isCordovaStatus) {
      this.nativeNetworkPostBankData(postBankData);
    } else {
      this.windowNetworkPostBankData(postBankData);
    }
  }

  nativeNetworkPostBankData(obj) {
    this.processBankPostData(obj);
    // if (this.currentNativeNetwork) {
    //   // this.dummyPanPOST() //by pass
    // } else {
    //   this.ErrorMsg = this.errorList?.networkError
    //   this.loggedInModal = true
    //   setTimeout(() => {
    //     this.loggedInModal = false;
    //   }, 3000);
    // }
  }
  windowNetworkPostBankData(obj) {
    this.processBankPostData(obj)
    // if (this.currentWindowNetwork) {
    //   // this.dummyPanPOST() //by pass
    // } else {
    //   this.ErrorMsg = this.errorList?.networkError
    //   this.loggedInModal = true
    //   setTimeout(() => {
    //     this.loggedInModal = false;
    //   }, 3000);
    // }
  }

  successModalClose() {
    this.loggedInModal = false
  }
  processBankPostData(obj) {
    this.loaderService.showLoader();
    // this.commonService.postPanDetails(obj)
    // this.http.get('assets/data/getNextSteps.json')
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.processPostBankData, obj)
    .subscribe((data: panDetails) => {
      this.loaderService.hideLoader();
      if (data) {
        this.showThirdStep = true;
        this.showSecondStep = false;
        setInterval(() => {
          // this.getBankStatus.emit('bank')
          this.router.navigate(['/Onboarding'+data['URLtoRedirect']]);
          // this.router.navigate(['/Onboarding'+data['UrlToRedirect']]);IncomeProof
          // this.router.navigate(['/Onboarding/IncomeProof']);
        }, 2000)

      } else {
        this.errorShow(data?.Message, "processBankVerifyPostData -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "processBankVerifyPostData -> Http request");
    })
  }

  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, 'Bank Detail Component -> ' + functionName, message, this.errorList?.okText)
  }

}
