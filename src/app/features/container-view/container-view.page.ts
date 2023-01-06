
import { Component, OnInit, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibConfigService } from 'projects/lib-config/src/public-api';
import { IntroComponent } from 'projects/intro/src/lib/intro.component';
import { LoginPage } from '../login/login.page';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from 'index';
import { AuthenticationService } from '../../../../projects/core/src/lib/services/authentication.service';
import { registrationResponse, stepperData } from 'projects/core/src/lib/interfaces/common.interface';
import version from '../../../../package.json';
import { ToastService } from 'projects/core/src/lib/services/toast.service';
import { userProfileDetail } from 'projects/core/src/lib/interfaces/common.interface';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { ModalController } from '@ionic/angular';
import { KycStepsMFComponent } from 'projects/product-details/components/kyc-steps-mf/kyc-steps-mf.component';
import { BrowserDetectorService } from 'src/app/browser-detector.service';
import { LoaderService } from 'index';
import { NetworkService } from 'index';
import { CommonFunctionService } from 'index';
import { ThemeService } from 'index';
import { AllConfigDataService } from 'index';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
@Component({
  selector: 'app-container-view',
  templateUrl: './container-view.page.html',
  styleUrls: ['./container-view.page.scss'],
})
export class ContainerViewPage implements OnInit {
  showSplashScreen: any;
  showIntroductionScreen: any;
  imageList: any;
  languageData: any;
  isLogging: any;
  currentDevice: any;
  currentEnvironmentAPIList: any;
  errorList: any;
  currentLanguage: any;
  gmailAuthenticationFlag: any;
  mobileAuthenticationFlag: any;
  faceBookAuthenticationFlag: any;
  instagramAuthenticationFlag: any;
  faceDetectionAuthenticationFlag: any;
  fingerPrintAuthenticationFlag: any;
  otherAuthenticationFlag: any;
  currentAppVersion: any = version;
  currentNativeNetwork: any;
  currentWindowNetwork: any;
  isCordovaStatus: any;
  loggedInModal: boolean = false;
  loggedInWith: any;
  profileDetails: any;
  localCustGuId: string;
  showUserProfile: any;

  profileModal: boolean = false;
  appName: any;
  listOfKYC: any;
  progressBarModal: boolean = false;
  environmentAPIList: any;
  ConfirmErrorMsg: boolean = false;
  customerPanName: any;
  isKra: any;
  stepOne: any;
  referralCode: string;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  currentMode =  "basicMode";
  partnerFlow: any=localStorage.getItem("userType");


  constructor(
    private BrowserDetectorService:BrowserDetectorService,
      private themeService: ThemeService,
      private allConfigDataService: AllConfigDataService,
      private activatedRoute: ActivatedRoute,
      private libConfigService: LibConfigService,
      private router: Router,
      private commonService: CommonService,
      private authenticationService: AuthenticationService,
      private loaderService: LoaderService,
      private commonFunctionService: CommonFunctionService,
      private cdn: ChangeDetectorRef,
      private networkService: NetworkService,
      private toastService: ToastService,
      private textToSpeech: TextToSpeech,
      public modalController: ModalController,
      private http: HttpClient,
      private eduService:eduService

    ) {

    this.themeService.loadTheme()

    // this.loaderService.hideLoader();
    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Onboarding/OnboardingSteps/CustomerRegistration';




  }
  public appPages = [
    { title: 'Dashboard', url: '/Dashboard', icon: 'mail' },
    { title: 'Outbox', url: '/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/Archived', icon: 'archive' },
    { title: 'Trash', url: '/Trash', icon: 'trash' },
    { title: 'Spam', url: '/Spam', icon: 'warning' },
  ];

  @ViewChild('introLib', { read: ViewContainerRef })
  introLib: ViewContainerRef | undefined;
  @ViewChild('logging', { read: ViewContainerRef })
  logging: ViewContainerRef | undefined;

