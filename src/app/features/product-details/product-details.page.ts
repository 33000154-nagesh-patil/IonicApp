import { Component, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
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
  backURL:any;
  constructor(private allConfigDataService:AllConfigDataService,private commonService:CommonService, private commonFunctionService:CommonFunctionService, private loaderService:LoaderService) { }

  ngOnInit() {

    this.title = 'productDetails';
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
    this.productList()
  }
  productList(){
    this.loaderService.showLoader();
    this.commonService.getProductData().subscribe((data:any)=>{
      this.loaderService.hideLoader();
      // console.log("getProductData",data)
      if(data){
        this.currentProductData = data;
        this.backURL = data?.currentModule.replace(/ /g,'');
        if(data?.currentModule == 'Health'){
          this.collectionOfferListData(data?.currentModule,data?.productDetails?.data?.Id,data?.currentModule);
          //this.collectionOfDetails(data?.productDetails?.data?.Id)
        }

      }else{
        this.errorShow("Product List ","productList -> data status")
      }

    },
    (error:any)=>{
     this.errorShow(error,"productList -> Http response")
    }
    )
  }
  collectionOfDetails(offerId,id,type){
      let localObj ={
        "OfferingGuId":offerId,
        "ProductId":id
      }
      if(localObj){
        // console.log("localObj",localObj)
        this.commonService.getHealthProductDetails(localObj).subscribe((data:any)=>{
          // console.log("getHealthProductDetails",data)
          if(data){
            this.currentProductData = {productDetails:data.Result[0],currentModule:type};
          }else{
            this.errorShow("Product List ","productList -> data status")
          }
        },(error:any)=>{
          this.errorShow(error,"productList -> Http response")
         }
        )
      }
  }

  collectionOfferListData(mode,id,type){
    this.commonService.getOfferListData().subscribe((data:any)=>{
      if(data && data?.OfferList && data?.OfferList.length > 0){
        let currentFetcherModule = data.OfferList.filter(x => x?.Offering == mode)
        if( currentFetcherModule){
          this.collectionOfDetails(currentFetcherModule[0]?.OfferingGuId,id,type)
        }
      }
    })
  }
  errorShow(message, functionName){
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error,'product detail page -> '+functionName,message,this.errorList?.okText);
  }
}
