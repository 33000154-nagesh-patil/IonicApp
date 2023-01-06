import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { MFServiceService } from 'projects/core/src/lib/services/mfservice.service';

@Component({
  selector: 'lib-compare-funds',
  templateUrl: './compare-funds.component.html',
  styleUrls: ['./compare-funds.component.scss'],
})
export class CompareFundsComponent implements OnInit {
  @Input()  imageList: any;
  @Input() CompareList:any
  Realdata=[]
  PlanIDperams:any
  errorList: any;
  ApiDataList: any=[];
  List:any=[];
  constructor(private router:Router,private modalCtrl:ModalController,private allconfigdataservice:AllConfigDataService,private  http:HttpClient,private mfservice:MFServiceService,private loaderService:LoaderService,private commonFunctionService:CommonFunctionService) { }

  ngOnInit() {
    this.CompareList=this.router.getCurrentNavigation().extras.state.CompareList;
    this.imageList=this.router.getCurrentNavigation().extras.state.imageList;
    this.ApiDataList=[];
    // for(let i=0;i<this.CompareList.length;i++){
    //        this.Realdata.push(this.CompareList[i]);
    //        this.PlanIDperams={
    //         "PlanId1": this.CompareList[0]?.plan_id,
    //         "PlanId2": this.CompareList[1]?.plan_id,
    //         "PlanId3": this.CompareList[2]?.plan_id
    //        }
          
    // }
    this.CompareFund(this.PlanIDperams)
  }
  dissmis(){
    window.history.back();
  }
  deleteCompareCard(e,data){
    
    this.CompareList.splice(e,1);
    if(this.CompareList.length==1){
      this.dissmis()
    }
  }

  CompareFund(params){
   
    // this.http.post("https://apixuat.heytorus.com/api/v1/Call/Shopping/Wealth/mutualfund/getCompare",params).subscribe((data:any) => {
    // this.mfservice.UCCgenerate(params).subscribe((data:any) => {
    this.mfservice.CompareFund(params).subscribe((data:any) => {
      if (data ) {
        this.ApiDataList=data;
      } else {
        this.errorShow(data?.Message, "processPANPostData -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "processPANPostData -> Http request");
    })
  
  }
  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, 'container-view page -> ' + functionName, message, this.errorList?.okText);
  }
 
}
