import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AllConfigDataService } from '../../../projects/core/src/lib/services/all-config-data.service';
@Injectable()
export class DefaultRouteGuard implements CanActivate {
    isLoggedIn = false;
    constructor(
      private router: Router,
      private allConfigDataService: AllConfigDataService
    ){

    }

    canActivate(): boolean {
        let routePath = '';
        let routeType = 0;
        if (this.isLoggedIn) {
            routeType = this.allConfigDataService.getConfig('sMode');
            // console.log("routeType",routeType)
            if(routeType){
                routePath = '/rms/SuperDashBoard'
            }else{
                routePath = '/rms/DashBoard'
            }
            
          } else {
            routePath = '/rms/SignUp';
          }
      
          if (routePath) {
              // console.log("routePath",routePath)
              // console.log("this.router",this.router)
            this.router.navigate([routePath]);
          } else {
            return true;
          }
    }
}