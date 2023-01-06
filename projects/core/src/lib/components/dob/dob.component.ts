import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { civilKraDetails } from '../../interfaces/common.interface';
import { AllConfigDataService } from '../../services/all-config-data.service';
import { CommonFunctionService } from '../../services/common-function.service';
import { CommonService } from '../../services/common.service';
import { LoaderService } from '../../services/loader.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-dob',
  templateUrl: './dob.component.html',
  styleUrls: ['./dob.component.scss'],
})
export class DOBComponent implements OnInit {
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

  constructor(private fb: FormBuilder, private commonFunctionService: CommonFunctionService,
    private networkService: NetworkService, private loaderService: LoaderService,
    private commonService: CommonService,private router: Router, private http:HttpClient,
    private allConfigDataService:AllConfigDataService
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
      this.dob = this.commonFunctionService.dobFormattedYYYYMMDD(this.errorControl.dob.value)
      let localObj = {
        "CustGuId": this.loginCustomerGuId,
        "PanNo": "",
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
      this.dummyPanPOSTDOB() //by pass
    } else {
      this.ErrorMsg = this.errorList?.networkError

    }
  }
  windowNetworkCivilKraPost(obj) {
    if (this.currentNativeNetwork) {
      // this.processCivilKraData(obj);
      this.dummyPanPOSTDOB() //by pass
    } else {
      this.ErrorMsg = this.errorList?.networkError

    }
  }
  dummyPanPOSTDOB() {
    // this.showFirstStep = false;
    // this.showNextStep = false;
    // this.showConfirmNextStep = true;
    // this.panUserName="Akshay Patil"
    // this.http.get("assets/data/getNextSteps.json")

this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+this.apiCatalog.breadCrumb+this.apiCatalog.getCvlPan, {})


      .subscribe((data: any) => {
        if (data) {
          // this.getNextStep.emit(data?.msg)
          // this.showFirstStep = false;
          // this.commonService.userPan.next(val);
          this.router.navigate(['/Onboarding'+data['URLtoRedirect']]);
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

}
