import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AllConfigDataService } from './../../services/all-config-data.service';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-succesfully-Onboard',
    templateUrl: './succesfully-Onboard.component.html',
    styleUrls: ['./succesfully-Onboard.component.scss'],
  })
  export class thankYouPage implements OnInit {
    customerPanName:any
    imageList:any
    appName:any="Aqube"
    constructor(private allConfigDataService:AllConfigDataService,private http:HttpClient,private router:Router){

    }
    ngOnInit(): void {
        this.imageList = this.allConfigDataService.getConfig('images');
        
    }
    ExploreApp(){
      this.router.navigate(['/Dashboard']);
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