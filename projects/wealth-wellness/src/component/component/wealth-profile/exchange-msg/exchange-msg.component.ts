import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'lib-exchange-msg',
  templateUrl: './exchange-msg.component.html',
  styleUrls: ['./exchange-msg.component.scss'],
})
export class ExchangeMsgComponent implements OnInit {
  imageList: any;

  constructor(private modalCtrl:ModalController, private allConfigDataService:AllConfigDataService) { }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
  }

  backToSetting(){
    this.modalCtrl.dismiss()
  }

}
