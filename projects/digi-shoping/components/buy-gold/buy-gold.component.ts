import { retry } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { BankDetailsComponent } from 'projects/core/src/lib/components/bank-details/bank-details.component';
import { bankDetails } from './../../../core/src/lib/interfaces/common.interface';
import { PanCardComponent } from 'projects/core/src/lib/components/pan-card/pan-card.component';
import { OrderSummeryComponent } from './../order-summery/order-summery.component';
import { Component, OnInit } from '@angular/core';
import { EventEmitter, Input, Output} from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'projects/core/src/lib/services/toast.service';
import { CommonService } from 'projects/core/src/lib/services/common.service'
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { PaymentConfirmationComponent } from '../payment-confirmation/payment-confirmation.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'lib-buy-gold',
  templateUrl: './buy-gold.component.html',
  styleUrls: ['./buy-gold.component.scss'],
})
export class BuyGoldComponent implements OnInit {
  @Input() imageList:any;
  @Input() _type:any;
  @Input() commodity:any;
  @Input() metalType:any
  @Input() tabSegment:any;
  @Input() availableToSell:any;
  @Input() totalInvestmentAmount:any;
  @Input() totalgrams:any;
  @Input() stopWatch:any=true
  @Input() clientCode:any;
  @Output() thisBack = new EventEmitter();
  pop:any=false
  offeringGuId:any
  param:any
  minsellError:any
  bankId:any
  txnId:any
  bankdataerrorpopup:any=false;
  tansectionNumber:any
  enablebtn:any=true;
  setedAmount:any=null;
  setedGrams:any=null;
  ProductWeight:number;
  productAmount:number;
  currencyList:any
  currencySymbol:any
  showError:any = false;
  moreThanError:any=false
  nextStep:any=false;
  nextStep1:any=false
  price: any;
  currentTypeOrder:any="grams"
  showGramsError:any = false;
  minutes: number = 4;
  leftTimeResendOTP: number = 59;
  avalablegram:any;
  avalableAmount:any
  value:any
  amount:any;
  gst:any
  finalamount:any
  blockid:any
  bankAcc:any
  bankName:any
  data1:any
  grandTotal: any;
  GoldSilverData: any=[];
  currentCountry: any;
  errorList: any;
  rates: any;
  maxamountmsg:any=false
  minamountmsg:any=false
  appEnviron: any;
  breadCrumb: any;
  apiCatalog:any

  constructor(private AllConfigDataService:AllConfigDataService ,private toastService:ToastService,private http:HttpClient,
    private modalCtrl:ModalController,private renderer: Renderer2,private commonService:CommonService,
    private commonFunctionService:CommonFunctionService,private loaderService:LoaderService)
     {
      this.apiCatalog={
        ...this.AllConfigDataService.getConfig('apiCatalog'),

    };
    this.appEnviron =this.AllConfigDataService.getConfig('environmentType');
    this.breadCrumb='Shopping/Wealth/DG'

     }

  ngOnInit() {

    this.currencyList = this.AllConfigDataService.getConfig('listCodeCountry')
  this.currencySymbol = this.currencyList['IND']['currencySymbol']

    this.loaderService.showLoader();
      // let param = ;

      // console.log(param);


    this.avalablegram=this.totalgrams;
    this.avalableAmount=this.totalInvestmentAmount
  console.log(this.metalType);

console.log(this.data1);
// if(this.data1['buy']==null)this.loaderService.showLoader()
this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getDigiGoldRate,{}).pipe(retry(3)).subscribe(async (res:any) => {
  // if(res.status!=200) this.ngOnInit()
  this.loaderService.hideLoader();
  this.data1=await res.result.data.rates
  this.blockid = await res.result?.data.blockId
  console.log(this.blockid+"sdfsdfsdfgsdfgfsdgsdfgfdgfdgdfsgfdgdfs")
  if(this.metalType=='gold'){

        this.data1=await res.result.data.rates
        if(this._type=='buy')this.price =(this.data1.gBuy)
        if(this._type=='sell')this.price =(this.data1.gSell)
        this.loaderService.hideLoader()
      }
      if(this.metalType =='silver'){
        this.data1=await res.result.data.rates
        if(this._type=='buy')this.price =(this.data1.sBuy)
        if(this._type=='sell')this.price =(this.data1.sSell)
        this.loaderService.hideLoader()
      }

  // if(res.productListGoldSilver) this.loderservices.hideLoader()
});





