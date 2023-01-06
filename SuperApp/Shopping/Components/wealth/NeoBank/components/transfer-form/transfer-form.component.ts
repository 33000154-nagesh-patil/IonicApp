// import { Component, OnInit ,Input} from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { ModalController } from '@ionic/angular';

import { Component, OnChanges,Input,ChangeDetectionStrategy,SimpleChanges,OnInit,} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CommonService } from 'projects/core/src/lib/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { PaymentResultComponent } from '../payment-result/payment-result.component';
// import { TransferComponent } from '../transfer/transfer.component';
// import { TransactionService } from '../../transaction.service';
import { HttpClient } from '@angular/common/http';
import { NeoServiceService } from '../../neo-service.service';
declare var RazorpayCheckout:any;


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
  validators: JsonFormValidators;
}

export interface JsonFormData {
  controls: JsonFormControls[];
}



@Component({
  selector: 'app-transfer-form',
    templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
})
export class TransferFormComponent implements OnChanges {
  ionicForm: FormGroup;
  defaultDate = "1987-06-30";
  isSubmitted = false;
  @Input() imageList: any;
  typeOfId:any;

  @Input() jsonFormData;
  message:any
  radioModel:any = false;
  mobileRadioButton:any;
  accountOpenRadioButton:any;
  public myForm: FormGroup = this.fb.group({});
  prod: any;
  details:any=false
  dateshow: boolean=false;
  ChengeFormFormat:any
  bankNameFromIfsc: any;
  ifscList:boolean=true
  sendMoney: boolean=false ;
  button: any;


  constructor( private route:ActivatedRoute, private http:HttpClient,private router:Router,public fb: FormBuilder,private commonService:CommonService,
    private allConfigDataService: AllConfigDataService,private modalctrl:ModalController,private neoBankService:NeoServiceService) { 
      this.prod=this.route.snapshot.paramMap.getAll('status')
      console.log("clicked on money",this.prod[0]);
      
      if (this.prod[0]=='Send Money') {
        this.sendMoney=true
        this.jsonFormData=this.neoBankService.getSendMOneyJson()
        console.log("hello",this.jsonFormData);
        
      }else{
        this.jsonFormData=this.neoBankService.getJSON()
        this.button=this.jsonFormData.nextStep
        console.log('hellojson',this.jsonFormData.nextStep);


      }
  

    
    this.ngOnChanges(this.jsonFormData)
  }
 
  ngOnChanges(changes: SimpleChanges) {
    // if (!changes.jsonFormData.firstChange) {
      this.createForm(this.jsonFormData.controls);  
    // }
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
        this.fb.control(control.value, validatorsToAdd)
      );
    }
  }

  onSubmit(value:any) {
    this.modalctrl.dismiss()
    if (!this.myForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
    this.router.navigate(['/Shopping/OrderBook'],{state:{listing:""}});

      // this.payWithRazor1(this.myForm.value.amount,'')
      console.log(this.myForm.value)
    }
    // this.bbpsService.setData(this.myForm.controls)

 
    console.log('Form valid: ', this.myForm.valid);
    console.log('Form values: ', this.myForm.value);
  }
    
  ngOnInit() {
 
    
    this.imageList = this.allConfigDataService.getConfig('images');
  
  }


  addbeneficiaryApi(){

    let data = {
      "CFT": "Shopping",
      "Product": "Neobanking",
      "Sub-Folder": "AddCustomerBeneficiaryAcccount",
      "FileName": "Add customer Beneficiary account"
  }
  
    this.http.post("https://apixuat.heytorus.com/api/v1/Dummy/get/generalApi", data).subscribe(
  
      (data: any) => {
        if (data && data?.response=='Beneficiary account added successfully.') {
        this.details=true
        console.log(data.response);
        
 
        }
  
      }
  
    )

  }

  goToDeatils(){
     this.addbeneficiaryApi()
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
            email: 'pankaj.gupchuti@heytrous.com', //optional
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
          
          console.log("payment_id",success)
          if(success.razorpay_payment_id){
            self.getProductionTransactionPayment(success.razorpay_payment_id,success.razorpay_signature,"Success")
            
          }else{
            self.getProductionTransactionPayment('','',"Failed")
            self.errorShow('Payment Failed, Please Try Again',"payWithRazorpay -> successCallback");
          }
    
        };
    
        var cancelCallback = function (error) {
          console.log("error",error)
          self.getProductionTransactionPayment('','',"Cancelled")
          self.errorShow(error.description,"payWithRazorpay -> cancelCallback");
        };
    
        // RazorpayCheckout.on('payment.success',this.openSucessPage())
        // RazorpayCheckout.on('payment.cancel')
        // RazorpayCheckout.open(options);
         let rzp1 = new this.commonService.nativeWindow.Razorpay(options);
        rzp1.open();
    
      }
   

      // async openSucessPage(){
      //   this.impsUserAuthtxn()
      //   const modal =await this.modalctrl.create({
      //   component:PaymentResultComponent,
      //   componentProps:{
      //   'imageList':this.imageList,
        
      //   },
      //   backdropDismiss:false
      //   });
        
      //   modal.onDidDismiss().then((data:any)=>{
        
      //   });
      //   return modal.present();
        
      //   }



        goTotranfer(){
          this.router.navigate(['/transaction/transaction']);
        }
        goToOtp(){
          this.generateOtpAPI()
        }
        // async goToback(){
        //   // this.modalctrl.dismiss();
        //   const modal = await this.modalctrl.create({
        //     component:TransferComponent,
        //     componentProps: {
        //       'imageList': this.imageList,
        //       StatusPending:true,
        //     },
           
        
        //   }); 
        //   modal.onDidDismiss().then((data)=>{
        //   });
        //  modal.present()
        // }




        generateOtpAPI(){

          let data = {
            "CFT": "Shopping",
            "Product": "Neobanking",
            "Sub-Folder": "OtherBankGenerateOtp",
            "FileName": "OtherBankGenerateOtpResponse"
        }
        
          this.http.post("https://apixuat.heytorus.com/api/v1/Dummy/get/generalApi", data).subscribe(
        
            (data: any) => {
              if (data && data?.response=='OTP Generated') {
          this.router.navigate(['transaction/otp']);
  
              }
        
            }
        
          )

        }





        
