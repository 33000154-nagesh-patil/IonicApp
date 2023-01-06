import { param } from 'jquery';
import { NgApexchartsModule } from 'ng-apexcharts';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';
// import { PartnerProfileComponent } from '../partner-profile/partner-profile.component';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss'],
})

export class OurServicesComponent implements OnInit {

  imageList: any;
dontShowHeader=true;
  oursdata: any=[];
  selectedData: any;
  enable:any=true

  apiCatalog:any={
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "Onboarding/OnboardingSteps/PartnerServices",
    "environment": this.allConfigDataService.getConfig('environmentType'),
  }
  title: any;
  ifChecked: boolean;

  constructor(private allConfigDataService:AllConfigDataService,private router:Router,
    private http:HttpClient, private eduService:eduService, private onboardingService:OnboardingService) { }

  ngOnInit() {

    this.imageList=this.allConfigDataService.getConfig('images');
    this.callApi();

  }
  selectedButton(y: { selected: any; }){
    if(y){
      this.enable=false;
    }
    y.selected=!y.selected
    console.log(y);
    this.selectedData.push(y)
    console.log(this.selectedData,"hihihihihihi");
    this.eduService.selectedData.next(this.selectedData)

  }

   navigateToPage(){
    this.onboardingService.nextOnSuccess('OurServices');



    // let param={
    //   "TokenId":localStorage.getItem('id_token')
    // }
    // this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+this.apiCatalog.breadCrumb+"/submitDetails",param)
    // .subscribe((data: any) =>  {

    //  if(data){
    //   this.router.navigate(['/Onboarding'+data['pageUrl']]);
    //  }

    // //  else if(data == this.title.stockData){
    // //   this.router.navigate(['/Onboarding'+data['SegmentFeeCalculationComponent']])
    // //  }
    // })
   }

   ourService(status:any){
    if(!status.target.checked){
      this.ifChecked = false;
    }else{
      this.ifChecked = true
    }

   }
   skip(val){
    this.onboardingService.skip(val);
  }

   callApi(){

    let param={
      "TokenId":localStorage.getItem('id_token')
     }

    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+"Onboarding/OnboardingSteps/PartnerServices"+"/getDetail",param)
    .subscribe((res: any) =>  {

      console.log("our services Data", res.data);

      this.oursdata= res.data;
      console.log("oursdata", this.oursdata);

    })

    // ourService(status:any){
    //   if (!status.target.checked) {
    //       this.ifChecked = false
    //   } else {
    //     // this.count--;
    //     this.ifChecked = true
    //   }
    // }

   }









}


