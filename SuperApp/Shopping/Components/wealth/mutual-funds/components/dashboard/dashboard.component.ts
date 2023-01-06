import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { MFServiceService } from 'projects/core/src/lib/services/mfservice.service';
import { NetworkService } from 'projects/core/src/lib/services/network.service';
import { ToastService } from 'projects/core/src/lib/services/toast.service';
import { stepperData } from 'SuperApp/Common/interfaces/common.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

   imageList:any;
   fundList:any;
   currentMoneySymbols:any;
   errorList:any;
  stepData: any;
  kycComplete:any = true;
  investMentStatus:any = true;
  currentNativeNetwork:any;
  isCordovaStatus:any;
  title:any="Start Investing"
  Build: any = false;
  currentWindowNetwork:any;
  DummayTitle: any;
  DummayAPiData: any;
  notificationCount:any = 0;
  cartCount:any = 0;
  textName:any;
  labelIcon:any;
  currentMode:any=1;
  mfFooterData:any;
  fundListData:any;
  currentLanguage:any
  stepperData:any;
  loginCustGuId:any;
  currentFetcherModule:any;

  constructor(private allConfigDataService:AllConfigDataService,private commonFunctionService:CommonFunctionService,private loaderService:LoaderService,private mfservice:MFServiceService,private http:HttpClient,private commonService:CommonService,private modalCtrl:ModalController , private router:Router,private networkService:NetworkService,private toastService:ToastService) { }
  loggedInModal:boolean=false
  ErrorMsg:any;

  ngOnInit() {
    this.mfFooterData = this.allConfigDataService.getConfig('mfTab');
    this.imageList = this.allConfigDataService.getConfig('images');
    this.currentMoneySymbols = this.allConfigDataService.getConfig('listCodeCountry')[this.allConfigDataService.getConfig('currentAppInitialized')];
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
    this.commonService.getCustomerGuID().subscribe((data:any)=>{
      if(data){
        this.loginCustGuId = data;
      }
    })
    this.commonService.getOfferListData().subscribe((data:any)=>{
      if(data && data?.OfferList && data?.OfferList.length > 0){
        this.currentFetcherModule = data.OfferList.filter(x => x?.Offering == "MF")
        if( this.currentFetcherModule){
        }
      }
    })
    this.collectionExpo();
    if(this.currentFetcherModule){
    let reqParams = {
      "CustGuId": this.loginCustGuId,
      "OfferingGuId": this.currentFetcherModule[0]?.OfferingGuId
    }
    if(reqParams){
      // console.log(reqParams)
      this.getStepperData(reqParams);
      this.collectionMF(reqParams);
    }
    }
    this.networkService.onNetworkChange().subscribe((data:any)=>{
      this.currentNativeNetwork = data;
    })

    this.networkService.getCordovaStatus().subscribe((data)=>{
      this.isCordovaStatus = data;
    })
    this.networkService.updateNetworkStatusbrowserchange().subscribe((data)=>{
      this.currentWindowNetwork = data;
    })
    // this.InvesmentDone()
    // this.OrderStatus()s
      localStorage.setItem("FirstUser","0");


    if(localStorage.getItem("FirstUser")=='0'){
      this.title="Start Investing"
      if((localStorage.getItem("FirstUser")=='0') && (localStorage.getItem("First")=='0')){
        this.title="You are few steps away from investing"
      }
      localStorage.setItem("First","0")

  }

}
InvesmentDone(){
  let params = {
    "CustGuId": localStorage.getItem("CustGuId"),
  }
  this.mfservice.checkInvestment(params).subscribe((data:any) => {
    if (data && data.Status=='1') {
      this.title="Build Your Portfolio"
      this.Build=true
      this.kycComplete=true
      this.investMentStatus= true;

    } else {
      // this.errorShow(data?.Message, "processPANPostData -> status");
    }
  }, (error: any) => {
    // this.errorShow(error?.Message, "processPANPostData -> Http request");
  })

}
OrderStatus(){
  let params = {
    "CustGuId": localStorage.getItem("CustGuId"),
  }
  this.mfservice.getBuyStatus(params).subscribe((data:any) => {
    if (data && data.Status=='1') {
      this.kycComplete=true
    } else {
      // this.errorShow(data?.Message, "processPANPostData -> status");
    }
  }, (error: any) => {
    // this.errorShow(error?.Message, "processPANPostData -> Http request");
  })
}
errorShow(message, functionName) {
  this.loaderService.hideLoader();
  this.commonFunctionService.showErrorsService(this.errorList?.error, null, message, this.errorList?.okText);
}
successModalClose(){
  this.loggedInModal=false
}
reDirectToProduct(data){
  if(this.isCordovaStatus){
    this.nativeNetwork(data);
  }else{
    this.windowNetwork(data);
  }

}

nativeNetwork(e){
  if(this.currentNativeNetwork){
      this.sendMFData(e);
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
    this.sendMFData(e)
  }else{
    this.ErrorMsg=this.errorList?.networkError
this.loggedInModal = true
setTimeout(() => {
  this.loggedInModal = false;
}, 3000);
  }
}

sendMFData(data){
  this.commonService.setProductData({productDetails:data,currentModule:'Mutual Fund'});
  this.router.navigate(['/ProductDetails']);
}
StarInvesting(){
  this.router.navigate(['/Invest']);
}

async getCol(date,segment) {
  this.router.navigate(['Shopping/Wealth/MutualFunds/category'],  { state: {  imageList:this.imageList,headerName:segment,  } });
}
collectionMF(reqParams) {
  this.commonService.getGoldSilverProductList(reqParams).subscribe((data:any)=>{
    if(data){
      this.fundListData = data;
    }else{
      // this.errorShow("MF Data","collectionMF -> data status")
    }

  },
  (error:any)=>{
    // this.errorShow(error,"collectionMF -> Http response")
  }
  )
}

collectionExpo(){
  this.commonService.getDummyData().subscribe((data:any)=>{
    if(data){
      this.fundListData = data['exploreFund']
    }else{
      // this.errorShow("Expo Fund Data","collectionExpo -> data status")
    }

  },
  (error:any)=>{
    // this.errorShow(error,"collectionExpo -> Http response")
  }
  )
}

getStepperData(reqParams){
this.loaderService.showLoader();
this.commonService.getOfferingDocList(reqParams).subscribe((data: stepperData) => {
  if (data && data?.Status) {
    this.loaderService.hideLoader();
    this.commonService.setGetOfferingDocList(data.DocumentList)
    this.stepperData = data.DocumentList;
  }else{
    // this.errorShow(data?.Message,"GetOfferingDocList -> status");
  }
},(error:any)=>{
  // this.errorShow(error?.Message,"GetOfferingDocList -> Http request");
})
}


}
