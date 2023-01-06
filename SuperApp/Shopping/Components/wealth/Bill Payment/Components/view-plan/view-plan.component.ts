import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import billpay from '../../../../../../../src/assets/billpay.json'
 

@Component({
  selector: 'lib-view-plan',
  templateUrl: './view-plan.component.html',
  styleUrls: ['./view-plan.component.scss'],
})
export class ViewPlanComponent implements OnInit {
  imageList: any;
  
  data:any=[];
  segment:any;
  recommendsData: any;
  rechargeData: any;
  internationalData: any;
  allconfig: any;
  reOrder:any;
  popData: any;

  constructor(private allconfigdataservice: AllConfigDataService, private modalctrl: ModalController) { }

  ngOnInit() {

    this.imageList = this.allconfigdataservice.getConfig("images");
    this.recommendsData=billpay.Recommended;
    this.rechargeData=billpay.Special;
    this.internationalData=billpay.International;
this.segment='Recommended';
this.data=this.recommendsData;
  }

  

  async dismiss()
  {
    this.modalctrl.dismiss("data")
  }

  segmentChanged(status:any) {
    if(status=='Recommended')
   {
     this.data=this.recommendsData;
   }
    if(status=='Special')
    {
      this.data=this.rechargeData;
    }
    if(status=='International')
    {
      this.data=this.internationalData;
    }
  }

  ConvertpopUp: boolean = false
  btnTypeAll: any
  msgpop: any = false
  popUp: any = false;
  
  Data :any=[];
  


  hidePopUp() {
    this.popUp = false
    //this.msgpop = false
  }

  

  changeData(e){
    this.popData=e
    this.popUp = true
    console.log(e);
  }


  back(){
    this.modalctrl.dismiss()
  }

}
