import { CommonService } from 'projects/core/src/lib/services/common.service';
import { BuyGoldComponent } from './../buy-gold/buy-gold.component';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { stepperData } from 'projects/core/src/lib/interfaces/common.interface';
import { BankDetailsComponent } from 'projects/core/src/lib/components/bank-details/bank-details.component';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'lib-kyc-steps-digi-gold',
  templateUrl: './kyc-steps-digi-gold.component.html',
  styleUrls: ['./kyc-steps-digi-gold.component.scss'],
  
})
export class KycStepsDigiGoldComponent implements OnInit {
@Input() imageList:any;
@Input() _type:any;
@Input() metalType:any;
@Input() AccountNumber:any
@Input() ifsc:any
panFlag:any;
bankFlag:any;
custDataFlag:any;
  localCustGuId: any;
  currentFetcherModule: {
    // "OfferingGuId": "a3d10040-02b0-44de-a0cc-37bb59ea2966",
    OfferingGuId: string; Offering: string;
  };
  listOfKYC: any;
  pankyc: any;
  bankKyc: any;
  name: any;

  constructor(private http:HttpClient,private modalCtrl:ModalController,private commonService:CommonService) { }

  ngOnInit() {
    this.localCustGuId=localStorage.getItem('CustGuId');
    this.currentFetcherModule = {
      // "OfferingGuId": "a3d10040-02b0-44de-a0cc-37bb59ea2966",
      "OfferingGuId": "a12e68a9-da42-40c7-8156-20160dc31a72",
      "Offering": "Gold"

    }
    this.stepperData()
    // this.http.get('assets/digiGold/kycSteps.json').subscribe(async (res:any) => {
    //   this.panFlag=await res.Pan.isCompleted;
    //   this.bankFlag=await res.Bank.isCompleted;
    //   this.custDataFlag=await res.CustData.isCompleted;
    // })
    
  }
  getCurrentKYCData(type) {
    return this.listOfKYC ? this.listOfKYC.filter(x => x?.Document == type) : []
  }
  stepperData() {
    // this.loaderService.showLoader();
    let reqParams = {
      "CustGuId": this.localCustGuId,
      // "OfferingGuId": "a12e68a9-da42-40c7-8156-20160dc31a72"
      "OfferingGuId": "a12e68a9-da42-40c7-8156-20160dc31a72"
    }
    this.commonService.getDocumentList(reqParams).subscribe((data:any) => {
      if (data && data?.Status) {
        // this.commonService.setGetOfferingDocList(data.DocumentList)
        console.log("kycDocData", data)
        this.listOfKYC = data.DocumentList;
        this.pankyc=this.getCurrentKYCData('PAN')[0];
        this.bankKyc=this.getCurrentKYCData("Cheque")[0]
        this.panFlag=this.getCurrentKYCData('PAN')[0].IsCompleted;
        this.name=data.CustomerPanName;
        // this.panFlag='False';
        this.bankFlag=this.getCurrentKYCData("Cheque")[0].IsCompleted
        // this.bankFlag='False'
        this.custDataFlag=this.getCurrentKYCData('DigiDOC')[0].IsCompleted
        // this.custDataFlag='False'
        // debugger;
        // this.loaderService.hideLoader();
        if(this.bankFlag!='False'&&this.panFlag!='False'&&this.custDataFlag!='False')this.openModal()
        
      } 
    })
  }
  panEmitted(val){
    this.panFlag='True';
  }
  bankEmitted(val){
    let param={
      "uniqueId":localStorage.getItem('ClientCode'),
      "accountNumber":val.AccountNumber,
      "ifscCode":val.ifsc,
      "accountName":val.BankName,
      "bankName":val.BankName,
      "branch":val.Branch,
      "address":val.Address,
      "city":val.City,
      "state":val.State,
      "status":"active"
  
  }
    this.commonService.postBankRegistration(param).pipe(retry(3)).subscribe(async (res:any) => {

    if (res && res.Status){
      this.bankFlag='True';
    this.openModal()
    }
    else if(res.Status==0){
      this.bankEmitted(val)
    }
    }
    
    )
    
    
    
  }
  async openModal(){
   
    
    console.log("open Modal works");
    const modal=this.modalCtrl.create({
      component:BuyGoldComponent,
      componentProps:{
        'imageList':this.imageList,
        '_type':this._type,
        'metalType':this.metalType
        
      }
  
      
    });
    if(this.bankFlag=='True'){
      this.modalCtrl.dismiss();
      (await modal).present();
    }
    // debugger;
  }
  getcustData(e){
let param ={
  "CustGuId": this.localCustGuId,
      "OfferingGuId": "a12e68a9-da42-40c7-8156-20160dc31a72",
      "DocumentGuId": this.getCurrentKYCData('DigiDOC')[0].DocumentGuId,
}
this.commonService.postPanDetails(param).subscribe(async (res:any) => {
  console.log(res);
  
})
    if(this.bankFlag!='False')this.openModal()
    this.custDataFlag=true
  }
}
