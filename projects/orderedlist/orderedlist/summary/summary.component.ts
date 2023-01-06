// import { Message } from './../../../submenu/chat.service';
import { CommonService } from 'index';
import { Component, OnInit, Input } from '@angular/core';
import { AllConfigDataService } from 'index';
import { ModalController } from '@ionic/angular';
import { SuccessDetailsComponent } from '../success-details/success-details.component';
import { LoaderService } from 'index';
import { CommonFunctionService } from 'index';
import { AddressDetailsComponent } from '../address-details/address-details.component';
import { SelectAddComponent } from '../select-add/select-add.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { SelectPatientdetaiComponent } from '../select-patientdetai/select-patientdetai.component';
// import { CartServiceService } from 'projects/core/src/lib/services/cart-service.service';
import { PatientDetailsComponent } from 'projects/orderedlist/patient-details/patient-details.component';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CartServiceService } from 'projects/core/src/lib/services/cart-service.service';



declare var RazorpayCheckout: any;

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  [x: string]: any;
  imageList: any;
  currencySymbol: any;
  errorList: any;
  checkUseraddress: any;
  showQuantity: any;
  datas: any[];
  rupeesSymbol: any;
  getCurrency: any;
  InitialPrice: number = 0;


  userName: any;
  userAge: any;
  trans: any
  @Input() selectedTimeSlot: any;
  @Input() date: any;
  fullName = "Akshay"
  @Input() age = 25;
  @Input() gender = "male"
  @Input() patientData
  @Input() addressData
  @Input() FreshData: any;
  @Input() FreshPatientData;
  @Input() productDetails: any;
  @Input() productWithMultipleDetails: any;

  // userGender: any;
  // dataDetail: any;
  // dataDetail2: any;

  dataDetail1: any;
  dataDetail3: any;
  dataDetail4: any;
  dataDetail5: any;

  line1: any;
  line2: any;
  line3: any;
  line4: any;
  line5: any;
  line6: any;
  line7: any;


  constructor(private http: HttpClient, private allconfigDataService: AllConfigDataService, public modalController: ModalController,
    private CommonService: CommonService, private loaderService: LoaderService, private commonFunctionService: CommonFunctionService, private cartService: CartServiceService) {

      this.callProfileData()
     }





  ngOnInit() {
    console.log(this.FreshData);


    // this.newFunction();
    // if(this.line4.length > 0){

      this.imageList = this.allconfigDataService.getConfig('images')

      this.getRegistrationDetails();

    


    this.datas = this.cartService.getCartItems();

    this.totalPrice();
    console.log(this.date);

    this.currentDate = this.date
    this.dataForOrderSummary.time = this.data




    this.currencySymbol = this.allconfigDataService.getConfig('listCodeCountry')
    this.rupeesSymbol = this.allConfigDataService.getConfig('listCodeCountry')['IND']['currencySymbol'];



  }


  async openAddressPage() {
    // this.modalController.dismiss();
    this.loaderService.showLoader();
    const modal = await this.modalController.create({
      component: AddressDetailsComponent,
      componentProps: {
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data && data?.data) {
          console.log("Save data");
          if (data) {
            this.checkUseraddress = data.data.value
          }
        }
      });
    this.loaderService.hideLoader();
    return await modal.present();
  }


  async addressTrue() {
    // this.modalController.dismiss();
    this.loaderService.showLoader();
    const modal = await this.modalController.create({
      component: SelectAddComponent,
      componentProps: {
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data && data?.data) {
          console.log("Save data");
          if (data) {

            //   this.CheckAddress=false
            //   this.checkUseraddress=data.data.value
            //   this.ifAddressAdded=false

          }
        }
      });
    this.loaderService.hideLoader();
    return await modal.present();
  }

  async detailTrue() {
    // this.modalController.dismiss();
    this.loaderService.showLoader();
    const modal = await this.modalController.create({
      component: SelectPatientdetaiComponent,
      componentProps: {
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data && data?.data) {
          console.log("Save data");

          if (data) {

            //   this.CheckAddress=false
            //   this.checkUseraddress=data.data.value
            //   this.ifAddressAdded=false

          }

        }
      });
    this.loaderService.hideLoader();
    return await modal.present();
  }

  async selectTime() {
    // this.modalController.dismiss()

    this.loaderService.showLoader();
    const modal = await this.modalController.create({
      component: ScheduleComponent,
      componentProps: {
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data && data?.data) {
          console.log("Save data");
          if (data) {
            //   this.CheckAddress=false
            //   this.checkUseraddress=data.data.value
            //   this.ifAddressAdded=false
          }
        }
      });
    this.loaderService.hideLoader();
    return await modal.present();
  }






