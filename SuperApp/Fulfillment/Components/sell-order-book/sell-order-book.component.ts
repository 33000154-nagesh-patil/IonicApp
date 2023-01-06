import { DigiGoldBottomCardComponent } from './../../../Shopping/Components/order-book/components/digiGoldBottomCard/digiGoldBottomCard.component';
import { StockOrderPadComponent } from './../../../Shopping/Components/order-book/stockOrderPad/stockOrderPad.component';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { Component, OnInit } from '@angular/core';
// import { AllConfigDataService } from 'index';
// import { LoaderService } from 'index';
// import { eduService } from 'SuperApp/Shopping/Services/edu.service';
// import * as jsonDigi from "./digi.json"
// @Component({
//   selector: 'app-sell-order-book',
//   templateUrl: './sell-order-book.component.html',
//   styleUrls: ['./sell-order-book.component.scss'],
// })
// export class SellOrderBookComponent implements OnInit {
//   imageList = this.allConfigDataService.getConfig('images'  )
//   cartCount
//   title="orderBook"
//   availableQuantity: any=12;
//   displayAvailable:any;
//   pricePerUnit: any=5000;
//   sellData:any
//   MFConfirmation:any
//   currentSegment:any;
//   jsonData:any=jsonDigi
//   displayResult:any;
//   ConfirmtionValue: any;
//   constructor(
//     private allConfigDataService:AllConfigDataService,
//     private router:Router,
//     private http:HttpClient,
//     private eduService:eduService,
//     private LoaderService:LoaderService
//   ) { 
//     this.pricePerUnit=this.jsonData.pricePerUnit;
//     this.availableQuantity=this.jsonData.availableQuantity;
//     this.ConfirmtionValue={
//       heading:"Confirmation",
//       confirmationTitle:"You've sold Gold",
//       payment:"",
//       description:"",
//       actionButton:"My Vault",
//       redirect:"Vault",
//       card:{
//           "description": "",
//           "sub_heading": "Augmont Digital Gold",
//           "image": "",
//           "row": [{
//             "Grams":this.currentSegment=='quantity'?this.myInput:this.displayResult,
//             "Amount":this.currentSegment=='quantity'?this.displayResult:this.myInput
//           },
//           {
//             "Transaction Type": "Sell",
//             "Transaction ID":"A-Hm-FH347-FGHK-347928"
//           }
//           ]

//       }
//   }
//   this.MFConfirmation={
//     heading:"Confirmation",
//     confirmationTitle:"You've sold Gold",
//     payment:"",
//     description:"",
//     actionButton:"My Vault",
//     redirect:"Vault",
//     card:{
//         "description": "",
//         "sub_heading": "Augmont Digital Gold",
//         "image": "",
//         "row": [{
//           "Grams":this.currentSegment=='quantity'?this.myInput:this.displayResult,
//           "Amount":this.currentSegment=='quantity'?this.displayResult:this.myInput
//         },
//         {
//           "Transaction Type": "Sell",
//           "Transaction ID":"A-Hm-FH347-FGHK-347928"
//         }
//         ]

//     }
// }
//   }
//   disableButton=false;
//   myInput;
//   apiCatalog: any = {
//     ...this.allConfigDataService.getConfig('apiCatalog'),
//     "environment": this.allConfigDataService.getConfig('environmentType'),
//     "breadCrumb":"Shopping/Wealth/DG"
//   };
//   ngOnInit() {
//     this.sellData = this.router.getCurrentNavigation().extras.state.sellData;
//   this.availableQuantity=this.sellData["Grams"]
//   this.pricePerUnit=this.sellData["Invested Amount"]
//     this.currentSegment=this.jsonData.segments[0].value;
//     if(this.currentSegment=='quantity')this.displayAvailable=this.availableQuantity;
//     else if(this.currentSegment=='amount'){
//       this.displayAvailable=this.pricePerUnit*this.availableQuantity;
//       this.displayAvailable=this.displayAvailable.toFixed(2);
//     }
//   }
//   changeSegment(val){
//     if(this.currentSegment=='quantity')this.displayAvailable=this.availableQuantity;
//     else if(this.currentSegment=='amount'){
//       this.displayAvailable=this.pricePerUnit*this.availableQuantity;
//       this.displayAvailable=this.displayAvailable.toFixed(2);

