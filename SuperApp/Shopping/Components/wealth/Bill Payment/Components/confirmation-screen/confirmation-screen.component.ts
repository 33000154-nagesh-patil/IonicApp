import { BillpaymentService } from 'SuperApp/Shopping/Components/wealth/Bill Payment/billpayment.service';

import { ModalController } from '@ionic/angular';
// import { BbpsService } from './../../bbps.service';
import { Router } from '@angular/router';
import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'lib-confirmation-screen',
  templateUrl: './confirmation-screen.component.html',
  styleUrls: ['./confirmation-screen.component.scss'],
})
export class ConfirmationScreenComponent implements OnInit {
  @Input() imageList:any
  @Output() prepaidScreen = new EventEmitter
  data: any;

  constructor(private router:Router,private billPaymentService:BillpaymentService,private modalCtrl:ModalController,private allConfigDataService:AllConfigDataService) { }


  // onContinue(){
  //   this.prepaidScreen.emit()
  // }

  gotoDashboard(){
    if(this.modalCtrl.getTop()){
      this.modalCtrl.dismiss()
      this.router.navigate(['/Dashboard'])
    }
    else{window.history.back();
    window.history.back();}
  }


  goToBbps(){
    if(this.modalCtrl.getTop()){
      this.modalCtrl.dismiss()
      this.router.navigate(['/bbps/bbps'])
      this.prepaidScreen.emit('back')
    }
    else{
      this.prepaidScreen.emit('back')

    }
  }

  ngOnInit() {
this.imageList=this.allConfigDataService.getConfig('images')
    this.data=this.billPaymentService.getData()
    console.log("phhhhjkjkjkjhjhhh",this.data);

  }

}