  ngOnInit() {
   let BrowserName=this.BrowserDetectorService.getBrowserName()
   let OSname=this.BrowserDetectorService.getOSName()


      localStorage.setItem("Browsername",BrowserName);
      localStorage.setItem("OSname",OSname);

      console.log("Browsername",BrowserName);
      console.log("OSname",OSname);

    //this.loaderService.showHideAutoLoader();
    this.environmentAPIList = this.allConfigDataService.getCurrentApiList()
    this.networkService.getCurrentPlatform().subscribe((data) => {
      this.currentDevice = data;
      // console.log("Current Device", this.currentDevice)
    })
    this.gmailAuthenticationFlag = this.allConfigDataService.getConfig('gmailAuthentication');
    this.mobileAuthenticationFlag = this.allConfigDataService.getConfig('mobileAuthentication');
    this.faceBookAuthenticationFlag = this.allConfigDataService.getConfig('faceBookAuthentication');
    this.instagramAuthenticationFlag = this.allConfigDataService.getConfig('instagramAuthentication');
    this.faceDetectionAuthenticationFlag = this.allConfigDataService.getConfig('faceDetectionAuthentication');
    this.fingerPrintAuthenticationFlag = this.allConfigDataService.getConfig('fingerPrintAuthentication');
    this.otherAuthenticationFlag = this.allConfigDataService.getConfig('otherAuthentication');
    this.appName = this.allConfigDataService.getConfig('appName');
    this.currentEnvironmentAPIList = this.allConfigDataService.getCurrentApiList();
    //this.title = this.activatedRoute.snapshot.paramMap.get('id');
    this.showSplashScreen = this.allConfigDataService.getConfig('splashScreen');
    this.showIntroductionScreen = 1;
    this.imageList = this.allConfigDataService.getConfig('images');
    this.currentLanguage = this.allConfigDataService.getCurrentLanguage();
    if (this.currentLanguage) {
      let allErrorList = this.allConfigDataService.getConfig('errorList');
      if (allErrorList) {
        this.errorList = allErrorList[this.currentLanguage];
      }

    }

    this.authenticationService.isAuthenticated$.subscribe((status: any) => {
      console.log("status", status)
      // this.router.navigate(['/Tokenisation']);
      if (status) {
        this.showUserProfile = 0;
        this.setLoginDetails();
        this.cdn.detectChanges()
      } else {
        let localSkip = localStorage.getItem('torusSkip');
        // console.log("localSkip", localSkip)
        if (localSkip) {
          this.isLogging = 0;
          this.showSplashScreen = 0;
          this.showIntroductionScreen = 0;
          this.loadLogging()
          this.cdn.detectChanges()
        } else {
          if (this.showSplashScreen || this.showIntroductionScreen) {
            // this.loadIntro();
            this.router.navigate([""])
            localStorage.setItem('torusSkip', '1')
            this.isLogging = 0;
            this.showSplashScreen = 0;
            this.showIntroductionScreen = 0;
            // this.loadLogging()
            this.cdn.detectChanges()
          }
        }
      }

    })

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

  loadIntro() {
    this.loaderService.showLoader();
    this.libConfigService
      .getComponentFactory<IntroComponent>('lazy-intro')
      .subscribe({
        next: componentFactory => {
          if (!this.introLib) {
            return;
          }
          const ref = this.introLib.createComponent(
            componentFactory
          );
          ref.instance['showSplashScreen'] = this.showSplashScreen;
          ref.instance['showIntroductionScreen'] = this.showIntroductionScreen;
          ref.instance['allData'] = this.imageList;
          ref.instance['collectIntroductionData'].subscribe((val: any) => {
            if (val === 'login') {
              localStorage.setItem('torusSkip', '1')
              this.isLogging = 0;
              this.showSplashScreen = 0;
              this.showIntroductionScreen = 0;
              this.introLib.clear();
              this.loadLogging()
            } else {
              this.errorShow("Introduction Screen", "collectIntroductionData -> Output emitter ")
            }
          }, (error: any) => {
            this.errorShow(error, "collectIntroductionData -> Output emitter ")
          });
          ref.changeDetectorRef.detectChanges();
          this.loaderService.hideLoader();
        },
        error: err => {
          this.errorShow(err, "loadIntro -> Dynamic Module Load")
        }
      });
  }

  loadLogging() {
    this.loaderService.showLoader();
    this.libConfigService
      .getComponentFactory<LoginPage>('lazy-logging')
      .subscribe({
        next: componentFactory => {
          if (!this.logging) {
            return;
          }
          const ref = this.logging.createComponent(
            componentFactory
          );
          ref.instance['environmentAPI'] = this.currentEnvironmentAPIList;
          ref.instance['currentDevice'] = this.currentDevice;
          ref.instance['imageList'] = this.imageList;
          ref.instance['errorList'] = this.errorList;
          ref.instance['gmailAuthentication'] = this.gmailAuthenticationFlag;
          ref.instance['mobileAuthentication'] = this.mobileAuthenticationFlag;
          ref.instance['faceBookAuthentication'] = this.faceBookAuthenticationFlag;
          ref.instance['instagramAuthentication'] = this.instagramAuthenticationFlag;
          ref.instance['otherAuthentication'] = this.otherAuthenticationFlag;
          ref.instance['currentLanguage'] = this.currentLanguage;
          ref.instance['currentCountryAuthentication'] = this.allConfigDataService.getConfig('listCodeCountry')[this.allConfigDataService.getConfig('currentAppInitialized')]
          ref.instance['sendLoggingDataContainer'].subscribe((val: any) => {
            // console.log("sendLoggingDataSocial", JSON.stringify(val));
            if (val) {

              this.loaderService.showLoader();
              // this.commonService.loginAuthentication(val)
              this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.RegisterCustomer, val)

              .subscribe((data: registrationResponse) => {
                this.loaderService.hideLoader();
                this.authenticationService.setLoginAuthentication("CC3503FD-55FC-418C-BDB3-1E50C9E10678", val)
                this.commonService.setCustomerGuID("CC3503FD-55FC-418C-BDB3-1E50C9E10678");
                if (data && data?.Status) {
                  // this.authenticationService.setLoginAuthentication(data?.Token, val)
                  // if(!data.CustGuId){
                  // localStorage.setItem('CustGuId',"CC3503FD-55FC-418C-BDB3-1E50C9E10678" );


                  // }
                  // else localStorage.setItem('CustGuId', data?.CustGuId);
                  this.localCustGuId = data?.CustGuId;
                  // this.commonService.setUserDetail(val);
                  this.showUserProfile = 1;
                  this.setLoginDetails();
                } else {
                  this.errorShow(data?.Message, "sendLoggingDataContainer -> status")
                }
              }, (error: any) => {
                this.errorShow(error, "sendLoggingDataContainer -> Http response")
              })
            }
          });
          ref.instance['sendLoggingDataMobile'].subscribe((val: any) => {
            // console.log("sendLoggingDataMobile", JSON.stringify(val));
            this.localCustGuId = val?.data?.CustGuId;
            if (val && val?.data) {
              this.authenticationService.setLoginAuthentication("CC3503FD-55FC-418C-BDB3-1E50C9E10678", val?.role)
              // this.commonService.setCustomerGuID(val?.data?.CustGuId);
              // localStorage.setItem('CustGuId', val?.data?.CustGuId);
              localStorage.setItem('CustGuId',"CC3503FD-55FC-418C-BDB3-1E50C9E10678" );
              this.localCustGuId = val?.data?.CustGuId;
              // this.authenticationService.setLoginAuthentication('1234567890',val?.role) //bypass
              this.showUserProfile = 1;
              this.setLoginDetails();
              // console.log("mobile or email ", val.)

            }

          });
          ref.instance['sendLoggingDataCustMobileDetail'].subscribe((val: any) => {
            // console.log("sendLoggingDataCustMobileDetail", JSON.stringify(val));
            this.localCustGuId = val?.CustGuId;
            if (val) {
              this.authenticationService.setLoginAuthentication("CC3503FD-55FC-418C-BDB3-1E50C9E10678" , "Mobile")
              // this.commonService.setCustomerGuID(val?.data?.CustGuId);
              // localStorage.setItem('CustGuId', val?.CustGuId);
              localStorage.setItem('CustGuId',"CC3503FD-55FC-418C-BDB3-1E50C9E10678" );
              this.localCustGuId = val?.CustGuId;
              // this.authenticationService.setLoginAuthentication('1234567890',val?.role) //bypass
              this.showUserProfile = 1;
              this.setLoginDetails();
              // console.log("mobile or email ", val.)

            }

          });
          ref.instance['sendReferralCode'].subscribe((val: any) => {
            // console.log("sendReferralCode", JSON.stringify(val));
            this.referralCode=val;
          })
          ref.changeDetectorRef.detectChanges();
          this.loaderService.hideLoader();
        },
        error: err => {
          this.errorShow(err, "loadLogging -> Dynamic Module Load")
        }
      });
  }

