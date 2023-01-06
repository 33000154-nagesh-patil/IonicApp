import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
// import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { AllConfigDataService, CommonService, LoaderService } from 'index';
import { Router } from '@angular/router';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { AlertService } from 'projects/core/src/lib/services/alert.service';

@Component({
  selector: 'lib-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss'],
})
export class SuccessPageComponent implements OnInit {
@Input() message:any;
 imageList:any;
 dontShowHeader=true;

 apiCatelog={
  ...this.allConfigDataService.getConfig('apiCatalog'),
  "breadCrumb": "Onboarding/Wealth",
 
  "environment": this.allConfigDataService.getConfig('environmentType'),
};
  constructor(private modalCtrl:ModalController,private alertService:AlertService,private http:HttpClient,private eduService:eduService,private allConfigDataService:AllConfigDataService,private router:Router,private loaderService:LoaderService ) { }

  ngOnInit() {

    this.imageList=this.allConfigDataService.getConfig('images')
 
    // setTimeout(() => {
      // this.modalCtrl.dismiss();
    // },3000);

  }
  dismiss(){
this.router.navigate(['/Engagement'])    
  }

  upgrade(){
     this.loaderService.showLoader();

    //  this.eduService.categoryValueForAPI.subscribe(val => {

    //   this.apiCatelog['breadCrumb'] = "Onboarding/" +"OnboardingSteps" + "/" + val['productLanding']
    // })
    let param= {
      "TokenId": localStorage.getItem('id_token'),
    };

    
    this.http
      .post(
        this.apiCatelog.baseURL[this.apiCatelog.environment] +
          this.apiCatelog.breadCrumb +
          this.apiCatelog.getAllStep+'?getAllStepsFoeNeo',
        param
      )
      .subscribe((response: any) => {
        if (response.Status) {
          sessionStorage.setItem('OnboardingStep',JSON.stringify(response));
          this.eduService.OnboardingStepList.next(response.data);
          this.loaderService.hideLoader();
       
          for(let el of response.data ){
            if(el.status=='N'){
              return this.router.navigate(['Onboarding'+el.pageUrl] )
            }
        
          }
          
        }else{
          this.loaderService.hideLoader();
          this.alertService.showAlert("Error","","Fail to render Steps","Ok")
        }
      },
      ()=>{
        this.loaderService.hideLoader();
      });
 
  }
}
