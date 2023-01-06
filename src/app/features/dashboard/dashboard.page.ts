import { Component, OnInit } from '@angular/core';
import { AllConfigDataService } from 'index';
import { CommonFunctionService } from 'index';
import { Router } from '@angular/router';
import { NetworkService } from 'index';
import { Location } from '@angular/common';
import { CommonService } from 'index';
import { LoaderService } from 'index';
import {offerList, userProfileDetail} from 'index';
import { AlertService } from 'projects/core/src/lib/services/alert.service';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  title:any;
  imageList: any;
  notificationCount:any = 0;
  cartCount:any = 0;
  textName:any;
  labelIcon:any;
  currentMode:any=0;
  wellnessFooterData:any;
  currentNativeNetwork:any;
  currentWindowNetwork:any;
  isCordovaStatus:any;
  currentLanguage:any;
  errorList:any;
  custGuId:any;
  loggedInModal:boolean=false
  ErrorMsg:any;

  constructor(private allConfigDataService:AllConfigDataService, private loaderService:LoaderService, private commonService:CommonService, private _location: Location, private commonFunctionService:CommonFunctionService, private router:Router,private networkService:NetworkService, private alertService:AlertService,private platform: Platform) {
      this.exitConditions();
    }

  ngOnInit() {
    this.title = 'dashboard';
    this.imageList = this.allConfigDataService.getConfig('images');
    this.wellnessFooterData = this.allConfigDataService.getConfig('wellnessTab');
    this.currentLanguage = this.allConfigDataService.getCurrentLanguage();
    if(this.currentLanguage){
      let allErrorList = this.allConfigDataService.getConfig('errorList');
      if(allErrorList){
        this.errorList = allErrorList[this.currentLanguage];
      }

    }
    this.allConfigDataService.appMode.subscribe((data)=>{
      this.currentMode = data;
    })
    this.networkService.onNetworkChange().subscribe((data:any)=>{
      this.currentNativeNetwork = data;
    })

    this.networkService.getCordovaStatus().subscribe((data)=>{
      this.isCordovaStatus = data;
    })
    this.networkService.updateNetworkStatusbrowserchange().subscribe((data)=>{
      this.currentWindowNetwork = data;
    })

    this.commonService.getCustomerGuID().subscribe((data:any)=>{
      if(data){
        this.custGuId = data;
      }
      else{
        // this.custGuId = localStorage.getItem('CustGuId');
        this.custGuId = "AEBAAB09-0690-40AC-8667-741182BE35C0";
        this.commonService.setCustomerGuID(this.custGuId);
      }
    })

    this.collectionOfDashboardData();

  }
  successModalClose(){
    this.loggedInModal=false
  }

exitConditions(){
  this.platform.backButton.subscribeWithPriority(10, async (processNextHandler) => {
      if (this._location.isCurrentPathEqualTo('/Dashboard')) {

        this.alertService.showExitConfirm('Do you want to close the app?');
      } else {
        this._location.back();
      }
    });
}

collectionOfDashboardData(){
  if(this.isCordovaStatus){
    this.nativeNetworkDashboard();
  }else{
    this.windowNetworkDashboard();
  }
}

nativeNetworkDashboard(){
  if (this.currentNativeNetwork) {
    this.getOfferList();
  } else {
    this.ErrorMsg=this.errorList?.networkError
  this.loggedInModal = true
  setTimeout(() => {
    this.loggedInModal = false;
  }, 3000);
  }
}
windowNetworkDashboard(){
  if (this.currentWindowNetwork) {
    this.getOfferList();
  } else {
    this.ErrorMsg=this.errorList?.networkError
  this.loggedInModal = true
  setTimeout(() => {
    this.loggedInModal = false;
  }, 3000);
  }
}
getOfferList(){
  //this.loaderService.showLoader();
    this.commonService.getOfferList().subscribe((data: offerList) => {
      if (data && data?.Status) {
        //this.loaderService.hideLoader();
        // this.getPanStatus.emit('bank')
        // console.log(JSON.stringify(data));
        this.commonService.setOfferListData(data);
      }else{
        this.errorShow(data?.Message,"getOfferListData -> status");
      }
    },(error:any)=>{
      this.errorShow(error?.Message,"getOfferListData -> Http request");
    })
}


  reDirectPage(e){
    if(e){
      if(this.isCordovaStatus){
        this.nativeNetwork(e);
      }else{
        this.windowNetwork(e);
      }
    }

  }

  nativeNetwork(e){
    if(this.currentNativeNetwork){
        this.sendToAnotherPage(e);
    }else{
      this.ErrorMsg=this.errorList?.networkError
  this.loggedInModal = true
  setTimeout(() => {
    this.loggedInModal = false;
  }, 3000);
    }
  }

  windowNetwork(e){
    if(this.currentWindowNetwork){
      this.sendToAnotherPage(e)
    }else{
      this.ErrorMsg=this.errorList?.networkError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
    }
  }
  sendToAnotherPage(e){
    this.router.navigate(['/'+e]);
  }
  errorShow(message, functionName){
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error,'Dashboard component -> '+functionName,message,this.errorList?.okText);
  }

}