//     }
//     this.keyInput()
//   }
//   numberOnly(val){

//   }
//   increment(){
//     if(this.myInput>=0)this.myInput++;
//     else this.myInput=0;
//     this.keyInput()
//   }
//   decrement(){
//     if(this.myInput>0){
//       this.myInput--;
//     }
//     this.keyInput();
//   }
//   keyInput(){
//     if(this.myInput==null||this.myInput==0)this.displayResult=0
//     if(this.myInput<=0||this.myInput==null){
//       this.disableButton=true;
//       return;
//     };
//     if(this.displayAvailable<this.myInput)this.disableButton=true;
//     else this.disableButton=false;
//     if(this.currentSegment=='quantity'){
//       this.displayResult=this.myInput*this.pricePerUnit;
//     }else{
//       this.displayResult=this.myInput/this.pricePerUnit;
//     }
//     this.displayResult=this.truncateToDecimals(this.displayResult)
//   }
//   buyNow(){
//     this.LoaderService.showLoader();
//     let param = {
//     "TokenId": localStorage.getItem('id_token'),
//     "ProductType": "digi gold",
//     "ItemName":"Augmount Digital Gold",
//     "ItemCode":productLanding,
//     "CategoryId": 3,
//     "Quantity": (this.currentSegment=='quantity')?this.myInput:this.displayResult,
//     "UnitPrice": this.pricePerUnit,
//     "Amount": (this.currentSegment=='quantity')?this.displayResult:this.myInput,
//     "TaxAmount": 0,
//     "TotalAmount": (this.currentSegment=='quantity')?this.displayResult:this.myInput,
//     "TaxDetails": "",
//     "Unit": 1,
//     "UnitType": 1,
//     "ReferenceItemId": "",
//     "DiscountDetails": "",
//     "DiscountAmount": 0,
//     "BuySell": "SELL",
//     "ReferenceOrderId": "",
//     "TransactionCode": "",
//     "TransactionNumber": "",
//     "GroupCode": 0,
//     "Currency": "INR",
//     "InvoiceId": "",
//     "OtherDetails": ""


//     "TokenId":localStorage.getItem('id_token'),
//     "MetalType": "gold",
//     "Quantity": (this.currentSegment=='quantity')?this.myInput.toString():this.displayResult.toString(),
//     "amount": (this.currentSegment=='amount')?this.myInput:this.displayResult
//     }
//     this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] +this.apiCatalog["breadCrumb"] + "/sellDigiGold",param)
//     .subscribe((data) => {
//     if(data){
//     this.router.navigate(['Operation/Confirmation'],{state:{ConfirmtionValue:this.ConfirmtionValue}});
//     this.LoaderService.hideLoader();
//     }
//     })
//     this.router.navigate(['Fullfilment/Confimation'],{state:{ConfirmtionValue:this.ConfirmtionValue}});
//   }
//   truncateToDecimals(num, dec = 4) {
//     const calcDec = Math.pow(10, dec);
//     return Math.trunc(num * calcDec) / calcDec;
//   }
// }


import { CommonService } from 'index';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AlertService } from 'projects/core/src/lib/services/alert.service';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { threadId } from 'worker_threads';
import { ThisReceiver } from '@angular/compiler';
import { profile } from 'console';

// import * as json from "./mfOrder.json"

@Component({
     selector: 'app-sell-order-book',
  templateUrl: './sell-order-book.component.html',
     styleUrls: ['./sell-order-book.component.scss'],
  })
