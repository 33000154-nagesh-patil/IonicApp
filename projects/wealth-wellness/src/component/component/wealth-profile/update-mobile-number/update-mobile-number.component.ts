import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'lib-update-mobile-number',
  templateUrl: './update-mobile-number.component.html',
  styleUrls: ['./update-mobile-number.component.scss'],
})
export class UpdateMobileNumberComponent implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  cancel(){
    this.modalCtrl.dismiss();
  }
  updatedMobileNumber(){
    this.modalCtrl.dismiss();
  }

}
