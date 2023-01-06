import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AllConfigDataService } from 'index';
import { CommonFunctionService } from 'index';
import { CommonService } from 'index';
import { LoaderService } from 'index';
import { NetworkService } from 'index';
import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';

@Component({
    selector: 'lib-other-details',
    templateUrl: './other-details.component.html',
    styleUrls: ['./other-details.component.scss'],
  })
export class OtherDetailsComponent implements OnInit {

dontShowHeader=true;

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
    expCap: "",
    nism : ""
  }

  gender: any = [];
  maritalstatus: any = [];
  income: any = [];
  tradingExp: any = [];
  expCapacity : any = [];
  NISMcertificate : any = [];

  chosenItemForGender: any;
  chosenItemForTradingExp: any;
  chosenItemForMarital: any;
  // chosenItemForIncome: any;
  chosenItemForExpCap: any;
  chosenItemForNism: any;


  currentNativeNetwork: any;

  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  showData: boolean = true;
  hideData: boolean = true;
  occupation: any;

  constructor(private allConfigDataService: AllConfigDataService, private commonservice: CommonService, private loadingController: LoadingController,
    private loaderService: LoaderService, private commonFunctionService: CommonFunctionService, private networkService: NetworkService,
    private onboardingService:OnboardingService,
    private router: Router, private http: HttpClient) {
      this.apiCatalog={
        ...this.allConfigDataService.getConfig('apiCatalog'),
      };
      this.appEnviron = this.allConfigDataService.getConfig('environmentType');
      this.breadCrumb='Onboarding/OnboardingSteps/PartnerRegistration';
    }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
    this.appName = this.allConfigDataService.getConfig('appName');



    this.networkService.onNetworkChange().subscribe((data: any) => {
      this.currentNativeNetwork = data;

      // if(localStorage.getItem("userType") == "Partner"){
      //   this.showData = false;
      //   this.partnerProfileDetail();
      // }

      // if(localStorage.getItem("userType") == "Customer"){
      //   this.hideData = false;
      // }

    })
  }

  ngAfterViewInit() {
    this.getCountryMasterDetails('PartnerProfileDetails', null);
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

    let param = {
      "Type": type
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+"Onboarding/OnboardingSteps/PartnerRegistration" +'/getDetail?getProfile', param).subscribe(async (data: any) => {
      this.loaderService.hideLoader();
      console.log("profilellllllllllllll",data.getProfile.data);


      if (data && data?.getProfile.Status) {
        // console.log(data)
        let responseData = data.getProfile.data;
        console.log(responseData);


        for (let i = 0; i < responseData.length; i++) {

          let listData = {
            name: "",
            id: ""
          }

          if (responseData[i].Type === "Gender") {
            listData.name = responseData[i].TEXT;
            listData.id = responseData[i].ID;
            this.gender.push(listData);
          }

          // else if (responseData[i].Type === "IncomeGroup") {
          //   // console.log(responseData[i].TEXT)
          //   listData.name = responseData[i].TEXT;
          //   listData.id = responseData[i].ID;
          //   this.income.push(listData);
          // }

          else if (responseData[i].Type === "MaritalStatus") {
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

         else if(responseData[i].Type === "Experience in capacity") {
            // console.log(responseData[i].TEXT)
            listData.name = responseData[i].TEXT;
            listData.id = responseData[i].ID;
            this.expCapacity.push(listData);
          }
          else if (responseData[i].Type === "NISM Certificate") {
            // console.log(responseData[i].TEXT)
            listData.name = responseData[i].TEXT;
            listData.id = responseData[i].ID;
            this.NISMcertificate.push(listData);
          }

        }
        this.chosenItemForGender = this.gender[0].name;
        this.chosenItemForMarital = this.maritalstatus[0].name;
        // this.chosenItemForIncome = this.income[2].name;
        this.chosenItemForTradingExp = this.tradingExp[0].name;
        this.chosenItemForExpCap = this.expCapacity[0].name;
        this.chosenItemForNism = this.NISMcertificate[0].name;




        this.userValues.gender = this.gender[0].name;
        this.userValues.marital = this.maritalstatus[0].name;
        // this.userValues.Income = this.income[2].name;
        this.userValues.trading = this.tradingExp[0].name;
        this.userValues.expCap = this.expCapacity[0].name;

        this.userValues.nism = this.NISMcertificate[0].name;


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

  // getIncome(status: any) {
  //   this.userValues.Income = status;
  //   // console.log(this.userValues)
  //   this.submitted()
  // }


  getExp(status: any) {
    this.userValues.trading = status
    // console.log(this.userValues)
    this.submitted()
  }
  getExpCap(status: any) {
    this.userValues.expCap = status
    // console.log(this.userValues)
    this.submitted()
  }
  getNism(status: any) {
    this.userValues.nism = status
    // console.log(this.userValues)
    this.submitted()
  }

  submitted() {
    if (this.userValues.gender && this.userValues.marital && this.userValues.trading && this.userValues.nism && this.userValues.nism) {
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

  getOccupation(type) {
    let params = {
      Type: type,
    };

    this.http
      .post(
        this.apiCatalog.baseURL[this.appEnviron] +
          this.breadCrumb +
          '/getDetail?Occupation',
        params
      )
      .subscribe((data: any) => {
        if (data && data?.Status) {
          this.occupation = data.data;
          // console.log(this.salutationList);
        }
      });
  }


  partnerProfileDetail(){
    let param={

    }

        this.http.post(this.apiCatalog.baseURL[this.appEnviron]+"Onboarding/OnboardingSteps/PartnerRegistration" +'/getDetail?getProfile', param).subscribe((data:any)=>{
        console.log("heyyyyyyyyyyyyyyyyyyy", data );
        this.loaderService.hideLoader();

      if (data && data?.Status) {
        // console.log(data)
        let responseData = data.data;
        for (let i = 0; i < responseData.length; i++) {

          let listData = {
            name: "",
            id: ""
          }


          if(responseData[i].Type === "expInCapacity") {
            // console.log(responseData[i].TEXT)
            listData.name = responseData[i].TEXT;
            listData.id = responseData[i].ID;
            this.expCapacity.push(listData);
          }
          else if (responseData[i].Type === "nismCertificate") {
            // console.log(responseData[i].TEXT)
            listData.name = responseData[i].TEXT;
            listData.id = responseData[i].ID;
            this.NISMcertificate.push(listData);
          }

        }
        // this.chosenItemForGender = this.gender[0].name;
        // this.chosenItemForMarital = this.maritalstatus[0].name;
        // this.chosenItemForIncome = this.income[2].name;
        // this.chosenItemForTradingExp = this.tradingExp[0].name;

        // this.userValues.gender = this.gender[0].name;
        // this.userValues.marital = this.maritalstatus[0].name;
        // this.userValues.Income = this.income[2].name;
        // this.userValues.trading = this.tradingExp[0].name;

      }
    } )


  }

  onContinue() {
if(localStorage.getItem("userType") == "Partner"){
  // this.router.navigate(['/Onboarding/Selfie'])

      if (this.currentNativeNetwork) {
      this.loaderService.showLoader();
      let params = {
        "TokenId": localStorage.getItem('id_token'),
        "Gender": this.userValues.gender,
        "Maritalstatus": this.userValues.marital,
        "IncomeGroup": "5-10L",
        "TradingExperience": this.userValues.trading,
        "ExpCapacity":this.userValues.expCap,
        "Occupation":"abcd",
        "flag": "UpdateProfile"
      }

      // this.commonservice.setProfileDetails(params)
      this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.updatePersonalDetail, params)
      .subscribe((data: any) => {
        this.loaderService.hideLoader();
        // console.log("update", data)
        if (data && data.Status) {
        // this.router.navigate(['/Onboarding'+data['pageUrl']]);
        // this.onboardingService.nextOnSuccess('PersonalInformation');
          // this.processPerDetailsPostData();
          // this.getPersonalStatus.emit('personal')
          this.router.navigate(['/Onboarding'+data['pageUrl']]);

        } else {
          this.errorShow(data?.Message, "getProfileDetails -> status");
        }
      }, (error: any) => {
        this.errorShow(error?.Message, "getProfileDetails -> Http request");
      })
    }

}

// if(localStorage.getItem("userType") == "Customer"){
//     if (this.currentNativeNetwork) {
//       this.loaderService.showLoader();
//       let params = {
//         "TokenId": localStorage.getItem('id_token'),
//         "Gender": this.userValues.gender,
//         "Maritalstatus": this.userValues.marital,
//         "IncomeGroup": this.userValues.Income,
//         "TradingExperience": this.userValues.trading,
//         "flag": "UpdateProfile"
//       }

//       // this.commonservice.setProfileDetails(params)
//       this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.updatePersonalDetail, params)
//       .subscribe((data: any) => {
//         this.loaderService.hideLoader();
//         // console.log("update", data)
//         if (data && data.Status) {
//         // this.router.navigate(['/Onboarding'+data['pageUrl']]);
//         this.onboardingService.nextOnSuccess('PersonalInformation');
//           // this.processPerDetailsPostData();
//           // this.getPersonalStatus.emit('personal')
//         } else {
//           this.errorShow(data?.Message, "getProfileDetails -> status");
//         }
//       }, (error: any) => {
//         this.errorShow(error?.Message, "getProfileDetails -> Http request");
//       })
//     }
//   }

    else {
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
      tokenId: localStorage.getItem('id_token'),
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












// import { Router } from '@angular/router';
// import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
// import { HttpClient } from '@angular/common/http';
// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { NetworkService } from 'projects/core/src/lib/services/network.service';
// import { LoadingController } from '@ionic/angular';
// import { LoaderService } from 'projects/core/src/lib/services/loader.service';
// import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';


// @Component({
//   selector: 'lib-other-details',
//   templateUrl: './other-details.component.html',
//   styleUrls: ['./other-details.component.scss'],
// })
// export class OtherDetailsComponent implements OnInit {
// @Output() otherDetailsUploaded = new EventEmitter();
// @Input() imageList: any;
// @Input() loginCustomerGuId: any;

// occupation:any=[
//     {name:'Private Sector Service',value:'Private Sector Service'},
//     {name:'Public Sector',value:'Public Sector'},
//     {name:'Governmemt Service',value:'Governmemt Service'},
//     {name:'Professional',value:'Professional'},
//     {name:'Agriculturist',value:'Agriculturist'},
//     {name:'Retired',value:'Retired'},
// ]
// occupationStatus:any='Private Sector Service';


// userValues = {
//   gender: "",
//   marital: "",
//   trading: "",
//   Income: ""
// }

// chosenItemForGender: any;
// chosenItemForTradingExp: any;
// chosenItemForMarital: any;
// chosenItemForIncome: any;
// currentNativeNetwork: any;
//   continueNextPage: boolean;
//   loggedInModal: boolean;
//   errorList: any;
//   ErrorMsg: any;


//   appEnviron: any;
//   breadCrumb: string;
//   apiCatalog: any;
//   responseData: any;
//   constructor(private http:HttpClient,private loaderService:LoaderService,private commonFunctionService: CommonFunctionService,private allConfigDataService:AllConfigDataService,private router:Router,private networkService:NetworkService,private loadingController: LoadingController) {
//     this.apiCatalog={
//       ...this.allConfigDataService.getConfig('apiCatalog'),
//     };
//     this.appEnviron = this.allConfigDataService.getConfig('environmentType');
//     this.breadCrumb='Onboarding/OnboardingSteps/NeoBank';
//   }




//   ngOnInit() {
//     this.imageList=this.allConfigDataService.getConfig('images')

//     this.networkService.onNetworkChange().subscribe((data: any) => {
//       this.currentNativeNetwork = data;
//     })

//   }

//   ngAfterViewInit() {
//     this.getCountryMasterDetails('Profile', null);
//   }

//    getCountryMasterDetails(type, value) {


//     let params = {
//       "Type": type
//     }
//     this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+'/getDetail?getProfile', params).subscribe(async (data: any) => {
//       this.loaderService.hideLoader();

//       if (data && data?.Status) {
//         // console.log(data)
//         this.responseData = data.Data;


//       }
//     })

//     }




//   getGender(status: any) {
//     this.userValues.gender = status;
//     // console.log(this.userValues)
//     this.submitted()
//   }

//   getMarital(status: any) {
//     this.userValues.marital = status;
//     // console.log(this.userValues)
//     this.submitted()
//   }

//   getExp(status: any) {
//     this.userValues.trading = status
//     // console.log(this.userValues)
//     this.submitted()
//   }





//   submitted() {
//     if (this.userValues.gender && this.userValues.marital && this.userValues.trading) {
//       if (this.currentNativeNetwork) {
//         this.continueNextPage = false
//       } else {
//         this.ErrorMsg = this.errorList?.networkError
//         this.loggedInModal = true
//         setTimeout(() => {
//           this.loggedInModal = false;
//         }, 3000);
//       }
//     }
//   }

//   onContinue() {
//     if (this.currentNativeNetwork) {
//       this.loaderService.showLoader();
//       let params = {
//         "CustGuId": this.loginCustomerGuId,
//         "Gender": this.userValues.gender,
//         "Maritalstatus": this.userValues.marital,
//         "IncomeGroup": this.userValues.Income,
//         "TradingExperience": this.userValues.trading,
//         "flag": "UpdateProfile"
//       }

//       // this.commonservice.setProfileDetails(params)
//       this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getOtherDetail, params)
//       .subscribe((data: any) => {
//         // this.loaderService.hideLoader();
//         // console.log("update", data)
//         if (data && data.URLtoRedirect === "/Nominee") {
//         this.router.navigate(['/neoBankOnboarding'+data['pageUrl']]);
//           // this.processPerDetailsPostData();
//           // this.getPersonalStatus.emit('personal')
//         } else {
//           this.errorShow(data?.Message, "getProfileDetails -> status");
//         }
//       }, (error: any) => {
//         this.errorShow(error?.Message, "getProfileDetails -> Http request");
//       })
//     } else {
//       this.loaderService.hideLoader();
//       this.ErrorMsg = this.errorList?.networkError
//       this.loggedInModal = true
//       setTimeout(() => {
//         this.loggedInModal = false;
//       }, 3000);
//     }
//   }


//   errorShow(message, functionName) {
//     this.loaderService.hideLoader();
//     this.commonFunctionService.showErrorsService(this.errorList?.error, 'container-view page -> ' + functionName, message, this.errorList?.okText);
//   }
//   NavToSelfie(){
//     this.router.navigate(['/Onboarding/Selfie'])
//   }


// }