export class SellOrderBookComponent implements OnInit {
  jsonData: any;
  imageList = this.allConfigDataService.getConfig('images')
  cartCount = 7
  totalAmount: any
  amountDisable: boolean
  @ViewChild('amountInput') amountInput: ElementRef;
  @ViewChild('quantityInput') quantityInput: ElementRef;
  unitPrice: any;
  quantityDisable: any;
  quantity: any = 1;
  checkbox: boolean = true;
  DatePicker: any;
  isPaused: any;
  seconds: any;
  minutes: any;
  timeSlot: any;
  currentSegment: any
  orderType: any = 'MKT';
  deliveryMode: any
  apiCatalog = this.allConfigDataService.getConfig('apiCatalog');
  appEnvironment = this.allConfigDataService.getConfig('environmentType')
  breadCrumb: string="Wealth/DG";
  productLanding: any;
  categoryLanding: any;
  otherDetails:any;
  content:any;
  profile:any;
  colorValue: number;
  selectedConsumer: any=0;
  selectedLocation: any=0;
  
  appClick(event){
    var modal = document.getElementById("myModal");
// window.onclick = function(event) {
  if (event.target == modal) {
    this.profile=false
  // }
}
  }
  setDelivery(val) {
    this.deliveryMode = val;
    this.otherDetails.deliveryMode = val;
  }
  async profileClicked(){
    
    

    const documentElement = document.documentElement;
      documentElement.style.setProperty("--hey", `${this.jsonData.Consumer.length}`);
      documentElement.style.setProperty("--world", `8%`);
      let eventEmitter = new EventEmitter();
      eventEmitter.subscribe(res => {
        this.selectedConsumer = res
        console.log(res);
        
      })
   const modal =await this.modalCtrl.create({
    componentProps:{
      jsonData:this.jsonData,
      selected:this.selectedConsumer,
      SelectedProfile:eventEmitter
    },
    cssClass:"backdrop",
    backdropDismiss: true,
    component:StockOrderPadComponent,
   });
   modal.onDidDismiss().then(() => {
    console.log(this.selectedConsumer);
    
   });
   return modal.present();
  }
  async locationClicked(){
    const documentElement = document.documentElement;
      documentElement.style.setProperty("--hey", `${this.jsonData.Consumer.length}`);
      documentElement.style.setProperty("--world", `15%`);

      let eventEmitter = new EventEmitter();
      eventEmitter.subscribe(res => {
        this.selectedLocation = res
        console.log(res);
        
      })
    const modal =await this.modalCtrl.create({
      componentProps:{
        jsonData:this.jsonData,
        selected:this.selectedLocation,
        selectedLocation:eventEmitter
      },
      cssClass:"backdrop",
      backdropDismiss: true,
      component:DigiGoldBottomCardComponent,
     });
     modal.onDidDismiss().then(() => {
     });
     return modal.present();
  }
  onDateChange(val) {
    // console.log(val.value.getDate()+ '-' + val.value.getMonth() + '-' + val.value.getFullYear());
    // console.log(this.DatePicker)
    this.DatePicker = val.value.getDate() + '-' + val.value.getMonth() + '-' + val.value.getFullYear()
  }
  onTimeChange(val) {
    console.log(val.detail.value);
  }
  getTime() {
    var timer = this.jsonData.Validity;

    if (timer > 0) {
      let set = setInterval(() => {
        if (!this.isPaused) {
          this.minutes = timer / 60;
          this.minutes = parseInt(this.minutes, 10);
          this.seconds = timer % 60;
          this.seconds = parseInt(this.seconds, 10);
          this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
          this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
          if (--timer < 0) {
            this.isPaused = true;
            clearInterval(set)
            this.callApi();
          }
        }
      }, 1000);
    }

  }
  setOrderType(val) {
    this.orderType = val
    this.otherDetails.orderType = val
  }

  // getLink(){
  //   this.router.navigate(['Onboarding/prerequisite'])
  // }

