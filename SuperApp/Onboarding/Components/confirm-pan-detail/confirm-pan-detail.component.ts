import { ContainerViewPage } from 'src/app/features/container-view/container-view.page';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'index';
import { CommonFunctionService } from 'index';
import { CommonService } from 'index';
import { LoaderService } from 'index';
import { NetworkService } from 'index';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';

@Component({
  selector: 'app-confirm-pan-detail',
  templateUrl: './confirm-pan-detail.component.html',
  styleUrls: ['./confirm-pan-detail.component.scss'],
})
export class ConfirmPanDetailComponent implements OnInit {
  @Input() imageList: any;
  @Input() errorList: any;

  @Output() getCivilKraStatus = new EventEmitter();
  @Output() getPanName = new EventEmitter();
  @Output() getPanNumber = new EventEmitter();
  @Output() getPanStatus = new EventEmitter();


  loggedInModal: boolean = false
  dob: any;
  currentNativeNetwork: any;
  isCordovaStatus: any;
  currentWindowNetwork: any;
  appName: any;
  ErrorMsg: any;
  currentInputPan: any = "qwert12345q";
  panUserName: any = "Rahul Nagar";
  residentStatus: any = "IN-Indian";
  civilKraIpvFlag: any = "005";
  panDetailsData: any;
  partnerFlow: any=localStorage.getItem("userType");


  apiCatalog:any={
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "Onboarding/OnboardingSteps/PanValidation",
    "breadCrumbPartner": "Onboarding/OnboardingSteps/PartnerPanValidation",
    "environment": this.allConfigDataService.getConfig('environmentType'),
  }
  currentImg: any;
  isValid: boolean;
  currentType: boolean;
  currentInputEncoded: any;
  loginCustomerGuId: any;
  panDetails: any;
  currentModuleType: any;
  val: {};

  constructor(private commonFunctionService: CommonFunctionService, private networkService: NetworkService,
    private allConfigDataService: AllConfigDataService,private router: Router,
    private loaderService: LoaderService, private commonService: CommonService,
    private http:HttpClient,
    private eduService:eduService,
    private onboardingService:OnboardingService,
    private ContainerViewPage:ContainerViewPage
    ) {
    this.imageList = this.allConfigDataService.getConfig('images');
    this.eduService.categoryValueForAPI.subscribe(val => {
      this.val=val;
    })
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

    this.appName = this.allConfigDataService.getConfig('appName');
    this.imageList = this.allConfigDataService.getConfig('images');
  }
ionViewDidEnter(){
 this.commonService.userPan.subscribe((data) => {
    this.currentInputPan = data.PanNo;
    if(data.Name){
      this.panUserName = data.Name.concat(' ',data.MiddleName.concat(
        ' ',data.LastName.concat()
      ));
    }else{
      this.commonService.userPanName.subscribe((data) => {
        this.panUserName= data;
      });
    }
    this.panDetailsData=data
 })
}
  successModalClose() {
    this.loggedInModal = false
  }

