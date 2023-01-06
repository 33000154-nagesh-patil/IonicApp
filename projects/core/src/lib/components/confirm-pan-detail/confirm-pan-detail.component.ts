import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from '../../services/all-config-data.service';
import { CommonFunctionService } from '../../services/common-function.service';
import { CommonService } from '../../services/common.service';
import { LoaderService } from '../../services/loader.service';
import { NetworkService } from '../../services/network.service';

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
  panUserName: any = "Akshay Patil";
  residentStatus: any = 'IN-Indian';
  civilKraIpvFlag: any = "005";
  panDetailsData: any;

  apiCatalog:any={
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "Onboarding/OnboardingSteps/PanValidation",
    "environment": this.allConfigDataService.getConfig('environmentType'),
  }
  currentImg: any;
  isValid: boolean;
  currentType: boolean;
  currentInputEncoded: any;
  loginCustomerGuId: any;
  panDetails: any;
  currentModuleType: any;

  constructor(private commonFunctionService: CommonFunctionService, private networkService: NetworkService,
    private allConfigDataService: AllConfigDataService,private router: Router,
    private loaderService: LoaderService, private commonService: CommonService,
    private http:HttpClient
    ) { 
    this.imageList = this.allConfigDataService.getConfig('images');
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
    this.currentInputPan = data.docNumber;
 })
}
  successModalClose() {
    this.loggedInModal = false
  }

  async postCollectionPANData() {
    // this.dob = this.commonFunctionService.dobFormattedYYYYMMDD(this.errorControl.dob.value)

    let localPostPanData = {
      "docNumber": this.currentInputPan,
      "CustGuId": this.loginCustomerGuId,
      "DocumentGuId": this.panDetails?.DocumentGuId,
      "OfferingGuId": this.currentModuleType?.OfferingGuId,
      "Citizenship": this.residentStatus,
      "dob": this.dob,
      "CustomerPanName": this.panDetailsData?.msg?.NameOnTheCard || this.panDetailsData?.msg?.Name
    }
    if (this.isCordovaStatus) {
      this.nativeNetworkPANPost(localPostPanData);
    } else {
      this.windowNetworkPANPost(localPostPanData);
    }
  }

  nativeNetworkPANPost(obj) {
    if (this.currentNativeNetwork) {
      // this.processPANPostData(obj);
      this.dummyPanPOST()
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
      // this.processPANPostData(obj)
      this.dummyPanPOST() //by pass
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true

      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);

    }
  }
  dummyPanPOST() {
    this.getCivilKraStatus.emit(this.civilKraIpvFlag);
    this.getPanName.emit(this.panDetailsData?.msg?.NameOnTheCard || this.panDetailsData?.msg?.Name)
    this.getPanNumber.emit(this.currentInputPan)
    this.getPanStatus.emit('bank')
    // this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+'Onboarding'+this.apiCatalog.getNextStep, "reqParams")
    // this.http.get("assets/data/getNextSteps.json")
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+this.apiCatalog.breadCrumb+this.apiCatalog.confirmPanDetails, {})

      .subscribe((data: any) => {
        if (data) {
          // this.getNextStep.emit(data?.msg)
          this.router.navigate(['/Onboarding'+data['URLtoRedirect']]);
        } else { 
          this.errorShow(data?.Message, "dummyPanPOST -> Http request");
        }
      })
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

  
  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, 'Pan card component -> ' + functionName, message, this.errorList?.okText);
  }

}