  async setLoginDetails() {
    console.log("local custguid");
    this.callProfileData();

    this.isLogging = 1;
    this.showSplashScreen = 0;
    this.showIntroductionScreen = 0;
    if (this.logging) {
      this.logging.clear();
    }
    this.loaderService.hideLoader();
    if (this.showUserProfile == 1) {
console.log("showUserProfile", this.showUserProfile);
console.log("profileDetails", this.profileDetails);
this.commonService.userDetail.subscribe(val => {
this.profileDetails = val;
  // if (this.appName === "Torus") {
  //   console.log(this.appName, "userDetail", val);     // this.profileDetails = val;
  //   this.router.navigate(['/Dashboard']);          // <--THIS IS FOR SKIPPING THE ONBOARDING SCREEN

  //   // setTimeout(() => {                                // <--THIS CODE IS FOR ONBOARDING
  //   //   this.getDocumentList(this.localCustGuId)        // <--THIS CODE IS FOR ONBOARDING
  //   // }, 500);                                          // <--THIS CODE IS FOR ONBOARDING


  // } else if (this.appName === "Aqube") {
  //   // this.loaderService.showLoader()
  //   // setTimeout(() => {
  //   //   this.getDocumentList(this.localCustGuId)
  //   // }, 500);
  //   this.router.navigate(['/Onboarding']);
  // }
})
      if (!this.profileDetails) {
        let userProfileDetail = {
          Status: '',
          ErrorCode: '',
          Message: '',
          MessageType: '',
          SocialClientId: '',
          FirstName: '',
          MiddleName: '',
          LastName: '',
          Gender: '',
          DateOfBirth: '',
          EmailId: '',
          MobileNo: '',
          AddressLine1: '',
          AddressLine2: '',
          AddressLine3: '',
          Pincode: '',
          City: '',
          State: '',
          Country: '',
          AddressType: ''
        }
        // this.profileDetails = userProfileDetail;
      }
      if(localStorage.getItem("userType") !="Partner")this.profileModal = true;
    } else {
      this.callWelcomeModal(this.localCustGuId);

      if (this.appName === "Torus") {

        // this.router.navigate(['/Operation/TrackOrder']);

        // this.router.navigate(['/Engagement']);
        // this.router.navigate(['/Engagement/ThankYou/thankyou']);

        // this.router.navigate(['Operation/Confirmation']);
        // this.router.navigate(['/Onboarding']);




        if(localStorage.getItem("userType")=="Customer"){
          // this.profileModal = true;
          // this.router.navigate(['/Engagement']);
          // this.router.navigate(['/prodSelection']);

        // this.router.navigate(['/Engagement/ThankYou/thankyou']);

          // this.router.navigate(['/Onboarding']);
        // this.router.navigate(['Shopping/Detail']);
        // this.router.navigate(['Shopping/listing']);

          // this.router.navigate(['/mpin']);
          this.router.navigate(['/mpin']);
          // this.router.navigate(['/Onboarding/mPin'])

        }
        else if(localStorage.getItem("userType") =="Partner"){
          this.profileModal = false;
          // this.router.navigate(['/Engagement']);

        this.router.navigate(['/Onboarding/OurServices']);

        let param= {
          "TokenId": localStorage.getItem('id_token')

        };
        this.http.post(this.apiCatalog.baseURL[this.appEnviron]+
          "Onboarding/Partner" +
          this.apiCatalog.getAllStep,
        param).subscribe((res:any)=>{
          if (res.Status) {
      sessionStorage.setItem('OnboardingStep',JSON.stringify(res));

            this.eduService.OnboardingStepList.next(res.data);
            this.loaderService.hideLoader();
            for(let el of res.data ){
              if(el.status=='N' && el.OnboardingSteps!='Signup'){

                return this.router.navigate(['Onboarding'+el.pageUrl])

              }

            }
          }
        })

        }
        else{
          // this.profileModal = true;
          this.router.navigate(['/Engagement']);
          // this.router.navigate(['/prodSelection']);


        }


      } else if (this.appName === "Aqube") {

      this.profileModal = true;

        // this.loaderService.showLoader()
        // setTimeout(() => {
        //   this.getDocumentList(this.localCustGuId)
        // }, 500);
        this.router.navigate(['/Engagement']);
        // this.router.navigate(['/prodSelection']);

        // this.router.navigate(['/Operation/TrackOrder']);
        // this.router.navigate(['/Onboarding']);


      } else {
        // this.loaderService.showLoader();
        // const modal = await this.modalController.create({
        //   component: AadharDetailsComponent,
        //   cssClass: 'h-100 w-100 modal-fullscreen',
        //   componentProps: {
        //     'imageList': this.imageList,
        //     'currentMoneySymbols': "",
        //     'educationListData': "",
        //     'showOtherText': 'true',
        //     'title': "title",
        //     'otherTextName': ""
        //   },
        //   backdropDismiss: false
        // });
        // modal.onDidDismiss()
        //   .then((data) => {
        //     this.router.navigate(['/Dashboard']);
        //   });
        // this.loaderService.hideLoader();
        // return await modal.present();
      }

    }

  }
  getDocumentList(custId) {
    // this.loaderService.showLoader();
    // (data?.msg?.NameOnTheCard || data?.msg?.Name
    // this.localCustGuId || localStorage.getItem('CustGuId')

    // console.log("one cust " + this.localCustGuId + "  two cust " + localStorage.getItem('CustGuId') + " three cust " + custId)
    let reqParams = {
      "CustGuId": custId,
      // "OfferingGuId": "a12e68a9-da42-40c7-8156-20160dc31a72"
      "OfferingGuId": "CB451D72-6C97-4B53-8342-B1C8D04E1511"
      // "OfferingGuId": "d46461be-da40-4b5c-bae0-3bcbbfb5afcf"
    }
    // this.commonService.getDocumentList(reqParams)
    // this.http.post(this.apiCatalog.baseURL[this.appEnviron]+'Onboarding'+this.apiCatalog.getAllSteps, reqParams)  //need to comment on dummy response
    this.http.get("assets/data/getAllSteps.json")
    .subscribe((data: stepperData) => {
      console.log("getAllSteps", data);

      let nextStep = data.DocumentList.filter(x => {
        return x.Status == "Pending";
      })[0].path;
      this.router.navigate(['/Onboarding'+nextStep]);
      if (data && data?.Status) {
        // this.commonService.setGetOfferingDocList(data.DocumentList)
        // console.log("kycDocData", data)
        this.customerPanName = data.CustomerPanName;
        this.isKra = data.IsKra;
        // localStorage.setItem('isKra', data.IsKra);

        this.listOfKYC = data.DocumentList;
        this.stepOne = this.getCurrentKYCData("PAN")
        // console.log("jshjjvdlvsafhdlbgfjk",this.listOfKYC);

        if (this.stepOne[0].Status === "Pending") {
          this.progressBarModal = false;
        }
        else {
          this.progressBarModal = true;
        }

        // this.openKYCModal()
        // this.router.navigate(['/Dashboard']);
        // setTimeout(() => {
        //   this.openKYCModal()
        //   this.loaderService.hideLoader();
        // }, 500);

      } else {
        this.errorShow(data?.Message, "GetOfferingDocList -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "GetOfferingDocList -> Http request");
    })
  }

  async openKYCModal() {

    this.loaderService.hideLoader();
    let panData = [{
      "DocumentGuId": "4afad26b-1ee6-4de3-bf13-c2d4b4ffeefd",
      "Document": "PAN",
      "Offering": "Onboarding",
      "IsCompleted": "False",
      "AadharStatus": "False",
      "IsDerivative": "0"
    }]
    let aadharData = [
      {
        "DocumentGuId": "74dc49aa-cbc1-4321-a7e2-2541fb60abfa",
        "Document": "Aadhar",
        "Offering": "Onboarding",
        "IsCompleted": "True",
        "AadharStatus": "False",
        "IsDerivative": "0"
      }
    ]
    let nameAddressData = [
      {
        "DocumentGuId": "b196712c-bba5-4e17-931b-37ed23fffb77",
        "Document": "NameAddressDetail",
        "Offering": "Onboarding",
        "IsCompleted": "True",
        "AadharStatus": "False",
        "IsDerivative": "0"
      }
    ]
    let bankData = [{
      "DocumentGuId": "0dbf360e-340b-4416-828c-244d8cf8f452",
      "Document": "Cheque",
      "Offering": "Onboarding",
      "IsCompleted": "True",
      "AadharStatus": "False",
      "IsDerivative": "0"
    }]
    let exchangeData = [
      {
        "DocumentGuId": "43ce03d2-dc5c-4962-b15f-14ea88247ec1",
        "Document": "Exchange",
        "Offering": "Onboarding",
        "IsCompleted": "True",
        "AadharStatus": "False",
        "IsDerivative": "0"
      }
    ]
    let incomeProofData = [{
      "DocumentGuId": "0dbf360e-340b-4416-828c-244d8cf8f452",
      "Document": "IncomeProof",
      "Offering": "Onboarding",
      "IsCompleted": "False",
      "AadharStatus": "False",
      "IsDerivative": "True"
    }]
    let personalDetailsData = [
      {
        "DocumentGuId": "4aecd238-aa1b-45b2-bab6-98c336510107",
        "Document": "PersonalDetails",
        "Offering": "Onboarding",
        "IsCompleted": "True",
        "AadharStatus": "False",
        "IsDerivative": "0"
      }
    ]
    let nomineeData = [
      {
        "DocumentGuId": "a6ccddbe-8c87-410f-a139-b0c269fdc693",
        "Document": "Nominee",
        "Offering": "Onboarding",
        "IsCompleted": "True",
        "AadharStatus": "False",
        "IsDerivative": "0"
      }
    ]
    let signatureData = [
      {
        "DocumentGuId": "bce5674b-711e-4ac5-a2ef-9329e9d4527a",
        "Document": "WetSign",
        "Offering": "Onboarding",
        "IsCompleted": "True",
        "AadharStatus": "False",
        "IsDerivative": "0"
      }
    ]
    let selfieData = [
      {
        "DocumentGuId": "60ddfd1a-5f48-4bb9-a6a7-2df1cb3d33ab",
        "Document": "Selfie",
        "Offering": "Onboarding",
        "IsCompleted": "True",
        "AadharStatus": "False",
        "IsDerivative": "0"
      }
    ]
    let uploadDocData = [
      {
        "DocumentGuId": "0dbf360e-340b-4416-828c-244d8cf8f452",
        "Document": "UploadPanAadhar",
        "Offering": "Onboarding",
        "IsCompleted": "True",
        "AadharStatus": "False",
        "IsDerivative": "0"
      }
    ]
    let esignData = [
      {
        "DocumentGuId": "ee66199c-7807-4483-8dda-016163c59ba9",
        "Document": "Esgin",
        "Offering": "Onboarding",
        "IsCompleted": "True",
        "AadharStatus": "False",
        "IsDerivative": "0"
      }
    ]

    let currentFetcherModule = {
      // "OfferingGuId": "a3d10040-02b0-44de-a0cc-37bb59ea2966",
      "OfferingGuId": "d46461be-da40-4b5c-bae0-3bcbbfb5afcf",
      "Offering": "Onboarding"
    }

    // this.loaderService.showLoader();

    this.loaderService.hideLoader();
    const modal = await this.modalController.create({
      component: KycStepsMFComponent,
      componentProps: {

        'panCardKYC': panData,
        'aadharKYC': aadharData,
        'nameAddressKYC' : nameAddressData,
        'bankKYC': bankData,
        'exchangeKYC': exchangeData,
        'incomeProofData': incomeProofData,
        'personalDetailsKYC': personalDetailsData,
        'nomineeKYC': nomineeData,
        'selfieKYC': selfieData,
        'signatureKYC': signatureData,
        'uploadPanAadharKYC': uploadDocData,
        'esignKYC': esignData,
        // 'panCardKYC':this.getCurrentKYCData("PAN"),
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
        'imageList': this.imageList
      }
      });
    this.loaderService.hideLoader();
    return await modal.present();
  }

  getCurrentKYCData(type ) {
    return this.listOfKYC ? this.listOfKYC.filter(x => x?.Document == type) : []
  }

  logOutEvent(event) {
    this.authenticationService.logout();
  }

  reDirectPage(e) {
    if (e) {
      if (this.isCordovaStatus) {
        this.nativeNetwork(e);
      } else {
        this.windowNetwork(e);
      }
    }

  }

  nativeNetwork(e) {
    if (this.currentNativeNetwork) {
      this.sendToAnotherPage(e);
    } else {
      this.toastService.showAutoToast(this.errorList?.networkError);
    }
  }

  windowNetwork(e) {
    if (this.currentWindowNetwork) {
      this.sendToAnotherPage(e);
    } else {
      this.toastService.showAutoToast(this.errorList?.networkError);
    }
  }

  sendToAnotherPage(e) {
    this.router.navigate(['/' + e]);
  }

  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, 'container-view page -> ' + functionName, message, this.errorList?.okText);
  }
  callProfileData() {
    // console.log("local custguid");
    this.localCustGuId = localStorage.getItem('CustGuId');
    if (this.localCustGuId) {
      let reqParams = {
        CustGuId: this.localCustGuId,
      }
      this.getProfileData(reqParams);
      this.callWelcomeModal(this.localCustGuId);
      // this.setLoginDetails();
      // this.getProfileData(reqParams);
    }


  }
  getProfileData(reqParams) {
    //this.loaderService.showLoader();
    // this.commonService.getProfileDetails(reqParams)
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getCustomerDetails, {"TokenId":localStorage.getItem("id_token")})
    .subscribe((data: any) => {
      if (data && data?.Status) {
        //this.loaderService.hideLoader();
        this.profileDetails = data.data[0];
        console.log("TokenId",this.profileDetails);

        // this.setLoginDetails();
        // console.log(JSON.stringify(data));
        localStorage.setItem('ClientCode', data.data[0].clientCode);
        this.commonService.setUserDetail(this.profileDetails);
      } else {
        // this.errorShow(data?.Message, "getProfileDetails -> status");
      }
    })
  }

  callWelcomeModal(custGuId) {
    if (custGuId) {
      let reqParams = {
        "TokenId":localStorage.getItem("id_token")
      }
      // this.commonService.getProfileDetails(reqParams)
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getCustomerDetails, reqParams)
      .subscribe((data: any) => {
        if (data && data?.Status) {


localStorage.setItem('ClientCode', data.data[0].clientCode);

          // console.log(JSON.stringify(data));
          // this.callTextToSpeech(data?.FirstName, data?.LastName)
          this.showWelcomeModal(data?.EmailId, data?.contactDetails, data?.firstName + " " + data?.lastName)
        } else {
          // this.errorShow(data?.Message, "getProfileDetails -> status");
        }
      }, (error: any) => {
        this.errorShow(error?.Message, "getProfileDetails -> Http request");
      })
    }
  }

  callTextToSpeech(fName?, lName?) {
    let voiceSpeedRate: any;
    if (this.currentDevice === 'iOS' || this.currentDevice === 'iphone') {
      voiceSpeedRate = 1.5
    } else {
      voiceSpeedRate = 0.9
    }

    if (fName === '') {
      fName = ", I am Aqube"
    }

    // console.log("Device Platform", this.currentDevice)
    this.textToSpeech.speak({
      text: 'Hey ' + fName + ', Welcome to smart wellness platform', //fName+''+lName
      locale: 'en-GB',
      rate: voiceSpeedRate
    })
      .then(() =>
        console.log('textToSpeech Done')
      )
      .catch((reason: any) =>
        console.log("textToSpeech", reason)
      );
  }

  showWelcomeModal(email, mobileNo, name) {
    if (name) {
      this.loggedInWith = name;
    }
    else if (email != "") {
      this.loggedInWith = email;
    } else {
      this.loggedInWith = "+91 " + mobileNo;
    }

    this.loggedInModal = true

    // setTimeout(() => {
    //   this.loggedInModal = false;
    // }, 3000);
  }

  successModalClose() {
    this.loggedInModal = false
  }

  closeModal(e) {
     this.profileModal = false;
    if (this.stepOne[0].IsCompleted === "False") {
      // console.log("step ", this.stepOne[0].IsCompleted)
      this.progressBarModal = false;
    } else {
      this.progressBarModal = true;
      // console.log("step ", this.stepOne[0].IsCompleted)
    }

    this.callProfileData()
    this.callWelcomeModal(this.localCustGuId);
  }

  updateRecord(params) {
    // this.loaderService.showLoader()
    params["ReferralCode"] = this.referralCode;
    params["flag"]="UpdatePersonalDetail"
    params[ "TokenId"]=localStorage.getItem("id_token")

    // console.log("updateParams", params)
    // this.commonService.setProfileDetails(params)
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.updateCustomerDetail, params)
    .subscribe((data: any) => {
      console.log("update", data)
      // if (data && data?.Status) {
        this.profileModal = false;
        if(data.redirectionPath){
          this.router.navigate([data.redirectionPath])
        }
        if (this.stepOne[0].IsCompleted === "False") {
          // console.log("step ", this.stepOne[0].IsCompleted)
          this.progressBarModal = false;
        } else {
          this.progressBarModal = true;
          // console.log("step ", this.stepOne[0].IsCompleted)
        }

        // this.progressBarModal = true
        this.callProfileData()

        // this.loaderService.hideLoader()
      // } else {
        // this.errorShow(data?.Message, "updateProfileDetails -> status");
      // }
    }, (error: any) => {
      this.errorShow(error?.Message, "updateProfileDetails -> Http request");
    })

    this.router.navigate(['/Onboarding/mPin'])
  }


  getCancel() {
    this.ConfirmErrorMsg = true;
  }
  onCancel() {
    this.ConfirmErrorMsg = false;
  }
  onConfirmNo() {
    this.ConfirmErrorMsg = false;
    this.progressBarModal = false;

    this.loaderService.showLoader()
    let headers: HttpHeaders = new HttpHeaders({
      "Token": this.environmentAPIList?.token
    });
    let data = {
      "CustGuId": this.localCustGuId
    }
    // this.http.post("http://uat.aqube.rsec.co.in:5000/api/v1/Call/Onboarding/DeleteUser", data, { headers }).subscribe(
      // this.environmentAPIList?.baseURL + this.environmentAPIList?.fetchDigilockerDocuments
      this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.DeleteUser, data, { headers }).subscribe(
    (data: any) => {
        if (data && data?.Status == 1) {
          this.logOutEvent("1")
          console.log("Signature details", data)

          this.loaderService.hideLoader();
        } else {
          this.errorShow(data?.Message, "getEsign -> status");
        }
      }, (error: any) => {
        this.errorShow(error?.Message, "getEsign -> Http request");
      })
  }

  Resume() {
    this.progressBarModal = false
  }
}


