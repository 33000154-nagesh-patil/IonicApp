import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Pledge240Component } from '../pledge240/pledge240/pledge240.component';

@Component({
  selector: 'lib-stock-pledging',
  templateUrl: './stock-pledging.component.html',
  styleUrls: ['./stock-pledging.component.scss'],
})
export class StockPledgingComponent implements OnInit {
  imageList: any;

  constructor(private allConfigDataService: AllConfigDataService, private modalCtrl:ModalController) { }

  data: any = [
    {
      "title": " 1) We agree to create margin pledge against the selected securities in favor of RSL(TM) and repledge by the TM to CM and further by the CM to CC and such pledge shall valid for all segments."
    },
    {
      "title": "2) I/We understand that the actual value of margin may vary from the value mentioned herein above as it depends on the piece movement / change in haircut during the market hours."
    },
    {
      "title": "3) I/We also understand that the de-pledge request will be processed at EOD basis available free collateral in my/our account."
    }
  ]

  ngOnInit() { 
    this.imageList = this.allConfigDataService.getConfig('images');
  }
  confirmnApply(){
    console.log("vxghv");
  }

  goBack(){
    this.modalCtrl.dismiss()
  }

 async goToPledge240(){
    const modal = await this.modalCtrl.create({
      component: Pledge240Component,
      cssClass: 'create-watch-list-modalpledge',

      componentProps: {
      },
      backdropDismiss: true
    });
    modal.onDidDismiss().then((data) => {

    })
    modal.present();
 }

}
