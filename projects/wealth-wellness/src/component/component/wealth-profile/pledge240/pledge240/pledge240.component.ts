import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Pledge241Component } from '../../pledge241/pledge241/pledge241.component';

@Component({
  selector: 'lib-pledge240',
  templateUrl: './pledge240.component.html',
  styleUrls: ['./pledge240.component.scss'],
})
export class Pledge240Component implements OnInit {

  constructor(private allconfig:AllConfigDataService, private modalCtrl:ModalController) { }

  ngOnInit() {}

  back(){
    this.modalCtrl.dismiss()
  }

  async confirm(){
    const modal = await this.modalCtrl.create({
      component: Pledge241Component,
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
