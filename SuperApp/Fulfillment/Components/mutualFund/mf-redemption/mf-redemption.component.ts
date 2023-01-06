import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EventEmitter, Input, Output} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { urlFetch } from 'projects/core/src/lib/enums/comman.enum';
import { CommonFunctionService } from 'index';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { MFServiceService } from 'projects/core/src/lib/services/mfservice.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-mf-redemption',
  templateUrl: './mf-redemption.component.html',
  styleUrls: ['./mf-redemption.component.scss'],
})
export class MfRedemptionComponent implements OnInit {
  imageList:any;
  x:any;
  SelectedCard:any;
  currentTypeSIP: any = 'sip';
  currentTypeOrder:any = 'amount';
  policyCheckBox: boolean;
  showError1:any = false;
  showError2:any = false;
  setedAmount:any=null;
  setedUnits:any=null;
  redeemAll:any;
  availableAmount:any;
  // @Input() DummayAPiData:any;
  availableUnit:any;
  termTrue: boolean;
  SuccesReedem: boolean;
  ConvertpopUp: boolean = false
  btnTypeAll: any
  msgpop: any = false
  popUp: any = false;
  errorList: any;
  constructor(private loaderService:LoaderService,private MFService:MFServiceService,private http:HttpClient, private commonService:CommonService,private commonFunctionService: CommonFunctionService, public modalCtrl: ModalController,private router: Router) { }

  ngOnInit() {
    // this.x=dummyInvestnowData.Mfcard
    this.imageList=this.router.getCurrentNavigation().extras.state.imageList;
    // this.DummayAPiData = this.router.getCurrentNavigation().extras.state.DummayAPiData;
    this.SelectedCard = this.router.getCurrentNavigation().extras.state.SelectedCard;
    this.availableAmount = this.router.getCurrentNavigation().extras.state.availableAmount;
    this.x = this.router.getCurrentNavigation().extras.state.x;
    this.availableUnit = this.SelectedCard.totalunits;
  }

  // segmentChanged(val){
  //   this.currentTypeOrder = val.detail.value
  // }

  segmentChanged(e) {
    this.setedUnits=0;
    this.setedAmount=0;

    console.log(e)
    this.currentTypeOrder = e.detail.value
  }

  checkboxClick(e) {
    this.policyCheckBox = !this.policyCheckBox
  }

  clickDisclaimerURL() {
    this.commonFunctionService.inAppBrowser(urlFetch.disclaimerURL);
  }
  clickTncUrl() {
    this.commonFunctionService.inAppBrowser(urlFetch.tncURL);
  }
  dismissInvest() {
    // this.modalCtrl.dismiss()
    window.history.back();
  }
  changeUnits(){
    this.setedUnits=(this.setedAmount/this.SelectedCard.nav).toFixed(3)
  }
  changeAmount(){
    this.setedAmount=(this.setedUnits*this.SelectedCard.nav).toFixed(2)
  }
  redeemAllFunction(){
    if(this.redeemAll){
      this.setedAmount=this.availableAmount
    this.setedUnits=this.availableUnit
    this.showError1=false
    this.showError2=false
    }
    else{
      this.showError1=false
    this.showError2=false
      this.availableAmount=this.setedAmount
      this.availableUnit=this.setedUnits
    this.setedUnits=0
    this.setedAmount=0

    }

  }

  // RedeemNowAmount(){
  //   this.payWithRazor1(1000,"data")
  // }



OpenSuccesPage() {
  this.router.navigate(['/Fullfilment/MutualFunds/RedeemConfirmation'],{
    state:{
      imageList:this.imageList,
      // title1:this.x[0].title1,
      // title2:this.x[0].title2,
      SelectedCard:this.SelectedCard,
      CurrentValueFund:this.setedAmount,
    }
  })
  // if(this.setedAmount && this.setedUnits){
  // let eventEmitter = new EventEmitter();
  // eventEmitter.subscribe((res)=>{
  //   console.log(res);
  // })
  // const modal = await this.modalCtrl.create({
  //   component:RedeemConfirmationComponent,
  //   componentProps:{
  //     'imageList':this.imageList,
  //     "title1":this.x[0].title1,
  //     "title2":this.x[0].title2,
  //     "SelectedCard":this.SelectedCard,
  //     "CurrentValueFund":this.setedAmount
  //   },
  //   backdropDismiss:false
  // });
  // modal.onDidDismiss().then((data) => {
  //   if(data.data=="1"){
  //     setTimeout(() => {
  //       this.modalCtrl.dismiss("1");

  //     });
  //      }
  // })
  // return await modal.present();
// }
}
NotAllowUnit(e){
  this.setedAmount=(e.target.value*this.SelectedCard.nav).toFixed(2)
  if(Number(e.target.value)>Number(this.availableUnit)){
    this.showError2=true
  }else{
    this.showError2=false
  }
}
NotAllowAmount(e){
  this.setedUnits=(this.setedAmount/this.SelectedCard.nav).toFixed(3)
  console.log(e.target.value,this.availableAmount)
  if(Number(e.target.value) > Number(this.availableAmount)){
    this.showError1=true;

  }else{
    this.showError1=false;

  }

}
term(e){
  if(!e.target.checked){
    this.termTrue=true;
  }else{
    this.termTrue=false;

  }

}

convert() {
  this.ConvertpopUp = true;
  this.popUp = true
}

hidePopUp() {
  this.popUp = false
  this.msgpop = false
}

hidemsgpop() {
  this.msgpop = false
}
GetReedem(){
  // let Amount=parseFloat(this.setedAmount).toFixed(1);
  // String(this.SelectedCard.planId)
  console.log(this.SelectedCard);
  this.OpenSuccesPage()

let data = {
  // "CustGuId": localStorage.getItem('CustGuId'),
  "CustGuId": "CAA68E39-D39D-415F-881A-1071BC049527",
  "OfferingGuId": "cb451d72-6c97-4b53-8342-b1c8d04e1511",
  "TransType": "Lumpsum",
  "transactionCode": "REDEEM",
  "plan_id": this.SelectedCard.planId.toString(),
  // "orderValue": Amount,
  "folioNumber": this.SelectedCard.foliono,
  "schemeCode": this.SelectedCard.schemeCode,
  "quantity": "10",
  "allRedeem": this.redeemAll?"Y":"N"
}

// this.getReedemStatus(data)
}
getReedemStatus(obj) {
  // this.loaderService.showLoader();
  if(!this.showError1 && !this.showError2){
  this.MFService.GetReedem(obj).subscribe((data) => {
    this.loaderService.hideLoader();
    if (data && data?.Status==1) {
      // this.OpenSuccesPage()
    } else {
      // this.errorShow(data?.Message, "MutualFundReedemStatus -> status");
    }
  }, (error: any) => {
    // this.errorShow(error?.Message, "MutualFundReedemStatus -> Http request");
  })
}
}


errorShow(message, functionName) {
  this.loaderService.hideLoader();
  this.commonFunctionService.showErrorsService(this.errorList?.error, 'Pan card component -> ' + functionName, message, this.errorList?.okText);
}
}
