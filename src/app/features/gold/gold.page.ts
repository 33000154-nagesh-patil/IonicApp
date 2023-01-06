import { Component, Input, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { stepperData } from 'projects/core/src/lib/interfaces/common.interface';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-gold',
  templateUrl: './gold.page.html',
  styleUrls: ['./gold.page.scss'],
})
export class GoldPage implements OnInit {
  title:any;
  imageList: any;
  notificationCount:any = 0;
  cartCount:any = 0;
  textName:any;
  labelIcon:any;
  currentMode:any=1;
  goldFooterData:any;
  errorList:any;
  currentLanguage:any
  currentMoneySymbols:any;
  investmentStatus:any=false;
  goldSilverData:any;
  currentFetcherModule:any;
  loginCustGuId:any;
  stepperData:any;
  goldDataList:any;
  SilverDataList:any;
  currentFetcherModuleSilver:any;
  stepperDataSilver:any;
  currentDigiDataOrderList:any;
  subscription: Subscription;
  constructor(private allConfigDataService:AllConfigDataService, private commonFunctionService:CommonFunctionService, private commonService:CommonService, private loaderService:LoaderService) { }

  ngOnInit() {
    this.title = 'gold';
    this.imageList = this.allConfigDataService.getConfig('images');
    this.goldFooterData = this.allConfigDataService.getConfig('mfTab');
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
        this.currentFetcherModule = data.OfferList.filter(x => x?.Offering == "Gold");
        if( this.currentFetcherModule){
          // console.log("gold", this.currentFetcherModule)
        }
        this.currentFetcherModuleSilver = data.OfferList.filter(x => x?.Offering == "Silver")
        if( this.currentFetcherModuleSilver){
          // console.log("silver", this.currentFetcherModuleSilver)
        }
      }
    })
    if(this.currentFetcherModule){
      let reqParams = {
        "CustGuId": this.loginCustGuId,
        "OfferingGuId": this.currentFetcherModule[0]?.OfferingGuId
      }

      if(reqParams){
        // console.log(reqParams)
        this.getStepperData(reqParams);
      }

      var reqParamsGold = {
        "OfferingGuId": this.currentFetcherModule[0]?.OfferingGuId
      }
      var reqParamsSilver = {
        "OfferingGuId": this.currentFetcherModuleSilver[0]?.OfferingGuId
      }
      if(reqParamsGold){
        this.collectionOfGoldList(reqParamsGold)

      }
      if(reqParamsSilver){
        this.collectionOfSilverList(reqParamsSilver);
      }
    }

    this.collectionGold();
    const source = interval(300000); //300000
    this.subscription = source.subscribe(val => {
      this.collectionOfGoldList(reqParamsGold)
      this.collectionOfSilverList(reqParamsSilver);
    } );
  }

  collectionGold(){
    this.loaderService.showLoader();
    this.commonService.getDummyData().subscribe((data:any)=>{
      this.loaderService.hideLoader();
      if(data){
        this.goldSilverData = data['digiGold'];
        this.goldSilverData[0].Price.Buy=this.goldDataList?.Result[0]?.Price['0']?.Buy;
        this.goldSilverData[1].Price.Buy=this.SilverDataList?.Result[0]?.Price['0']?.Buy;
        this.goldSilverData[0].blockId = this.goldDataList?.Result[0]?.Props.BlockId;
        this.goldSilverData[1].blockId = this.SilverDataList?.Result[0]?.Props.BlockId;
        this.currentDigiDataOrderList = data['orderList']
      }else{
        this.errorShow("Gold Data","collectionGold -> data status")
      }

    },
    (error:any)=>{
      this.errorShow(error,"collectionGold -> Http response")
    }
    )
  }
  collectionOfGoldList(obj){
    //this.loaderService.showLoader();
    this.commonService.getGoldSilverProductList(obj).subscribe((data:any)=>{
      // console.log("goldData",data)
      //this.loaderService.hideLoader();
      if(data){
        this.goldDataList = data
        this.collectionGold();
      }else{
        this.errorShow("Gold Data","collectionGold -> data status")
      }

    },
    (error:any)=>{
      this.errorShow(error,"collectionGold -> Http response")
    }
    )
  }
  collectionOfSilverList(obj){
    //this.loaderService.showLoader();
    this.commonService.getGoldSilverProductList(obj).subscribe((data:any)=>{
      // console.log("SilverData",data)
      //this.loaderService.hideLoader();
      if(data){
        this.SilverDataList = data
      }else{
        this.errorShow("Gold Data","collectionGold -> data status")
      }

    },
    (error:any)=>{
      this.errorShow(error,"collectionGold -> Http response")
    }
    )
  }
  getStepperData(reqParams){
   // this.loaderService.showLoader();
    this.commonService.getOfferingDocList(reqParams).subscribe((data: stepperData) => {
      if (data && data?.Status) {
       // this.loaderService.hideLoader();
        this.commonService.setGetOfferingDocList(data.DocumentList)
        this.stepperData = data.DocumentList;
      }else{
        this.errorShow(data?.Message,"GetOfferingDocList -> status");
      }
    },(error:any)=>{
      this.errorShow(error?.Message,"GetOfferingDocList -> Http request");
    })
  }
  errorShow(message, functionName){
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error,'gold page -> '+functionName,message,this.errorList?.okText);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
