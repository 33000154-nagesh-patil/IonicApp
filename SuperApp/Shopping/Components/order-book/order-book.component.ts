import { CommonService } from 'index';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, HostBinding, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AlertService } from 'projects/core/src/lib/services/alert.service';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { StockOrderPadComponent } from './stockOrderPad/stockOrderPad.component';
import { DigiGoldBottomCardComponent } from './components/digiGoldBottomCard/digiGoldBottomCard.component';
import { WebSocketServiceForStocks } from 'SuperApp/Shopping/Services/stockswebsocket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, query, style, stagger, animate, keyframes, animation } from '@angular/animations';
import { UnsubBehaviour } from 'src/app/unsubscribe.class';
import { finalize, takeUntil } from 'rxjs/operators';

// import * as json from "./mfOrder.json"

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss'],
  animations:[
    trigger('pageAnimations', [
      // transition('* <=> *', [
      //   // Set a default  style for enter and leave
      //   query(':enter, :leave', [
      //     style({
      //       // position: 'absolute',
      //       // left: 0,
      //       // width: '100%',
      //       opacity: 0,
      //       transform: 'translateX(-1.5%)',
      //     }),
      //   ]),
      //   // Animate the new page in
      //   query(':enter', [
      //     animate('600ms cubic-bezier(0.7,0,0.3,1)', style({ opacity: 1, transform: 'translateX(0%)' })),
      //   ])
      // ]),
      transition('* => active', [
        query(':enter', style({ opacity: 0 }), {optional: true}),
        query(':enter', stagger('100ms', [
          animate('600ms ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-10%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(10px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ]),
  ],
  encapsulation: ViewEncapsulation.None
})
export class OrderBookComponent extends UnsubBehaviour implements OnInit,OnDestroy {
  @HostBinding('@pageAnimations')
  animationState;
  jsonData: any;
  imageList = this.allConfigDataService.getConfig('images')
  cartCount = 7
  totalAmount: any
  amountDisable: boolean
  @ViewChild('amountInput') amountInput: ElementRef;
  @ViewChild('quantityInput') quantityInput: ElementRef;
  noOfInstallment:any=999;
  unitPrice: any;
  quantityDisable: any;
  Instalment:any;
  quantity: any = 1;
  checkbox: boolean = true;
  DatePicker: any;
  isPaused: any;
  availableFunds: any;
  seconds: any;
  remainingMargin: any
  minutes: any;
  timeSlot: any;
  currentSegment: any
  orderType: any = 'MKT';
  deliveryMode: any='C'
  apiCatalog = this.allConfigDataService.getConfig('apiCatalog');
  appEnvironment = this.allConfigDataService.getConfig('environmentType')
  breadCrumb: string="Wealth/ST";
  productLanding: any;
  categoryLanding: any;
  otherDetails:any={};
  content:any;
  profile:any;
  colorValue: number;
  selectedConsumer: any=0;
  selectedLocation: any=0;
  pricePerUnit: any;
  name: any;
  buttonType: any;
  stockOrderId: any;
  stBalance: any;
  methodName:any="/getOrderBook"
  ionicForm: FormGroup;
  dividentType: any;
  sellError:any=false
  orderTitle:any;
  todayDate:any=new Date()
  bestPrice:any;
  redeemCard: any;
  amount: any;
  unit: any;
  amountValue: any;
  unitsValue: any;
  nav:any;
  value12: any;
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
    this.otherDetails.product = val;
  }


  async profileClicked(){



    const documentElement = document.documentElement;
    documentElement.style.setProperty("--hey", `${this.jsonData.Location.length>=2?2:this.jsonData.Location.length}`);
    documentElement.style.setProperty("--world", `16.4em`);
      let eventEmitter = new EventEmitter();
      eventEmitter.subscribe(res => {
        this.selectedConsumer = res;
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
   modal.onDidDismiss().then(async (res) => {
    console.log(res);
    if(res.data== "addprofile" || res.data == "addaddress")this.callApi()
   });
   return modal.present();
  }
  async locationClicked(){
    const documentElement = document.documentElement;
      documentElement.style.setProperty("--hey", `${this.jsonData.Location.length>=2?2:this.jsonData.Location.length}`);
      documentElement.style.setProperty("--world", `16.4em`);

      let eventEmitter = new EventEmitter();
      eventEmitter.subscribe(res => {
        this.selectedLocation = res;
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
     modal.onDidDismiss().then(async (res:any) => {
      if(res.data== "addprofile" || res.data == "addaddress")this.callApi()
     });
     return modal.present();
  }
  onDateChange(val) {
    this.DatePicker = val.value.getDate() + '-' + val.value.getMonth() + '-' + val.value.getFullYear()
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
    this.orderType = val.value
    if(this.jsonData?.exchange?.orderType?.options.indexOf(val)%2!=0){
      this.switchDisable("amtEdit","amount")
    }else{
      this.switchDisable("switch","quantity")
    }
    this.otherDetails.order_type = val.value
  }

  // getLink(){
  //   this.router.navigate(['/Onboarding/form'], { state: {frompre:"False"}} )
  // }



  getLink() {
    // this.loaderService.showLoader();
  //
    this.eduService.categoryValueForAPI
    .pipe(takeUntil(this.UnSubscribe))
    .subscribe(val => {

      if(val['productLanding']=='Medicine'){

        this.router.navigate(['/Shopping/HealthDoc'],{state:{"Healthdoc":true}});
      }
      this.apiCatalog['breadCrumb'] = "Onboarding/" + val["categoryLanding"] + "/" + val['productLanding']

     console.log(val['productLanding'])
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
          sessionStorage.setItem('OnboardingStep',JSON.stringify(response));
          this.eduService.OnboardingStepList.next(response.data);

          this.loaderService.hideLoader();

          for(let el of response.data ){

            if(el.status=='N'){
              return this.router.navigate(['Onboarding'+el.pageUrl], { state: {frompre:"False"}} )


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
    this.Instalment=this.Perpetualoptions[0].item = 'Perpetual';
    // if (this.Instalment == 'Perpetual'){
    //   this.quantity = 999;
    // }
    // this.remainingFunds()
    this.eduService.fromVault.subscribe((val)=>{
      if(val=="True"){
        this.methodName="/getOrderBook?portfolio"
      }
})
this.ionicForm = this.formBuilder.group({
  Frequency:['',[Validators.required]],
  Perpetual:['',[Validators.required]]
});
this.dividentType=this.controls[0].name
    this.availableBal()
    this.callApi()
    // this.getTime()
    this.eduService.categoryValueForAPI.subscribe((obj) => {
      // val["categoryLanding"] +"/"+ val["productLanding"]
      if(obj["categoryLanding"])this.breadCrumb = obj["categoryLanding"] + "/" + obj["productLanding"]
      this.productLanding = obj["productLanding"],
        this.categoryLanding = obj["categoryLanding"]
    });
  }

  options=[
    {item:"Daily"},{item:"Weekly"},{item:"Monthly"},{item:"Annualy"}
  ]
  Perpetualoptions =[
    {item:"Perpetual"},{item:"Custom"},{item:"End Date"}
  ]
  controls=[
    {name:"Re-investment"},
    {name:"Payout"}
  ]
  getAvailableFund(){
    // let amt;
    // this.totalAmount=='MKT'?amt=this.unitPrice:amt=this.totalAmount;
    return (parseFloat(this.jsonData?.availableMargin))
    // console.log (Number((this.totalAmount?this.totalAmount:0)),"NAN")
    // console.log(this.totalAmount,"TOT");




  }
  async callApi() {

    let loading = this.loadingController.create({
      spinner: 'crescent',
      message: 'Loading Order Book  Please Wait...'
    });

    (await loading).present();
    let param ={
      id:this.stockOrderId,
      TokenId:localStorage.getItem("id_token"),
      "title":this.orderTitle?this.orderTitle:"",
      "favList":"",

    }
    console.log(param,"this.title");


      // this.http.get("assets/orderBook/host.json")
      this.http.post(this.apiCatalog.baseURL[this.appEnvironment] + "Shopping/" + this.breadCrumb +this.methodName, param)

      .pipe(takeUntil(this.UnSubscribe))
      .subscribe(async (res: any) => {
        // this.availableFunds = res.availableMargin;
        // this.remainingMargin =this.availableFunds-this.totalAmount;
        // console.log(this.remainingMargin ,"Rajesht56");

        this.animationState='active';
        res = JSON.parse(JSON.stringify(res).replace('â‚¹', '₹').toString());


        this.eduService.healthDetails.subscribe((res:any)=>{
          if(res&&this.breadCrumb.split("/")[0]=='Health')this.otherDetails=res;
        });
        (await loading).dismiss();
        // this.jsonData=res.record
        this.jsonData = res

        // this.jsonData.blockID="Eq3jGkPX"
        this.getTime()
        this.isPaused = false;
        this.unitPrice = this.jsonData.unitPrice

        this.keyQuantity()
        if (this.jsonData.editable == 'switch') {
          this.amountDisable = true;
          this.otherDetails.blockID=this.jsonData.blockID;
        } else if (this.jsonData.editable == 'amtEdit') {
          this.quantity=null
          this.otherDetails["validity"]="DAY";
          this.otherDetails["trigger_price"]="0.00";
          this.otherDetails["disc_quantity"]="0"
          this.amountDisable = true;
          this.eduService.pricePerUnit
          .pipe(takeUntil(this.UnSubscribe))
          .subscribe(async (res:any) => {
            this.jsonData.txnType=res.button.toUpperCase();
          })

          // this.unitPrice='Mkt';
          this.totalAmount = "MKT";
          this.currentSegment = res?.exchange?.exchangeType.options[0].value;
          // this.value12=this.commonService.getTitle()

          if(this.orderTitle.endsWith("-PE") || this.orderTitle.endsWith("-CE") || this.orderTitle.endsWith("-FUT")){
            this.setDelivery('M')
          }else{
            this.setDelivery('C')

          }
          this.setOrderType(this.jsonData?.exchange?.orderType?.options[0]);
          let date = new Date();
          let time = date.getHours()+""+date.getMinutes()
          if(this.stockWebsocket.time> 55800)this.otherDetails.off_mkt_flag="true";
          else this.otherDetails.off_mkt_flag="false";
          this.otherDetails.segment="E";
        } else if (this.jsonData.editable == 'qty') {
          this.amountDisable = true;
        } else if (this.jsonData.editable == 'none') {
          this.amountDisable = true;
          this.quantityDisable = true;
        }

        // this.DatePicker = this.jsonData.OtherDetails[0][1].value
        let value11=this.commonService.getExchangeValue()
        if(value11=='NSE'){
          this.currentSegment = res?.exchange?.exchangeType.options[0].value;
        }
        else{
          this.currentSegment = res?.exchange?.exchangeType.options[1].value;

        }
        if(this.breadCrumb.split("/")[1]=="MF"){
          this.jsonData.disable.split(">=")[1]?this.totalAmount=this.jsonData.disable.split(">=")[1]?.slice(0,-1):''
          this.keyAmount()
        }
        this.segmentChanged()

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
    private alertService: AlertService,private commonService:CommonService,
    private stockWebsocket:WebSocketServiceForStocks,
    public formBuilder: FormBuilder
  ) {
super()
this.eduService.amountValue.subscribe((res:any)=>{
  this.totalAmount=res
  console.log("check11111111111111111111",this.totalAmount);

})

const sub =this.eduService.pricePerUnit.subscribe(async (res:any) => {

  if(res){
    this.stockOrderId = res.id;
    this.orderTitle=res.name
  }

  // sub.unsubscribe();
})
  }

  keyAmount() {
    if (this.jsonData.editable == 'switch'||this.jsonData.editable == 'amt') {
      let tax = parseFloat(this.jsonData.taxes[2].taxPercentage);
      this.quantity = this.truncateToDecimals(((this.totalAmount - ((this.totalAmount / (100 + tax)) * tax)) / this.unitPrice))
    }
  }

  redeemAll(event){
    if(!event.target.checked){
      this.unitPrice=this.jsonData?.redeemableUnits
      this.totalAmount=this.jsonData?.redeemableAmount
    }


  }
  truncateToDecimals(num, dec = 4) {
    const calcDec = Math.pow(10, dec);
    return Math.trunc(num * calcDec) / calcDec;
  }
  keyQuantity() {
    let tax = parseFloat(this.jsonData.taxes[2].taxPercentage);
    if (this.totalAmount != "MKT") {
      this.totalAmount = this.calcAmount()

    }
    // this.totalAmount=(this.quantity*this.nav).toFixed(2)
  }
  calcAmount() {
    if(this.methodName=='/getOrderBook?portfolio'){
      let tax = parseFloat(this.jsonData.taxes[2].taxPercentage);
      return ((this.quantity * parseFloat("0")) + (((this.quantity * parseFloat("0")) * tax) / 100)).toFixed(2);
    }
    else{
    let tax = parseFloat(this.jsonData.taxes[2].taxPercentage);
    return ((this.quantity * parseFloat(this.unitPrice)) + (((this.quantity * parseFloat(this.unitPrice)) * tax) / 100)).toFixed(2);
  }
}
  switchDisable(val, name) {
    if (name == 'amount') {
      if (val == 'amtEdit') {
        this.quantityDisable = false;
        if (this.amountDisable) {
          this.amountDisable = false;
          // this.unitPrice = this.jsonData.unitPrice;
          // this.totalAmount = (this.jsonData.unitPrice * this.quantity).toFixed(2);
          if(this.orderType != 'SL')this.orderType = 'LMT'

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
    val.setSelectionRange(10000000000, 10000000000);
  }

  changeInstallment(val){
    let input;
      if (val == '+') input = (this.noOfInstallment > 0) ? parseInt(this.noOfInstallment) + 1 : 1;
      else input = this.noOfInstallment ? this.noOfInstallment - 1 : 1;
      this.noOfInstallment = input;
  }

  keyInstallment(){
    // console.log(this.changeInstallment())
  }

  numberOnly(event): boolean {
    let reg;
    if (this.jsonData.quantityRegEx == '4DecimalNo') reg = /^-?\d*(\.\d{0,4})?$/;
    else if (this.jsonData.quantityRegEx == 'decimal4') reg = /^-?\d*(\.\d{0,4})?$/;
    else if (this.jsonData.quantityRegEx == 'decimal0') reg = /^([1-9]|[1-9][0-9]|100)$/;
    else if (this.jsonData.quantityRegEx == 'noDecimal') reg = /^\d+$/;
    else reg = new RegExp(this.jsonData.quantityRegEx);
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
      let reg;
      if (this.jsonData.quantityRegEx == '4DecimalNo') reg = /^-?\d*(\.\d{0,4})?$/;
    else if (this.jsonData.quantityRegEx == 'decimal4') reg = /^-?\d*(\.\d{0,4})?$/;
    else if (this.jsonData.quantityRegEx == 'decimal0') reg = /^([1-9]|[1-9][0-9]|100)$/;
    else if (this.jsonData.quantityRegEx == 'noDecimal') reg = /^\d+$/;
    else reg = new RegExp(this.jsonData.quantityRegEx);

      if (reg.test(input)) {
        this.quantity = input;
        this.keyQuantity();
      }
    }

}
  segmentChanged(){
let subbb;

    if( ['sip','lumpSum',"swp","onetime"].includes(this.currentSegment)){
      this.otherDetails.investmentType = this.currentSegment;
      this.otherDetails.FolioNumber = this.jsonData?.redeemFolio?.folioNumber;
      this.jsonData?.bank?this.otherDetails.AccountNumber = this.jsonData?.bank[0]?.bankNumber:'';

    }else{
      this.otherDetails['exchange']=this.currentSegment
      if (this.jsonData.editable == 'amtEdit'){
        let name =this.orderTitle.split("-");
        if(["FUT","PE","CE"].includes(name[name.length - 1])){
            this.stockWebsocket.sendData(12,this.stockOrderId,2)
          }
        else this.stockWebsocket.sendData(12,this.stockOrderId,this.currentSegment=="NSE"?1:4)
        //     this.stockWebsocket.sendData(this.stockOrderId,"FO")
        //   }
        // else this.stockWebsocket.sendData(this.stockOrderId,this.currentSegment)
        // this.stockWebsocket.sendData(this.stockOrderId,this.currentSegment)
        subbb=this.stockWebsocket.currentMessage
      .pipe(takeUntil(this.UnSubscribe),
      finalize(()=> {
        if (["FUT", "PE", "CE"].includes(name[name.length - 1])) {
          this.stockWebsocket.sendData(13,this.stockOrderId,2)
        }
      else this.stockWebsocket.sendData(13,this.stockOrderId,this.currentSegment=="NSE"?1:4)
      }
      )
      )
      .subscribe(async (res:any) => {
        // console.log(res);


          if(this.stockOrderId== res.SEC_ID&&res.msgCode==1){
            this.bestPrice=res.LTP.toFixed(2);
            if(this.amountDisable)this.unitPrice=res.LTP.toFixed(2);
          }

      })
      }
    }
  }
  buttonClicked(val) {
    if(this.jsonData.productName=="Health"){
    alert("Please add and select Profile and Address")
  }
    this.jsonData.editable == 'switch'?this.otherDetails.toggle=this.amountDisable ?'quantity':'amount' :''

    let amt;
this.totalAmount=='MKT'?amt=(this.quantity*this.unitPrice):amt=this.totalAmount;
    let param :any= {
      "TokenId": localStorage.getItem("id_token"),
      "ItemName": this.jsonData.itemName,
      "ItemCode": this.stockOrderId?this.stockOrderId.toString():'',
      "Product": this.breadCrumb.split("/")[1],
      "Category": this.breadCrumb.split("/")[0],
      "TxnType": this.jsonData?.txnType,
      "Quantity": parseFloat(this.quantity),
      "UnitPrice": parseFloat(this.unitPrice),
      "TaxAmount":this.jsonData.editable == 'amtEdit'?0: parseFloat((amt-(this.quantity*this.unitPrice)).toFixed(2)),
      "TotalAmount": parseFloat(amt),
      "Consumer": this.jsonData?.Consumer[this.selectedConsumer]?.custRelationID,
      "Location": this.jsonData?.Location[this.selectedLocation]?.AddressId,
      "Frequency": "",
      "QuantityUnit": this.jsonData.unitOfQuantity,
      "AmountUnit": "INR",
      "OtherDetails": JSON.stringify(this.otherDetails)
    }
    this.loaderService.showLoader();
    if(!val.loading)this.http.post(this.apiCatalog.baseURL[this.appEnvironment] + "Shopping/" + this.breadCrumb + this.apiCatalog.placeCart, param)
      .subscribe(async (res: any) => {
        val.loading=false
          this.loaderService.hideLoader();
        // if (res.Status == "1") {

          if (val.value == 'addToCart') {
            this.goToCheckout();
            // this.addToCart();
          }
          else if (val.value == 'buy') {
            this.goToCheckout();
          }
          else if (val.value == 'sell') {
            this.goToPaymentConfirmation();
          }
          else if (val.value == 'confirm') {
            this.Confirm(res.data.OrderSetId);
          }
          else if (val.value == 'trade') {
            this.goToPaymentConfirmation();
          }
          else if (val.value == 'redeem') {
            this.Redeem(res.data.OrderSetId);
          }

        // }
        // else {
        //   this.alertService.showAlert("Error", "", "Create Order Api is not working", "Ok")

        // }
      })
      val.loading=true;
  }
  Redeem(OrderSetId){

    let param ={
      "TokenId":localStorage.getItem("id_token"),
      "OrderSetId":OrderSetId,
    }

    this.http.post(this.apiCatalog.baseURL[this.appEnvironment] +"Fullfilment/"+ this.breadCrumb+"/createOrder",param)
    .subscribe(async (res: any) => {
      let param = {
        "TokenId":localStorage.getItem("id_token"),
        "UniqueRefNo":res.UniqueRefNo,
        "RazorPayStatus":"PaymentSuccess"
      }
      this.http.post(this.apiCatalog.baseURL[this.appEnvironment] +"Fullfilment/"+ this.breadCrumb + this.apiCatalog.updateOrder, param)
      .subscribe((res: any) => {
        let obj ={}
obj['Rs.' + this.totalAmount]= ""
this.eduService.orderConfirm.next(

{

  "heading": " Redeem Confirmation",
  "confirmationTitle": "Redeem order placed",
  "actionButton": "Explore",
  "redeemCard": "Complete the redeem transaction by clicking the link sent to your registered email addres",
  "card": {
    "heading": "Basic Information",
    "description": "",
    "sub_heading": this.jsonData.itemName,
    "image": this.jsonData.productImage,
    "row": [

      {
        "ICICI Prudential Focused Bluechip Equity Fund": "",
        ...obj

      },
      {
        "Applicable NAV Date":  new Date(),
        "Expected Completion":"15th Apr, 2022"


      }
    ]
  }
}
)
this.router.navigate(['Operation/Confirmation'])

      })
    })
    // this.router.navigate(['Fullfilment/RedeemOtp'])

console.log("akshay");


}
 Confirm(OrderSetId: any) {
    let param ={
      "TokenId":localStorage.getItem("id_token"),
      "OrderSetId":OrderSetId,
      // "Product": this.checkoutData[0].product,
      // "ProductType": productLanding,
      // "Currency":"INR",
      // "InvoiceId":"1",
      // "PaymentMode":"UPI",
      // "PaymentDetails":"UPI Mode",
      // "AmountRefunded":0.0,
      // "RefundStatus":"",
      // "OtherDetails": this.str,
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnvironment] +"Fullfilment/"+ this.breadCrumb+"/createOrder",param)
    .subscribe(async (res: any) => {
      this.confirmMyOrder(res.UniqueRefNo);
    })
  }
  confirmMyOrder(UniqueRefNo){

    let param = {
      "TokenId":localStorage.getItem("id_token"),
      "UniqueRefNo":UniqueRefNo,
      "RazorPayStatus":"PaymentSuccess"
    }

    this.http.post(this.apiCatalog.baseURL[this.appEnvironment] +"Fullfilment/"+ this.breadCrumb + this.apiCatalog.updateOrder, param)
    .subscribe((res: any) => {
      let card = this.breadCrumb.split("/")[1]!='Job'?[
        {
          "Title":res.data[0].itemName
        },
        {
          "Quantity":res.data[0].quantity,
          "Total Amount":res.data[0].totalAmount
        },
        {
          "Date&Time": new Date(),
          "Order ID": UniqueRefNo
        }
      ]
      :[
        {
          "Date&Time": new Date(),
          "Order ID": UniqueRefNo
        }
      ]
      this.eduService.orderConfirm.next(
        {
          "heading": "Confirmation",
          "confirmationTitle": this.breadCrumb.split("/")[1]!='Job'?'Your Order has been placed!':"You have successfully applied for this job",
          "actionButton": "Explore",
          "card": {
            "heading": "Basic Information",
            "description": "",
            "sub_heading": this.jsonData.itemName,
            "image": this.jsonData.productImage,
            "row": card
          }

        }
      )
      this.router.navigate(['Operation/Confirmation'])
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
          cssClass:"submitButtonREF",
          handler: data => {
            this.router.navigate(['Shopping/listing']);
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
        "confirmationTitle": "Your order has been placed successfully",
        "actionButton": "Explore",
        "card": {
          "heading": "Basic Information",
          "description": "",
          "sub_heading": this.jsonData.itemName,
          "image": this.jsonData.productImage,
          "row": [

            {
              "Invesment Amount": this.totalAmount == 'MKT' ? this.unitPrice * this.quantity : this.totalAmount,
              "Quantity": this.quantity

            },
            {
              "Date&Time": new Date(),
              "Order ID": "A-dfrg-HGUGHJ-derff-dsdff"

            }
          ]
        }
      }
    )
    this.router.navigate(['Operation/Confirmation'])
  }
  myDisable(val) {
    return eval(val)
    // return eval("!(this.totalAmount>=1.00&&this.totalAmount<=200000.00&&this.quantity>0&&this.checkbox)")
    // return eval("!(this.quantity>0&&this.checkbox && this.quantity<=this.jsonData.availableUnit)")
  }
  availableBal(){
    // let param = {
    //   "TokenId": localStorage.getItem("id_token"),
    // }
    // this.http.post("https://apixuat.heytorus.com/SuperApp/Shopping/Wealth/ST/getDetail?getFundLimit",param)
    // .subscribe(async (res: any) => {
    //   this.stBalance = res.available_balance
    // } )

}

numberWithDecimal(event){
  const reg = /^-?\d*(\.\d{0,2})?$/;
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

remainingFunds(){
this.availableFunds = this.jsonData.jsonData?.availableMargin;
console.log(this.availableFunds,"-------Rajesh1993---");

}


}


