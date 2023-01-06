// import { LoaderService } from './../../../../projects/core/src/lib/services/loader.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { civilKraDetails } from 'index';
import { AllConfigDataService } from 'index';
import { CommonFunctionService } from 'index';
import { CommonService } from 'index';
import { LoaderService } from 'index';
import { NetworkService } from 'index';
import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';

@Component({
  selector: 'app-Kra',
  templateUrl: './Kra.component.html',
  styleUrls: ['./Kra.component.scss'],
})
export class KraComponent implements OnInit {
  maxDate: string;
  dob: string;

  @Input() loginCustomerGuId: any;
  @Input() errorList: any;
  currentNativeNetwork: any;
  isCordovaStatus: any;
  currentWindowNetwork: any;
  ErrorMsg: any;
  apiCatalog:any={

    ...this.allConfigDataService.getConfig('apiCatalog'),

    "breadCrumb": "Onboarding/OnboardingSteps/KRA",

    "environment": this.allConfigDataService.getConfig('environmentType'),

  }
  currentInputPan: any;

  constructor(private fb: FormBuilder, private commonFunctionService: CommonFunctionService,
    private networkService: NetworkService, private loaderService: LoaderService,
    private commonService: CommonService,private router: Router, private http:HttpClient,
    private allConfigDataService:AllConfigDataService,
    private onboardingService:OnboardingService
    ) { }
  dobValidationForm = this.fb.group({
    dob: ['', [Validators.required]]
  })
  get errorControl() {
    return this.dobValidationForm.controls;
  }

  ngOnInit() {
    this.loaderService.hideLoader()
    this.futureDateDisable();
    this.networkService.onNetworkChange().subscribe((data: any) => {
      this.currentNativeNetwork = data;
    })

    this.networkService.getCordovaStatus().subscribe((data) => {
      this.isCordovaStatus = data;
    })
    this.networkService.updateNetworkStatusbrowserchange().subscribe((data) => {
      this.currentWindowNetwork = data;
    })

    this.commonService.userPan.subscribe((data) => {
      this.currentInputPan = data.PanNo;
   })
  }

  futureDateDisable() {
    var date = new Date();
    var todayDate: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year: any = date.getFullYear() - 18;
    if (todayDate < 10) {
      todayDate = '0' + todayDate;
    }
    if (month < 10) {
      month = '0' + month;
    }
    this.maxDate = year + "-" + month + "-" + todayDate;
  }

  onDobContinue() {
    if (this.dobValidationForm.valid) {
      this.dob = this.commonFunctionService.dobFormattedDDMMYYYY(this.errorControl.dob.value)
      let localObj = {
        "TokenId": localStorage.getItem('id_token'),
        "panNo": this.currentInputPan,
        "dob": this.dob
      }
      if (this.isCordovaStatus) {
        this.nativeNetworkCivilKraPost(localObj);
      } else {
        this.windowNetworkCivilKraPost(localObj);
      }

    } else {
      this.errorShow(this.errorList?.dobError, "onDobContinue -> dobValidationForm");
    }
  }

  nativeNetworkCivilKraPost(obj) {
    if (this.currentNativeNetwork) {
      // this.processCivilKraData(obj);
      this.dummyPanPOSTDOB(obj) //by pass
    } else {
      this.ErrorMsg = this.errorList?.networkError

    }
  }
  windowNetworkCivilKraPost(obj) {
    if (this.currentNativeNetwork) {
      // this.processCivilKraData(obj);
      this.dummyPanPOSTDOB(obj) //by pass
    } else {
      this.ErrorMsg = this.errorList?.networkError

    }
  }
  dummyPanPOSTDOB(obj) {
    // this.showFirstStep = false;
    // this.showNextStep = false;
    // this.showConfirmNextStep = true;
    // this.panUserName="Akshay Patil"
    // this.http.get("assets/data/getNextSteps.json")
    this.loaderService.showLoader();

this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+this.apiCatalog.breadCrumb+this.apiCatalog.getCvlPan, obj)


      .subscribe((data: any) => {
        if (data.Status == "1") {
        this.loaderService.hideLoader();
          // this.getNextStep.emit(data?.msg)
          // this.showFirstStep = false;
          let panValue=0;
          this.commonService.userPan.subscribe((val)=>{
            if(!val){
              panValue = data.data;
            }
          })
          if(panValue)this.commonService.userPan.next(panValue);
          if(localStorage.getItem("userType") =="Partner"){
            this.router.navigate(['/Onboarding'+data['pageUrl']]);
            }else{
          // this.onboardingService.nextOnSuccess('KRA');
          this.router.navigate(['/Onboarding/ConfirmPanDetail']);
            }
          // this.router.navigate(['/Onboarding'+data['pageUrl']]);
        } else {
          this.errorShow(data?.Message, "dummyPanPOST -> Http request");
        }
      })
  }
  processCivilKraData(obj) {
    this.loaderService.showLoader();
    this.commonService.postCivilKra(obj).subscribe((data: civilKraDetails) => {
      this.loaderService.hideLoader();
      if (data && data?.Status == 1) {
        // this.civilKraIpvFlag = data.Data.Status;
        // this.showNextStep = false;
        // this.showConfirmNextStep = true;
      } else {
        // this.civilKraIpvFlag = data.Data.UpdateStatus;// for temp
        // this.showNextStep = false;// for temp
        // this.showConfirmNextStep = true;// for temp
        // this.showConfirmNextStep = false;
        this.errorShow(data?.Message, "processCivilKraData -> status");
      }
    }, (error: any) => {
      // this.showConfirmNextStep = false;
      this.errorShow(error?.Message, "processCivilKraData -> Http request");
    })
    // this.showNextStep = false;
    // this.showConfirmNextStep = true;
  }

  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, 'Pan card component -> ' + functionName, message, this.errorList?.okText);
  }

  skip(val){
    this.onboardingService.skip(val);
  }
}