payWithRazor1(amount, orderId) {

console.log("gggggggggggggggggggg", orderId);


    this.callProfileData()

    var self: any = this;
    var options = {
      description: 'Credits towards consultation',
      image: 'https://cdn.zeplin.io/60a5fc059289442bc47e7527/assets/727E125B-F005-459F-AB50-9453AAC9134E.svg',//this.imageList?.companyLogo,
      order_id: '', //optional
      currency: "INR", // your 3 letter currency code
      key: "rzp_test_5B5z6dC8eP2FCD", // your Key Id from Razorpay dashboard
      amount: Number(Math.round(this.InitialPrice * 100)), // Payment amount in smallest denomiation e.g. cents for USD
      name: 'Torus',
      prefill: {

        email: this.EmailId, //optional
        contact: this.MobileNumber, //optional
        name: 'Torus' //optional
      },
      handler: function (response) {


        self.success = response.razorpay_payment_id;
        console.log(self.success);
        // self.success=response.razorpay_order_id
        // self.openSuccessPage(self.success);
        this.trans = self.success;
        console.log(this.trans, 'fgdgdgggrgrrgrg');
        // self.HealthPaymentSuccess(self.success);
        self.openSuccessPage(self.success);
        // self.openPaymentPopUp(self.success)

      },
      theme: {
        color: '#003399'
      },
      modal: {
        ondismiss: function () {
          //alert('dismissed')
        }
      }
    };

    var successCallback = function (success) {
      self.openSuccessPage(success.razorpay_payment_id);
      // self.educationOrder();
    };
    var cancelCallback = function (error) {
      self.errorShow(error.description, "payWithRazorpay -> cancelCallback");
    };

    // var successCallback = function (success: { razorpay_payment_id: any; razorpay_signature: any; }) {

    //   console.log("payment_id", success)
    //   if (success.razorpay_payment_id) {
    //     self.getProductionTransactionPayment(success.razorpay_payment_id, success.razorpay_signature, "Success")

    //   } else {
    //     self.getProductionTransactionPayment('', '', "Failed")
    //     self.errorShow('Payment Failed, Please Try Again', "payWithRazorpay -> successCallback");
    //   }

    //   //console.log('payment_id: ' + payment_id);
    // };

    // var cancelCallback = function (error: { description: any; }) {
    //   console.log("error", error)
    //   self.getProductionTransactionPayment('', '', "Cancelled")
    //   self.errorShow(error.description, "payWithRazorpay -> cancelCallback");
    // };

    // android

    // RazorpayCheckout.on('payment.success', this.openSuccessPage())
    // RazorpayCheckout.on('payment.cancel', cancelCallback)
    // RazorpayCheckout.open(options);


    //  Razorpay for web uncomment below line

    let rzp1=new this.CommonService.nativeWindow.Razorpay(options,cancelCallback);
      rzp1.open();
      rzp1.on('payment.failed', function (response: any){
        console.log("fail",response);
    })
    rzp1.on('payment.success', function (response: any){
        console.log("success",response);
    })
  }


  openSuccessPage() {

    var productDetail = this.commonFunctionService.getSelectedProductDetails();
    console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",productDetail);

    let successData = {
      'Title': "Order Placed Successfully",
      'Date': new Date(),
      'TransactionType': 'Done',
      'totalAmount': "",
      'quantity': '1',
      'rate': this.InitialPrice,
      'transactionId': this.trans,
    }


    let orderParam = {

      "patientid": this.FreshData.patientId,
      "transactionid": this.trans,
      "custGuId": localStorage.getItem('CustGuId'),
      "amount": this.InitialPrice,
      "cgstamount": 100.10,
      "sgstamount": 100.10,
      "igstamount": 10.010,
      "totalamount": this.InitialPrice,
      "discountamount": 1111.2,
      "discountpercent": 211.110,
      "orderstatus": "Pending",
      "partnerorderid": "21222",
      "scheduleevent": this.selectedTimeSlot.selectedSlot,
      "partnercontactid": "222213331",
      "rate_Id": "168243",
      "offeringguid": "A3D10040-02B0-44DE-A0CC-37BB59EA2966",
      "productid": productDetail.id,
      "units": 23,
      "productimage": "book.jpg",
      "productdescription": "test",
      "vendorid": "52345",
      "vendorname": "Torus",
      "addressId":"111",
      "productName":productDetail.name,
      }

    this.http.post("https://apixuat.heytorus.com/api/v1/Call/Shopping/Health/Lab/Order",orderParam).subscribe((result:any)=>{
      if(result.Status == 1){
        this.openPaymentPopUp(successData.transactionId);
      }
    });
  }

  async openPaymentPopUp(data) {
    this.modalController.dismiss()

    const modal = await this.modalController.create({
      component: SuccessDetailsComponent,
      componentProps: {
        'transactionId': data,
        'trans': this.InitialPrice
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        this.modalController.dismiss()
      });
    return await modal.present();
  }


  dismiss() {
    this.modalController.dismiss()
  }

  totalPrice() {
    if (this.datas.length == 1) {
      this.InitialPrice += this.datas[0].itemList[0].item_rate
      console.log(this.InitialPrice);

    }
    else {
      for (var i = 0; i < this.datas.length; i++) {
        this.InitialPrice += this.datas[i].itemList[0].item_rate
      }
    }

  }

  dataForOrderSummary = {
    medicineName: "Glucose - Fasting",
    provider: "Also known as Fasting Blood Sugar",
    provider1: "By Metropolis Healthcare Ltd. • Pathology Test",
    remove: "Remove",
    testNo: "1",
    quantity: "1",
    patientName: "Swapnil Vasant Joshi",
    address: "ICC Chambers, Saki Vihar Rd, Muranjan Wadi, Marol, Powai, Mumbai, Maharashtra, 400072",
    phoneNumber: "9967022045",
    price: "₹120.00",
    shippingCharge: "₹10.00",
    estimatedDate: "16 Mar 2022",
    total: "₹130.00",
    msg: "Yay! You've saved ₹50 on your shopping",
    userName: "Pratik Vasant Goswami",
    userAddress: "Shop No.1 to 05,Ground Floor, Kinjal Paradise, Plot No.43, Andheri west, Maharashtra 402010",
    userMobioleNo: "9810806463",
    currentDate: "",
    time: "",

    gender: "",
    state: "",
    city: "",
    pincode: "",
    fullname: "",
    age: ""

  }

  getRegistrationDetails(){
    let headers: HttpHeaders = new HttpHeaders({
          "Token" : "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi"
        });
        let params={

          "custGuId":localStorage.getItem('CustGuId'),

        }

        this.http.post("https://apixuat.heytorus.com/api/v1/Call/Shopping/Health/Lab/RegisterUser", params, {headers}).subscribe((res:any)=>{


        console.log("Register details data==========>", res);

        },(err)=>{
          this.errorShow(err.Message ,'getRegistrationDetails ->  Http request');
        })
  }


  // errorShow(message, functionName) {
  //   this.loaderService.hideLoader();
  //   this.commonFunctionService.showErrorsService(this.errorList?.error, null, message, this.errorList?.okText);
  // }


  callProfileData() {

    console.log("local custguid");

    this.localCustGuId = localStorage.getItem('CustGuId');

    if (this.localCustGuId) {

      let reqParams = {

        CustGuId: this.localCustGuId,

      }

      this.getProfileData(reqParams);

    }



  }

  getProfileData(reqParams) {

    //this.loaderService.showLoader();

    this.CommonService.getProfileDetails(reqParams).subscribe((data: any) => {

      if (data ) {

        //this.loaderService.hideLoader();

        this.profileDetails = data;

        this.dateofbirth=this.profileDetails.DateOfBirth

        this.MobileNumber=this.profileDetails.MobileNo

        this.EmailId=this.profileDetails.EmailId



        console.log(this.MobileNumber,"hihihihihihihihihihihihihihihihihihihihihihih")



        console.log(JSON.stringify(data));

        this.CommonService.setUserDetail(data);

      } else {

        this.errorShow(data?.Message, "getProfileDetails -> status");

      }

    },
    // (error: any) => {

    //   this.errorShow(error?.Message, "getProfileDetails -> Http request");

    // }
    )



  }
}