  getLink() {
    this.loaderService.showLoader();
    this.eduService.categoryValueForAPI.subscribe(val => {
      console.log(val,"qwertzxcv");
      this.apiCatalog['breadCrumb'] = "Onboarding/" + val["categoryLanding"] + "/" + val['productLanding']
    })

    let param= {
      "TokenId": localStorage.getItem('id_token')
      // offeringType: 'gold',
      // flag: 'Select'
    };

    // this.https.post("https://apixuat.heytorus.com/SuperApp/Onboarding/getAllStep",param).subscribe((response) => {
    this.http
      .post(
         
        this.apiCatalog.baseURL[this.appEnvironment]+
          this.apiCatalog.breadCrumb +
          this.apiCatalog.getAllStep,
        param
      )
      .subscribe((response: any) => {
        if (response.Status) {
          this.eduService.OnboardingStepList.next(response.data);
          this.loaderService.hideLoader();
          console.log(response,'done');
          for(let el of response.data ){
            if(el.status=='Y'){
              return this.router.navigate(['Onboarding'+el.pageUrl]);
            }
            // if(el.Status=='N')this.router.navigate(['Onboarding/customerDetail']);
            
          }
          // this.router.navigate(['Onboarding'+]);
        }else{
          this.loaderService.hideLoader();
          this.alertService.showAlert("Error","","Fail to render Steps","Ok")
        }
      },
      ()=>{
        this.loaderService.hideLoader();
      });
  }

  ngOnInit(): void {
    this.callApi()
    // this.getTime()
    this.eduService.categoryValueForAPI.subscribe((obj) => {
      // val["categoryLanding"] +"/"+ val["productLanding"]
      if(obj["categoryLanding"])this.breadCrumb = obj["categoryLanding"] + "/" + obj["productLanding"]
      // console.log("BreadCrumb: " + this.breadCrumb)

      this.productLanding = obj["productLanding"],
        this.categoryLanding = obj["categoryLanding"]
    });
    
    
  }
  async callApi() {
    let loading = this.loadingController.create({
      spinner: 'crescent',
      message: 'Loading Order Book  Please Wait...'
    });

    (await loading).present();
    this.http.post(this.apiCatalog.baseURL[this.appEnvironment] + "Operation/" + this.breadCrumb + "/getOrderBook", {})
      // this.http.get("assets/orderBook/host.json")
      .subscribe(async (res: any) => {
        res = JSON.parse(JSON.stringify(res).replace('â‚¹', '₹').toString());
        (await loading).dismiss();
        // this.jsonData=res.record
        this.jsonData = res
        this.jsonData.blockID="Eq3jGkPX"
        this.getTime()
        this.isPaused = false;
        this.unitPrice = this.jsonData.unitPrice
        this.keyQuantity()
        if (this.jsonData.editable == 'switch') {
          this.amountDisable = true;
          this.otherDetails.blockID="Eq3jGkPX";
        } else if (this.jsonData.editable == 'amtEdit') {
          this.amountDisable = true;
          // this.unitPrice='Mkt';
          this.totalAmount = "MKT";
          this.currentSegment = res?.exchange?.exchangeType.options[0].value;
          this.segmentChanged()
          this.setDelivery('I')
          this.setOrderType('MKT');
          this.otherDetails.afterMarketFlag=false;
          this.otherDetails.segment="E";
        } else if (this.jsonData.editable == 'qty') {
          this.amountDisable = true;
        } else if (this.jsonData.editable == 'none') {
          this.amountDisable = true;
          this.quantityDisable = true;
        }
        // this.DatePicker = this.jsonData.OtherDetails[0][1].value
        this.currentSegment = res?.exchange?.exchangeType.options[0].value;
      })

  }
  constructor(
    private allConfigDataService: AllConfigDataService,
    private loaderService: LoaderService,
    private alertCtrl: AlertController,
    private router: Router,
    private eduService: eduService,
    private http: HttpClient,
    private loadingController: LoadingController,
    private modalCtrl: ModalController,
    private alertService: AlertService,private commonService:CommonService
  ) { 

this.eduService.amountValue.subscribe((res:any)=>{
  this.totalAmount=res
})
    
  }

