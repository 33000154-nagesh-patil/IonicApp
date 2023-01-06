import { getDigiGoldRates } from 'SuperApp/Shopping/Services/getDigiGoldRates';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from 'index';
import { AlertService } from 'projects/core/src/lib/services/alert.service';

@Component({
  selector: 'app-edu-checkout',
  templateUrl: './edu-checkout.component.html',
  styleUrls: ['./edu-checkout.component.scss'],
})
export class EduCheckoutComponent implements OnInit {
  imageList: any;
  grandTotal: any = 0;
  checkoutData = [];
  razorpay_payment_id: any;
  nameco: any;
  orderData: any;
  apiCatalog: any;
  appEnviron: any;
  shoppingBreadCrumb: string;
  fullfilmentBreadCrumb: string = "Fullfilment";
  razorPayOrderId: any;
  uniqueReferenceId: any;
  payNext = new BehaviorSubject(null)
  listing:any;
  resolve: (value: unknown) => void;
  notGlobalCart: boolean;
  orderSetIDString: any;
  Header: any;
  str: string;
  blockId: any;
  breadCrumb: string;
  myUpdateOrder: any;
  torusCoin=false
  torusCoinConversion=0.25
  torusCoinBalance=100
  listCodeCountry=this.allConfigDataService.getConfig("listCodeCountry").IND;
  merchantKey:any ="rzp_live_EMvU5ON9y3t1zp"
  userDetail :any;
  constructor(
    private allConfigDataService: AllConfigDataService,
    private router: Router,
    private eduService: eduService,
    private Commonservice: CommonService,
    private ngZone: NgZone,
    private http: HttpClient,
    private loaderService:LoaderService,
    private alertService:AlertService,
    private getDigiGoldRates:getDigiGoldRates
  ) {
    this.Commonservice.getUserDetail().subscribe(async(user) => {
      this.userDetail=await user;
    })
    this.eduService.categoryValueForAPI.subscribe((obj) => {
      // val["categoryLanding"] +"/"+ val["productLanding"]
      if(obj["productLanding"])this.breadCrumb = obj["categoryLanding"] + "/" + obj["productLanding"]
      else if(obj["categoryLanding"])this.breadCrumb = obj["categoryLanding"]
      // console.log("BreadCrumb: " + this.breadCrumb)

    });
    this.getDigiGoldRates.blockId.subscribe(async blockId => this.blockId =blockId)
    this.listing=this.router.getCurrentNavigation().extras?.state?.listing;
    // this.Header=this.router.getCurrentNavigation().extras.state.Header;
    this.imageList = this.allConfigDataService.getConfig('images');
    this.apiCatalog = {

      ...this.allConfigDataService.getConfig('apiCatalog'),

    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');

    // this.shoppingBreadCrumb = 'Shopping/Career/Courses';

  }

  ngOnInit() {
    // this.listing=this.router.getCurrentNavigation().extras.state.listing;
    //  this.checkoutData = this.eduService.getCartData()
    console.log(this.listing?.id,"----------------------------------------------------------");
    
    this.eduService.cartData.subscribe((res: any) => {
      console.log(res);

      this.checkoutData = res;
      this.update();
    })

  }
  ionViewDidEnter() {

    // this.getOrderId()
  }
  update() {
    this.grandTotal = 0;
    this.checkoutData.forEach(element => {
      element.totalAmount = parseFloat(element.totalAmount)
      this.grandTotal += element.totalAmount
    })

  }
  goBack() {
    window.history.back();
  }
  remove(x) {
    this.checkoutData.splice(x, 1);
    this.eduService.setCartData(this.checkoutData);
    this.update()
  }

async pay(){
  this.loaderService.showLoader();
  // this.eduService.cartData.subscribe(async (res: any) => {
    for(let x of this.checkoutData){
      if(x.orderSetId==null)this.notGlobalCart=true;
      else this.notGlobalCart=false;
    }
    if(this.checkoutData.length>0){
      let arrId = []

    for(let x of this.checkoutData){
      if(!arrId.includes(x.groupID)){
        arrId.push(x.groupID)
      }
    }
    for(let x of arrId){
      await new Promise((resolve) => {
        if(this.notGlobalCart==false)this.getOrderSetId(resolve)
        else this.directBuy(resolve)
      });
    }
    this.navigate(this.razorPayOrderId)
    }
  // })

}
getOrderSetId(resolve){
  this.orderSetIDString="";
  for(let i=0;i<this.checkoutData.length;i++) {
    if(i<this.checkoutData.length-1){
      this.orderSetIDString+=this.checkoutData[i].orderSetId.toString()+",";
    }
    else{
      this.orderSetIDString+=this.checkoutData[i].orderSetId.toString();
    }
  }
  this.getOrderID(resolve)
}
directBuy(resolve){
  let productLanding =null;
    this.eduService.categoryValueForAPI.subscribe(val=>{
      productLanding = val['productLanding'];
    })

    this.eduService.detailParams.subscribe((val)=>{
      this.listing=val;
    })
    
  let param = {
    "TokenId": localStorage.getItem('id_token'),
    "Product": this.checkoutData[0].product,
    "ProductType": productLanding,
    "ItemName": this.checkoutData[0].itemName.split(" ")[0]=="Augmont"?this.checkoutData[0].itemName.split(" ")[2].toLowerCase():this.checkoutData[0].itemName,
    "ItemCode":((this.listing.id))?(this.listing.id.toString()):"",
    "CategoryId": 3,
    "Quantity": parseFloat(this.checkoutData[0].quantity.toString().split("")[0]),
    "UnitPrice": this.checkoutData[0].unitPrice,
    "Amount": this.grandTotal,
    "TaxAmount": 0,
    "TotalAmount": this.grandTotal,
    "TaxDetails": "",
    "Unit": 1,
    "UnitType": 1,
    "ReferenceItemId": "",
    "DiscountDetails": "",
    "DiscountAmount": 0,
    "BuySell": "BUY",
    "ReferenceOrderId": "",
    "TransactionCode": "",
    "TransactionNumber": "",
    "GroupCode": 0,
    "Currency": "INR",
    "InvoiceId": "",
    "OtherDetails": (this.checkoutData[0].product=="DigiGold"?'{"blockId":"'+this.blockId+'","lockPrice":"'+this.checkoutData[0].unitPrice+'"}':"")||(this.checkoutData[0].product=="MF"?'{"PlanId":"'+this.listing.id+'"}':"")
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron] + this.fullfilmentBreadCrumb + this.apiCatalog.createOrder, param)
    .subscribe((res: any) => {
      if(res.Status=="1"){
        this.loaderService.hideLoader();
        this.razorPayOrderId = res?.RazorPayOrderId;
        
      this.uniqueReferenceId = res?.Data?.UniqueRefNo;
      // resolve()
      res?.RazorPayOrderId?this.payWithRazor1(resolve):this.navigate(res.OrderId)
      }
      else{
        this.loaderService.hideLoader();
      this.alertService.showAlert("Error","","Direct Buy Api is not working","Ok")

      }
    }, (err: any) => {
      this.loaderService.hideLoader();
      this.alertService.showAlert("Error","",err.toString(),"Ok")
    })
}
getOrderID(resolve){
//   this.getDigiGoldRates.goldSilverRates.subscribe(async (res:any) => {
//   this.str=''
//   for(let x of this.checkoutData){
//     if(x.product == "DigiGold"){
//       if(!this.str.includes('{"blockId":"'+this.blockId+'","lockPrice":"'+this.checkoutData[0].unitPrice+'"}'))
//       this.str+='{"blockId":"'+this.blockId+'","lockPrice":"'+this.checkoutData[0].unitPrice+'"}'
//     }else{
//       this.str+=''
//     }
//   }
// })
// let productLanding =null;
//     this.eduService.categoryValueForAPI.subscribe(val=>{
//       productLanding = val['productLanding'];
//     })
  let param ={
    "TokenId":localStorage.getItem("id_token"),
    "OrderSetId":this.orderSetIDString,
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
  this.http.post(this.apiCatalog.baseURL[this.appEnviron] +"Fullfilment/"+ this.breadCrumb+"/createOrder",param)
  .subscribe(async (res: any) => {
    this.loaderService.hideLoader();
    if(res.status=="1"){
      this.merchantKey = res?.merchantKey;
      this.razorPayOrderId = res?.RazorPayOrderId;
    this.uniqueReferenceId=res.UniqueRefNo
    // this.payWithRazor1(resolve)
    res?.RazorPayOrderId?this.payWithRazor1(resolve):this.updateOrder(resolve)
    }else{
    this.alertService.showAlert("Error","",res.Message,"Ok")
    }
      // this.payWithRazor1(resolve)
   },(error)=>{
    this.loaderService.hideLoader();
    this.alertService.showAlert("Error","",error.toString(),"Ok")
   })
}
  payWithRazor1(resolve) {
    // this.callProfileData()
    var self: any = this;
    var options = {
      description: 'Credits towards consultation',
      image: 'https://cdn.zeplin.io/60a5fc059289442bc47e7527/assets/727E125B-F005-459F-AB50-9453AAC9134E.svg',//this.imageList?.companyLogo,
      // order_id:"order_Kp0oxY3BGkE6jR", //optional
      order_id:self.appEnviron=='proto'? '': self.razorPayOrderId, //optional
      currency: "INR", // your 3 letter currency code
      key:this.merchantKey, // your Key Id from Razorpay dashboard
      // key: "rzp_live_EMvU5ON9y3t1zp", // your Key Id from Razorpay dashboard
      // key:"rzp_test_5B5z6dC8eP2FCD", // your Key Id from Razorpay dashboard
      amount:self.appEnviron=='proto'? Number(Math.round(self.grandTotal * 100)):1, // Payment amount in smallest denomiation e.g. cents for USD
      name: 'Torus',
      handler: function (response) {
        self.razorpay_payment_id= response.razorpay_payment_id
        self.updateOrder(resolve)
        // resolve()
      },

      prefill: {

        email: self.userDetail.emailId, //optional
        contact: self.userDetail.contactDetails, //optional
        name: self.userDetail.firstName //optional
      },

      theme: {
        color: '#003399'
      },
      modal: {
        ondismiss: function () {
          alert('dismissed')
          self.loaderService.hideLoader();
        }
      }
    };
    //rzp_test_5B5z6dC8eP2FCD

    //rzp_live_fYfrbf9hbNiT6Q

    // rzp_live_EMvU5ON9y3t1zp
    var successCallback = function (success) {
      // self.openSuccessPage(success.razorpay_payment_id);

    };

    var cancelCallback = function (error) {
      self.errorShow(error.description, "payWithRazorpay -> cancelCallback");
    };

    //Razorpay for android
    // RazorpayCheckout.on('payment.success',successCallback)
    // RazorpayCheckout.on('payment.cancel', cancelCallback)
    // RazorpayCheckout.open(options);


    //----
    // Razorpay for web uncomment below line
    let rzp1 = new this.Commonservice.nativeWindow.Razorpay(options, successCallback, cancelCallback);
    rzp1.open();
    rzp1.on('payment.failed', function (response) {
      console.log("fail", response);
      this.loaderService.hideLoader();
    })
    rzp1.on('payment.success', function (response) {
      console.log("success", response);
    })


  }

  updateOrder(resolve) {
    let param = {
      "TokenId":localStorage.getItem("id_token"),
      "UniqueRefNo":this.uniqueReferenceId,
      "RazorPayOrderId":this.razorpay_payment_id?this.razorpay_payment_id:this.razorPayOrderId,
      "RazorPayStatus":"PaymentSuccess"
    }
    this.loaderService.showLoader()
    this.http.post(this.apiCatalog.baseURL[this.appEnviron] +"Fullfilment/"+ this.breadCrumb + this.apiCatalog.updateOrder, param)
    .subscribe((res: any) => {
      this.myUpdateOrder=res;
      // this.navigate("");
      // this.payNext.next(++groupID)
      if(res.Status=="1"){
        resolve()
        this.loaderService.hideLoader()
      }
      else{
        this.loaderService.hideLoader()
        this.alertService.showAlert("Error","","Confirm order Api is not working","Ok")
      }
    },(error)=>{
      this.loaderService.hideLoader()
      this.alertService.showAlert("Error","","Update order Api not found","Ok")
    })
  }
 
  navigate(val) {
    // this.ngZone.run(() => {
    //   setTimeout(() => {
    //     this.payNext.next(null);
    //     this.eduService.setRazorpayId(this.uniqueReferenceId);
    //     // this.eduService.setCartData([]);
    //     this.router.navigate(['/Fullfilment/Payment/success']);
    //     this.loaderService.hideLoader();
    //   }, 1000);
    // });
    let card=[]
    for(let i=0;i<this.myUpdateOrder.data.length;i++){
      card.push(
        {
          "Title":this.myUpdateOrder.data[i].itemName,
          "Quantity": this.myUpdateOrder.data[i].quantity
        },
        

        {
          "Date & Time": new Date(),
          "Total":this.myUpdateOrder.data[i].totalAmount
        },
        {
          "Order ID": this.uniqueReferenceId
        }
    )
    }
    console.log(card);
    
    this.eduService.orderConfirm.next(
      {
        "heading": "Confirmation",
        "confirmationTitle": "Your Order has been successfully placed",
        "actionButton": "Explore",
        "card": {
          "heading": "Basic Information",
          "description": "",
          "sub_heading": "",
          "image": "",
          "row":card
        }
      }
    )
    this.router.navigate(['Operation/Confirmation'])
  }
}
