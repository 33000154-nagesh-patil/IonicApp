import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
@Component({
  selector: 'lib-wealthRoboAdvisory',
  templateUrl: './wealth-robo-advisory.component.html',
  styleUrls: ['./wealth-robo-advisory.component.scss'],
})
export class WealthRoboAdvisoryComponent implements OnInit {
@Input() currentMoneySymbols:any;
@Input() imageList:any;
@Input() errorList:any;
showPersonalDetail:any=false;
showPlan:any=false;
showFamily:any=false;
showSpending:any=false;
showAssets:any=false;
showGoals:any=false;
wealthRoboData:any;
planningData:any;
planningTransactData:any;
  constructor(private commonService:CommonService,private loaderService:LoaderService,private commonFunctionService:CommonFunctionService) { }

  ngOnInit() {
    this.loaderService.showLoader();
    this.roboCollectionData()
  }
  roboCollectionData(){
   
    this.commonService.getDummyData().subscribe((data:any)=>{
      this.loaderService.hideLoader();
      if(data){
        this.wealthRoboData = data['wealthRoboAdvisory'];
        this.planningData = data['planningTrack'],
        this.planningTransactData = data['planningTransact']
      }else{
        this.errorShow(data?.Message,"roboCollectionData -> status")
      }
    },(error:any)=>{
      this.errorShow(error,"roboCollectionData -> Http response")
    })
  }

  errorShow(message, functionName){
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error,'wealth-robo-advisory component -> '+functionName,message,this.errorList?.okText);
  }
  openAccordionPersonalDetails(value){
    if(value === 'personalDetails'){
      this.showPersonalDetail =  !this.showPersonalDetail
    }
    if(value === 'plan'){
      this.showPlan =  !this.showPlan
    }
    if(value === 'family'){
      this.showFamily =  !this.showFamily
    }
    if(value === 'spending'){
      this.showSpending =  !this.showSpending
    }
    if(value === 'assets'){
      this.showAssets =  !this.showAssets
    }
    if(value === 'goals'){
      this.showGoals =  !this.showGoals
    }
  }

}