  // ionViewDidEnter(){
  //   this.totalAmount=this.commonService.getBillAmount()
  //   console.log(this.totalAmount,"");
  // }
  keyAmount() {
    if (this.jsonData.editable == 'switch') {
      let tax = parseFloat(this.jsonData.taxes[2].taxPercentage);
      this.quantity = ((this.totalAmount - ((this.totalAmount / (100 + 3)) * 3)) / this.unitPrice).toFixed(4)
    }
  }
  keyQuantity() {
    let tax = parseFloat(this.jsonData.taxes[2].taxPercentage);
    console.log(tax);
    if (this.totalAmount != "MKT") {
      this.totalAmount = this.calcAmount()

    }
  }
  calcAmount() {
    let tax = parseFloat(this.jsonData.taxes[2].taxPercentage);
    return ((this.quantity * parseFloat(this.unitPrice)) + (((this.quantity * parseFloat(this.unitPrice)) * tax) / 100)).toFixed(2);
  }
  switchDisable(val, name) {
    if (name == 'amount') {
      if (val == 'amtEdit') {
        this.quantityDisable = false;
        if (this.amountDisable) {
          this.amountDisable = false;
          this.unitPrice = this.jsonData.unitPrice;
          this.totalAmount = (this.jsonData.unitPrice * this.quantity).toFixed(2);
          this.orderType = 'LMT'
          this.focusPrice(this.amountInput.nativeElement)
        }
      } else if (val == 'switch') {
        this.amountDisable = false;
        this.quantityDisable = true;
        this.unitPrice = this.jsonData.unitPrice;
        this.focusPrice(this.amountInput.nativeElement)
      }
    } else if (name == 'quantity') {
      if (val == 'switch') {
        this.amountDisable = true;
        this.quantityDisable = false;
        this.focusPrice(this.quantityInput.nativeElement)
      }
    }

  }
  checkboxqqw(val) {
    // console.log('checkbox');
    // val.target.value=!val.target.value;
    this.checkbox = !this.checkbox;

  }
  clickTncUrl(val) {
    window.open(val, '_blank');
  }
  focusPrice(val) {

    setTimeout(() => {
      this.placeCursorAtEnd(val)
    }, 100);

  }
  placeCursorAtEnd(val) {
    val.focus();
    val.setSelectionRange(100000, 100000);
  }
  numberOnly(event): boolean {
    let reg;
    if (this.jsonData.quantityRegEx == '4DecimalNo') reg = /^-?\d*(\.\d{0,4})?$/;
    if (this.jsonData.quantityRegEx == 'decimal4') reg = /^-?\d*(\.\d{0,4})?$/;
    if (this.jsonData.quantityRegEx == 'decimal0') reg = /^([1-9]|[1-9][0-9]|100)$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
    if (!reg.test(input)) {
      event.preventDefault();
    }
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
    return true;
  }

