
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
@Injectable({
    providedIn: 'root'
  })

  export class IntroGuard implements CanLoad {
 
    constructor(private router: Router, private allConfigDataService:AllConfigDataService) { }
   
    async canLoad(): Promise<boolean> {
        const hasSeenIntro = this.allConfigDataService.getAppMode();
        if (hasSeenIntro) {
          return true;
        } else {
          this.router.navigateByUrl('/Dashboard', { replaceUrl:true });
          return false;
        }
    }
  }