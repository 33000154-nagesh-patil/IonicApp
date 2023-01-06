import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { NgZone} from '@angular/core';
import {take} from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
// import { BussinessDetailComponent } from '../bussiness-detail/bussiness-detail.component';

@Component({
  selector: 'app-business-overview',
  templateUrl: './business-overview.component.html',
  styleUrls: ['./business-overview.component.scss'],
})
export class BusinessOverviewComponent implements OnInit {
  imageList: any;
  Urlinput:any=false;
  data:any=[{name:"Without Website/App"},{name:"On My Website/App"}]
  radio:any=false
  selectedata:any=[]
  EnterBussinessname:any=true
  SelectBussinessType:any=true
  SelectBussinessCategory:any=true
  Description:any=true

dontShowHeader=true;


  partnerFlow: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  businessType: any;
  businessCategory: any;
  breadCrumbNextStep: string;
  businessSubCategory: any;
  constructor(private router:Router,private allConfigDataService:AllConfigDataService
    ,private fb:FormBuilder,private _ngZone: NgZone, private modalCtrl:ModalController,
    private eduService:eduService,private http:HttpClient)
  {


    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Onboarding/OnboardingSteps/PartnerRegistration';
    this.breadCrumbNextStep='Onboarding/OnboardingSteps/PartnerBusinessOverview';

    // this.eduService.selectedData.subscribe((res:any)=>{

    //   console.log(this.selectedata,"rahul chautala");
    //   if(res.value.split(" ")[0] == "Successfully"){

    //   }
    //   if(this.selectedata==this.data.wealth.stock){

    //   }
    //  })

    }

  ngOnInit() {
this.imageList=this.allConfigDataService.getConfig("images");
this.getBusinessTypeDefault()
console.log(this.Urlinput,'url');

console.log(this.businessOverviewForm.value?.paymentmethod,'paymentMethod');
if(this.businessOverviewForm.value?.paymentmethod=="On my Website/App"){
  this.Urlinput=true


}
else{
  this.Urlinput=false
}

  }

  getBusinessOverviewDetail(){
    this.navigateToPage();
  }

  checkBox(){
    this.Urlinput = !this.Urlinput;
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.businessOverviewForm.controls[controlName].hasError(errorName) && (this.businessOverviewForm.controls[controlName].dirty || this.businessOverviewForm.controls[controlName].touched) ? this.businessOverviewForm.controls[controlName].hasError(errorName) : ''
  }


  businessOverviewForm = this.fb.group({
    businessName: ['', ([Validators.required])],
    bussinessType: ['', ([Validators.required])],
    description: ['', ([Validators.required])],
    businessCategories: ['', ([Validators.required])],
    paymentmethod: ['', ([Validators.required])],
    Url: ['', ([Validators.required, Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")])],


  })


  // async navToBusinessDetail() {

  //   const modal = await this.modalCtrl.create({
  //     component: BussinessDetailComponent,
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

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.businessOverviewForm.value);
    console.log(this.businessOverviewForm.value?.paymentmethod,'paymentMethod');
    // this.router.navigate(['/Onboarding/BussinessDetail'])
    this.navigateToPage()

  }
  checkBoxClicked(val){
   console.log(val);


    if(val=="On My Website/App"){
      this.Urlinput=!this.Urlinput
    }
  }
  goback(){
    window.history.back()
  }
  getBusinessTypeDefault(){
    let params = {
      "Type": 'businessType'
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+"/getDetail?businessType", params).subscribe((data: any) => {
      // if (data && data?.Status) {
        this.businessType = data.businessType.data;
        console.log(this.businessType);
      // }
    })
    this.getBusinessType()
  }
  getBusinessType(){
    let params = {
      "Type": 'businessCategories'
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+"/getDetail?businessCategory", params).subscribe((data: any) => {
      // if (data && data?.Status) {

        this.businessCategory = data.businessCategory.data;
        // console.log(this.salutationList);
        console.log(this.businessCategory);

      // }
    })
  }
  getBusinessCategory(type){
    let params = {
      "Type": type
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+"/getDetail?businessCategory", params).subscribe((data: any) => {
      // if (data && data?.Status) {
        this.businessCategory = data.businessCategory.data;
        // console.log(this.salutationList);
        console.log(this.businessCategory);

      // }
    })
    // this.getBusinessSubCategory();

  }

  getBusinessSubCategory(type){
    let params = {
      "Type": type
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+"/getDetail?businessCategory", params).subscribe((data: any) => {
      // if (data && data?.Status) {
        console.log(data,"OOOO");
        this.businessSubCategory = data.businessCategory.data;
        // console.log(this.salutationList);
        console.log(this.businessSubCategory);

      // }
    })

  }


  navigateToPage(){
    let param={
      "TokenId":localStorage.getItem('id_token'),
      "businessName":this.businessOverviewForm.value.businessName,
      "bussinessType":this.businessOverviewForm.value.bussinessType,
      "description":this.businessOverviewForm.value.description,
      "businessCategories":this.businessOverviewForm.value.businessCategories,
      "paymentmethod":this.businessOverviewForm.value.paymentmethod,
      "Url":this.businessOverviewForm.value.Url
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumbNextStep+"/submitDetails",param)
    .subscribe((data: any) =>  {

     if(data){
      this.router.navigate(['/Onboarding'+data['pageUrl']]);
     }

    })


   }

}
