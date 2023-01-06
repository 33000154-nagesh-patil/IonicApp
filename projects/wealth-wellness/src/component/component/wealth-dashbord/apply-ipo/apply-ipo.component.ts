import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CreateUPIDComponent } from '../../wealth-profile/create-upid/create-upid.component';

declare var RazorpayCheckout: any;
@Component({
  selector: 'lib-apply-ipo',
  templateUrl: './apply-ipo.component.html',
  styleUrls: ['./apply-ipo.component.scss'],
})
export class ApplyIpoComponent implements OnInit {
  currentTypeOrder:any="amount";
  imageList: any;
  DisableconfirmButton: boolean =true;
  disable: any;
  @Input() name:any
  MarginReuired: number;
  counter: any;
  checkHere
  placeHolder: string = 'Market'
  AvailableFunds: number;
  isMargin: boolean;
  stockText: string;
  stockData: any;
  BSECMP: any;
  checkMe: boolean;


  constructor(private allConfigDataService: AllConfigDataService, private modalCtrl:ModalController,private router: Router) {
    // this.name=this.router.getCurrentNavigation().extras.state.name
  }

  ngOnInit() {
    this.imageList=this.allConfigDataService.getConfig('images')
  }
  @ViewChild('hiddenText') textEl: ElementRef;
  minWidth: number = 100;
  width: number = this.minWidth;

  async resize(val) {

    if (val) {
      this.checkMe = true;
    } else {
      this.checkMe = false;
    }

    if (val.key === 'Backspace') {
      this.width = this.width - this.minWidth;
      if (this.width <= this.minWidth) this.width = this.minWidth;
    }
    else this.width = this.width + 15;
  }
  segmentChanged(val){
    this.currentTypeOrder= val.detail.value
  }

  confirmnApply(){
  this.DisableconfirmButton = !this.DisableconfirmButton;
  }
  confirmation(){
    this.payWithRazor1(1000,'')
  }

  payWithRazor1(amount, orderId) {
    var self: any = this;
    var options = {
      description: 'Credits towards consultation',
      image: 'https://cdn.zeplin.io/60a5fc059289442bc47e7527/assets/727E125B-F005-459F-AB50-9453AAC9134E.svg',//this.imageList?.companyLogo,
      order_id: '', //optional
      currency: "INR", // your 3 letter currency code
      key: "rzp_test_pBI3b5vibunYxn", // your Key Id from Razorpay dashboard
      amount: Number(Math.round(amount * 100)), // Payment amount in smallest denomiation e.g. cents for USD
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

    var successCallback = function (success) {

      console.log("payment_id", success)
      if (success.razorpay_payment_id) {
        this.success = success;
        self.getProductionTransactionPayment(success.razorpay_payment_id, success.razorpay_signature, "Success")

      } else {
        self.getProductionTransactionPayment('', '', "Failed")
        self.errorShow('Payment Failed, Please Try Again', "payWithRazorpay -> successCallback");
      }
    };

    var cancelCallback = function (error) {
      console.log("error", error)
      self.getProductionTransactionPayment('', '', "Cancelled")
      self.errorShow(error.description, "payWithRazorpay -> cancelCallback");
    };
    RazorpayCheckout.on('payment.success', successCallback)
    RazorpayCheckout.on('payment.cancel', cancelCallback)
    RazorpayCheckout.open(options);

  }




  increment() {
    if (!this.counter) this.counter = 0
    if (this.MarginReuired > this.AvailableFunds) {
      this.isMargin = true;
    }
    else if (this.stockText == "BSE") {
      this.counter++;
      this.MarginReuired = this.counter * this.BSECMP;
      console.log(this.BSECMP);
    }
    else if (this.stockText == "NSE") {
      this.counter++;
      this.MarginReuired = this.counter * this.stockData?.LOWER_LIMIT;
      console.log(this.BSECMP);
    }
  }

  decrement() {
    if (this.counter === 0) {
      this.counter = 0;
    }
    else if (this.stockText == "BSE") {
      this.counter--;
      this.MarginReuired = this.counter * this.BSECMP;
    }
    else if (this.stockText == "NSE") {
      this.counter--;
      this.MarginReuired = this.counter * this.stockData?.LOWER_LIMIT;
    }
  }



  create(){}
  goBack(){
    // this.modalCtrl.dismiss()
    window.history.back()
  }


  async goToCreatePop() {
    const modal = await this.modalCtrl.create({
      component: CreateUPIDComponent,
      cssClass: 'stock-details-modal',
      backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {
    })
    modal.present();

  }
  cutOffPrice(){

  }
}
