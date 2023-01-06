import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { CommonService } from 'index';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { NetworkService } from 'projects/core/src/lib/services/network.service';
import { CommonFunctionService } from 'index';
import { urlFetch } from 'projects/core/src/lib/enums/comman.enum';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { AllConfigDataService } from 'index';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';

@Component({
  selector: 'lib-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, AfterViewInit {
  @Input() environmentAPI: any;
  @Input() currentDevice: any;
  @Input() imageList: any;
  @Input() errorList: any;
  @Input() gmailAuthentication: any;
  @Input() mobileAuthentication: any;
  @Input() faceBookAuthentication: any;
  @Input() instagramAuthentication: any;
  @Input() otherAuthentication: any;
  @Input() currentCountryAuthentication: any;
  @Input() LoginType: any
  @Input() currentLanguage: any
  @Output() sendLoggingDataLoginList = new EventEmitter<any>();
  @Output() sendLoggingDataCustMobileDetail = new EventEmitter<any>();
  @Output() openModal = new EventEmitter();
  currentNativeNetwork: any;
  currentWindowNetwork: any;
  isCordovaStatus: any;
  policyCheckBox: boolean = true;
  socialLoginData: any = {};
  invitationModal: boolean = false;
  invitationModalFirst: any = 0;
  invCodeError: boolean = false;
  divType1: string;
  mType: any;
  mContains: any;
  loggedInModal: boolean = false
  ErrorMsg: any;
  mobileExist: any;
  testFlip: any;
  ExistData: any;
  appName: any;
  mobileNumber: any;
  alreadyExist: boolean = false;
  button: boolean = true;
  fbProfileAPI = 'me?fields=id,name,email,first_name,last_name,location,birthday,gender,picture.width(720).height(720).as(picture_large)';
  fbAuthenticationAPI = ['email', 'public_profile']
  custID: string;
  newustID: any;
  Login: boolean = true;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  user:any=[{name:"Customer"},
  {name:"Partner"}]
  userType:any;

  constructor(private eduService :eduService ,private http:HttpClient,private router: Router, public commonService: CommonService, private allConfigDataService: AllConfigDataService, private fb: Facebook, public googlePlus: GooglePlus, private loaderService: LoaderService, private commonFunctionService: CommonFunctionService, private networkService: NetworkService) {

    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Onboarding/OnboardingSteps/Token';
    this.userType=this.user[0].name
  }

  ngOnInit() {
    this.segmentChanged(this.user[0].name)
    this.commonService.getUserDetail().subscribe((data: any) => {
      if (data) {
        this.mobileNumber = data?.contactDetails
        console.log("Mobile---------------------------------", this.mobileNumber);
    if (this.mobileNumber !== "undefined") {
      this.isExistingCustomer();
    }
      }
    })
    // this.mobileNumber = this.router.url.split('mobile=')[1];
    // localStorage.setItem("MobileNo",this.mobileNumber)
    // this.mobileExist =  localStorage.getItem("MobileNo")
    // console.log("Mobile", this.mobileNumber);
    if (this.mobileNumber !== "undefined") {
      this.isExistingCustomer();
    }
    this.invitationModalFirst = localStorage.getItem('invitationCode')
    this.appName = this.allConfigDataService.getConfig('appName');
    this.networkService.onNetworkChange().subscribe((data: any) => {
      this.currentNativeNetwork = data;
    })
    this.networkService.getCordovaStatus().subscribe((data) => {
      this.isCordovaStatus = data;
    })
    this.networkService.updateNetworkStatusbrowserchange().subscribe((data) => {
      this.currentWindowNetwork = data;
    })

    this.testFlip = [
      {
        name: "Smart",
        name2: "Wellness"
      }, {
        name: "Wealth",
        name2: "Wellness"
      }, {
        name: "Health",
        name2: "Wellness"
      }, {
        name: "Education",
        name2: "Wellness"
      }
    ]


    // this.custID = this.router.url.split('custID=')[1];
    // console.log(this.mobileNumber);
    // console.log(this.custID);

    // this.activRoute.queryParamMap.subscribe((params) => {
    //   this.paramsObject = { ...params.keys, ...params };
    //   console.log(this.paramsObject);
    // }

    // this.activRoute
    // .queryParams
    // .subscribe(params => {
    //   console.log(params);
    //   this.newustID = params.custID;
    //   this.mobileNumber = params.mobile;
    // });

    // console.log("----------------------------",this.newustID, this.mobileNumber);
  }
  successModalClose() {
    this.loggedInModal = false
  }


  ngAfterViewInit() { }

  async onContinue(type, contains) {
    localStorage.setItem("reload", "0");
    if (this.mobileNumber) {
      let data = {
        "MobileNo": this.mobileNumber
      }
      if (this.isCordovaStatus) {
        this.nativeNetworkCustMob(data);
      } else {
        this.windowNetworkCustMob(data);
      }
    } else {
      this.collectionOfData(type, contains)
    }

  }

  nativeNetworkCustMob(data) {
    if (this.currentNativeNetwork) {
      this.getCustMobileDetail(data)
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
    }
  }

  windowNetworkCustMob(data) {
    if (this.currentWindowNetwork) {
      this.getCustMobileDetail(data)
      // this.sendOTPPage()
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
    }
  }

  getCustMobileDetail(data) {

    this.loaderService.showLoader();
    this.commonService.getCustMobileDetail(data).subscribe((data: any) => {
      this.loaderService.hideLoader();
      if (data && data?.Status == 1) {
        this.loginCustMobileDetail(data)
      } else {
        this.loaderService.hideLoader();
        this.errorShow(data?.Message, "loginAuthenticationOTP -> status ")
      }

    }, (error: any) => {
      this.loaderService.hideLoader();
      this.errorShow(error, "loginAuthenticationOTP -> status ")
    })
  }

  async sendToLoginListComponent(type, contains) {

    this.mType = type;
    this.mContains = contains;

    if (this.isCordovaStatus) {
      this.nativeNetwork(type, contains);
    } else {
      this.windowNetwork(type, contains);
    }
    // }

  }

  closeInvitationModal(divType) {
    if (divType == "divAddFront") {
      this.divType1 = "divAddFrontFound";
    } else if (divType == "divAddBack") {
      if (this.divType1 != "divAddFrontFound") {
        this.invitationModal = false;
      }
      this.divType1 = ""
    }
  }

  inputKeyup() {
    if (this.invCodeError) {
      this.invCodeError = false;
    }
  }
  async onClickSubmit(invCode) {
    if (invCode === "H@yAq") {
      localStorage.setItem('invitationCode', '1')
      this.invitationModal = false;
      this.invCodeError = false;
      if (this.isCordovaStatus) {
        this.nativeNetwork(this.mType, this.mContains);
      } else {
        this.windowNetwork(this.mType, this.mContains);
      }
    }
    else {
      this.invCodeError = true;
    };
  }

  nativeNetwork(type, contains) {
    if (this.currentNativeNetwork) {
      this.collectionOfData(type, contains);
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
    }
  }

  windowNetwork(type, contains) {
    if (this.currentWindowNetwork) {
      this.collectionOfData(type, contains)
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
    }
  }
  collectionOfData(type, contains) {
    // console.log("found ", type)
    if (this.policyCheckBox) {
      if ((type === this.LoginType?.mobile) || (type === this.LoginType?.other)) {
        this.openModal.emit({ type: type, contains: contains })
      } else {
        this.socialLoginAuthentication(type)
      }
    } else {
      this.ErrorMsg = this.errorList?.tcError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
    }
  }
  checkboxClick(e) {
    this.policyCheckBox = !this.policyCheckBox
  }

  socialLoginAuthentication(type) {
    switch (type) {
      case this.LoginType.gmail:
        this.loginAuthenticationGmail(type);
        break;
      case this.LoginType.fb:
        this.loginAuthenticationFB(type);
        break;
      default:
        break;
    }
  }

  loginAuthenticationGmail(type) {
    this.loaderService.showLoader();
    this.googlePlus.login({})
      .then((result: any) => {
        this.loaderService.hideLoader();
        if (result) {
          this.socialLoginData['SourceType'] = type;
          // this.socialLoginData['ClientId'] = result?.userId
          this.socialLoginData['ClientId'] = result?.email
          this.socialLoginData['FirstName'] = result?.givenName;
          this.socialLoginData['LastName'] = result?.familyName
          this.socialLoginData['Identity'] = this.commonService.setLocalIdentifier(),
            //this.socialLoginData['Gender'] = '';
            this.socialLoginData['EmailId'] = result?.email
          this.socialLoginData['Currency'] = this.currentCountryAuthentication?.code;
          this.socialLoginData['Language'] = this.currentLanguage;
          // this.socialLoginData['AddressLine1'] = '';
          // this.socialLoginData['AddressLine2'] = ''
          // this.socialLoginData['AddressLine3'] = '';
          // this.socialLoginData['Pincode'] = ''
          // this.socialLoginData['City'] = '';
          // this.socialLoginData['State'] = ''
          // this.socialLoginData['AddressType'] = '';
          // this.socialLoginData['MobileNo'] = ''
          // this.socialLoginData['DateOfBirth'] = '';
          // this.socialLoginData['MiddleName'] = ''
          // this.socialLoginData['Salutation'] = '';
          if (this.socialLoginData) {
            this.collectionSocialUserData(this.socialLoginData)
          }

        } else {
          this.errorShow("Google Gmail API ", "loginAuthenticationGmail -> Http response ")
        }
      })
      .catch(
        (err) => {
          this.errorShow(JSON.stringify(err), "loginAuthenticationGmail -> Http response ")
        }
      );
  }

  loginAuthenticationFB(type) {
    // this.loaderService.showLoader();
    this.fb.login(this.fbAuthenticationAPI)
      .then((response: FacebookLoginResponse) => {
        if (response) {
          this.collectionFBData(response, type)
        } else {
          this.errorShow('Facebook Login API', "loginAuthenticationFB ->  profile")
        }

      })
      .catch(
        (err) => {
          this.errorShow(JSON.stringify(err), "loginAuthenticationFB -> Http response ")
        }
      )
  }

  collectionFBData(data, type) {
    this.fb.api(this.fbProfileAPI, [])
      .then(profile => {
        this.loaderService.hideLoader();
        if (profile) {
          this.socialLoginData['SourceType'] = type;
          this.socialLoginData['ClientId'] = profile?.id
          this.socialLoginData['Identity'] = this.commonService.setLocalIdentifier(),
          this.socialLoginData['FirstName'] = profile?.first_name;
          this.socialLoginData['LastName'] = profile?.last_name;
          this.socialLoginData['Gender'] = profile?.gender;
          this.socialLoginData['EmailId'] = profile?.email;
          this.socialLoginData['Currency'] = this.currentCountryAuthentication?.code;
          this.socialLoginData['Language'] = this.currentLanguage;
          // this.socialLoginData['AddressLine1'] = '';
          // this.socialLoginData['AddressLine2'] = ''
          // this.socialLoginData['AddressLine3'] = '';
          // this.socialLoginData['Pincode'] = ''
          // this.socialLoginData['City'] = '';
          // this.socialLoginData['State'] = ''
          // this.socialLoginData['AddressType'] = '';
          // this.socialLoginData['MobileNo'] = ''
          // this.socialLoginData['DateOfBirth'] = '';
          // this.socialLoginData['MiddleName'] = ''
          // this.socialLoginData['Salutation'] = '';
          if (this.socialLoginData) {
            this.collectionSocialUserData(this.socialLoginData)
          }
        } else {
          this.errorShow('Facebook Profile API', "collectionFBData ->  profile")
        }


      })
      .catch(
        (err) => {
          this.errorShow(JSON.stringify(err), "collectionFBData -> Http response ")
        }
      )
  }

  collectionSocialUserData(data) {
    if (data) {
      this.loginDataShare(data)
    }
  }

  loginDataShare(data) {
    this.sendLoggingDataLoginList.emit(data)
  }

  loginCustMobileDetail(data) {
    this.sendLoggingDataCustMobileDetail.emit(data)
  }

  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, 'Sign-in component -> ' + functionName, message, this.errorList?.okText);
  }

  clickTncUrl() {

    this.commonFunctionService.inAppBrowser(urlFetch.tncWithoutWWW);
  }



  isExistingCustomer() {
    let obj = {
      "contactDetails": this.mobileNumber
    }
    // debugger;
    // this.loaderService.showLoader();
    // this.commonService.getExistingcustomerDetails(obj).subscribe((data) => {
    this.http.post(this.apiCatalog.baseURL[this.appEnviron] + this.breadCrumb + this.apiCatalog.isExistingCustomer, obj).subscribe(async (data: any) => {
      console.log("Details ======>", data);
      this.ExistData = data
      if (this.ExistData.Data == "Y") {
        // this.loaderService.showLoader();
        this.alreadyExist = true;
        this.button = true;
      } else {
        this.alreadyExist = false;
        this.button = false;
      }
      console.log("alreadyExist", this.alreadyExist);
      this.loaderService.hideLoader();
    });
  }

  goToLogin() {
    window.open("https://tick.reliancesmartmoney.com/#/login")
  }

  segmentChanged(val){
    localStorage.setItem("userType", val);

this.userType = val
  }
}
