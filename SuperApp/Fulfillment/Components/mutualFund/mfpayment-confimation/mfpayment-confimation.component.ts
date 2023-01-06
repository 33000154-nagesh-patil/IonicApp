import { MFServiceService } from 'projects/core/src/lib/services/mfservice.service';
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from 'projects/core/src/lib/services/toast.service';

@Component({
  selector: 'app-mfpayment-confimation',
  templateUrl: './mfpayment-confimation.component.html',
  styleUrls: ['./mfpayment-confimation.component.scss'],
})
export class MFPaymentConfimationComponent implements OnInit {
  @Input() imageList: any;
  @Output() event =new EventEmitter();
  @Input() transactionData:any;
  @Input()currentCountry:any
  @Input() x:any;
  @Input()errorList:any
  @Input() FundTitle:any
  @Input()SuccessData:any
  @Input()RezerPayPaymentId:any
  progressBarModal: boolean = true;
  DummayAPiData: any;
  CurrentTime:any
  InvestAmount;any
  OrderId:any
  constructor(private mfservice:MFServiceService,private toastService:ToastService, private router: Router,private http:HttpClient,private AllConfigDataService:AllConfigDataService,private clipboard: Clipboard,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.imageList = this.router.getCurrentNavigation().extras.state.imageList;
    this.currentCountry = this.router.getCurrentNavigation().extras.state.currentCountry;
    this.SuccessData = this.router.getCurrentNavigation().extras.state.SuccessData;
    this.x = this.router.getCurrentNavigation().extras.state.x;
    this.RezerPayPaymentId = this.router.getCurrentNavigation().extras.state.RezerPayPaymentId;
    this.FundTitle = this.router.getCurrentNavigation().extras.state.FundTitle;
    this.errorList = this.router.getCurrentNavigation().extras.state.errorList;
    this.transactionData = this.router.getCurrentNavigation().extras.state.transactionData;
    this.CurrentTime=new Date()
    localStorage.setItem("mfInvest","1");
    if(this.SuccessData.TransType=="SIP"){
      this.InvestAmount=Math.round(this.SuccessData.installmentAmount)
    }else{
      this.InvestAmount=Math.round(this.SuccessData.orderValue)

    }

    // this.PaymentConfimation("01")
    // this.PaymentConfimation("02")
    // this.PaymentConfimation("03")

  }

  copyToClipboard(){
    let me = this.AllConfigDataService.getConfig('languageList');
    this.clipboard.copy(me.en["transactionidid"]);
    this.toastService.showAutoToast("Copyed on clipboard")

  }

  backF(){
    // this.modalCtrl.dismiss();
    window.history.back();
  }

  async TrackYourOrder() {
    this.router.navigate(['/Fullfillment/MutualFunds/transaction'], {
      state: {
        opneSegment: "All",
      }
    });

  }


  ExploreFund(){
    // this.modalCtrl.dismiss("1");
    this.router.navigate(['Shopping/Wealth/MutualFunds/Invest']);

  }
  PaymentConfimation(val){
    let params = {
        "orderGuId":this.OrderId,
        "statusCode":val
    }
    // this.http.post("http://apixuat.heytorus.com:5000/api/v1/Call/Shopping/Wealth/mutualfund/get/orderStatus",params).subscribe((data:any) => {
    this.mfservice.UCCgenerate(params).subscribe((data:any) => {
      if (data && data.Status=='1') {
         console.log(data,"payment")
      } else {
        // this.errorShow(data?.Message, "processPANPostData -> status");
      }
    }, (error: any) => {
      // this.errorShow(error?.Message, "processPANPostData -> Http request");
    })

  }
}
