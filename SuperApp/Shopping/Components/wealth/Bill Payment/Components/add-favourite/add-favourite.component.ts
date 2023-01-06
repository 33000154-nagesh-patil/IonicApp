import { Router } from '@angular/router';
import { BillpaymentService } from '../../billpayment.service';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import billpay from '../../../../../../../src/assets/billpay.json'
@Component({
  selector: 'lib-add-favourite',
  templateUrl: './add-favourite.component.html',
  styleUrls: ['./add-favourite.component.scss'],
})
export class AddFavouriteComponent implements OnInit {
  @Output() goto = new EventEmitter
  @Input() imageList:any
  hidefavourite:any=true
  search;
  mydata: any
  jsonFormData: any;
  constructor(private allConfigDataService:AllConfigDataService,
    private router:Router,private BillpaymentService:BillpaymentService) { 
    
  }

  // onContinue(val){
  //   val = val.split(" ")[0].toLowerCase() + 'AutoPay';
  //   this.bbpsService.setFormName(val);
  //   this.bbpsService.setJSON(val);
  //   this.neoBankService.showLoader('Please wait','we will send you to next page shortly');
  //   setTimeout(() => {
  //   if(val=='postpaidAutoPay'||val=='waterAutoPay'){

  //     this.router.navigate(['bbps/commonFavourite']);
  //     this.neoBankService.hideLoader();
  //   }
      
  //   }, 500);
  // }


  getData(status:any){

// this.bbpsService.setFormName(status);
this.BillpaymentService.setJSON(status);
// this.NeobankService.showLoader('Please wait','we will send you to next page shortly');
setTimeout(() => {
  this.router.navigate([this.router.url+'/dataCard/'+status]);
  // this.NeobankService.hideLoader();
}, 500);
// this.onContinue(status)
  }

  
  ngOnInit() {
    this.imageList=this.allConfigDataService.getConfig('images')
    this.mydata=billpay.category
  }

  goTofavourite(){
    this.hidefavourite=!this.hidefavourite
  }
  goback(){
    this.router.navigate([this.router.url])

  }
}
