import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';

import { panDetails } from 'index';
import { AllConfigDataService } from 'index';
import { CommonFunctionService } from 'index';
import { CommonService } from 'index';
import { LoaderService } from 'index';
import { NetworkService } from 'index';
import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';

@Component({
  selector: 'app-display-bank-details',
  templateUrl: './display-bank-details.component.html',
  styleUrls: ['./display-bank-details.component.scss'],
})

export class DisplayBankDetailsComponent implements OnInit {
  imageList: any;
  bankData:any;
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
  partnerFlow: any=localStorage.getItem("userType");
  breadCrumbPartner: string;


  constructor(private allConfigDataService: AllConfigDataService, private networkService: NetworkService,
    private loaderService: LoaderService,private commonService: CommonService,
    private commonFunctionService: CommonFunctionService, private router: Router,private http: HttpClient,
    private eduService: eduService, private onboardingService:OnboardingService
    ) {
    this.imageList = this.allConfigDataService.getConfig('images');

    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Onboarding/OnboardingSteps/BankAccount';
    this.breadCrumbPartner='Onboarding/OnboardingSteps/PartnerBankAccount';


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
  console.log(this.bankData,"----------------------------------");

 })
}

  onVerifyBank() {

    let postBankData = {
      "TokenId": localStorage.getItem('id_token'),
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
    // if(localStorage.getItem("userType")=="Partner"){
    //   this.router.navigate(['/Onboarding/partnerdetail'])
    // }else{
    this.processBankPostData(postBankData);
    // }
  }


  successModalClose() {
    this.loggedInModal = false
  }

  processBankPostData(obj) {
    // let confirmBankDetail;
    // const sub=this.eduService.categoryValueForAPI.subscribe(val => {
      if(localStorage.getItem("userType")=="Partner"){
    //     this.loaderService.showLoader();
    //   this.http.post(
    //   this.apiCatalog.baseURL[this.appEnviron]+
    //   this.breadCrumbPartner+
    //   this.apiCatalog.PartnerConfirmBankDetail
    //   ,
    //   obj)
    // .subscribe((data: panDetails) => {
    //   this.loaderService.hideLoader();
    //   if (data) {
    //       // this.getBankStatus.emit('bank')
    //       this.router.navigate(['/Onboarding'+data['pageUrl']]);
    //   } else {
    //     this.errorShow(data?.Message, "processBankVerifyPostData -> status");
    //   }
    // }, (error: any) => {
    //   this.errorShow(error?.Message, "processBankVerifyPostData -> Http request");
    // })
    this.router.navigate(['Onboarding/otherDetails'])
      }
      else if(localStorage.getItem("userType")=="Customer"){
      // confirmBankDetail = val['productLanding']?'_'+val['categoryLanding']+'_'+val['productLanding']:'';
      //  this.loaderService.showLoader();
      // this.http.post(
      //   this.apiCatalog.baseURL[this.appEnviron]+
      //   this.breadCrumb+
      //   this.apiCatalog.confirmBankDetail+
      //   confirmBankDetail,
      //   obj)
      // .subscribe((data: panDetails) => {
      //   this.loaderService.hideLoader();
      //   if (data) {
      //       // this.getBankStatus.emit('bank')
      //       // this.router.navigate(['/Onboarding'+data['pageUrl']]);
      //   } else {
      //     this.errorShow(data?.Message, "processBankVerifyPostData -> status");
      //   }
      // }, (error: any) => {
      //   this.errorShow(error?.Message, "processBankVerifyPostData -> Http request");
      // })
      this.onboardingService.nextOnSuccess('Bank');
      }
    // })


  }

  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, 'Bank Detail Component -> ' + functionName, message, this.errorList?.okText)
  }


//   DGbankPartnerRegistration(){
//     let param={

//         "uniqueId": "1236584",
//         "accountNumber": "123456789654",
//         "ifscCode": "HDFC0000014",
//         "accountName": "Vicky",
//         "bankName": "Maharastra Bank",
//         "status": "active"

//     }

//     this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.digiPatnerBankRegistration, param).subscribe((res:any)=>{
//       console.log(res,"===============>");
//       alert(res.message)
//     })



// }
skip(val){
  this.onboardingService.skip(val);
}



}
