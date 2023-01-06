import { Injectable } from "@angular/core";
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root',
  })

  export class OnboardingService {
    constructor(public router:Router){}
    skip(val){
        let onboardingStep=JSON.parse(sessionStorage.getItem("OnboardingStep"))
        let objIndex = null;
        for(let x of onboardingStep.data){
          if(x.OnboardingSteps==val){
              objIndex=x.Id;
              break;
            }
        }
        // console.log(objIndex)
        for(let y=objIndex+1;y<=onboardingStep.data.length;y++){
          if(onboardingStep.data[y].status=='N'){
            // console.log(onboardingStep.data[y])
            return this.router.navigate(['/Onboarding'+onboardingStep.data[y]['pageUrl']]);
          }
        }
    }

    nextOnSuccess(val){
      let onboardingStep=JSON.parse(sessionStorage.getItem("OnboardingStep"))
        let objIndex = null;
        for(let x of onboardingStep.data){
        if(x.OnboardingSteps==val && (x.status=='N'||x.status==null)){
          objIndex=x.Id 
          break;
        }
        // if(objIndex&&x.Id==objIndex+1&&(x.status=='N'||x.status==null))this.router.navigate(['/Onboarding'+x['pageUrl']]);
        }

        for(let y=objIndex+1;y<=onboardingStep.data.length;y++){
          if(onboardingStep.data[y].status=='N' || onboardingStep.data[y].status==null){
            return this.router.navigate(['/Onboarding'+onboardingStep.data[y]['pageUrl']]);
          }
        }
    }
  }