import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
import { AllConfigDataService, CommonService, offerList } from 'index';
import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
@Component({
  selector: 'app-prerequisite-details',
  templateUrl: './prerequisite-details.component.html',
  styleUrls: ['./prerequisite-details.component.scss'],
})
export class PrerequisiteDetailsComponent implements OnInit {
  imageList:any
  cartCount
  cardData :any;
selected: any;
  Prerequsite: any;
  formCard: any;
  data: any=[];
  objectValue: any=[];
  arrayValues:any=[]
  objectKey:any=[]
  datavalue: any;
  prerequisite:any
  opCode:any
  operator:any
  formData:any
  apiCatalog: any = {
    ...this.allConfigDataService.getConfig('apiCatalog'),
    environment: this.allConfigDataService.getConfig('environmentType'),
  };
  dontShowHeader=true;
  diseaseformData: any;
  diseasePrerequsite: any;
  subInsurance: any;
  insuranceName: any;

  constructor(private eduservice:eduService,private onboardingService:OnboardingService,private http:HttpClient,private allConfigDataService: AllConfigDataService,private router:Router) {
    
    this.eduservice.operatorCategory.subscribe(val=>{
      this.operator=val
      this.insuranceName ="/"+ val.replace(" ", "")
    })
    this.eduservice.categoryValueForAPI.subscribe(val => {
    
      this.prerequisite= val['productLanding']?'_'+val['productLanding']:'';
    })
this.getbreadCrumb()
this.eduservice.operatorCode.subscribe(val=>{

  this.opCode=val
})
this.eduservice.formsData.subscribe(val=>{
  this.formData=val
  console.log(this.formData,"first form");
  
})
this.eduservice.pedData.subscribe(val=>{
  this.formData=val
  console.log(this.formData,"ped form");
  
})
}

  ngOnInit() {
    this.imageList= this.allConfigDataService.getConfig('images')
   this.Prerequsite=this.eduservice.getPrerequisitesFormsData()
   this.diseaseformData=this.eduservice.getPedFormsData()
  //  this.diseaseformData = this.eduservice.getPrerequisitesFormsData2()
   console.log(this.Prerequsite,'form');
   console.log(this.diseaseformData,'ped');
  
   
   
  //  console.log(this.diseasePrerequsite+"hello world");
  
  }
  // ngOnDestroy(){
  //   this.eduservice.formsData.unsubscribe()
  //   this.eduservice.pedData.unsubscribe()
  // }
  
  back(){
    this.eduservice.setIndex(this.eduservice.getPrerequisitesFormsData().length);
    this.router.navigate(['/Onboarding/prerequisite'], { state: {frompre:"False"}} )
  }

  onSubmit(){
    this.router.navigate(['/Onboarding/orderBook'])
    }

  goToForm(index){
    this.eduservice.setIndex(index);  
    this.eduservice.pedFormsData.next(this.diseaseformData)
    this.router.navigate(['/Onboarding/prerequisite'], { state: {frompre:"True"}} )
  }

  getbreadCrumb() {
    this.eduservice.categoryValueForAPI.subscribe(val => {
      this.subInsurance=val['productLanding']=='Insurance'?this.insuranceName:''
      this.apiCatalog['breadCrumb'] = "Onboarding/" + "OnboardingSteps" + "/" + val['productLanding']+this.subInsurance
  
    
    })
  }

  navigateToOrderBook(){

    let params = {
      "TokenId": localStorage.getItem('id_token'),
      "operator_code":this.opCode,
      "BillerType":this.operator,
      "formData":this.formData
    }
    this.http
    .post(
      this.apiCatalog.baseURL[this.apiCatalog.environment] +
        this.apiCatalog.breadCrumb +this.apiCatalog.billDetails+this.prerequisite,params
    )
    .subscribe((res: any) => {
      if (res.billDetails && res.billDetails?.Status == 1) {
     
        return this.router.navigate([ res.billDetails['pageUrl']]);
      }
    });
}
}