fetchIFSCListApi() {

  let data = {
    "CFT": "Shopping",
    "Product": "Neobanking",
    "Sub-Folder": "IFSCList",
    "FileName": "IfscListResponse"
}

  this.http.post("https://apixuat.heytorus.com/api/v1/Dummy/get/generalApi", data).subscribe(

    (data: any) => {
      if (data && data?.response=='Record Found') {
      
this.bankNameFromIfsc=data.ifscdetails.forEach(element => {
 this.bankDetails1.branch= element.branch
 this.bankDetails1.bank_name=element.bank_name
});
    console.log(this.bankDetails1.bank_name);    

      }

    }

  )
}

bankDetails1={
  branch:"",
  bank_name:"",
  name:""
   }


  onKey(event,name){
    if(name != "ifsc"){
      return
    }
    else{
      if(this.myForm.value.ifsc.length>10){
        this.fetchIFSCListApi()
      }
      else{
        return
      }
      
    }
  }



  dateShow(e:any){
  
    if(e==="IMPS"){
      this.postImpsTransfer()
    }
      else if(e==="Schedule Payment"){
    this.dateshow=true
    
        }else{
          this.dateshow=false
        }
    
      }

  postImpsTransfer(){
    
  let data = {
    "CFT": "Shopping",
    "Product": "Neobanking",
    "Sub-Folder": "postIMPSTransfer",
    "FileName": "postIMPSTransferResponse"
}

  this.http.post("https://apixuat.heytorus.com/api/v1/Dummy/get/generalApi", data).subscribe(

    (data: any) => {
      if (data && data?.response) {
        console.log(data.response);
        
         this.impsUserAuthToken()
      }
    }
  )
  }


  impsUserAuthToken(){
    
    let data = {
      "CFT": "Shopping",
      "Product": "Neobanking",
      "Sub-Folder": "IMPSuserAuthenticationToken",
      "FileName": "IMPSuserAuthenticationToken"
  }
  
    this.http.post("https://apixuat.heytorus.com/api/v1/Dummy/get/generalApi", data).subscribe(
  
      (data: any) => {
        if (data && data?.response=='TOKEN CREATED') {
        console.log(data.response);

           this.impsUserAuthValidate()
        }
      }
    )
    }

    impsUserAuthValidate(){
    
      let data = {
        "CFT": "Shopping",
        "Product": "Neobanking",
        "Sub-Folder": "IMPSuserAuthenticationValidate",
        "FileName": "IMPSuserAuthenticationValidateResponse"
    }
    
      this.http.post("https://apixuat.heytorus.com/api/v1/Dummy/get/generalApi", data).subscribe(
    
        (data: any) => {
          if (data && data?.response=='The password is correct.') {
        console.log(data.response);
           
          }
        }
      )
      }
  
      impsUserAuthtxn(){
    
        let data = {
          "CFT": "Shopping",
          "Product": "Neobanking",
          "Sub-Folder": "IMPStransactionAuthorization",
          "FileName": "IMPStransactionAuthorizationResponse"
      }
      
        this.http.post("https://apixuat.heytorus.com/api/v1/Dummy/get/generalApi", data).subscribe(
      
          (data: any) => {
            if (data && data?.response=='Transaction is Successful') {
               
            }
          }
        )
        }

      }

