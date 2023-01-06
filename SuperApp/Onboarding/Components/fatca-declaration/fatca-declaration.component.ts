import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'index';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';


export interface Wealth {
  name: string;

}

@Component({
  selector: 'app-fatca-declaration',
  templateUrl: './fatca-declaration.component.html',
  styleUrls: ['./fatca-declaration.component.scss'],
})

export class FatcaDeclarationComponent implements OnInit {
  imageList: any;
  // apiCatalog: any;
  state: any;
  city: any;
  profileData

  apiCatalog:any={
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "Onboarding/OnboardingSteps/CustomerRegistration",
    "environment": this.allConfigDataService.getConfig('environmentType'),
  }
  Country: any;
  countryvalue: any;
  FatcaFormGroup: FormGroup;
  countryName: any;

  CountryBirth: any
  PinCode: any
  CityOfBirth: any
  SourceOfWealth:any
  taxResidency: any
  PEP: any
  relatedPep: any;
  loggedInModal:boolean = false;
  ErrorMsg:string;
  constructor(private allConfigDataService: AllConfigDataService,
    private router:Router, private https:HttpClient,
    private onboardingService:OnboardingService
    ) {}

  ngOnInit() {
    this.getContryMasterDetails('Country',null);
    this.imageList = this.allConfigDataService.getConfig('images');

    this.FatcaFormGroup=new FormGroup({
      Country: new FormControl('',),
      CountryBirth: new FormControl(''),
      PinCode: new FormControl(''),
      CityOfBirth: new FormControl(''),
      SourceOfWealth: new FormControl(''),
      taxResidency: new FormControl(''),
      PEP: new FormControl(''),
      relatedPep: new FormControl(''),
    });

    this.profileData = {
      Status: "",
      ErrorCode: "",
      Message: "",
      MessageType: "",
      // IsInterestedInNominee: "",
      FirstName: "",
      MiddleName: "",
      LastName: "",
      // Gender: "",
      // RelationWithNominee: "",
      DateOfBirth: "",
      // PercentageAllocation: "",
      // PanAadharNumber: "",
      // IsNomineeMinor: "",
      Address: "",
      EmailId: "",
      MobileNo: "",
      // NoOfNominee: "",
      // GFullName: "",
      // GPanAadharNumber: "",
      GAddress: "",
      GCityGuId: "",
      GStateGuId: "",
      Pincode: "",
      Country: ""
    }


  }

  PersonalDeatails(){
    this.router.navigate(['/Onboarding/PersonalDetails']);
  }



  CountryControl = new FormControl('', [Validators.required]);
  wealth: String[] = [
    'Job Income',
    'Profit Income.',
    'Interest Income.',
    'self-employment income.'
  ];

  getContryMasterDetails(type: string, selectedGuId: any) {
    let params = {
      "Type": "Country",
      "PINCODE": ""
  }
    this.https.post(
      this.apiCatalog.baseURL[this.apiCatalog.environment]+
      this.apiCatalog['breadCrumb']+
      this.apiCatalog.getDetail+
      '?Country',params).subscribe(
        (data: any) => {
      this.countryName=data.data
    })
  }

  getCityMasterDetails(type, PinCode) {
    let params = {
      "Type": type,
      "PINCODE": PinCode
    }
    if(PinCode.length==6){
    this.https.post(
      this.apiCatalog.baseURL[this.apiCatalog.environment]+
      this.apiCatalog['breadCrumb']+
      this.apiCatalog.getDetail+
      '?City',params).subscribe(
        (data: any) => {
      if (data && data?.Status) {
        this.city = data.data;
      }
    })
    }
  }

  onSubmit() {
    if(this.FatcaFormGroup.value.taxResidency=='No' && 
    this.FatcaFormGroup.value.PEP=='No' && 
    this.FatcaFormGroup.value.relatedPep=='No'){

      let param={
        "TokenId": localStorage.getItem('id_token'),
        "Nationality":this.FatcaFormGroup.value.Country,
        "CountryOfBirth":this.FatcaFormGroup.value.CountryBirth,
        "Pincode":this.FatcaFormGroup.value.PinCode,
        "CityOfBirth":this.FatcaFormGroup.value.CityOfBirth,
        "SourceOfWealth":this.FatcaFormGroup.value.SourceOfWealth,
        "TaxResidency":this.FatcaFormGroup.value.taxResidency,
        "PoliticallyExposePerson":this.FatcaFormGroup.value.PEP,
        "Related_PEP":this.FatcaFormGroup.value.relatedPep
      }
      // TODO: Use EventEmitter with form value
      console.log(this.FatcaFormGroup.value);
      this.https.post(
        this.apiCatalog.baseURL[this.apiCatalog.environment] +
        this.apiCatalog['breadCrumb'] +
        this.apiCatalog.updateFatcaDetail,param).subscribe(
          (res:any)=>{
          if(res.Status){
          this.onboardingService.nextOnSuccess('FatcaDecleration');
            // this.router.navigate(['/Onboarding'+res.pageUrl]);
          }
          else{
            this.onboardingService.skip('FatcaDecleration');
          }
      })
      // this.PersonalDeatails()
    }
    else{
      this.loggedInModal = true;
      this.ErrorMsg = "You can not proceed with Political Exposed Profile"
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
      return false;
    }
    }

    successModalClose() {
      this.loggedInModal = false
    }
}
