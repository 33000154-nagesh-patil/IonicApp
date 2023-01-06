import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';
import { Router } from '@angular/router';
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { HttpClient } from '@angular/common/http';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { CommonFunctionService, CommonService, LoaderService } from 'index';
// import { NeoWalletComponent } from '../../neo-wallet.component';




@Component({
  selector: 'app-mpin',
  templateUrl: './mpin.component.html',
  styleUrls: ['./mpin.component.scss'],
})
export class MpinComponent implements OnInit {
  // @Output() selfieUploaded= new EventEmitter();
  @Output() mpinSetted = new EventEmitter();
@Output() otpVerification = new EventEmitter();
@Output() validIdFlag = new EventEmitter();
dontShowHeader=true;
@Input() imageList: any;
mpinStatusRight:any
mpinStatusFail:any
currentType:any=false



public otpVerificationCodeFormGroup: FormGroup;
showResendButton:any;
countDown:any;
private loginPinValue: string;
  userInfo: any;


  apiCatalog={
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "",
    "environment": this.allConfigDataService.getConfig('environmentType'),
};
  items: any;
  errorList: any;
constructor(private http:HttpClient,private eduService:eduService,
  private allConfigDataService:AllConfigDataService ,private router:Router,
  private onboardingService:OnboardingService,
  public commonFunctionService:CommonFunctionService, private loaderService:LoaderService) { }

ngOnInit() {

  this.createPinForm();
  this.imageList=this.allConfigDataService.getConfig('images');


}


onSubmitVerificationAuthentication(){

  
  // console.log("otpVerificationCodeFormGroup",this.otpVerificationCodeFormGroup.value);
  
  console.log(this.d)
  if (this.otpVerificationCodeFormGroup.invalid) {
    return;
  }
 if((this.d.otp1.value===this.d.otp7.value)&& (this.d.otp2.value===this.d.otp8.value) && (this.d.otp3.value===this.d.otp9.value) && (this.d.otp4.value===this.d.otp10.value)){
  // && (this.d.otp5.value===this.d.otp11.value)&&(this.d.otp6.value===this.d.otp12.value)
  this.mpinStatusRight=true;
  this.mpinStatusFail=false;
}else{
  this.mpinStatusFail=true;
  this.mpinStatusRight=false
}

  this.loginPinValue = ''.concat(
    this.otpVerificationCodeFormGroup.value.otp1,
    this.otpVerificationCodeFormGroup.value.otp2,
    this.otpVerificationCodeFormGroup.value.otp3,
    this.otpVerificationCodeFormGroup.value.otp4,
    // this.otpVerificationCodeFormGroup.value.otp5,
    // this.otpVerificationCodeFormGroup.value.otp6,
    // this.otpVerificationCodeFormGroup.value.otp7,
    // this.otpVerificationCodeFormGroup.value.otp8,
    // this.otpVerificationCodeFormGroup.value.otp9,
    // this.otpVerificationCodeFormGroup.value.otp10,
    // this.otpVerificationCodeFormGroup.value.otp11,
    // this.otpVerificationCodeFormGroup.value.otp12
  );

  
  if(this.loginPinValue){
    this.otpVerification.emit(this.loginPinValue)

  }

  if(this.mpinStatusRight==true){
    this.setMpin()//added at midnight so shut up
    // this.getMpin(this.loginPinValue)
  }
  else{
    this.mpinStatusFail==true
  }
  
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


// onDigitInput(event, next, prev) {
//   // if (index == 6) {
//   //   console.log("submit")
//   // }
//   if (event.target.value.length < 1 && prev) {
//     prev.setFocus()
//   }
//   else if (next && event.target.value.length > 0) {
//     next.setFocus();
//   }
//   else {
//     return 0;
//   }
// }


private createPinForm() {
  this.otpVerificationCodeFormGroup = new FormBuilder().group({
    otp1: [null, Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
    otp2: [null, Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
    otp3: [null, Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
    otp4: [null, Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
    // otp5: [null, Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
    // otp6: [null, Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
    otp7: [null, Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
    otp8: [null, Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
    otp9: [null, Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
    otp10: [null, Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
    // otp11: [null, Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
    // otp12: [null, Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
    
  });
}

get d(){
  return this.otpVerificationCodeFormGroup.controls
}

changeInputType(){
  this.currentType=!this.currentType
}

setMpin(){
  if(this.mpinStatusRight==true){
    // localStorage.setItem("MPIN",this.loginPinValue)
    let param = {
      'TokenId':localStorage.getItem('id_token'),
      'DeviceId':localStorage.getItem('ipAddress'),
      'DeviceIp':localStorage.getItem('ipAddress'),
      'MPIN':this.loginPinValue
    }
    this.loaderService.showLoader()
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+'Onboarding/OnboardingSteps/Mpin/submitDetails',param).subscribe((data:any)=>{
      this.loaderService.hideLoader()
      if(data.Status==='1'){
        this.router.navigate(['/mpin'])
      }else{
        this.errorShow("Failed","setMpin -> status ")
      }
    }, (err)=>{
      this.errorShow(err,"setMpin -> Http response ")
    })
  }
}


getMpin(obj){
  this.eduService.categoryValueForAPI.subscribe(val => {
    // console.log(val,"qwertzxcv");
    this.apiCatalog['breadCrumb'] = "Onboarding/" +"/OnboardingSteps" + val["categoryLanding"] + "/" + val['productLanding']
  })

this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+this.apiCatalog.breadCrumb+this.apiCatalog.mPinDetails, obj).subscribe(

  (data: any) => {
if(data){
  this.onboardingService.nextOnSuccess('mPin');

  // this.router.navigate(['/neoBankOnboarding'+data['URLtoRedirect']]);


  console.log("MpinPiyush",data)
 
}
  }
)
}



 dismiss() {
  this.validIdFlag.emit('False');
}


errorShow(message, functionName){
  this.loaderService.hideLoader();
  this.commonFunctionService.showErrorsService(this.errorList?.error,'Login authentication component -> '+functionName,message,this.errorList?.okText);
}


 } 




