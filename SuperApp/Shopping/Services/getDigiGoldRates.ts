import { AllConfigDataService } from 'index';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'index';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})


export class getDigiGoldRates{
    private message=new BehaviorSubject({})
    goldSilverRates= this.message.asObservable()
    digiAvailable = new BehaviorSubject({})
    transactionData= new BehaviorSubject({})
    blockId= new BehaviorSubject('')
    buyLockPrice= new BehaviorSubject({})
 

    appEnviron: any;
    breadCrumb: any;
    apiCatalog:any
    interval: any;
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
        this.interval=setInterval(() => {
            this.myfunc()
        }, 300*1000);
    }
    myfunc(){
        this.loaderService.showLoader()
        this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+"/getList",{}).subscribe(
           async (res:any) => {
                this.blockId.next(res.BlockId)
                this.buyLockPrice.next(res.card)
                this.message.next(res)
                this.loaderService.hideLoader()
            }
            ),(error)=>{
                this.loaderService.hideLoader()
            }
    }
    
}