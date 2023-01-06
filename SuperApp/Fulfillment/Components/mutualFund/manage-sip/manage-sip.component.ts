import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
// import { SetUpAutoPayComponent } from '../set-up-auto-pay/set-up-auto-pay.component';

@Component({
  selector: 'app-manage-sip',
  templateUrl: './manage-sip.component.html',
  styleUrls: ['./manage-sip.component.scss'],
})
export class ManageSIPComponent implements OnInit {
  imageList: any;
  ManageSIPData: any;
  ManageSIPJourney: any;
  segmentValue: any="Upcoming SIPs";
  constructor(private router:Router,private allconfigDataService:AllConfigDataService,private modalctrl:ModalController,private http:HttpClient) { }

  ngOnInit() {
    this.imageList=this.allconfigDataService.getConfig('images')
  }
  dissmiss(){
    this.modalctrl.dismiss();
    window.history.back();
  }



  async SetUpAutoPay(){
    //console.log("this.healthData",this.healthData)
      // this.loaderService.showLoader();
      // const modal = await this.modalctrl.create({
      //   component: SetUpAutoPayComponent,
      //   cssClass: 'h-100 w-100 modal-fullscreen',
      //   componentProps: {
         
      //   },
      //   backdropDismiss:false
      // });
      // modal.onDidDismiss()
      // .then((data) => {
      //   // if(data.data != 'Education'){
      //   //   this.commonService.setProductData({productDetails:data,currentModule:'Education'});
      //   //   // this.router.navigate(['/ProductDetails']);
      //   // } 
      //   if(data && data?.data){
          
      //   }
      // });
      // // this.loaderService.hideLoader();
      // return await modal.present();
  }

  getDummayApi(){
    let data={
      "CFT":"Shopping",
      "Product":"MF",
      "FileName":"getTransactionHistory"   
    }
  this.http.post("http://uat.torusdigital.in/api/v1/Dummy/get/generalApi",data).subscribe(
    (data: any) => {
      this.ManageSIPData=data
      this.ManageSIPJourney=data.SIPJourney
     
    }
  )

}
segmentChanged(e){
this.segmentValue=e.detail.value
}
}
