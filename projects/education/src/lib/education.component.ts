import { Component, Input, OnInit } from '@angular/core';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { EducationCategoryDashboardComponent } from './component/education-category-dashboard/education-category-dashboard.component';
@Component({
  selector: 'lib-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit {
  userFirstName:any;
  @Input() imageList:any;
  @Input() errorList:any;
  @Input() educationData:any;
  @Input() currentMoneySymbols:any;
  loginData:any;
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no'
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only
    toolbar : 'yes', //iOS only
    enableViewportScale : 'no', //iOS only
    allowInlineMediaPlayback : 'no',//iOS only
    presentationstyle : 'pagesheet',//iOS only
    fullscreen : 'yes',//Windows only
};
  currentFetcherModule: any;
  educationListData: any;
  constructor(private commonFunctionService:CommonFunctionService, private commonService:CommonService,private theInAppBrowser: InAppBrowser,public modalController: ModalController,private loaderService:LoaderService) { }
  ngOnInit() {
    this.commonService.getUserDetail().subscribe((data:any)=>{
      if(data){
        this.userFirstName = this.commonFunctionService.titleCaseWord(data?.FirstName?data?.FirstName:'user');
      }
    })

    this.commonService.getOfferListData().subscribe((data:any)=>{
      // console.log("getOfferListData",data)
      if(data && data?.OfferList && data?.OfferList.length > 0){
        this.currentFetcherModule = data.OfferList.filter(x => x?.Offering == "Education")
      }
    })
  }
  redirectTCardDetails(e){
    // console.log("education",e)
    // let target = "_self"; //CordovaBrowser
    // // let target = "_system"; //system browser
    // // let target = "_blank"; //InAppBrowser
    // let url = "http://lmsuat.torusprimero.com/course/index.php?categoryid=4"
    // this.theInAppBrowser.create(url,target,this.options);
    let reqParam = {
      "OfferingGuId": this.currentFetcherModule[0]?.OfferingGuId,
      "CategoryType":e.CategoryType
    }
    this.ProductList(reqParam,e.Title)
  }

  async openEducationCategoryList(title){
    //console.log("this.healthData",this.healthData)
      this.loaderService.showLoader();
      const modal = await this.modalController.create({
        component: EducationCategoryDashboardComponent,
        cssClass: 'h-100 w-100 modal-fullscreen',
        componentProps: {
          'imageList':this.imageList,
          'currentMoneySymbols':this.currentMoneySymbols,
          'educationListData':this.educationListData,
          'showOtherText':'true',
          'title':title,
          'otherTextName':title
        },
        backdropDismiss:false
      });
      modal.onDidDismiss()
      .then((data) => {
        // if(data.data != 'Education'){
        //   this.commonService.setProductData({productDetails:data,currentModule:'Education'});
        //   // this.router.navigate(['/ProductDetails']);
        // } 
        if(data && data?.data){
          this.commonService.setProductData({productDetails:data,currentModule:'Education'});
          //this.router.navigate(['/ProductDetails']);
        }
      });
      this.loaderService.hideLoader();
      return await modal.present();
  }

  ProductList(reqParams,title){
    //this.loaderService.showLoader();
    this.commonService.getHealthProductList(reqParams).subscribe((data: any) => {
      // console.log("getHealthProductList",data)
      if (data && data?.Status) {
       // this.loaderService.hideLoader();
        this.educationListData = data;
        this.openEducationCategoryList(title)
      }else{
        this.errorShow(data?.Message,"GetOfferingDocList -> status");
      }
    },(error:any)=>{
      this.errorShow(error?.Message,"GetOfferingDocList -> Http request");
    })
  }

  errorShow(message, functionName){
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error,'Mutual fund page -> '+functionName,message,this.errorList?.okText);
  }
}
