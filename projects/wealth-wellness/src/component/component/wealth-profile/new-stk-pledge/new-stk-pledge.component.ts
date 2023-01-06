import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { IncreaseMarginComponent } from '../increase-margin/increase-margin.component';
import { MarginPledgeTransactionComponent } from '../margin-pledge-transaction/margin-pledge-transaction/margin-pledge-transaction.component';
import { WealthMarginComponent } from '../wealth-margin/wealth-margin.component';

@Component({
  selector: 'lib-new-stk-pledge',
  templateUrl: './new-stk-pledge.component.html',
  styleUrls: ['./new-stk-pledge.component.scss'],
})
export class NewStkPledgeComponent implements OnInit {
  imageList: any;
  // modalCtrl: any;

  constructor(private allConfigDataService: AllConfigDataService, private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
  }



  async increaseMargin() {
    const modal = await this.modalCtrl.create({
      component: IncreaseMarginComponent,
      // cssClass: 'Income-update-modal',
      componentProps: {
        'imageList': this.imageList,
      },
      backdropDismiss: true
    });
    modal.onDidDismiss()
      .then((data) => {
      });

    return await modal.present();
  }




  async transaction() {
    const modal = await this.modalCtrl.create({
      component: MarginPledgeTransactionComponent,
      componentProps: {
        'imageList': this.imageList,
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
      });

    console.log("hiiii");


    return await modal.present();
  }



  async releaseMargin() {
    const modal = await this.modalCtrl.create({
      component: WealthMarginComponent,
      componentProps: {
        'imageList': this.imageList,
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
      });

    console.log("hiiii");


    return await modal.present();
  }

  back() {
    this.modalCtrl.dismiss();
  }




}



