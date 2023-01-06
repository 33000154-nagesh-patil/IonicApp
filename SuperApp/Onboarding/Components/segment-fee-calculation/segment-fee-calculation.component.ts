import { Router } from '@angular/router';
import { AllConfigDataService, CommonService, LoaderService } from 'index';
import { Component, OnInit } from '@angular/core';
import segmentJson from '../../../../src/assets/segmentFee.json';
import { RazorPayCommonService } from 'SuperApp/Fulfillment/Services/razorPay.service';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'projects/core/src/lib/services/alert.service';

@Component({
  selector: 'app-segment-fee-calculation',
  templateUrl: './segment-fee-calculation.component.html',
  styleUrls: ['./segment-fee-calculation.component.scss'],
})
export class SegmentFeeCalculationComponent implements OnInit {

  imageList: any;
  segMentJsonData: any;
dontShowHeader=true;


  segMentJsonDataaaaa:any;
  appEnviron: any;
  breadCrumb: string;
  amount1: any;
  amount2: any;
  amount3: any;
  amount4: any;
  stock:any;
  cash:any;
  // apiCatalog = this.allConfigDataService.getConfig('apiCatalog');
  // appEnvironment = this.allConfigDataService.getConfig('environmentType')


  apiCatalog:any={
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "Onboarding/OnboardingSteps/PartnerServices",
    "environment": this.allConfigDataService.getConfig('environmentType'),
  }
  totalAmount: any=0;
  userDetail: any;
  orderSetId: any;
  RazorPayOrderId: any;
  UniqueRefNo: any;
  merchantkey: any;
  placeAmount: any=0;
  bse: any;
  nse: any;
  depositAmount: any;

  constructor(
    private allconfig: AllConfigDataService,
    private http: HttpClient,
    private razorPay: RazorPayCommonService,
    private router: Router,
    private allConfigDataService : AllConfigDataService,
    private loaderService:LoaderService,
    private Commonservice:CommonService,
    private alertService:AlertService
  ) {
    this.Commonservice.getUserDetail().subscribe(async(user) => {
      this.userDetail=await user;
    })

    // this.apiCatalog = {
    //   ...this.allConfigDataService.getConfig('apiCatalog'),
    // };
    // this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    // this.breadCrumb = 'Onboarding/OnboardingSteps/PartnerProfile';
  }

  ngOnInit() {
    this.segmentFeeApi();
    this.imageList = this.allconfig.getConfig('images');



    // this.segMentJsonData = segmentJson.data;

    // this.cash = segmentJson.deposit.cash;
    // this.stock = segmentJson.deposit.stock;
    // this.amount1 = segmentJson.total.value[0].row1.amount1;
    // this.amount2 = segmentJson.total.value[0].row2.amount2;
    // this.amount3 = segmentJson.total.value[0].row3.amount3;
    // this.amount4 = segmentJson.total.value[0].row4.amount4;

    console.log("---------------------------+===",this.segMentJsonDataaaaa);


    // this.navigateToPage();
  }

