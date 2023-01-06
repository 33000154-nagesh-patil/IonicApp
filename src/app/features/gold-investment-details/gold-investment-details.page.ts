import { Component, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { GoldService } from 'projects/gold/src/public-api';
@Component({
  selector: 'app-gold-investment-details',
  templateUrl: './gold-investment-details.page.html',
  styleUrls: ['./gold-investment-details.page.scss'],
})
export class GoldInvestmentDetailsPage implements OnInit {
  title:any;
  imageList: any;
  notificationCount:any = 0;
  cartCount:any = 0;
  textName:any;
  currentUserName:any;
  labelIcon:any;
  currentMode:any=1;
  currentLanguage:any;
  errorList:any;
  currentProductData:any
  currentCountry:any;
  currentDigiType:any;
  currentDigiData:any;
  currentDigiDataOrderList:any;
  currentUserSilverData:any;
  currentUserGoldData:any;
  goldSilverData: any;
  constructor(private allConfigDataService:AllConfigDataService,private commonService:CommonService, private commonFunctionService:CommonFunctionService, private loaderService:LoaderService, private goldService:GoldService) { }

  ngOnInit() {

    this.title = 'investmentDetails';
    this.currentCountry = this.allConfigDataService.getConfig('listCodeCountry')[this.allConfigDataService.getConfig('currentAppInitialized')]
    this.imageList = this.allConfigDataService.getConfig('images');
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
    this.commonService.digiType.subscribe((data)=>{
      // console.log("data",data)
      this.currentDigiType = data;
    })
    if(this.goldSilverData){
      this.goldSilverData=this.goldSilverData.filter(x=>x.type==this.currentDigiType);
    }
    this.investmentData();
    this.productList();
  }
  productList(){
    this.loaderService.showLoader();
    this.commonService.getProductData().subscribe((data:any)=>{
      this.loaderService.hideLoader();
      // console.log("getProductData",data)
      if(data){
        this.currentProductData = data;
      }else{
        this.errorShow("Product List ","productList -> data status")
      }

    },
    (error:any)=>{
     this.errorShow(error,"productList -> Http response")
    }
    )
  }
  investmentData(){
    this.loaderService.showLoader();
    this.commonService.getDummyData().subscribe((data:any)=>{
      this.loaderService.hideLoader();
     // console.log("data['goldUserData']",data['goldUserData'])
      if(data){
        if(this.currentDigiType && this.currentDigiType == "silver"){
          this.currentDigiData = data['digiGold']["1"];
          this.currentDigiDataOrderList = data['orderList'];
          this.currentUserSilverData = data['goldUserData'];
          this.commonService.setProductData({productDetails:data['digiGold']["1"],currentModule:'Gold'});

        }else{
          this.currentDigiData = data['digiGold']["0"];
          this.currentDigiDataOrderList = data['orderList'];
          this.currentUserGoldData = data['goldUserData'];
          // console.log("this.currentUserGoldData",this.currentUserGoldData)
          this.commonService.setProductData({productDetails:data['digiGold']["0"],currentModule:'Gold'});

        }

      }else{
        this.errorShow("Investment List ","investmentData -> data status")
      }

    },
    (error:any)=>{
     this.errorShow(error,"investmentData -> Http response")
    })
  }
  errorShow(message, functionName){
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error,'gold investment page -> '+functionName,message,this.errorList?.okText);
  }
}
