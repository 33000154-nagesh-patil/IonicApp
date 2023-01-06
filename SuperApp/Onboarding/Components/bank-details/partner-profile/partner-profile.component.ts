import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import qualification from 'src/assets/qualification.json'

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';
// import { BusinessOverviewComponent } from '../business-overview/business-overview.component';
@Component({
  selector: 'app-partner-profile',
  templateUrl: './partner-profile.component.html',
  styleUrls: ['./partner-profile.component.scss'],
})
export class PartnerProfileComponent implements OnInit {
  imageList: any;
  numberStart: number;
  nextStep: boolean;
  userContractForm: any;
  tnc: boolean;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  qualification: any;
  count: any = 0;
  ifChecked: boolean;

dontShowHeader=true;


  constructor(
    private fb: FormBuilder,
    private allConfigDataService: AllConfigDataService,
    private router: Router,
    private http: HttpClient,
    private onboardingService:OnboardingService
  ) {
    this.apiCatalog = {
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb = 'Onboarding/OnboardingSteps/PartnerProfile';

  }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
    // this.qualification = qualification;
    console.log(this.qualification);

    // alert("hhh")

    // this.partnerprofilform = new FormGroup({
    //   name: new FormControl(''),
    //   dob: new FormControl(''),
    //   email: new FormControl(''),
    //   qualification: new FormControl(''),
    //   // declaration: new FormControl(''),
    //   // termsAndConditions : new FormControl(''),
    // });
    // this.partnerprofilform.controls['name'].setValidators([
    //   Validators.required,
    // ]);
    // this.partnerprofilform.controls['dob'].setValidators([Validators.required]);
    // this.partnerprofilform.controls['email'].setValidators([
    //   Validators.required,
    //   Validators.email,
    // ]);
    // this.partnerprofilform.controls['qualification'].setValidators([
    //   Validators.required,
    // ]);
    // this.partnerprofilform.controls["termsAndConditions"].setValidators([Validators.required]);

    // this.partnerprofilform = this.fb.group({
    //   termsAndConditions: [null, Validators.required],

    //   // Name: [null, ([Validators.required])],
    //   // dob: [null, ([Validators.required])],
    //   // email: [null,  Validators.compose([Validators.required,Validators.email])],

    //   // qualification: [null, ([Validators.required])],
    //   // mobileNo: [null, Validators.compose ([Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.minLength(10),Validators.maxLength(10)])],
    // })
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.partnerprofilform.controls[controlName].hasError(errorName) && (this.partnerprofilform.controls[controlName].dirty || this.partnerprofilform.controls[controlName].touched) ? this.partnerprofilform.controls[controlName].hasError(errorName) : ''
  }

  // dob : ['', Validators.required],


  partnerprofilform = this.fb.group({
    name : ['', Validators.required],
    email : ['', Validators.email],
    qualification : ['', Validators.required],
    checkBox : [false, Validators.requiredTrue]
  })


getDetails(){
  console.log("heyyyyy",this.partnerprofilform.controls);


}
  // onTermsChecked($event) {
  //   this.tnc = !this.tnc;
  //   if ( ! $event.checked)
  //   {
  //       this.partnerprofilform.patchValue({ termsAccepted: null });
  //   }
  // }

  // onSubmit() {
  //   // TODO: Use EventEmitter with form value
  //   console.warn(this.partnerprofilform.value);
  //   // this.router.navigate(['/Onboarding/BusinessOverview'])
  //   this.navigateToPage();
  // }


  getPartnerDetails(){
 this.navigateToPage();
  }


  checkbox(e) {
    this.nextStep = !this.nextStep;
  }
  goback() {
    window.history.back();
  }

  getQualification(type) {
// alert("hello");

    let params = {
      Type: type,
    };

    this.http
      .post(
        this.apiCatalog.baseURL[this.appEnviron] +
          this.breadCrumb +
          '/getDetail?qualification',
        params
      )
      .subscribe((res: any) => {
        console.log(res);


          this.qualification = res.qualification.data;
          console.log("qalificationnnnnnnnnnnnn",  res.data);

      });
  }

  skip(val){
    this.onboardingService.skip(val);
  }

  navigateToPage() {
    let param = {
      TokenId: localStorage.getItem('id_token'),
      name: this.partnerprofilform.value.name,
      emailId: this.partnerprofilform.value.email,
      dob: this.partnerprofilform.value.dob,
      qualification: this.partnerprofilform.value.qualification,
    };
    this.http
      .post(
        this.apiCatalog.baseURL[this.appEnviron] +
          this.breadCrumb +
          '/submitDetails',
        param
      )
      .subscribe((data: any) => {
        if (data) {
          this.router.navigate(['/Onboarding' + data['pageUrl']]);
        }
      });
  }
  profile(status:any){
    if (!status.target.checked) {
        this.ifChecked = false
    } else {
      // this.count--;
      this.ifChecked = true
    }
  }
}
