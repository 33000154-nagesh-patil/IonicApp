import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllConfigDataService} from 'index';
import { LoaderService } from 'index';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';


@Component({
  selector: 'app-neo-details',
  templateUrl: './neo-details.component.html',
  styleUrls: ['./neo-details.component.scss'],
})
export class NeoDetailsComponent implements OnInit {
  apiCatalog={
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "",
    "environment": this.allConfigDataService.getConfig('environmentType'),
}

  public nomineeFormGroup: FormGroup;
  profileData: any;
 dontShowHeader=true
  @Input() imageList: any;
  appName: any;
  appEnviron: any;
  breadCrumb: string;
  breadCrumb2: string;
  country: any[];
  state: any[];
  city: any[];
  birthDate:any
  @ViewChild('countryDrop') countryDrop;
  @ViewChild('cityDrop') cityDrop;
  @ViewChild('stateDrop') stateDrop;
  todaysDate: string;
  isMinor: boolean = false;
  values: any;
  day:any
  month:any
  year:any



  constructor(private allConfigDataService: AllConfigDataService, private loaderService: LoaderService,
    private router: Router,private eduService:eduService,private onboardingService:OnboardingService,
    private http:HttpClient) { 



  // this.apiCatalog={
      //   ...this.allConfigDataService.getConfig('apiCatalog'),
      // };
      // this.appEnviron = this.allConfigDataService.getConfig('environmentType');
      // this.breadCrumb='Onboarding/OnboardingSteps/CustomerRegistration';
      // this.breadCrumb2='Onboarding/OnboardingSteps/Nominee';

      this.getBreadcum()
    }

  ngOnInit() {

    this.loaderService.hideLoader();

    this.imageList = this.allConfigDataService.getConfig('images');
    this.appName = this.allConfigDataService.getConfig('appName');
    

    this.getCountryMasterDetails('Country', null);
    this.getStateMasterDetails('State', null);
    this.getCityMasterDetails('City',null)


    this.nomineeFormGroup = new FormGroup({
      DOB: new FormControl(''),
    
      Address1: new FormControl(''),
      Address2: new FormControl(''),
      City: new FormControl(''),
      State: new FormControl(''),
      Country: new FormControl(''),
      Pincode: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      father: new FormControl(''),
      mother: new FormControl('')

    });
  
    this.nomineeFormGroup.controls["DOB"].setValidators([Validators.required])
    this.nomineeFormGroup.controls["Address1"].setValidators([Validators.required])
    this.nomineeFormGroup.controls["Address2"].setValidators([Validators.required])

    this.nomineeFormGroup.controls["City"].setValidators([Validators.required])

    this.nomineeFormGroup.controls["State"].setValidators([Validators.required])

    this.nomineeFormGroup.controls["Country"].setValidators([Validators.required])
    this.nomineeFormGroup.controls["Pincode"].setValidators([Validators.required])

    this.nomineeFormGroup.controls["firstName"].setValidators([Validators.required])

    this.nomineeFormGroup.controls["lastName"].setValidators([Validators.required])
    this.nomineeFormGroup.controls["father"].setValidators([Validators.required])
    this.nomineeFormGroup.controls["mother"].setValidators([Validators.required])




  
    this.profileData = {
      Status: "",
      ErrorCode: "",
      Message: "",
      MessageType: "",
      IsInterestedInNominee: "",
      FirstName: "",
      MiddleName: "",
      LastName: "",
      Gender: "",
      RelationWithNominee: "",
      DateOfBirth: "",
      PercentageAllocation: "",
      PanAadharNumber: "",
      IsNomineeMinor: "",
      Address: "",
      EmailId: "",
      MobileNo: "",
      NoOfNominee: "",
      GFullName: "",
      GPanAadharNumber: "",
      GAddress: "",
      GCityGuId: "",
      GStateGuId: "",
      Pincode: "",
      Country: ""
    }
  
  }


  getBreadcum(){
    this.eduService.categoryValueForAPI.subscribe(val => {
      // console.log(val,"qwertzxcv");
      this.apiCatalog['breadCrumb'] = "Onboarding/" +"OnboardingSteps" + "/" + val['productLanding']
    })
  }


  disableFutureDate() {
    var date: any = new Date();
    var maxDate: any = date.getDate();
    var maxMonth: any = date.getMonth() + 1;
    var maxYear: any = date.getFullYear();
    if (maxDate < 10) {
      maxDate = '0' + maxDate
    }
    if (maxMonth < 10) {
      maxMonth = '0' + maxMonth
    }

    this.todaysDate = maxYear + "-" + maxMonth + "-" + maxDate;

  }

  checkForAge(val){
     this.day=val.getDate()
    this.month=val.getMonth()+1
    this.year=val.getFullYear()
     if(this.day< 10){
this.day="0"+this.day
     }
    this.birthDate=this.day.toString()+this.month.toString()+this.year.toString()

  }

  
  getCountryMasterDetails(type, selectedGuId) {
    let params = {
      "Type": type,
      "SelectedGuId": selectedGuId
    }
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog.breadCrumb+'/getDetail?Country', params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.country = data.data;
      }
      // this.countryDrop.open()
    })
  }

  getStateMasterDetails(type, selectedGuId) {
    let params = {
      "Type": type,
      "SelectedGuId": selectedGuId
    }
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog.breadCrumb+'/getDetail?State', params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.state = data.data;
      console.log(this.state,"stateDrop");
      
      }
     
      // this.stateDrop.open()

    })
  }

  getCityMasterDetails(type, pincode) {
    let params = {
      "Type": type,
      "PINCODE": pincode
    }
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog.breadCrumb+'/getDetail?City', params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.city = data.data;
      }
// this.cityDrop.open()
    })
  }



  
  getOtp(){
    let obj = {
      "TokenId": localStorage.getItem('id_token')
    }
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog.breadCrumb + this.apiCatalog.getOtp, obj).subscribe(
    
      (data: any) => {
    if(data){
      console.log("MpinPiyush",data) 
    }
      }
    )
  }

  onSubmit(){

    this.values={
     "firstName":this.nomineeFormGroup.value.firstName,
     "lastname":this.nomineeFormGroup.value.lastName,
     "father":this.nomineeFormGroup.value.father,
     "mother":this.nomineeFormGroup.value.mother,
     "DOB":this.birthDate,
     "Address1":this.nomineeFormGroup.value.Address1,
     "Address2":this.nomineeFormGroup.value.Address2,
     "Pincode":this.nomineeFormGroup.value.Pincode,
     "State":this.nomineeFormGroup.value.State,
     "City":this.nomineeFormGroup.value.City,
     "Country":this.nomineeFormGroup.value.Country

    }

    let obj = {
      "TokenId": localStorage.getItem('id_token'),
      "userDetails":this.values
    }
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog.breadCrumb + this.apiCatalog.walletUserDeatils, obj).subscribe(
      (data: any) => {
    if(data && data.Status==1){

this.getOtp()

      this.onboardingService.nextOnSuccess('userDetails');
    }
      }
    )

  }

}
