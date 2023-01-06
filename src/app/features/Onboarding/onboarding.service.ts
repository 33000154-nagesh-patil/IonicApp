import { Injectable } from "@angular/core";
import { AllConfigDataService } from "projects/core/src/lib/services/all-config-data.service";


@Injectable({
    providedIn: 'root'
  })
export class OnboardingService {
    apiCatalog:any={
        ...this.allConfigDataService.getConfig('apiCatalog'),
        "breadCrumb": "Onboarding/OnboardingSteps/PanValidation",
        "environment": this.allConfigDataService.getConfig('environmentType'),
      }
      
    constructor(
        private allConfigDataService: AllConfigDataService
    ) {}
}