import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import increaserMargin from 'src/assets/Margin.json';
import { IncreaseM244Component } from '../increase-m244/increase-m244.component';

@Component({
  selector: 'lib-increase-margin',
  templateUrl: './increase-margin.component.html',
  styleUrls: ['./increase-margin.component.scss'],
})
export class IncreaseMarginComponent implements OnInit {
  data: any;
  imageList: any;

  constructor(private allconfigDataService: AllConfigDataService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.data = increaserMargin;
    this.imageList = this.allconfigDataService.getConfig('images');
  }
  confirmnApply(){

  }
  Back() {
    this.modalCtrl.dismiss()
  }

  async redirectingCDSL() {
    const modal = await this.modalCtrl.create({
      component: IncreaseM244Component,
      cssClass: 'reDirecting',
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



}