    console.log(this.commodity);
    if(this.metalType == 'gold') {
      console.log(this.price)
    //  debugger
    }
    else{
      this.price = parseFloat(this.data1?.buy);
      // debugger

    }
  this.imageList=this.AllConfigDataService.getConfig("images")


  this.getTime();
  this.getBankDetails();

  }

  getBankDetails(){


 this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getBankDetails,{}).pipe(retry(3)).subscribe(async (res:any) => {
          // if(res.message!= "No results"){
          this.loaderService.hideLoader();
          this.bankId=  res.result[0].userBankId
          this.bankAcc=res.result[0].accountNumber
          this.bankName=res.result[0].accountName
          // console.log(this.bankId);
          // this.enableContinueButton = false;
          // this.enablebtn = true;
          // debugger;
          // }else{
          //   this.enableContinueButton = true;
          //   this.enablebtn = true;
          //   // debugger;
          // }
          if(res.message=='No results'){
            // this.bankdataerrorpopup=true
          }

        })
  }
  checkBank(){
    if(!this.bankId)this.getBankDetails()
  }
  openPop(){
    if(!this.bankId)this.getBankDetails()
    this.pop=!this.pop
  }
  enablebutton(){
    if(this.bankId){
      this.enablebtn=false;
    }
    else if(this.bankId == undefined){
      this.pop = false;
      this.bankdataerrorpopup=true
      this.enablebtn = true;
    }
    // debugger;
  }

  backToSellPage(){
    this.bankdataerrorpopup=false;
    this.getBankDetails();
  }



  numberOnly(event): boolean {

    const reg = /^-?\d*(\.\d{0,4})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
        event.preventDefault();
    }
    const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode != 46 && charCode > 31
            && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;



  }
  truncateToDecimals(num, dec = 4) {
    const calcDec = Math.pow(10, dec);
    return Math.trunc(num * calcDec) / calcDec;
  }


  checkMoreThenSelectGram(event){

    event= parseFloat(event)
    if( event>this.avalablegram ){
     this.moreThanError=true
    }
    else{
      this.moreThanError=false
    }
  }

  checkMoreThenSelectAmount(event){
    event= parseFloat(event)

    if( event>this.avalableAmount){

     this.moreThanError=true
    }

    else{
      this.moreThanError=false
      this.minsellError=false
    }




  }
   checkMoreThenLimit(event){

      if( event>200000  ){
       this.maxamountmsg=true;

      }
      else{
        this.maxamountmsg=false
      }
      if( event<1  ){
        this.minamountmsg=true
        this.minsellError=true

       }
       else{
         this.minamountmsg =false
         this.minsellError=false
       }

    }






