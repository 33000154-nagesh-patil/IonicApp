import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { NetworkService } from 'projects/core/src/lib/services/network.service';
import { DeclarationComponent } from '../declaration/declaration.component';
import { UpdateEmailComponent } from '../update-email/update-email.component';
import { UpdateIncomeRangeComponent } from '../update-income-range/update-income-range.component';
import { UpdateMobileNumberComponent } from '../update-mobile-number/update-mobile-number.component';
import { UpdateNomineeDetailsComponent } from '../update-nominee-details/update-nominee-details.component';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'lib-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
})
export class ClientDetailsComponent implements OnInit {
  imageList: any;
  panelOpenState = false;

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no'
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'yes', //iOS only
    toolbar : 'yes', //iOS only
    enableViewportScale : 'no', //iOS only
    allowInlineMediaPlayback : 'no',//iOS only
    presentationstyle : 'fullscreen',//iOS only
    fullscreen : 'yes',//Windows only 
  toolbarposition: 'top',
  suppressesIncrementalRendering: 'no',
  transitionstyle: 'crossdissolve',
  toolbarcolor:'#D3D3D3'
};

  currentDevice: any;

  bank: any =[
    {
      "bankdetail": "Bank Name",
      "bankdetailValue": "HDFC Bank Ltd."
    },
    {
      "bankdetail": "Account Number",
      "bankdetailValue": "05461050013527"
    },
    {
      "bankdetail": "Bank Branch",
      "bankdetailValue": "11 Anjana Apt_HDFC0000546"
    },
    {
      "bankdetail": "MICR Code",
      "bankdetailValue": "HDFC0000546"
    },
    {
      "bankdetail": "IFSC Code",
      "bankdetailValue": "HDFC0000546"
    }
  ]

  branchDtails: any = [
    {
      "title": "Branch Name",
      "titlevalue": "Borivali"
    },
    {
      "title": "RM Name",
      "titlevalue": "Sachin Kumar"
    },
    {
      "title": "RM Mobile Number",
      "titlevalue": "9892924558"
    },
    {
      "title": "RM Email ID",
      "titlevalue": "Kumar.sachin@torus.com"
    },
    {
      "title": "Branch Address",
      "titlevalue": "W?/O Anil Boga, near Ashish industry, prabhadevi, dadar"
    }
  ]

  downloadValues: any = [
    {
      "name": "KYC Details"
    },
    {
      "name": "POA"
    },
    {
      "name": "Supporting Documents"
    },
    {
      "name": "Change Request Form"
    }
  ]

  demat: any = [
    {
      "dematdetail": "Depositary Name",
      "dematdetailValue": "CDSL"
    },
    {
      "dematdetail": "Demat Account",
      "dematdetailValue": "1304140010190351"
    },
    {
      "dematdetail": "SEBI Payout Frequency",
      "dematdetailValue": "Quarterly"
    },
    {
      "dematdetail": "Running Account Authorization Date",
      "dematdetailValue": "09 Aug 2022"
    }
  ]


  pricingPlan: any = [
    {
      "title":" Delivery",
      "title2":" Intraday Cash",
      "titleValue": "0.25 %",
      "titleValue2": "0.25 %"
    },
    {
      "title":" Futures",
      "title2":"Options",
      "titleValue": "0.25 %",
      "titleValue2": "0.25 %"
    },
    {
      "title":" Currency Futures",
      "title2":" Currency Options",
      "titleValue": "0.25 %",
      "titleValue2": "0.25 %"
    },
    {
      "title":" DPI Basis",
      "titleValue": "0.25 %"
    }
  ]


  nomineeDetails: any = [
    {
      "nomineeTitle": "Full Name",
      "nomineeTitleValue": "Sagar Ramesh Parab"
    },
    {
      "nomineeTitle": "Gender",
      "nomineeTitleValue": "Male"
    },
    {
      "nomineeTitle": "Relationship",
      "nomineeTitleValue": "Brother"
    },
    {
      "nomineeTitle": "Date of Birth",
      "nomineeTitleValue": "10 Oct 1990"
    },
    {
      "nomineeTitle": "Percentage Allocation",
      "nomineeTitleValue": "30"
    },
    {
      "nomineeTitle": "PAN Card Number",
      "nomineeTitleValue": "BUPR3750G"
    },
  ]



  ClientData: any;
  name: any;
  userId: any;
  emailId: any;
  mobileNum: any;
  birthDate: any;
  correspondanceAddress: any;
  permanentAddress: any;
  panNum: any;
  clientCode: any;
  fullName: any;
  mobileNumVer: boolean = false;
  editMobNum: boolean = false;
  public otpVerificationCodeFormGroup: FormGroup;
  showResendButton: any;
  countDown: any;
  OTPsent: boolean = false;
  emailIdVerificaion: boolean = false;
  editMobNumber:boolean = false
  emailOTP:boolean=false
  otpValidate:boolean=false


  @Output() otpVerification = new EventEmitter();
  @Output() resendOTPVerification = new EventEmitter();





  constructor(private allConfigDataService: AllConfigDataService, private modalCtrl: ModalController,
    private http: HttpClient, private router: Router, private networkService: NetworkService,private theInAppBrowser: InAppBrowser
    ) { }



  ngOnInit() {
     this.getClientDetails()
    this.imageList = this.allConfigDataService.getConfig('images')

  this.networkService.getCurrentPlatform().subscribe((data) => {
    this.currentDevice = data;
    console.log("Current Device",this.currentDevice)
  })

  }

  goBack() {
    this.modalCtrl.dismiss()
    // window.history.back()
  }
  ClosureClientCode=localStorage.getItem("ClientID");



  async updateEmailId() {
    const modal = await this.modalCtrl.create({
      component: UpdateEmailComponent,
      cssClass: 'client-details-modal',
      componentProps: {
        'imageList': this.imageList,
      },
      backdropDismiss: true
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log("hiiii");

      });

    return await modal.present();
  }

  // async addNomineeDetails() {
  //   const modal = await this.modalCtrl.create({
  //     component: UpdateNomineeDetailsComponent,
  //     componentProps: {
  //       'imageList': this.imageList,
  //     },
  //     backdropDismiss: true
  //   });
  //   modal.onDidDismiss()
  //     .then((data) => {
  //     });
  //   return await modal.present();
  // }

  addNomineeDetails(){
    this.router.navigate(['stocks/updateNominiDetails'])
  }


  async updateMobileNumber() {
    const modal = await this.modalCtrl.create({
      component: UpdateMobileNumberComponent,
      cssClass: 'client-details-modal',
      componentProps: {
        'imageList': this.imageList,
      },
      backdropDismiss: true
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log("hiiii");
      });
    return await modal.present();
  }


  async updateIncome() {
    const modal = await this.modalCtrl.create({
      component: UpdateIncomeRangeComponent,
      cssClass: 'Income-update-modal',
      componentProps: {
        'imageList': this.imageList,
      },
      backdropDismiss: true
    });
    modal.onDidDismiss()
      .then((data) => {
      });

    return await modal.present();
  }



  getClientDetails() {
    let param = {
      "entity_id": "123456",
      "source": "N",
      "token_id": "",
      "vi": "",
      "data": {
        "client_id": localStorage.getItem("ClientID"),
        "row_count": "25",
        "row_offset": "1"
      }
    }
    this.http.post('https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/getClientDetails', param).subscribe((data: any) => {
      this.ClientData = data.data[0]
      console.log(this.ClientData, 'subodhdata');

      this.userId = this.ClientData.entity_id
      this.emailId = this.ClientData.email
      this.mobileNum = this.ClientData.mobile_no
      this.birthDate = this.ClientData.dob
      this.correspondanceAddress = this.ClientData.address_line1
      this.permanentAddress = this.ClientData.address_line1
      this.panNum = this.ClientData.pan
      this.clientCode = this.ClientData.login_id
      this.name = this.ClientData.entity_name
    })
  }


  cancel() {
    this.editMobNum = false;
    this.mobileNumVer = false;
    this.OTPsent = false;
  }

  reActiveMob() {
    this.mobileNumVer = true;
    this.editMobNum = false;
  }
  numVerification() {
    this.mobileNumVer = false;
    this.editMobNum = true;

  }
  submit() {
    this.OTPsent = true;
    this.mobileNumVer = false;
    this.editMobNum = false;
  }

  numValidate() {
    this.emailIdVerificaion = true;
    this.editMobNum = false;
    this.mobileNumVer = false;
    this.OTPsent = false;
  }

  emailVerify(){
    this.otpValidate=true
    this.editMobNumber=true;
    this.emailIdVerificaion = false;
    this.editMobNum = false;
    this.mobileNumVer = false;
    this.OTPsent = false;
  }
  emailOTPs(){
    this.emailOTP=true;
    this.editMobNumber=false;
    this.emailIdVerificaion = false;
    this.editMobNum = false;
    this.mobileNumVer = false;
    this.OTPsent = false;
  }


  async emailValidateOTP() {
     this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: DeclarationComponent,
      // cssClass: 'Income-update-modal',
      componentProps: {
        'imageList': this.imageList,
      },
      backdropDismiss: true
    });
    modal.onDidDismiss()
      .then((data) => {
      });
    return await modal.present();
  }

  backChange()
  {
    this.modalCtrl.dismiss()
  }

  accountColsure() {

    // window.open("https://www.amazon.in/");
    // console.log("lifestyle amazon",e)
    // let target = '_self'; //CordovaBrowser
    // let target = "_system"; //system browser
    let target = '_blank'; //InAppBrowser
    if(this.currentDevice === 'iOS' || this.currentDevice === 'iphone'){
      target = '_blank';
    }
    let url = `https://aq.reliancesmartmoney.com/accountclosure/?mobile=${this.mobileNum}&ClientCode=${this.ClosureClientCode}`
    this.theInAppBrowser.create(url,target,this.options);


  // localStorage.getItem("ClientCode")
  // window.open(`https://aq.reliancesmartmoney.com/accountclosure/?mobile=${this.mobileNum}&ClientCode=${this.ClosureClientCode}`);
}


}
