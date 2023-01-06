import { AllConfigDataService } from './all-config-data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})


export class getRates{
    private message=new BehaviorSubject({})
    goldSilverRates= this.message.asObservable()
    appEnviron: any;
    breadCrumb: any;
    apiCatalog:any
    // interval: NodeJS.Timeout;


    constructor(
        private loaderService:LoaderService,
        private http:HttpClient,
        private allConfigDataService:AllConfigDataService
    ){
        this.apiCatalog={
            ...this.allConfigDataService.getConfig('apiCatalog'),

        };
        this.appEnviron =this.allConfigDataService.getConfig('environmentType');
        this.breadCrumb='Shopping/Wealth/DG'

    }
    

    
    setGoldSilverRates(){
        console.log("sett");
        this.myfunc()
        // this.interval=setInterval(() => {
        //     this.myfunc()
        // }, 300*1000);
    }
    myfunc(){
        this.loaderService.showLoader()
        this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getDigiGoldRate,{}).subscribe(
           async (res:any) => {
                this.message.next(res)
                this.loaderService.hideLoader()
            }
            )
    }
    
}