calGramToAmount(event){
  if(!this.bankId)this.getBankDetails()
  // event.target.value = event.target.value.replace(/\,/g,'');
  let curr =null;
  curr = event.target.value;
  this.setedGrams = event.target.value
  let amount:any
  amount= parseFloat((this.price*curr).toFixed(2))
  if(amount==0){
  this.setedAmount=null
}
this.setedAmount=amount;
 this.finalamount=parseFloat(this.setedAmount).toFixed(2)
 console.log(typeof this.finalamount,'ghfcizsghfsdgfsgsxdhgvxfgvsxdfgzxdfjkxdzhfgxjidhskdjhgdgsdgxfjh')
 this.gst=((this.setedAmount*3)/100).toFixed(2)
console.log(typeof this.gst,'sdgfyusdfgfgfgfgyhgfasdgfhsdgfsgfdgfasgdhgaghdgasghdgasfhg')
this.grandTotal=(parseFloat(this.finalamount)+parseFloat(this.gst)).toFixed(2)
this.setedAmount = this.setedAmount.toString();
this.checkMoreThenSelectGram(curr)
this.checkMoreThenLimit(this.setedAmount);
}
  calAmountToGram(event){
    if(!this.bankId)this.getBankDetails()
    this.checkMoreThenLimit(event.target.value)

    event.target.value = event.target.value.replace(/\,/g,'');

    let curr =null;
    if(this._type == 'buy'){
      console.log('hihihihihihhihihihiihih')
      curr = (event.target.value - ((event.target.value/(100+3))*3)).toFixed(2)
    }
    if(this._type == 'sell'){
      console.log('rarararararararararararar');

      curr = parseFloat(event.target.value).toFixed(2)
      console.log(curr,'gagagagagagagagagagag');

    }
    this.finalamount=curr
    console.log(curr);
    this.gst=((event.target.value/(100+3))*3).toFixed(2)
    this.grandTotal=event.target.value
    this.setedAmount = event.target.value;



    let gram:any;
    gram = this.truncateToDecimals((this.finalamount/this.price))
    if(gram==0){
        this.setedGrams=null
      }
       this.setedGrams =gram;
      //  this.setedAmount=parseInt(curr);

       this.checkMoreThenSelectAmount(curr)


  }


  segmentChanged(val){
    this.currentTypeOrder = val.detail.value
   this.setedAmount=null
   this.setedGrams=null

  }

  setAmount(amount:number){
    if(!this.bankId)this.getBankDetails()
    if(this.setedGrams=="") this.setedGrams = 0;
    if(this.setedAmount=="") this.setedAmount = 0;
    if(this.setedAmount==null) this.setedAmount = 0;
    if(this.setedGrams==null) this.setedGrams = 0;
    let numAmount =parseFloat(this.setedAmount);
    this.setedAmount= numAmount+amount;
    let num:number = parseFloat(((this.setedAmount-(this.setedAmount/(103))*3)/this.price).toFixed(4));
    console.log(this.setedAmount,this.price,(this.setedAmount-(this.setedAmount/(103))*3),(this.setedAmount-(this.setedAmount/(103))*3)/this.price,"sandeep")

    this.finalamount=(this.setedAmount-(this.setedAmount/(100+3))*3).toFixed(2)
    this.gst=((this.setedAmount/(100+3))*3).toFixed(2)

    let numGram = parseFloat(this.setedGrams)
    this.setedGrams= numGram+num;
    this.setedGrams = parseFloat(this.setedGrams).toFixed(4)



    this.grandTotal=this.setedAmount.toFixed(2)
    this.setedAmount= this.setedAmount.toFixed(2);

    this.checkMoreThenSelectAmount(numAmount+amount)
    this.checkMoreThenLimit(numAmount+amount)

  }

  setGram(gram: number){
    if(!this.bankId)this.getBankDetails()
    if(this.setedGrams=="") this.setedGrams = 0;
    if(this.setedAmount=="") this.setedAmount = 0;
    if(this.setedAmount==null) this.setedAmount = 0;
    if(this.setedGrams==null) this.setedGrams = 0;
  let num:number = gram*this.price;
  let numAmount = parseFloat(this.setedAmount);
  let numGram = parseFloat(this.setedGrams);
  this.setedAmount=numAmount+num;
  this.finalamount=this.setedAmount
  this.gst=((this.setedAmount*3)/100)
  this.grandTotal=(this.setedAmount+this.gst).toFixed(2)
  this.setedAmount= this.setedAmount.toFixed(2)
  this.setedGrams=(numGram+gram).toFixed(4)
this.checkMoreThenSelectGram(numGram+gram)
this.checkMoreThenLimit(this.setedAmount)

  }

  getTime(){

    let set = setInterval(() => {
      this.leftTimeResendOTP--;
      if(this.leftTimeResendOTP <=0){
        this.leftTimeResendOTP=59
        this.minutes--;
      }
      if(this.minutes <0){

        this.minutes=4
        // this.loaderService.showLoader()
        this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getDigiGoldRate,{}).pipe(retry(3)).subscribe(async (res:any) => {
          if(this.metalType=='gold'){
            this.data1=await res.result?.data.rates
            this.blockid = await res.result?.data.blockId

            if(this._type=='buy')this.price =(this.data1.gBuy);
            if(this._type=='sell')this.price=(this.data1.gSell)

          }


          if(this.metalType=='silver'){

            this.data1=await res.result?.data.rates

            this.blockid = await res.result?.data.blockId
            if(this._type=='buy')this.price =(this.data1.sBuy);
            if(this._type=='sell')this.price=(this.data1.sSell)
          }
          console.log(res);
          // if(res.productListGoldSilver) this.loaderService.hideLoader()
        });
      }

    }, 1000)
  }
  checkbox(e){
this.nextStep = ! this.nextStep

  }
  async navigateToCart() {
    let commodity='gold';
    if(this.data1.title=='Augmont Digital Silver') commodity='silver'
 this.modalCtrl.dismiss()
    const modal = await this.modalCtrl.create({
      // component: CoursecategoryComponent,

      component: OrderSummeryComponent,
      componentProps: {
        'currentTypeOrder':this.currentTypeOrder,
        'imageList': this.imageList,
        'amount': this.finalamount,
        'commodity':commodity,
        'weightOfCommodity':this.setedGrams,
        'gst':this.gst,
        'method':this.getTime(),
        'time':this.minutes+":"+this.leftTimeResendOTP,
        'grandTotal':this.grandTotal,
        'rates':this.rates,
        'lockPrice':this.price,
        'metalType':this.metalType,
        'blockId': this.blockid,
        'clientCode': this.clientCode
      },
      backdropDismiss: false
    })
    modal.onDidDismiss().then((data) => {
      console.log(data)

    })
    return await modal.present()
  }

 sellDigiGold(){
    // debugger;
    this.loaderService.showLoader();
    let param={
      // "custGuId": "30091CE8-6D8E-439B-8950-041570FA6CF0",
      "custGuId":"A87FC5D3-0E54-4029-A8B6-CDCC321025AC",
      "transactionType": "Sell",
      "uniqueId": "TOR5729152",
      "mobileNumber": "9930455859",
      "lockPrice": this.price,
      "blockId": this.blockid,
      "metalType": this.metalType,
      "amount":this.finalamount,
      "quantity": this.setedGrams,
      "userBank": {
          "userBankId":  this.bankId,
          "accountNumber": null,
          "accountName": null,
          "ifscCode": ""
      },
      "paymentBankType": "UserBank"
  }
  this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.sellDigiGold,param).subscribe(async (data:any) => {
      if(data && data?.message?.split(" ")[0] == "Successfully") {
        console.log("update", data);
       this.tansectionNumber = data.result.data.transactionId;
        this.loaderService.hideLoader();
      } else {
        this.errorShow(data?.Message, "sellDigiGold -> status");
      }
  // console.log(res,"SuccesFull")

  console.log("transactionId", data.result.data.transactionId)

  console.log("this.tansectionNumber",this.tansectionNumber)

})
  // await this.tansectionNumber;
  }

  errorShow(message, functionName) {
    // this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, 'container-view page -> ' + functionName, message, this.errorList?.okText);
  }