  changeQuantity(val) {
    if (!this.quantityDisable) {
      let input;
      if (val == '+') input = (this.quantity > 0) ? parseInt(this.quantity) + 1 : 1
      else input = this.quantity ? this.quantity - 1 : 1;
      const reg = new RegExp(this.jsonData.quantityRegEx);
      if (reg.test(input)) {
        this.quantity = input;
        this.keyQuantity();
      }
    }
  }
  segmentChanged(){
    if(this.currentSegment == 'sip'||this.currentSegment == 'oneTime'){
      this.otherDetails.investmentType=this.currentSegment
    }else{
      this.otherDetails.exchange=this.currentSegment
    }
  }
  buttonClicked(val) {

    let param = {
      "TokenId": localStorage.getItem("id_token"),
      "ItemName": this.jsonData.itemName.split(" ")[0]=='Augmont'?this.jsonData.itemName.split(" ")[2]:this.jsonData.itemName,
      "ItemCode": this.jsonData.itemCode,
      "Product": this.breadCrumb.split("/")[1],
      "Category": this.breadCrumb.split("/")[0],
      "TxnType": this.jsonData.txnType,
      "Quantity": parseFloat(this.quantity),
      "UnitPrice": parseFloat(this.jsonData.unitPrice),
      "TaxAmount": parseFloat((this.totalAmount-(this.quantity*this.unitPrice)).toFixed(2)),
      "TotalAmount": parseFloat(this.totalAmount),
      "Consumer": "",
      "Location": "",
      // "Flag": val,
      "Frequency": "",
      "QuantityUnit": this.jsonData.unitOfQuantity,
      "AmountUnit": "INR",
      "OtherDetails": JSON.stringify(this.otherDetails)
    }

    this.http.post(this.apiCatalog.baseURL[this.appEnvironment] + "Fullfilment/" + this.breadCrumb + this.apiCatalog.createOrder1, param)
      .subscribe(async (res: any) => {

        // if (res.Status == "1") {

          if (val == 'addToCart') {
            this.addToCart();
          }
          else if (val == 'buy') {
            this.goToCheckout();
          }
          else if (val == 'sell') {
            this.goToPaymentConfirmation();
          }
          else if (val == 'confirm') {
            this.goToPaymentConfirmation();
          }
          else if (val == 'trade') {
            this.goToPaymentConfirmation();
          }
        // }
        // else {
        //   this.alertService.showAlert("Error", "", "Create Order Api is not working", "Ok")

        // }
      })
  }
  async addToCart() {
    const alert = await this.alertCtrl.create({
      header: "Added To Cart",
      //subHeader: subheaderContains,
      cssClass: 'custAlertREF',
      message: "",
      buttons: [
        
        {
          text: 'Cart',
          cssClass:"skipButtonREF",
          handler: data => {
            this.router.navigate(['Fullfilment/cart']);
          }
        },
        {
          text: 'Continue Shopping',
          role: 'cancel',
          cssClass:"submitButtonREF",
          handler: data => {
                      
          }
        }
      ]
    });

    await alert.present();
    
  }
  goToCheckout() {
    // let tax = ((this.quantity * this.unitPrice) * this.jsonData.taxes[2].taxPercentage / 100).toFixed(2)
    // this.eduService.setCartData([
    //   {
    //     "itemName": this.jsonData.itemName,
    //     "product": this.jsonData.productName,
    //     "quantity": this.quantity,
    //     "unitPrice": this.unitPrice,
    //     "taxAmount": tax,
    //     "totalAmount": this.totalAmount,
    //     "unitOfAmount": this.jsonData.unitOfAmount,
    //     "unitOfQuantity": this.jsonData.unitOfQuantity
    //   }
    // ])

    this.router.navigate(['Fullfilment/cart'] )
  }
  goToPaymentConfirmation() {
    this.eduService.orderConfirm.next(
      {
        "heading": "Confirmation",
        "confirmationTitle": "Your order has been registered",
        "actionButton": "Explore",
        "card": {
          "heading": "Basic Information",
          "description": "",
          "sub_heading": this.jsonData.itemName,
          "image": this.jsonData.productImage,
          "row": [

            {
              "Invesment Amount": this.totalAmount == 'MKT' ? this.unitPrice * this.quantity : this.totalAmount,
            },
            {
              "Date": new Date(),
              "Quantity": this.quantity
            },
            {
              "security code": this.jsonData.itemCode,
              "Transaction ID": "A-dfrg-HGUGHJ-derff-dsdff"
            }
          ]
        }
      }
    )
    this.router.navigate(['Operation/Confirmation'])
  }
  myDisable(val) {
    return eval(val)
  }
}


