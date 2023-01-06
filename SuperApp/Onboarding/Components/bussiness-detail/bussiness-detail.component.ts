import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
// import { CongratulationsComponent } from '../congratulations/congratulations.component';
// import toruspay from "src/assets/toruspays.json"
// import toruspay from "../../../../src/assets/toruspays.json"
import toruspay from "../../../../src/assets/toruspays.json"
// import {
//   FormGroup,
//   FormBuilder,
//   FormControl,
//   Validators,
//   NgForm,
//   FormArray,
//   AbstractControl
// } from "@angular/forms";


@Component({
  selector: 'app-bussiness-detail',
  templateUrl: './bussiness-detail.component.html',
  styleUrls: ['./bussiness-detail.component.scss'],
})
export class BussinessDetailComponent implements OnInit {
  imageList: any;
  torusPayData: any;
  bussinessDetailForm: FormGroup;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  breadCrumbnextstep:string;
  country: any;
  countryDrop: any;
  ifChecked: any;
  count: any = 0;
  state: any;
  stateDrop: any;
  city: any;
  cityDrop: any;


dontShowHeader=true;

  authorized: any = [
    {name1: "Operational Address same as above" },
    {name2: "I agree to Razorpay Terms & Condition" }
  ];
  constructor(private allConfigDataService:AllConfigDataService,
    private fb:FormBuilder, private modalCtrl:ModalController
    ,private router:Router,
    private http:HttpClient) {
      this.apiCatalog={
        ...this.allConfigDataService.getConfig('apiCatalog'),
      };
      this.appEnviron = this.allConfigDataService.getConfig('environmentType');
      this.breadCrumb='Onboarding/OnboardingSteps/PartnerRegistration';
      this.breadCrumbnextstep="Onboarding/OnboardingSteps/PartnerBusinessDetail"
  }

  ngOnInit() {
    this.imageList=this.allConfigDataService.getConfig("images");
    this.torusPayData=toruspay.Res;
    console.log(this.torusPayData.enterBusinessownersPan);

    this.getCountryMasterDetails('Country', null);
    this.getStateMasterDetails('State', null);

    this.getCityMasterDetails('City',null)

this.bussinessDetailForm = new FormGroup({
  pan : new FormControl(''),
  panName : new FormControl(''),
  CIN : new FormControl(''),
  billing : new FormControl(''),
  address : new FormControl(''),
  pincode : new FormControl(''),
  state : new FormControl(''),
  city: new FormControl(''),
  termsAndConditions : new FormControl(''),

});
this.bussinessDetailForm.controls["pan"].setValidators([Validators.required]);
this.bussinessDetailForm.controls["panName"].setValidators([Validators.required]);
this.bussinessDetailForm.controls["CIN"].setValidators([Validators.required]);
this.bussinessDetailForm.controls["billing"].setValidators([Validators.required]);
this.bussinessDetailForm.controls["address"].setValidators([Validators.required]);
this.bussinessDetailForm.controls["pincode"].setValidators([Validators.required]);
this.bussinessDetailForm.controls["state"].setValidators([Validators.required]);
this.bussinessDetailForm.controls["city"].setValidators([Validators.required]);
this.bussinessDetailForm.controls["termsAndConditions"].setValidators([])
// this.bussinessDetailForm.controls["email"].setValidators([Validators.required,Validators.email]);
// this.bussinessDetailForm.controls["qualification"].setValidators([Validators.required]);



  }


  onTermsChecked(status: any)
{
  if (!status.target.checked) {
    this.count++;
    if (this.count === 2) {
      this.ifChecked = false
    }
  } else {
    this.count--;
    this.ifChecked = true
  }
    // if ( ! $event.checked)
    // {
    //     this.bussinessDetailForm.patchValue({ termsAccepted: null });
    // }
}

  // async navToCongrats() {

  //   const modal = await this.modalCtrl.create({
  //     component: CongratulationsComponent,
  //     componentProps: {
  //       'imageList': this.imageList,
  //     },
  //     backdropDismiss: false
  //   })
  //   modal.onDidDismiss().then((data) => {
  //     console.log(data)
  //   })
  //   return await modal.present()
  // }

  goback(){
    window.history.back()
  }
  getCountryMasterDetails(type, selectedGuId) {
    let params = {
      "Type": type,
      "SelectedGuId": selectedGuId
    }
   this.http.post(this.apiCatalog.baseURL[this.appEnviron]+"Onboarding/OnboardingSteps/CustomerRegistration"+'/getDetail?Country', params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.country = data.data;
      }
      // console.log("countryList", this.country)
      this.countryDrop.open()
    })
  }

  getStateMasterDetails(type, selectedGuId) {
    let params = {
      "Type": type,
      "SelectedGuId": selectedGuId
    }
   this.http.post(this.apiCatalog.baseURL[this.appEnviron]+"Onboarding/OnboardingSteps/CustomerRegistration"+'/getDetail?State', params).subscribe((data: any) => {
      // if (data && data?.Status) {
      //   this.state = data.data;
      // }
      this.state = data.data;
      this.stateDrop.open()
    })
    // console.log(this.state);
  }

  inputValidator(event: any) {
    const pattern = /^[0-9]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }
    if(event.target.value.length==6)this.getCityMasterDetails('City',this.bussinessDetailForm.value.pincode)
  }

  getCityMasterDetails(type: string, pincode: any) {
    let params = {
      "Type": type,
      "PINCODE": pincode
    }
   this.http.post(this.apiCatalog.baseURL[this.appEnviron]+"Onboarding/OnboardingSteps/CustomerRegistration"+'/getDetail?City', params).subscribe((data: any) => {
    console.log("Pincode businessDetails", data);

      if (data && data?.Status) {
        this.city = data.data;
        this.state = data.data;
        this.country = data.data;

      }
      this.cityDrop.open()

    })
  }




  // onSubmit(){
  //   this.navtoPan();
  // }

  getBusinessDetail(){
    this.navtoPan();
  }

  navtoPan(){
    let param={
      "TokenId":localStorage.getItem('id_token'),
      "pan":this.bussinessDetailForm.value.pan,
      "panName":this.bussinessDetailForm.value.panName,
      "CIN":this.bussinessDetailForm.value.CIN,
      "billing":this.bussinessDetailForm.value.billing,
      "address":this.bussinessDetailForm.value.address,
      "pincode":this.bussinessDetailForm.value.pincode,
      "state":this.bussinessDetailForm.value.state,
      "city":this.bussinessDetailForm.value.pincode

    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumbnextstep+"/submitDetails",param)
    .subscribe((data: any) =>  {

     if(data){
      this.router.navigate(['/Onboarding'+data['pageUrl']]);
     }

    })


   }

}