async openPaymentPopUp() {
  if (this.currentTypeOrder === 'grams') {
     this.param={
      // "custGuId": "30091CE8-6D8E-439B-8950-041570FA6CF0",
      "custGuId":"A87FC5D3-0E54-4029-A8B6-CDCC321025AC",
      "transactionType": "Sell",
      "uniqueId": "TOR5729152",
      "mobileNumber": "9930455859",
      "lockPrice": this.price,
      "blockId": this.blockid,
      "metalType": this.metalType,
      "quantity": this.setedGrams,

      "userBank": {
          "userBankId":  this.bankId,
          "accountNumber": null,
          "accountName": null,
          "ifscCode": ""
      },
      "paymentBankType": "UserBank"
  }

  }
  if (this.currentTypeOrder === 'amount') {
     this.param={
      // "custGuId": "30091CE8-6D8E-439B-8950-041570FA6CF0",
      "custGuId":"A87FC5D3-0E54-4029-A8B6-CDCC321025AC",
      "transactionType": "Sell",
      "uniqueId": "TOR5729152",
      "mobileNumber": "9930455859",
      "lockPrice": this.price,
      "blockId": this.blockid,
      "metalType": this.metalType,
      "amount":this.finalamount,
      "userBank": {
          "userBankId":  this.bankId,
          "accountNumber": null,
          "accountName": null,
          "ifscCode": ""
      },
      "paymentBankType": "UserBank"
  }
  }
  // this.sellDigiGold()

//   let param={
//     // "custGuId": "30091CE8-6D8E-439B-8950-041570FA6CF0",
//     "custGuId":localStorage.getItem('CustGuId'),
//     "transactionType": "Sell",
//     "uniqueId": localStorage.getItem('ClientCode'),
//     "mobileNumber": localStorage.getItem('SocialClientId'),
//     "lockPrice": this.price,
//     "blockId": this.blockid,
//     "metalType": this.metalType,
//     "quantity": this.setedGrams,
//     "amount":this.finalamount,
//     "userBank": {
//         "userBankId":  this.bankId,
//         "accountNumber": null,
//         "accountName": null,
//         "ifscCode": ""
//     },
//     "paymentBankType": "UserBank"
// }

console.log(this.param);
this.loaderService.showLoader()
this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.sellDigiGold,this.param).subscribe(async (data:any) => {
      if(await data && data?.message?.split(" ")[0] == "Successfully"){
        console.log("update", data);

        // this.openPaymentPopUp(this.successData);
       this.tansectionNumber = data.result.data.transactionId;
        this.loaderService.hideLoader();
        this.sellFUNCTION()
        this.gotoNotification(data.message)
      }else {
        this.loaderService.hideLoader();
        this.errorShow(data?.Message, "openPaymentPopUp -> status")

      }
      this.loaderService.hideLoader();
  console.log("transactionId", data.result.data.transactionId)
  console.log("this.tansectionNumber",this.tansectionNumber)
})
// debugger;

