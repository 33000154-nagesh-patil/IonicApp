import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AllConfigDataService } from '../../../../projects/core/src/lib/services/all-config-data.service';
import { Component, EventEmitter, OnInit, Output,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';
import { NetworkService } from 'projects/core/src/lib/services/network.service';


@Component({
  selector: 'lib-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss'],
})
export class OtpVerificationComponent implements OnInit {
  public otpVerificationCodeFormGroup: FormGroup;
  dontShowHeader=true;
  showResendButton:any;
  loggedInModal: boolean = false
  countDown:any;
@Input() imageList: any;
ErrorMsg: any;

  private loginPinValue: string;


  private maxValue = 30;
  countDown$: any;

  
  currentNativeNetwork: any;
  isCordovaStatus: any;
  currentWindowNetwork: any;
  apiCatalog={
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "",
    "environment": this.allConfigDataService.getConfig('environmentType'),
};
  constructor(private allConfigDataService:AllConfigDataService,private onboardingService:OnboardingService,private http:HttpClient,private router:Router,private eduService:eduService,private networkService:NetworkService) {
    this.getBreadcum()
  //   setTimeout(() => {
  //     this.getOtp()
  //   }, 200);
  }
 

  ngOnInit() {

    this.networkService.onNetworkChange().subscribe((data: any) => {
      // console.log(data)
      this.currentNativeNetwork = data;
      
    })

    this.networkService.getCordovaStatus().subscribe((data) => {
      // console.log(data)
      this.isCordovaStatus = data;
    })
    this.networkService.updateNetworkStatusbrowserchange().subscribe((data) => {
      // console.log(data)
      this.currentWindowNetwork = data;
    })
    this.createPinForm();
    this.resendTimeOut();
    this.imageList=this.allConfigDataService.getConfig('images')


  }


  getBreadcum(){
    this.eduService.categoryValueForAPI.subscribe(val => {
      // console.log(val,"qwertzxcv");
      this.apiCatalog['breadCrumb'] = "Onboarding/" +"OnboardingSteps" + "/" + val['productLanding']
    })
  }

  successModalClose() {
    this.loggedInModal = false
  }



  onSubmitVerificationAuthentication(){

    console.log("otpVerificationCodeFormGroup",this.otpVerificationCodeFormGroup.value);
    if (this.otpVerificationCodeFormGroup.invalid) {
      return;
    }

    this.loginPinValue = ''.concat(
      this.otpVerificationCodeFormGroup.value.otp1,
      this.otpVerificationCodeFormGroup.value.otp2,
      this.otpVerificationCodeFormGroup.value.otp3,
      this.otpVerificationCodeFormGroup.value.otp4,
      this.otpVerificationCodeFormGroup.value.otp5,
      this.otpVerificationCodeFormGroup.value.otp6
    );

    if(this.loginPinValue){
   
    }
  
this.goTOlastPage()
  }
  onDigitInput(event){
    console.log("event",event)
    console.log("event.srcElement.nextElementSibling",event.srcElement.nextElementSibling)
    let element;
    if (event.code !== 'Backspace')
         element = event.srcElement.nextElementSibling;

     if (event.code === 'Backspace')
         element = event.srcElement.previousElementSibling;

     if(element == null)
         return;
     else
         element.focus();
  }
  private createPinForm() {
    this.otpVerificationCodeFormGroup = new FormBuilder().group({
      otp1: [null, Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      otp2: [null, Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      otp3: [null, Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      otp4: [null, Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      otp5: [null, Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      otp6: [null, Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])]
    });
  }

  resendOTP(){
    if(this.isCordovaStatus){
      if (this.currentNativeNetwork) {
        this.showResendButton = true;
        this.resendTimeOut();
       
        this.otpVerificationCodeFormGroup.reset();
      } else {
       
        this.loggedInModal = true
        setTimeout(() => {
          this.loggedInModal = false;
        }, 3000);
      }  
    }else{
      if (this.currentWindowNetwork) {
        this.showResendButton = true;
        this.resendTimeOut();

        this.otpVerificationCodeFormGroup.reset();
      } else {
       
        this.loggedInModal = true
        setTimeout(() => {
          this.loggedInModal = false;
        }, 3000);
      }
    }
  }

  resendTimeOut(){
    this.countDownEvent();
    setTimeout(() => {
      this.showResendButton = false;
    },30000);
  }

  countDownEvent(){
    this.countDown = interval(1000).pipe(
      map(value => this.maxValue - value),
      takeWhile(x => x >= 0)
    );
  }


 goTOlastPage(){
  // this.loaderService.showLoader()

let data={
  "TokenId": localStorage.getItem('id_token'),
  "value":this.loginPinValue
}
this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog.breadCrumb + this.apiCatalog.validateOtp, data).subscribe(
    
  (data: any) => {
if(data){

this.onboardingService.nextOnSuccess('walletOTP');
  
 
}
  }
)
 }

}
