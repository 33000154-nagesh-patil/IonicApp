import { BillpaymentService } from 'SuperApp/Shopping/Components/wealth/Bill Payment/billpayment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfirmationScreenComponent } from './../confirmation-screen/confirmation-screen.component';
import { FavouriteaddedComponent } from './../favouriteadded/favouriteadded.component';
import { ModalController } from '@ionic/angular';
// import { BbpsService } from './../../bbps.service';

import {
  Component,
  OnChanges,
  Input,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'projects/core/src/lib/services/common.service';
declare var RazorpayCheckout: any;


interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}


interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;

}


interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  options?: [];
  required: boolean;
  disable: boolean
  validators: JsonFormValidators;
}

export interface JsonFormData {
  controls: JsonFormControls[];
}

@Component({
  selector: 'lib-datacard',
  templateUrl: './datacard.component.html',
  styleUrls: ['./datacard.component.scss'],
})

export class DatacardComponent {
  jsonFormData;
  message: any
  imageList: any
  public myForm: FormGroup = this.fb.group({});
  formName: string;
  selectOption: any;
  subCategory: string;
  serviceDetails: any
  BroadBand: any
  sub: any; 
  buttonText: boolean;
  transactionId: any;
  suboptions: any = [];
  showField: boolean = false;
  disable: boolean = true
  json: any;
  optionEvent: any;
  formValue: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private billPaymentService:BillpaymentService, private mdlctrl: ModalController,
    private commonService: CommonService, private http: HttpClient, private router: Router,private modalCtrl:ModalController) {

  }



  createForm(controls: JsonFormControls[]) {
    console.log(controls);

    for (const control of controls) {
      const validatorsToAdd = [];

      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }

      this.myForm.addControl(
        control.name,
        this.fb.control({
          value: control.value,
          disabled: control.disable
        },
          validatorsToAdd)
      );
      console.log(this.myForm.valid, 'isValid');

    }
  }

  removeMYControl(control) {
    this.myForm.removeControl(control.name)
    console.log(control, 'removed');

  }

  onSubmit(val) {
this.modalCtrl.dismiss()
    if (!this.myForm.valid && this.disable) {
      console.log('Please provide all the required values!')
      return false;
    } else if (val === 'Proceed To Pay') {
      // this.payWithRazor1(this.myForm.value.AmountType, '')
    this.router.navigate(['/Shopping/OrderBook'],{state:{listing:""}});


    } else {
    this.router.navigate(['/Shopping/OrderBook'],{state:{listing:""}});

// this.formValue=this.myForm.value
// console.log(this.formValue,'......');

//       for (let x of this.sub) {
//         this.removeMYControl(x)
//       }
//       this.myForm.updateValueAndValidity()
//       this.http.get('assets/neo-bank/fetchbiller.json').subscribe(async (res: any) => {
//         if (res[this.subCategory]?.normal?.controls) {
//           this.json = res[this.subCategory].normal
//           this.sub = res[this.subCategory].normal.controls
//           this.createForm(this.sub)
//         } else {
//           this.sub = res[this.subCategory]?.normal?.[this.optionEvent]

//           this.json = res[this.subCategory].normal
//           this.createForm(this.sub)
//           this.showField = false
//         }
//         this.disable = false

//       })
    }
    this.billPaymentService.setData(this.myForm.controls)


    console.log('Form valid: ', this.myForm.valid);
    console.log('Form values: ', this.myForm.value);
  }





  payWithRazor1(amount, orderId) {
    var self: any = this;
    var options = {
      description: 'Credits towards consultation',
      image: 'https://cdn.zeplin.io/60a5fc059289442bc47e7527/assets/727E125B-F005-459F-AB50-9453AAC9134E.svg',//this.imageList?.companyLogo,
      order_id: '', //optional
      currency: "INR", // your 3 letter currency code
      key: "rzp_test_5B5z6dC8eP2FCD", // your Key Id from Razorpay dashboard
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


    // RazorpayCheckout.on('payment.success', this.openSucessPage())
    // RazorpayCheckout.on('payment.cancel')
    // RazorpayCheckout.open(options);
    let rzp1 = new this.commonService.nativeWindow.Razorpay(options, this.openSucessPage());
    rzp1.open();

  }




  async openSucessPage() {


    this.getBillPayStatus()

    const modal = await this.mdlctrl.create({
      component: ConfirmationScreenComponent,
      componentProps: {
        'imageList': this.imageList,
      },
      backdropDismiss: false
    });
    modal.onDidDismiss().then((data: any) => {
    });
    return modal.present()
  }


  ngAfterViewInit(){
   setTimeout(() => {
    this.myForm.reset()
    this.myForm.enable()
    this.jsonFormData = this.billPaymentService.getJSON()
    this.subCategory = this.billPaymentService.getFormName()
    console.log("sub",this.subCategory);
    
    this.json = this.jsonFormData[this.subCategory].normal
console.log(this.json);

    if (this.jsonFormData[this.subCategory]?.normal) {
      
      this.sub = this.jsonFormData[this.subCategory].normal.controls
      console.log(this.sub, "=======================>");
      this.createForm(this.sub)
    } else {
      this.sub=[]
      this.suboptions = this.jsonFormData[this.subCategory]?.normal?.options;
      this.showField = true
      console.log(this.suboptions, "myData");
    }
   }, 1000);
   }

  ionViewDidEnter() {
    this.myForm.reset()
    this.myForm.enable()
    this.jsonFormData = this.billPaymentService.getJSON()
    this.subCategory = this.route.snapshot.paramMap.get("type")
    console.log("sub",this.subCategory);
    
    this.json = this.jsonFormData[this.subCategory].normal

    if (this.jsonFormData[this.subCategory]?.normal?.controls) {
      
      this.sub = this.jsonFormData[this.subCategory].normal.controls
      console.log(this.sub, "=======================>");
      this.createForm(this.sub)
    } else {
      this.sub=[]
      this.suboptions = this.jsonFormData[this.subCategory]?.normal?.options;
      this.showField = true
      console.log(this.suboptions, "myData");
    }


  }

  dataChanged(e: any) {
    this.optionEvent = e
    console.log(e);
    this.sub = this.jsonFormData[this.subCategory]?.normal?.[e]
    this.createForm(this.sub)

  }



  getFetchBillerList(){
 let data={
  "channelid" : "PsJDWRgteobKWuMHMdZL",
    "partnerid" : "4oyQr0qKil",
    "searchtype" : "BILLERTYPE",
    "searchstr" : this.subCategory,
    "token" : "NA",
    "signcs" : "o/T/OawfdOBgqm5/M2Mjxxzdc6BpSw+0nFzWByrsjiaf2NrFnk5efphZvZijfhxoHKSS9M8hOUOOesjpuk6JMQ=="
 }
 this.http.post('https://apixuat.heytorus.com/SuperApp/Shopping/Wealth/BBPS/getList?fetchBillerList',data).subscribe((res:any)=>{


 })

  }

  goback() {
    for (let x of this.sub) {
      this.removeMYControl(x)
    }
    this.router.navigate(['/Shopping/Wealth/billpaymentservice'])
  }


  getBillPayStatus() {

    let data = {
      "CFT": "Fulfillment",
      "Product": "Neobanking",
      "Sub-Folder": "BillTxnStatus",
      "FileName": "BillTxnStatusResponse"
    }
    this.http.post("https://apixuat.heytorus.com/api/v1/Dummy/get/generalApi", data).subscribe(

      (data: any) => {
        if (data && data?.response == 'BILLPAY REQUEST SUCCESS') {

          this.getBillPayTxn()

        }
      }
    )
  }

  getBillPayTxn() {

    let data = {
      "CFT": "Fulfillment",
      "Product": "Neobanking",
      "Sub-Folder": "BillPayTxn",
      "FileName": "BillPayTxnResponse"
    }
    this.http.post("https://apixuat.heytorus.com/api/v1/Dummy/get/generalApi", data).subscribe(

      (data: any) => {
        if (data && data?.response == 'BILLPAY REQUEST SUCCESS') {
          this.transactionId = data.txndtls.txnid
        }
      }
    )
  }

}
