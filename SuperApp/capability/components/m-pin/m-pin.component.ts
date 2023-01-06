import { takeUntil } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';
import { UnsubBehaviour } from './../../../../src/app/unsubscribe.class';
import { AuthenticationService } from 'projects/core/src/lib/services/authentication.service';
import { AlertService } from './../../../../projects/core/src/lib/services/alert.service';
import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AllConfigDataService, CommonFunctionService, CommonService, LoaderService } from 'index';

@Component({
  selector: 'app-m-pin',
  templateUrl: './m-pin.component.html',
  styleUrls: ['./m-pin.component.scss'],
})
export class MPinComponent extends UnsubBehaviour implements OnInit,OnDestroy {

  currentType: any = false
  private mPinValue: string;

  apiCatalog={
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "environment": this.allConfigDataService.getConfig('environmentType'),
};
UserDetail = this.commonService.getUserDetail()
  MobNo: any;
  errorList: any;
  UserName: any;
  constructor(
    private router: Router,
    private authService:AuthenticationService,
    private alertService: AlertService,
    private http:HttpClient, 
    private allConfigDataService:AllConfigDataService,
    private commonService:CommonService,
    private loaderService:LoaderService,
    public commonFunctionService:CommonFunctionService
    ) { 
      super()
      this.createPinForm();
      this.UserDetail.pipe(takeUntil(this.UnSubscribe)).subscribe(async (res:any) => {
        
        this.UserName = res.firstName
        this.MobNo= res.contactDetails
      }) 
    }

  ngOnInit() { }

  changeInputType() {
    this.currentType = !this.currentType
  }

  onDigitInput(event) {
    console.log("event", event)
    console.log("event.srcElement.nextElementSibling", event.srcElement.nextElementSibling)
    let element;
    if (event.code !== 'Backspace')
      element = event.srcElement.nextElementSibling;

    if (event.code === 'Backspace')
      element = event.srcElement.previousElementSibling;

    if (element == null)
      return;
    else
      element.focus();
  }

  verifyMpin() {
    this.mPinValue = ''.concat(
      this.otpVerificationCodeFormGroup.value.otp1,
      this.otpVerificationCodeFormGroup.value.otp2,
      this.otpVerificationCodeFormGroup.value.otp3,
      this.otpVerificationCodeFormGroup.value.otp4,
      // this.otpVerificationCodeFormGroup.value.otp5,
      // this.otpVerificationCodeFormGroup.value.otp6
    );

    let append = {
      'TokenId':localStorage.getItem('id_token'),
      'DeviceId':localStorage.getItem('ipAddress'),
      'DeviceIp':localStorage.getItem('ipAddress'),
      'MPIN':this.mPinValue,
      'MobileNo':this.MobNo
    }
    this.loaderService.showLoader()
    // let checkMpin = localStorage.getItem('MPIN');
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+
      'Onboarding/OnboardingSteps/Mpin/submitDetails?validateMpin',append)
      .subscribe((data:any)=>{
        this.loaderService.hideLoader()
        if (data.Status==='1') {
          localStorage.setItem("id_token",data.data.TokenId)
          // this.alertService.showAlert("Success", "", "Mpin succesfully verified", "Ok")
          this.router.navigate(['/Engagement'])
        }
        else {
          this.alertService.showAlert("Error", "", data.Message, "Ok")
          // this.errorShow("Failed","verifyMpin -> status ")
        }
      }, (err)=>{
        this.errorShow(err,"verifyMpin -> Http response ")
      })
  }

  errorShow(message, functionName){
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error,'Login authentication component -> '+functionName,message,this.errorList?.okText);
  }

  private createPinForm() {
    this.otpVerificationCodeFormGroup = new FormBuilder().group({
      otp1: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      otp2: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      otp3: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      otp4: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      // otp5: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      // otp6: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],


    });
  }
  public otpVerificationCodeFormGroup: FormGroup;
  forgotMpin() {
    this.authService.logout()
  }

}
const routes = [
  {
    path: '', component: MPinComponent
  }
]
@NgModule({
  declarations: [MPinComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatFormFieldModule
  ],

})
export class MPinModule { }