  async postCollectionPANData() {
    // this.dob = this.commonFunctionService.dobFormattedYYYYMMDD(this.errorControl.dob.value)

    let localPostPanData = {
      "TokenId":localStorage.getItem('id_token'),
      "firstName": this.panDetailsData.Name,
      "middleName": this.panDetailsData.MiddleName,
      "lastName": this.panDetailsData.LastName,
      "date": this.panDetailsData.Date,
      "panNo": this.currentInputPan,
      "message": this.panDetailsData.Message,
      // "Citizenship": this.residentStatus,
      // "dob": this.dob,
      // "CustomerPanName": this.panDetailsData?.msg?.NameOnTheCard || this.panDetailsData?.msg?.Name
    }
    if (this.isCordovaStatus) {
      this.nativeNetworkPANPost(localPostPanData);
    } else {
      this.windowNetworkPANPost(localPostPanData);
    }
  }
  nativeNetworkPANPost(obj) {
    if (this.currentNativeNetwork) {
      // if(this.partnerFlow=="Partner"){
      //   this.router.navigate(['/Onboarding/Bank'])
      // }
      // this.processPANPostData(obj);
      this.dummyPanPOST(obj)
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);

    }
  }
  windowNetworkPANPost(obj) {

    if (this.currentWindowNetwork) {

      // if(this.partnerFlow=="Partner"){

      //   this.router.navigate(['/Onboarding/Bank'])
      // }else{
      // this.dummyPanPOST(obj) //by pass
      // }
      this.dummyPanPOST(obj)
      // this.processPANPostData(obj)
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true

      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);

    }
  }
  dummyPanPOST(obj) {
    this.getCivilKraStatus.emit(this.civilKraIpvFlag);
    this.getPanName.emit(this.panDetailsData?.msg?.NameOnTheCard || this.panDetailsData?.msg?.Name)
    this.getPanNumber.emit(this.currentInputPan)
    this.getPanStatus.emit('bank')

    let userPanDetail


      // const sub=this.eduService.categoryValueForAPI.subscribe(val => {
        if(localStorage.getItem("userType") =="Partner") {
          // userPanDetail = '_userPanDetail_Partner';
          // this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+
          //   this.apiCatalog.breadCrumbPartner+
          //   this.apiCatalog.partnerPanDetail, obj)

          //   .subscribe((data: any) => {
          //     if (data) {
          //       // this. postpandata();
          //       // this.getNextStep.emit(data?.msg)
          //       this.router.navigate(['/Onboarding'+data['pageUrl']]);
          //     } else {
          //       this.errorShow(data?.Message, "dummyPanPOST -> Http request");
          //     }
          //   })
          this.onboardingService.nextOnSuccess('ConfirmPanDetail');
      }
      else if(localStorage.getItem("userType") =="Customer"){

        this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+
          this.apiCatalog.breadCrumb+
          this.apiCatalog.userPanDetail,
          obj)

          .subscribe((data: any) => {
            if (data) {
              let KRAValue;
              // this. postpandata();
              // this.getNextStep.emit(data?.msg)
              this.ContainerViewPage.getProfileData('')

                this.commonService.getUserDetail().subscribe((data)=>{


                  KRAValue = data.iskra
                  if(KRAValue=='1'){
                    console.log("Akshay");

                    this.onboardingService.nextOnSuccess('KRA');
                  }else{
                  // this.router.navigate(['/Onboarding/DigiLockerAadhar']);
                  this.onboardingService.nextOnSuccess('KRA');
                  }
              });


              // this.router.navigate(['/Onboarding'+data['pageUrl']]);
            } else {
              this.onboardingService.skip('KRA')
              this.errorShow(data?.Message, "dummyPanPOST -> Http request");
            }
            this.onboardingService.skip('KRA');
          })

      }
      // })


    // this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+'Onboarding'+this.apiCatalog.getNextStep, "reqParams")
    // this.http.get("assets/data/getNextSteps.json")

  }
  processPANPostData(obj) {
    this.loaderService.showLoader();
    this.commonService.postPanDetails(obj).subscribe((data: any) => {
      this.loaderService.hideLoader();
      if (data) {
        this.getCivilKraStatus.emit(this.civilKraIpvFlag);
        this.getPanNumber.emit(this.currentInputPan)
        this.getPanName.emit(this.panDetailsData?.msg?.NameOnTheCard || this.panDetailsData?.msg?.Name || this.panUserName)
        this.getPanStatus.emit('bank')
      } else {
        this.errorShow(data?.Message, "processPANPostData -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "processPANPostData -> Http request");
    })
  }

  changeInputType() {
    this.isValid = this.validatePan();
    if (this.isValid)
      this.currentType = !this.currentType;

    if (this.currentInputPan) {
      if (this.currentType) {
        this.currentInputEncoded = this.currentInputPan.replace(/.(?=.{4})/g, 'x');
      } else {
        this.currentInputEncoded = this.currentInputPan
      }
    }
  }

  validatePan() {
    let custReg = /[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
    if (!this.currentImg && !this.currentInputPan) {
      return false;
    } else {
      if (this.currentInputPan && !custReg.test(this.currentInputPan)) {
        // this.showPatternError = true;
        return false;
      } else {
        // this.showPatternError = false;
        return true;
      }
    }
  }

  skip(val){
    this.onboardingService.skip(val);
  }


  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, 'Pan card component -> ' + functionName, message, this.errorList?.okText);
  }

  // postpandata(){
  //   let param={
  //       "panNumber": this.currentInputPan,
  //       "dateOfBirth": this.panDetailsData.Date,
  //       "nameAsPerPan": this.panDetailsData.FirstName+this.panDetailsData.MiddleName+this.panDetailsData.LastName,
  //       "status": "approved"
  //   }
  //   this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+this.apiCatalog.breadCrumb+this.apiCatalog.digiGoldPanDetails, param)

  //     .subscribe((res: any) => {
  //       console.log(res,"postpannnnnnnnnnnn");


  //     })

  // }

}
