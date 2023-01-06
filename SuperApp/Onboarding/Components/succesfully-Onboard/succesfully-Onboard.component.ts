import { log } from 'console';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AllConfigDataService } from 'index';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-succesfully-Onboard',
    templateUrl: './succesfully-Onboard.component.html',
    styleUrls: ['./succesfully-Onboard.component.scss'],
  })

  export class thankYouPage implements OnInit {
    customerPanName:any

    showData:any=true;
    imageList:any
    appName:any="Aqube";
    progressBar:any;

    apiCatalog:any={
      ...this.allConfigDataService.getConfig('apiCatalog'),
      "breadCrumb": "Onboarding/OnboardingSteps/",
      "environment": this.allConfigDataService.getConfig('environmentType'),
    }

    constructor(private allConfigDataService:AllConfigDataService,
      private http:HttpClient,private router:Router,
      private eduService:eduService){

    }
    ngOnInit(): void {
        this.imageList = this.allConfigDataService.getConfig('images');
        this.eduService.OnboardingStepList.subscribe(data=>{
          this.progressBar=data;
          console.log("progress bar",this.progressBar);
        })

        if(localStorage.getItem("userType")=="Partner"){
          this.showData = false;
        }
        else{

          let params = {
            "TokenId" : localStorage.getItem('id_token')
          }

          let subMethod;
          this.eduService.categoryValueForAPI.subscribe(val=>{
            subMethod = val['productLanding'];
          })
          this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+
            this.apiCatalog.breadCrumb+subMethod+'Ucc'+
            '/submitDetails', params).subscribe();
        }


    }
    ExploreApp(){

// alert("hello");
//

      let val=localStorage.getItem("userType");

        if(val=="Partner"){
          window.open("https://charts.reliancemoney.com/BPP/BPAMTeamLoginPageforbugfixing.aspx");
      // this.router.navigate(['/Onboarding/ThankYou']);

        }
        else{
          this.router.navigate(['/Engagement']);
        }
        // this.http.get('assets/data/getNextSteps.json')
        // // this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+'Onboarding'+this.apiCatalog.getNextStep, "reqParams")
        //   .subscribe((data: any) => {
        //     if (data) {
        //       // this.getNextStep.emit(data?.msg)
        //       this.router.navigate(['/Onboarding'+data['URLToRedirect']]);
        //     } else {
        //     //   this.errorShow(data?.Message, "dummyPanPOST -> Http request");
        //     }
        //   })
    }

  }
