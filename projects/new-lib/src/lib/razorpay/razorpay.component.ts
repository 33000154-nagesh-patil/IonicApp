import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { LoaderService } from '../../../../../projects/core/src/lib/services/loader.service';

declare var RazorpayCheckout: any;
@Component({
  selector: 'lib-razorpay',
  templateUrl: './razorpay.component.html',
  styleUrls: ['./razorpay.component.scss'],
})


export class RazorpayComponent implements OnInit {
  @Input() imageList: any;
  @Input() checkOutData:any;
  @Input() educard:any=false
data:any=[]
  errorList: any;
  grandTotal:number=0;
  amount: any;
  payId: any;
  success: any;
  constructor(private allConfigDataService: AllConfigDataService,private modalCtrl:ModalController,private http:HttpClient,private CommonService: CommonService) {

  }

  ngOnInit() {
    console.log("ABhishekkkk",this.checkOutData);
    if(this.educard===true){
      this.data=this.checkOutData;
    }else{
    this.data.push(this.checkOutData)
    }
    // for(let x of this.data){
    //   console.log(x.price);
    //   // x.price = x.price.replace(",","");
    //   this.grandTotal+=parseFloat(x.price);
    //   console.log(this.grandTotal);

    // }

    this.imageList = this.allConfigDataService.getConfig('images');

  }

  payWithRazor1(amount,orderId) {
      var self:any = this;
      var options = {
        description: 'Credits towards consultation',
        image: 'https://cdn.zeplin.io/60a5fc059289442bc47e7527/assets/727E125B-F005-459F-AB50-9453AAC9134E.svg',//this.imageList?.companyLogo,
        order_id: '', //optional
        currency: "INR", // your 3 letter currency code
        key: "rzp_test_pBI3b5vibunYxn", // your Key Id from Razorpay dashboard
        amount: Number(Math.round(amount*100)), // Payment amount in smallest denomiation e.g. cents for USD
        name: 'Torus',
        prefill: {
          email: 'pankaj.gupta@heytrous.com', //optional
          contact: '7737879061', //optional
          name: 'pankaj received payment' //optional
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
// rzp_test_5B5z6dC8eP2FCD
      var successCallback = function (success) {

        console.log("payment_id",success)
        if(success.razorpay_payment_id){
          this.success=success;
          self.getProductionTransactionPayment(success.razorpay_payment_id,success.razorpay_signature,"Success")

        }else{
          self.getProductionTransactionPayment('','',"Failed")
          self.errorShow('Payment Failed, Please Try Again',"payWithRazorpay -> successCallback");
        }

        //console.log('payment_id: ' + payment_id);
      };

      var cancelCallback = function (error) {
        console.log("error",error)
        self.getProductionTransactionPayment('','',"Cancelled")
        self.errorShow(error.description,"payWithRazorpay -> cancelCallback");
      };

    //  RazorpayCheckout.on('payment.success', this.openSuccessPage())
    //   RazorpayCheckout.on('payment.cancel', cancelCallback)
    //   RazorpayCheckout.open(options);
    let rzp1=new this.CommonService.nativeWindow.Razorpay(options,this.openSuccessPage(),cancelCallback);
    rzp1.open();
    rzp1.on('payment.failed', function (response){
      console.log("fail",response);
  })
  rzp1.on('payment.success', function (response){
      console.log("success",response);
  })
}

    openSuccessPage() {
      let successData = {
        'Title': "Introduction to Python",
        'Date': new Date(),
        'TransactionType': 'Done',
        'totalAmount': "",
        'quantity': '1',
        'rate': this.amount,
        'transactionId': this.payId,
      }
      this.openPaymentPopUp(this.success)
    }
    errorShow(message, functionName) {
      // this.loaderService.hideLoader();
      // this.commonFunctionService.showErrorsService(this.errorList?.error, null, message, this.errorList?.okText);
    }



    async openPaymentPopUp(data) {
      // console.log(data);

      // const modal = await this.modalCtrl.create({
      //   component: MFPaymentConfimationComponent,
      //   componentProps: {
      //     'transactionData': this.checkOutData,
      //     'imageList': this.imageList,
      //     'currentCountry': "India",
      //     'errorList': this.errorList,

      //   },
      //   backdropDismiss: false
      // });
      // modal.onDidDismiss()
      //   .then((data) => {

      //   });
      // return await modal.present();
    }
    back(){
      this.modalCtrl.dismiss("daa")
    }
    // remove(val){
    //   this.data.splice(val,1);
    //   this.grandTotal=0
    //   for(let x of this.data){

    //     this.grandTotal+=parseFloat(x.price);
    //   }
    // }

}