//  console.log("this.sellDigiGold()----------------",this.sellDigiGold());
  // debugger;

  }

  gotoNotification(description){

    if(this.metalType=="gold"){
      this.offeringGuId = 'A12E68A9-DA42-40C7-8156-20160DC31A72'
    }
    else{
      this.offeringGuId = '4AA4E455-3A20-4030-8A3E-1BBADF7261CA'
    }

    let param={
      "CustGuId":"A87FC5D3-0E54-4029-A8B6-CDCC321025AC",
      "NotificationTitle":"order confirm",
      "NotificationDescription":description,
      "OfferingGuId":this.offeringGuId,
      "NotificationType":"Success"
    }

    this.http.post('https://apixuat.heytorus.com/api/v1/Call/Engagement/Notifications/Mapost/insertNotifications',param).subscribe((data:any)=>{
      console.log('data');
    })

  }


  async sellFUNCTION(){
    let title;
    if(this.metalType=='gold')title='Augmont Digital Gold';
    if(this.metalType=='silver')title='Augmont Digital Silver';
    console.log("this.tansectionNumber",this.tansectionNumber)
    let successData={
      'Title': title,
      'rate':this.price,
      'totalAmount': this.setedAmount,
      'TransactionType':'sell',
      'quantity':this.setedGrams,
      'Date':new Date(),
      'transactionId': this.tansectionNumber,
      'type':this.metalType

    }
    // debugger;
    console.log(successData,'successData');

      this.modalCtrl.dismiss()
      const modal = await this.modalCtrl.create({
        component: PaymentConfirmationComponent,

        componentProps: {
          'transactionData': successData,
          'imageList': this.imageList,
          'currentCountry': this.currentCountry,
          'errorList': this.errorList,
        },


        backdropDismiss: false
      });

      console.log(modal);
      modal.onDidDismiss()
        .then((data) => {
          if (data && data?.data) {
            // this.openOrderList();
          }
        });
      // this.loaderService.hideLoader();
      return await modal.present();
  }


  async back1()
  {
    this.modalCtrl.dismiss("data")
  }








}


// async bankdetails() {
//   // this.loaderService.showLoader();
//   const modal = await this.modalCtrl.create({
//     component: BankDetailsComponent,
//     componentProps: {

//     },
//     backdropDismiss: false
//   });
//   modal.onDidDismiss()
//     .then((data) => {
//       if (data && data?.data) {
//         console.log("Save data");
//         if (data) {

//         }
//       }
//     });
//   // this.loaderService.hideLoader();
//   return await modal.present();
// }




















// line-64

// back(){
  //   this.thisBack.emit(false);
  // }
    // data=[
    //   {
    //     currentUserGoldGrams:'0.180',
    //     currentUserGoldamount:'900.00',
    //     currentUserSilverGrams:'0.190',
    //     currentUserSilveramount:'800.00',
    //     CurrentGoldPricePerGram:"4632.90",
    //     CurrentSilverPricePerGram:"4000.00"
    //   }
    // ]




   // postBankDeatails(){
  //   let param= {
  //     "uniqueId":localStorage.getItem('ClientCode')
  //   }

  //   this.http.post('http://uat.torusdigital.in:5000/api/v1/Post/Shopping/Wealth/fetchbankdetail',param).subscribe(async (res:any) => {

  //   console.log(res,'harey ram');
  //   this.bankAcc=res[0]?.accountNumber
  //   this.bankName=res[0]?.bankName
  //   console.log(this.bankAcc+this.bankName+"nitin bhai")


  //   })

  // }








