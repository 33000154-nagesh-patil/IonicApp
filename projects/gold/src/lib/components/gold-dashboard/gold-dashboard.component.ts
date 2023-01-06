import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
// import { BuySellComponent } from 'projects/gold-investment-details/components/buy-sell/buy-sell.component';
// import { KycGoldComponent } from 'projects/gold-investment-details/components/kyc-gold/kyc-gold.component';
// import { PaymentConfirmationComponent } from 'projects/gold-investment-details/components/payment-confirmation/payment-confirmation.component';
// import { OrderDetailsComponent } from 'projects/gold-investment-details/components/order-details/order-details.component';
// import { OrdersComponent } from 'projects/gold-investment-details/components/orders/orders.component';
import { GoldService } from '../../gold.service';
@Component({
  selector: 'lib-gold-dashboard',
  templateUrl: './gold-dashboard.component.html',
  styleUrls: ['./gold-dashboard.component.scss'],
})
export class GoldDashboardComponent implements OnInit {
  @Input() imageList:any;
  @Input() errorList:any;
  @Input() currentMoneySymbols:any;
  @Input() goldData:any;
  @Input() silverData:any;
  @Input() goldSilverData:any;
  @Input() currentDigiDataOrderList:any;
  @Output() setDigiType = new EventEmitter();
  isKYCCompleted:any = false;
  loginCustomerGuId:any;
  listOfKYC:any;
  currentFetcherModule:any;
  currentProductData:any;
  currentLocalData:any;
  constructor(private commonService:CommonService,public modalController: ModalController,private loaderService:LoaderService,private commonFunctionService:CommonFunctionService, private goldService:GoldService) { }

  ngOnInit() {
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

    this.commonService.getOfferListData().subscribe((data:any)=>{
      // console.log("getFetchParentModule",data)
      if(data && data?.OfferList && data?.OfferList.length > 0){
        let localCurrentModule = data.OfferList.filter(x => x?.Offering == this.currentProductData?.currentModule);
        if(localCurrentModule && localCurrentModule.length >0){
          this.currentFetcherModule = localCurrentModule[0]
        }

      }
    })

    this.commonService.getGetOfferingDocList().subscribe((data:any)=>{
      // console.log("getGetOfferingDocList",data)
      if(data && data?.length > 0){
        this.listOfKYC = data;
        let localKYCObject =data.filter(x =>(x?.Offering == this.currentProductData?.currentModule && x?.IsCompleted == 'False'));
        // console.log("kycobj")
        if(localKYCObject && localKYCObject.length == 0){
          this.isKYCCompleted = true
        }
      }
    })
    this.loginCustomerGuId = localStorage.getItem('CustGuId')
    if(!this.loginCustomerGuId){
      this.commonService.getCustomerGuID().subscribe((data:any)=>{
        if(data){
          this.loginCustomerGuId = data;
        }
      })
    }
  }
  gotoGoldDetailPage(type){
    this.goldService.goldSilverData = this.goldSilverData;
    this.setDigiType.emit(type)
  }
  redirectTCardDetails(e){
   this.investGold(e)
  }
  investGold(e){
    // console.log("iskyc")
    this.currentLocalData = e
    if(this.isKYCCompleted){
      this.openOrderPopup(e);
    }else{
      this.openKYCModal();
    }
    //this.openPaymentPopUp({ 'currentAmount':'1000','currentData':{'Title':'AugMont Digital Gold','Date':new Date(),'Units':'0.21','TotalPrice':'4632','TransactionType':'Buy','TransactionID':'A-hm-Fh-347892','GSTPrice':'3'}})
  }

  async openOrderPopup(e){
    // this.loaderService.showLoader();
    // const modal = await this.modalController.create({
    //   component: BuySellComponent,
    //   componentProps: {
    //     'currentData':e,
    //     'imageList':this.imageList,
    //     'currentCountry':this.currentMoneySymbols,
    //     'errorList':this.errorList,
    //     'type':'buy',
    //     'paymentWay':'direct',
    //     "listIdData":{'CustGuId':this.loginCustomerGuId,'currentModuleData':this.currentFetcherModule}
    //   },
    //   backdropDismiss:false
    // });
    // modal.onDidDismiss()
    // .then((data) => {
    //   if(data && data?.data){
    //     this.openPaymentPopUp(data?.data)
    //   }
    // });
    // this.loaderService.hideLoader();
    // return await modal.present();
  }

  async openKYCModal(){
    // this.loaderService.showLoader();
    // const modal = await this.modalController.create({
    //   component: KycGoldComponent,
    //   componentProps: {
    //     'panCardKYC':this.getCurrentKYCData("PAN"),
    //     'bankKYC':this.getCurrentKYCData("Cheque"),
    //     'imageList':this.imageList,
    //     'errorList':this.errorList,
    //     'currentModuleType':this.currentFetcherModule,
    //     'loginCustomerGuId':this.loginCustomerGuId
    //   },
    //   backdropDismiss:false
    // });
    // modal.onDidDismiss()
    // .then((data) => {
    //   if(data && data?.data){
    //     this.openOrderPopup(this.currentLocalData);
    //   }
    // });
    // this.loaderService.hideLoader();
    // return await modal.present();
  }
  async openPaymentPopUp(data){
    // this.loaderService.showLoader();
    // const modal = await this.modalController.create({
    //   component: PaymentConfirmationComponent,
    //   componentProps: {
    //     'transactionData':data,
    //     'imageList':this.imageList,
    //     'currentCountry':this.currentMoneySymbols,
    //     'errorList':this.errorList,
    //   },
    //   backdropDismiss:false
    // });
    // modal.onDidDismiss()
    // .then((data) => {
    //   // console.log("orderlist")
    //   if(data && data?.data){
    //     this.openOrderList();
    //   }
    // });
    // this.loaderService.hideLoader();
    // return await modal.present();
  }
  async openOrderList(){
    // this.loaderService.showLoader();
    // const modal = await this.modalController.create({
    //   component: OrdersComponent,
    //   componentProps: {
    //     'orderList':this.currentDigiDataOrderList,
    //     'imageList':this.imageList,
    //     'currentCountry':this.currentMoneySymbols,
    //     'errorList':this.errorList,
    //   },
    //   backdropDismiss:false
    // });
    // modal.onDidDismiss()
    // .then((data) => {
    //   if(data && data?.data){
    //   }
    // });
    // this.loaderService.hideLoader();
    // return await modal.present();
  }
  getCurrentKYCData(type){
    return this.listOfKYC?this.listOfKYC.filter(x => x?.Document == type):[]
  }
  errorShow(message, functionName){
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error,'gold investment page -> '+functionName,message,this.errorList?.okText);
  }
}
