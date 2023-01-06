import { Component, OnInit } from '@angular/core';
import { HttpHandler ,HttpHeaders,HttpClient} from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { MFServiceService } from 'projects/core/src/lib/services/mfservice.service';

@Component({
  selector: 'app-invest',
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.scss'],
})
export class InvestComponent implements OnInit {

   title:any="Invest";
   imageList:any
  notificationCount:any
  labelIcon:any
  cartCount:any
  currentMode:any=1;
  mfFooterData:any;
  jsonData:any;
  TopRatedData: any;
  DummayTitle: any;
  DummayAPiData: any;
  getWealthBuildarData: any;
  getSteadyInconeData:any
  getAnnualReturnData:any
  texSaverData: any;
  errorList: any;
  getSteadyInconetitle="Steady Income"
  TopRatedDataTitle="Top Rated Fund"
  texSaverTitle="Tax Savers"
  getNewFundtitle="New Fund Offers"
  getWealthBuildertitle="Wealth Builder"
  getAnnualReturntitle ="Annual Return Fund"





  


  constructor(private MFService:MFServiceService,private commonFunctionService:CommonFunctionService,private modalCtrl:ModalController,private allConfigDataService:AllConfigDataService,private http:HttpClient,private loaderService:LoaderService) { }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
    this.mfFooterData = this.allConfigDataService.getConfig('mfTab')
    // this.getTexSaver();
    // this.getNewFund();
    // this.getTopRated();
    // this.getWealthBuilder();
    // this.getSteadyIncone();
    // this.AnnualReturnfund();
    this.getDummayApi();
  }


  getTopRated(){
    let data={
      "CategoryName": "top rated fund"
  }
  
      this.getTopRated1(data)
  
}
getTopRated1(obj) {
  this.MFService.getAllMFListByCategory(obj).subscribe((data) => {
    if (data) {
      this.TopRatedData=data
    } else {
      this.errorShow(data?.Message, "AllMFList -> status");
    }
  }, (error: any) => {
    this.errorShow(error?.Message, "AllMFList -> Http request");
  })
}



getTexSaver(){
let data={
  "CategoryName": "tax saver"
}
this.getTexSaver1(data)
}
getTexSaver1(obj) {
  this.MFService.getAllMFListByCategory(obj).subscribe((data) => {
    if (data) {
  this.texSaverData=data
    } else {
      this.errorShow(data?.Message, "AllMFList -> status");
    }
  }, (error: any) => {
    this.errorShow(error?.Message, "AllMFList -> Http request");
  })
}

getNewFund(){
  let data={
    "CategoryName": "New Fund Offers"
  }
  this.getNewFund1(data)
}
getNewFund1(obj) {
  this.MFService.getAllMFListByCategory(obj).subscribe((data) => {
    if (data) {
      this.getNewFund=data
    } else {
      this.errorShow(data?.Message, "AllMFList -> status");
    }
  }, (error: any) => {
    this.errorShow(error?.Message, "AllMFList -> Http request");
  })
}
AnnualReturnfund(){
let data={
  "CategoryName": "Annual Return fund"
}
// this.AnnualReturnfund1(data)
}
AnnualReturnfund1(obj) {
  this.MFService.getAllMFListByCategory(obj).subscribe((data) => {
    if (data) {
     this.getAnnualReturnData=data
    } else {
      this.errorShow(data?.Message, "AllMFList -> status");
    }
  }, (error: any) => {
    // this.errorShow(error?.Message, "AllMFList -> Http request");
  })
}

getWealthBuilder(){

let data={
  "CategoryName": "Wealth Builder"
}
this.getWealthBuilder1(data)
}
getWealthBuilder1(obj) {
  this.MFService.getAllMFListByCategory(obj).subscribe((data) => {
    if (data) {
      this.getWealthBuildarData=data
    } else {
      this.errorShow(data?.Message, "AllMFList -> status");
    }
  }, (error: any) => {
    // this.errorShow(error?.Message, "AllMFList -> Http request");
  })
}
getSteadyIncone(){
let data={
  "CategoryName": "Steady Income"
}
this.getSteadyIncone1(data);
}
getSteadyIncone1(obj) {
  this.MFService.getAllMFListByCategory(obj).subscribe((data) => {
    if (data) {
      this.getSteadyInconeData=data
    } else {
      this.errorShow(data?.Message, "AllMFList -> status");
    }
  }, (error: any) => {
    this.errorShow(error?.Message, "AllMFList -> Http request");
  })
}

getDummayApi(){
  let data={
    "CFT":"Shopping",
    "Product":"MF",
    "FileName":"getCategoryList"
  }
this.http.post("https://apixuat.heytorus.com/api/v1/Dummy/get/generalApi",data).subscribe(
  (data: any) => {
    if(data){
      this.DummayTitle=data.ProductCategory
     this.DummayAPiData=data.ProductCategory[0].cList
    }

  }
)

}



async buyGold() {
    // const modal = await this.modalCtrl.create({
    //   component: MfRedemptionComponent,
    //   cssClass:"w-100 h-100",
    //   componentProps: {
    //     'imageList': this.imageList
    //   },
    //   backdropDismiss: false
    // })
    // modal.onDidDismiss()
    // .then((data) => {
    //   // console.log(data)
    // })
    // return await modal.present()
  }


  
 

  errorShow(message, functionName) {
    this.commonFunctionService.showErrorsService(this.errorList?.error, 'Pan card component -> ' + functionName, message, this.errorList?.okText);
  }

}
