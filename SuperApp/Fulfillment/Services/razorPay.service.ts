import { BehaviorSubject } from 'rxjs';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { AllConfigDataService, CommonService } from 'index';

@Injectable({
    providedIn: "root"
})
export class RazorPayCommonService {
    appEnv=this.allConfigDataService.getConfig("environmentType");
    razorpayPaymentResponse = new BehaviorSubject('')
    constructor(
        private commonservice: CommonService,
        private allConfigDataService:AllConfigDataService
    ) { }

    payWithRazor1(amount, orderId) {
        var self: any = this;
        var options = {

            description: 'Credits towards consultation',
            image: 'https://cdn.zeplin.io/60a5fc059289442bc47e7527/assets/727E125B-F005-459F-AB50-9453AAC9134E.svg',//this.imageList?.companyLogo,
            order_id: self.appEnv=='proto'?'':orderId, //optional
            currency: "INR", // your 3 letter currency code
            key: "rzp_test_pBI3b5vibunYxn", // your Key Id from Razorpay dashboard
            amount: Number(Math.round(amount * 100)), // Payment amount in smallest denomiation e.g. cents for USD
            name: 'Torus',
            handler: function (response) {

                self.razorpayPaymentResponse.next(response.razorpay_payment_id);


            },

            prefill: {

                email: 'thisEmailId@gmai.co', //optional
                contact: '1234567890', //optional
                name: 'Torus' //optional
            },

            theme: {
                color: '#003399'
            },
            modal: {
                ondismiss: function () {
                    alert('dismissed')
                }
            }
        };
        //rzp_test_pBI3b5vibunYxn

        //rzp_live_fYfrbf9hbNiT6Q
        var successCallback = function (success) {
            self.openSuccessPage(success.razorpay_payment_id);
            // self.educationOrder();
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
        let rzp1 = new this.commonservice.nativeWindow.Razorpay(options, successCallback, cancelCallback);
        rzp1.open();
        rzp1.on('payment.failed', function (response) {
            console.log("fail", response);
        })
        rzp1.on('payment.success', function (response) {
            console.log("success", response);
        })


    }

}
