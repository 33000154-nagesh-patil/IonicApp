import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { MySipComponent } from '../my-sip/my-sip.component';

@Component({
  selector: 'app-makepayment',
  templateUrl: './makepayment.component.html',
  styleUrls: ['./makepayment.component.scss'],
})
export class MakepaymentComponent implements OnInit {
  imageList:any
  progressBarModal:any=true
  constructor(private http:HttpClient,private allConfigDataService:AllConfigDataService,private modalCtrl:ModalController) { }
 
  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
    this.getDummayApi()
  }
  dismiss(){
 this.modalCtrl.dismiss()
  }

  async OpneMySip() {
    let eventEmitter = new EventEmitter();
    eventEmitter.subscribe((res)=>{
      console.log(res);
      
    })
    const modal = await this.modalCtrl.create({
      component:MySipComponent,
      componentProps:{
        'imageList':this.imageList,
        'event':eventEmitter
      },
      backdropDismiss:false
    });
    modal.onDidDismiss().then((data) => {
      // console.log(data);
    })
    return await modal.present();
  }
  // OpneMySip()

  

  getDummayApi(){
    let data={
      "CFT":"Shopping",
      "Product":"MF",
      "FileName":"getMakePaymentProcess"   
    }
  this.http.post("http://uat.torusdigital.in/api/v1/Dummy/get/generalApi",data).subscribe(
    (data: any) => {
      
  setTimeout(() => {
    this.OpneMySip()
  }, 2000);
         
    

      
  
    }
  )
    
  }
}
