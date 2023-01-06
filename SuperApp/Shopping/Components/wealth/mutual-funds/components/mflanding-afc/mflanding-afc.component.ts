import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { MFServiceService } from 'projects/core/src/lib/services/mfservice.service';

@Component({
  selector: 'app-mflanding-afc',
  templateUrl: './mflanding-afc.component.html',
  styleUrls: ['./mflanding-afc.component.scss'],
})
export class MFLandingAFCComponent implements OnInit {

  title="Mutual Funds";
  textName="Mutual Funds"
  DummayAPiData: any;
  SumOfCurrantValue:number=0
  InvestedAmount:number=0
  TotalReturnPer:any=0;
  errorList: any;
    constructor(private commonFunctionService:CommonFunctionService,private MFService:MFServiceService,private loaderService:LoaderService,private allconfigDataService:AllConfigDataService,private http:HttpClient, private router: Router ,private modalctrl:ModalController) { }
    imageList:any;
    mfFooterData:any
    cardCount:any;
    
    ngOnInit() {
      this.getProtfolio1()
      this.imageList = this.allconfigDataService.getConfig('images')
    }
    async hendler(data){
      this.router.navigate(['/Fullfilment/MutualFunds/transaction'], {
        state: {
          opneSegment: data,
        }
      });
        
    }
   
    getProtfolio1(){
      let custGuId = localStorage.getItem("CustGuId")
      let data={
        "CustGuId":custGuId 
    }
    this.getProtfolio(data)
  

    }
    getProtfolio(obj) {
      // this.loaderService.showLoader();
      this.MFService.getProtfolio(obj).subscribe((data) => {
        // this.http.post('https://apixcug.heytorus.com/api/v1/Call/Shopping/Wealth/mutualfund/portfolio',obj).subscribe((data:any)=>{
        this.loaderService.hideLoader();
        if (data ) {
          this.DummayAPiData = data.response
          this.cardCount = this.DummayAPiData.length;
          this.DummayAPiData.forEach(element => {
            this.InvestedAmount+=element.totalAmountInvested
            this.SumOfCurrantValue+=element.currentValue 
          });

          if(this.SumOfCurrantValue && this.InvestedAmount){
           
              let calDifferAmount:number=Math.round((this.SumOfCurrantValue-this.InvestedAmount))
              this.TotalReturnPer=((calDifferAmount/this.SumOfCurrantValue)*100).toFixed(2)
          }
       
        } else {
          this.errorShow(data?.Message, "MutualFundReedemStatus -> status");
        }
      }, (error: any) => {
        this.errorShow(error?.Message, "MutualFundReedemStatus -> Http request");
      })
    }
    errorShow(message, functionName) {
      this.loaderService.hideLoader();
      // this.commonFunctionService.showErrorsService(this.errorList?.error, 'Pan card component -> ' + functionName, message, this.errorList?.okText);
    }

}
