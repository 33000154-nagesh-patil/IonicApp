import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { stepperData } from 'projects/core/src/lib/interfaces/common.interface';
@Component({
  selector: 'app-health',
  templateUrl: './health.page.html',
  styleUrls: ['./health.page.scss'],
})
export class HealthPage implements OnInit {
  title: any;
  otherTextName: any;
  imageList: any;
  notificationCount: any = 0;
  cartCount: any = 0;
  textName: any;
  labelIcon: any;
  currentMode: any=1;
  wellnessFooterData: any;
  currentMoneySymbols: any;
  currentLanguage: any;
  errorList: any;
  healthData: any;
  currentFetcherModule: any;
  loginCustGuId: any;
  healthDataStepper: any;
  healthCategory: any;
  // eslint-disable-next-line max-len
  constructor(private allConfigDataService: AllConfigDataService, private commonFunctionService: CommonFunctionService, private commonService: CommonService,private loaderService: LoaderService) { }

  ngOnInit() {
    this.title = 'health';
    this.imageList = this.allConfigDataService.getConfig('images');
    this.wellnessFooterData = this.allConfigDataService.getConfig('wellnessTab');
    this.currentLanguage = this.allConfigDataService.getCurrentLanguage();
    if(this.currentLanguage){
      const allErrorList = this.allConfigDataService.getConfig('errorList');
      if(allErrorList){
        this.errorList = allErrorList[this.currentLanguage];
      }

    }
    this.allConfigDataService.appMode.subscribe((data)=>{
      this.currentMode = data;
      // console.log("healthPage", this.currentMode)
    });
    this.commonService.getCustomerGuID().subscribe((data: any)=>{
      if(data){
        this.loginCustGuId = data;
      }
    });
    this.commonService.getOfferListData().subscribe((data: any)=>{
      // console.log("getOfferListData",data)
      if(data && data?.OfferList && data?.OfferList.length > 0){
        this.currentFetcherModule = data.OfferList.filter(x => x?.Offering === 'Health');
        if( this.currentFetcherModule){
          // console.log(" this.currentFetcherModule", this.currentFetcherModule)
        }
      }
    });
    if(this.currentFetcherModule){
      const reqParams = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        CustGuId: this.loginCustGuId,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        OfferingGuId: this.currentFetcherModule[0]?.OfferingGuId
      };
      const healthProductList = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        OfferingGuId: this.currentFetcherModule[0]?.OfferingGuId
      };
      if(reqParams){
        // console.log(reqParams)
        this.collectionOfHealthDataStepper(reqParams);
      }
      if(healthProductList){
        this.healthProductList(healthProductList);
      }
    }

    this.collectionOfHealthData();
  }
  collectionOfHealthData(){
   this.loaderService.showLoader();
   this.commonService.getDummyData().subscribe((data: any)=>{
     this.loaderService.hideLoader();
     if(data){
       //this.healthData = data['exploreFund'];
       this.healthCategory = data.healthCategory;
     }else{
       this.errorShow('Expo Fund Data','collectionExpo -> data status');
     }

   },
   (error: any)=>{
     this.errorShow(error,'collectionExpo -> Http response');
   }
   );
}
healthProductList(reqParams){
  // this.loaderService.showLoader();
  this.commonService.getHealthProductList(reqParams).subscribe((data: stepperData) => {
    // console.log("getHealthProductList",data)
    // this.loaderService.hideLoader();
    if (data && data?.Status) {
     
      this.healthData = data;
    }else{
      // this.errorShow(data?.Message,'GetOfferingDocList -> status');

    }
  },
  // (error: any)=>{
  //   this.errorShow(error?.Message,'GetOfferingDocList -> Http request');
  // }
  );

}
  collectionOfHealthDataStepper(reqParams){
    // this.loaderService.showLoader();
    this.commonService.getOfferingDocList(reqParams).subscribe((data: stepperData) => {
      // console.log("health",data)
      if (data && data?.Status) {
        // this.loaderService.hideLoader();
        this.commonService.setGetOfferingDocList(data.DocumentList);
        this.healthDataStepper = data.DocumentList;
      }else{
        // this.errorShow(data?.Message,'GetOfferingDocList -> status');
      }});
    // },(error: any)=>{
    //   this.errorShow(error?.Message,'GetOfferingDocList -> Http request');
    // });
  }

  errorShow(message, functionName){
    // this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error,'Mutual fund page -> '+functionName,message,this.errorList?.okText);
  }
}
