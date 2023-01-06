
import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'index';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';



interface JsonFormData{
Gender:string
mobileNo:number
firstName:string
lastName:string
DOB:any
Address:any
Country:string
state:string
city:string
District:string
Pincode:number

}
var customer:JsonFormData = { 
  Gender:"",
  mobileNo:0,
  firstName:"",
  lastName:"",
  DOB:0,
  Address:"",
  Country:"",
  state:"",
  city:"",
  District:"",
  Pincode:0
  
} 

@Component({
  selector: 'app-neo-personaldetails',
  templateUrl: './neo-personaldetails.component.html',
  styleUrls: ['./neo-personaldetails.component.scss'],
})

export class NeoPersonaldetailsComponent implements OnInit {

  imageList: any;


  apiCatalog:any={
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "Onboarding/OnboardingSteps/NB/PersonalDetails/",
    "environment": this.allConfigDataService.getConfig('environmentType'),
  }

  res: any;
  constructor(private http:HttpClient,private allConfigDataService:AllConfigDataService,private router:Router,private loaderService:LoaderService,private onboardingService:OnboardingService ) { }


  ngOnInit() {
    this.imageList=this.allConfigDataService.getConfig('images')
    this.getUserDetails()
 
  }
getUserDetails(){
  let data = {
    "TokenId": localStorage.getItem('id_token')
  }
  this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+this.apiCatalog.breadCrumb+this.apiCatalog.getDetailsFromAadhar, data).subscribe(async(data:any)=>{
    this.loaderService.hideLoader();
    if (data && data?.Status){
     this.res=data
  
    }
  })

}
onContinue(){
  let data = {
    "TokenId": localStorage.getItem('id_token')
  }
  this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+this.apiCatalog.breadCrumb+this.apiCatalog.updateCustomerDetails, data).subscribe(async(data:any)=>{
    if (data && data?.Status){
      this.onboardingService.nextOnSuccess('neoPersonalDetails')

    }
  })
}


gotoBack(){}

  }

