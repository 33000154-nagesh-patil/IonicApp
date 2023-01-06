import { AuthenticationService } from 'projects/core/src/lib/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { NetworkService } from 'projects/core/src/lib/services/network.service';
import {otpResponse,registrationResponse} from 'projects/core/src/lib/interfaces/common.interface'
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
// import { ReferralCodeComponent } from 'projects/core/src/lib/components/referral-code/referral-code.component';
import { ToastService } from 'projects/core/src/lib/services/toast.service';
@Component({
  selector: 'lib-login-authentication',
  templateUrl: './login-authentication.component.html',
  styleUrls: ['./login-authentication.component.scss'],
})
export class LoginAuthenticationComponent implements OnInit {
  referralCode:any="";
  _type: any;
  localHeader:any;
  localSubHeader:any;
  showVerificationCode:any = false;
  currentNativeNetwork:any;
  isCordovaStatus:any;
  currentWindowNetwork:any;
  @Input() LoginType:any;
  @Input() errorList:any;
  localUserData:any;
  loggedInModal:boolean=false
  ErrorMsg:any;
  appName: any;
  showReferralCode: boolean = false;
  @Output() emitReferralCode = new EventEmitter();
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  get type(): any {
    return this._type;
  }
  @Input() set type(value: any) {
    this._type = value;
    if(value === this.LoginType?.mobile){
      this.setMoileValidation();
    }
    if(value === this.LoginType?.other){
      this.setEmailValidation()
    }
  }
@Input() headerName:any;
@Input() currentCountryAuthentication:any;
public authenticationFormGroup: FormGroup;
localobj:any;
  constructor(public modalCtrl: ModalController,private allConfigDataService: AllConfigDataService, 
    private http:HttpClient,private authService:AuthenticationService,
    public commonService:CommonService, private loaderService:LoaderService, private commonFunctionService:CommonFunctionService, 
    private networkService:NetworkService,private alertCtrl:AlertController,private toastService:ToastService) {
   
    this.appName = this.allConfigDataService.getConfig('appName');

    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Onboarding/OnboardingSteps/CustomerRegistration';
  }
  dismiss() {
    if(this.showVerificationCode){
      this.showVerificationCode = false;
      if(this._type === this.LoginType?.mobile){
        this.localHeader = 'loginMobileInfo';
        this.localSubHeader = 'loginMobileInfo1'
      }
      if(this._type === this.LoginType?.other){
        this.localHeader = 'loginEmailInfo';
        this.localSubHeader = 'loginEmailInfo1'
      }
    }else{
      this.modalCtrl.dismiss();
    }

  }
  ngOnInit() {
    this.networkService.onNetworkChange().subscribe((data:any)=>{
      this.currentNativeNetwork = data;
    })

    this.networkService.getCordovaStatus().subscribe((data)=>{
      this.isCordovaStatus = data;
    })
    this.networkService.updateNetworkStatusbrowserchange().subscribe((data)=>{
      this.currentWindowNetwork = data;
    })
    this.localobj = {
      // "Identity":this.commonService.setLocalIdentifier()
      
    };
  }
  successModalClose(){
    this.loggedInModal=false
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.authenticationFormGroup.controls[controlName].hasError(errorName) && (this.authenticationFormGroup.controls[controlName].dirty || this.authenticationFormGroup.controls[controlName].touched) ? this.authenticationFormGroup.controls[controlName].hasError(errorName):''
  }
  inputValidator(event: any) {
    const pattern = /^[0-9]*$/;  
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }
  }

  setMoileValidation(){
    this.localHeader = 'loginMobileInfo';
    this.localSubHeader = 'loginMobileInfo1'
    this.authenticationFormGroup = new FormGroup({
      mobileNumber : new FormControl('')
    });
    this.authenticationFormGroup.controls["mobileNumber"].setValidators([Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.minLength(10),Validators.maxLength(10)]);
  }

  setEmailValidation(){
    this.localHeader = 'loginEmailInfo';
    this.localSubHeader = 'loginEmailInfo1'
    this.authenticationFormGroup = new FormGroup({
       emailID : new FormControl('')
    });
    this.authenticationFormGroup.controls["emailID"].setValidators([Validators.required]);
    // this.authenticationFormGroup.controls["emailID"].setValidators([Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]);
    // this.authenticationFormGroup.controls["emailID"].setValidators([Validators.required,Validators.pattern('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$')]);
  }
  async openReferral() {
    let alert = this.alertCtrl.create({
      header: 'Have a Referral Code ?',
      cssClass:"custAlertREF",
      inputs: [
        {
          name: 'ReferralCode',
          placeholder: 'Enter Referral Code'
        },
      ],
      buttons: [
        {
          text: 'Skip',
          role: 'cancel',
          cssClass:"skipButtonREF",
          handler: data => {
            this.referralCode =""
            this.emitReferralCode.emit(this.referralCode)           
          }
        },
        {
          text: 'Submit',
          cssClass:"submitButtonREF",
          handler: data => {
            this.referralCode =  data.ReferralCode ;
    //         let validateReferral = this.validateReferral(data.ReferralCode);
    //         if (!validateReferral) {
    //           this.toastService.showAutoToast("Referral code is Invalid.")
    //             return false;
    //         } else {
    //           this.referralCode =  data.ReferralCode ;
    // this.referralCode =  data.ReferralCode ;
    //           this.emitReferralCode.emit(this.referralCode)
    // this.emitReferralCode.emit(this.referralCode)           
    //         }
                        
          }
        }
      ]
    });
    (await alert).onDidDismiss().then((data) => {
      this.onSubmitAuthentication()
    });
    (await alert).present();
    
  }
  validateReferral(val){
    // var pattern = new RegExp("%^[0-9][a-zA-Z]$");

    // if(val.length>=1 && val.length<=15 && val !=0   ){
      return true
    // }
    
  }
  openREFER(){
    this.openReferral();
  }
  async onSubmitAuthentication(){
    
    this.showReferralCode = false;
    (localStorage.getItem('userType')=='Partner')?this.localobj['UserType'] = 'P':this.localobj['UserType'] = 'C';
   this.localobj["SignInType"]=this._type;
    if(this.referralCode){
      this.localobj["RefCode"]=this.referralCode;
    }
    if(this.authenticationFormGroup?.value?.mobileNumber){
      let mobileNo = this.authenticationFormGroup?.value?.mobileNumber;
      this.localobj['SignInData'] = mobileNo.toString();
      // this.localobj['ClientId'] = mobileNo.toString();
    }
    if(this.authenticationFormGroup?.value?.emailID){
      this.localobj['SignInData'] = this.authenticationFormGroup?.value?.emailID
      // this.localobj['ClientId'] = this.authenticationFormGroup?.value?.emailID
    }
    if(this.authenticationFormGroup?.value?.emailID == "abc.def@gmail.com" || this.authenticationFormGroup?.value?.mobileNumber == "1234567890"){
      this.sendOTPPage()
      // this.showReferralCode = true;
    }
    else{
      if(this.isCordovaStatus){
        this.nativeNetwork(this.localobj);
      }else{
        this.windowNetwork(this.localobj);
      }
    }
  }

  nativeNetwork(data){
    if(this.currentNativeNetwork){
      this.loginAuthenticationOTP(data);
    }else{
      this.ErrorMsg=this.errorList?.networkError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
    }
  }

  windowNetwork(data){
    if(this.currentWindowNetwork){
      this.loginAuthenticationOTP(data);
      // this.sendOTPPage()
    }else{
      this.ErrorMsg=this.errorList?.networkError
  this.loggedInModal = true
  setTimeout(() => {
    this.loggedInModal = false;
  }, 3000);
    }
  }
  sendOTPPage(){
    this.showVerificationCode = true
    this.headerName = 'pinLabel'
    this.localHeader = 'pinCodeInfo'
  }
  loginAuthenticationOTP(data){
    this.loaderService.showLoader();
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.RegisterCustomer, data)
    // this.commonService.otpGenerateValidation(data).subscribe((data:registrationResponse)=>{
    // .subscribe(async (data: any) => {
    // this.commonService.otpGenerateValidation(data)
    .subscribe((data:registrationResponse)=>{
      this.loaderService.hideLoader();
      if(data && data?.Status){
        this.localUserData = data;
        
        // localStorage.removeItem('CustGuId');
        // localStorage.setItem('CustGuId', data?.CustGuId);
        // console.log(this.localUserData);
        
        this.sendOTPPage()
      }else{
        this.loaderService.hideLoader();
        this.errorShow(data?.Message,"loginAuthenticationOTP -> status ")
      }

    },(error:any)=>{
      this.loaderService.hideLoader();
      this.errorShow(error,"loginAuthenticationOTP -> status ")
    })
  }

  checkOTPValidationAuthentication(data){
    if(data){
      this.localobj={}
    this.localobj["Type"]=this._type;
      this.localobj['OTP']=data;
    (localStorage.getItem('userType')=='Partner')?this.localobj['UserType'] = 'P':this.localobj['UserType'] = 'C';
      if(this.authenticationFormGroup?.value?.mobileNumber){
        let mobileNo = this.authenticationFormGroup?.value?.mobileNumber;
        this.localobj['Mobile'] = mobileNo.toString();
        this.localobj["data"]={
          "deviceId": localStorage.getItem('ipAddress')?localStorage.getItem('ipAddress'):'10.113.4.152',
          "deviceIP": localStorage.getItem('ipAddress')?localStorage.getItem('ipAddress'):'10.113.4.152',
          "MobileNo":  mobileNo.toString(),
          "deviceType": this.isCordovaStatus?'Mobile':'Desktop'
      }
      }
      // if(this.authenticationFormGroup?.value?.emailID){
        this.localobj['EmailId'] = this.authenticationFormGroup?.value?.emailID
      // }

      if(data === '123456' && this.authenticationFormGroup?.value?.emailID == "abc.def@gmail.com" || this.authenticationFormGroup?.value?.mobileNumber == "1234567890"){
        let dumData = {
          "Status": 1,
          "ErrorCode": 0,
          "Message": "Success",
          "MessageType": "I",
          "Key": "MTIzMTIzNTQ1NjQ3ODk3ODk3OA==",
          "Token": "NDZjYTBiNTEtMjJhMi00NTQ0LTg4NzUtNjhlNTdhZTg4ODNj",
          // "CustGuId": "33396924-F73C-44B5-A5F2-C4582F463282",
          // "CustGuId": "90D94891-5FB9-413E-A957-FC318FABB930" // dummy cust id for esign
          "CustGuId":"FD8E981C-0EA7-47F5-963B-01619FFAE79D"
      }
      if(this.appEnviron=="proto")this.modalCtrl.dismiss(dumData,this._type);
      } else{
        if(this.localobj){
          if(this.isCordovaStatus){
            this.nativeNetworkOTP(this.localobj);
          }else{
            this.windowNetworkOTP(this.localobj);
          }
        }
      }
    }
  }
  nativeNetworkOTP(data){
    if(this.currentNativeNetwork){
      this.validateUserAuthentication(data);
      //this.dummycheck(data); //bypass
    }else{
      this.ErrorMsg=this.errorList?.networkError
  this.loggedInModal = true
  setTimeout(() => {
    this.loggedInModal = false;
  }, 3000);
    }
  }

  windowNetworkOTP(data){
    if(this.currentWindowNetwork){
      this.validateUserAuthentication(data);
      // this.dummycheck(data); //bypass
    }else{
      this.ErrorMsg=this.errorList?.networkError
  this.loggedInModal = true
  setTimeout(() => {
    this.loggedInModal = false;
  }, 3000);
    }
  }
  dummycheck(data){
    this.modalCtrl.dismiss(data,this._type);
  }
  validateUserAuthentication(localobj){
    this.loaderService.showLoader();
      this.commonService.otpValidation(localobj)
      this.http.post(this.apiCatalog.baseURL[this.appEnviron]+'Onboarding/OnboardingSteps/Token'+this.apiCatalog.ValidateEmailMobileOtp, localobj)
      .subscribe((data:any)=>{
        this.loaderService.hideLoader();
        if(data && data?.Status=="1"){
          this.modalCtrl.dismiss(this.localUserData,this._type);
          localStorage.setItem("id_token",data.data.TokenId)

        }else{
          this.errorShow("Invalid OTP","validateUserAuthentication -> status ")
      }
      },
      (err:any)=>{
       this.errorShow(err,"validateUserAuthentication -> Http response ")
      })
  }

  resendOTPButton(data){
    this.onSubmitAuthentication()
  }

  errorShow(message, functionName){
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error,'Login authentication component -> '+functionName,message,this.errorList?.okText);
  }
}