  segmentFeeApi(){

  let param=
  {

  }

  this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+"Onboarding/OnboardingSteps/PartnerSegmentFeeCalculation"+"/getDetail", param)
  .subscribe((res: any) =>  {
    console.log("totalllllllll",res);
    this.segMentJsonData = res.data;
        this.cash = res.deposit.cash;
    this.stock = res.deposit.stock;

    this.bse = res.data[0].amount;
    this.nse = res.data[1].amount;
    // for(let x of  res.data)this.totalAmount += parseFloat(x.amount)
    this.totalAmount = parseFloat(this.bse) + parseFloat(this.nse)
    console.log(this.totalAmount,"totalAmount");





  })
}

  goback() {
    window.history.back();
  }

  goToRazorPay(RazorPayOrderId) {
    var self: any = this;
    var options = {
      description: 'Credits towards consultation',
      image: 'https://cdn.zeplin.io/60a5fc059289442bc47e7527/assets/727E125B-F005-459F-AB50-9453AAC9134E.svg',//this.imageList?.companyLogo,
      // order_id:"order_Kp0oxY3BGkE6jR", //optional
      order_id:self.appEnviron=='proto'? '': RazorPayOrderId, //optional
      currency: "INR", // your 3 letter currency code
      key:this.merchantkey, // your Key Id from Razorpay dashboard
      // key: "rzp_live_EMvU5ON9y3t1zp", // your Key Id from Razorpay dashboard
      // key:"rzp_test_5B5z6dC8eP2FCD", // your Key Id from Razorpay dashboard
      amount:self.appEnviron=='proto'? Number(Math.round(self.grandTotal * 100)):1, // Payment amount in smallest denomiation e.g. cents for USD
      name: 'Torus',
      handler: function (response) {
        self.razorpay_payment_id= response.razorpay_payment_id
        // self.updateOrder(resolve)
        // resolve()
        self.confirmOrder();
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


    // this.confirmOrder();
    // this.razorPay.payWithRazor1(1000, RazorPayOrderId);
    // this.razorPay.razorpayPaymentResponse.subscribe((data) => {
    //   console.log('razorpay_payment_id', data);
    // });
    // this.router.navigate(['/Onboarding/AadharEsign']);
    // this.router.navigate(['/Onboarding/AadharEsign']);
  }

  // self.razorpayPaymentResponse.next(response.razorpay_payment_id);

  // navigateToPage() {
  //   let param = {
  //     TokenId: localStorage.getItem('id_token'),
  //   };
  //   this.http
  //     .post(
  //       this.apiCatalog.baseURL[this.appEnviron] +
  //         'Onboarding/OnboardingSteps/SegmentFeeCalculation' +
  //         '/getDetail',
  //       param
  //     )
  //    .subscribe((data: any) => {
  //     console.log("segment data", data);

  //       this.segMentJsonData = data.data;
  //       console.log(
  //         'heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
  //         this.segMentJsonData
  //       );
  //     });
  // }

  getCal(x) {
    console.log("deposit",x);
    x=x.replace(/\,/g,'');
    this.depositAmount = x;

    var getData = segmentJson.data;
    console.log(getData);
    this.placeAmount = parseFloat(x)+ this.totalAmount;
    // this.placeAmount = parseFloat(x)+ parseFloat(this.segMentJsonData[0].amount) + parseFloat(this.segMentJsonData[1].amount);
    console.log("placeAmount",this.placeAmount);

    //   var count = 0;
    //   for (var key in segmentJson) {
    //     if (key.data) {
    //       count++;
    //     }
    //   }
    //   console.log(count)
  }

  buttonClicked(val) {
    let param :any= {
      "TokenId": localStorage.getItem("id_token"),
      "ItemName": "",
      "ItemCode":"174276",
      "Product": "",
      "Category": "segment",
      "TxnType": "BUY",
      "Quantity": 1,
      "UnitPrice": this.placeAmount,
      "TaxAmount":0,
      "TotalAmount": this.placeAmount,
      "Consumer": "",
      "Location": "",
      "Frequency": "",
      "QuantityUnit": "Nos",
      "AmountUnit": "INR",
      "OtherDetails": "{\"item_rate_id\":15530,\"item_unit_id\":-1,\"vendor_id\":1000005}"
    }
    this.loaderService.showLoader();
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + "Shopping/Health/Medicine"+ this.apiCatalog.placeCart, param)
      .subscribe( (res: any) => {
        console.log("hellooooooooooo", res);
          this.loaderService.hideLoader();
        if (res.Status == "1") {
          this.orderSetId = res.data.OrderSetId;

          this.createOrder(this.orderSetId);


        }
        else {
          this.alertService.showAlert("Error", "", "Create Order Api is not working", "Ok")

        }

      })
      // val.loading=true;
  }

  createOrder(orderSetId){

  let param = {
    "TokenId": localStorage.getItem("id_token"),
    "OrderSetId" : orderSetId
  }

  this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + "Fullfilment/Health/Medicine" + "/createOrder", param).subscribe((res:any)=>{
console.log(res);

this.RazorPayOrderId = res.RazorPayOrderId;
this.UniqueRefNo = res.UniqueRefNo;
this.merchantkey = res.merchantkey;
    this.goToRazorPay(this.RazorPayOrderId)

  })
}

confirmOrder(){

  let param ={

      "TokenId": localStorage.getItem('id_token'),
      "UniqueRefNo": this.UniqueRefNo,
      "RazorPayOrderId": this.RazorPayOrderId,
      "RazorPayStatus": "PaymentSuccess"

  }

  this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + "Fullfilment/Health/Medicine" + "/createOrder?confirmOrder", param).subscribe((res:any)=>{
console.log(res);
this.router.navigate(['/Onboarding/AadharEsign'])
  })
}

}
