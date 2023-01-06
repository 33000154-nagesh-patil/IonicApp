import { filter } from 'rxjs/operators';
// import { BbpsService } from './../../bbps.service';
// import { NeobankService } from '../../neobank.service';

import { BillpaymentService } from '../../billpayment.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import billpay from '../../../../../../../src/assets/billpay.json'

import { matDatepickerAnimations } from '@angular/material/datepicker';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'lib-bill-payment',
  templateUrl: './bill-payment.component.html',
  styleUrls: ['./bill-payment.component.scss'],
})
export class BillPaymentComponent implements OnInit {
  @Output() goto = new EventEmitter
  @Input() imageList:any
  hidefavourite:boolean=true
  search;
  mydata: any
  noData:boolean=false
  subCategory: any;


  
  apiCatalog:any={
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "Onboarding/OnboardingSteps/PanValidation",
    "environment": this.allConfigDataService.getConfig('environmentType'),
  }
  items: any;
  tagname: any;
  itemsName: any;
  constructor(private router : Router,private BillpaymentService:BillpaymentService,private allConfigDataService:AllConfigDataService,private http:HttpClient ) { }




  getData(status:any){
     
      this.BillpaymentService.setJSON(status);
      // this.neoBankService.showLoader('Please wait','we will send you to next page shortly');
      setTimeout(() => {
        this.router.navigate([this.router.url+'/dataCard/'+status]);
        // this.neoBankService.hideLoader();
      }, 200);
    // }

//  this.onContinue(status)
  }


  ngOnInit() {
    this.getBillerCategory()
    // this.mydata=billpay.category
  }




  getBillerCategory(){

let data={
  "channelid" : "PsJDWRgteobKWuMHMdZL",
  "partnerid" : "4oyQr0qKil",
  "agentid" : "NS01NS02BNK510230768", 
  "token": "NA",
  "signcs":"Jt+Q6niY4sJekuhGaNF5OpNPO9IByuqlUBCxShgwFpYgcvpUQvREFjbbMVFUESZVBojxjJXz3noTplnbHESwlw=="
}

this.http.post('https://apixuat.heytorus.com/SuperApp/Shopping/Wealth/BBPS/getList?fetchBillCategory',data).subscribe((res:any)=>{

if(res && res?.status){

  this.items=res.data.billerCategory
  this.itemsName=res.data
  console.log('.................',this.items);
  
}

})
  }

  goTofavourite(){
    this.router.navigate(['/bbps-page/favourite'])
  }
  
  getHide(e){     
      this.items = this.items.filter(item => item.billercategoryname.toUpperCase().includes((e.target.value).toUpperCase()))
      if(!this.items.length){
        this.noData=true
      }
if(e.target.value){
  this.hidefavourite=false
}else{
  this.hidefavourite=true
  this.items=this.itemsName.billerCategory
  this.noData=false

}

}

goback(){
  this.router.navigate(['/Shopping/Wealth'])

}
}
