import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { MrktOrder6Component } from '../mrkt-order6/mrkt-order6.component';

@Component({
  selector: 'lib-mrkt-order5',
  templateUrl: './mrkt-order5.component.html',
  styleUrls: ['./mrkt-order5.component.scss'],
})
export class MrktOrder5Component implements OnInit {
  @Input() imageList: any;
  allConfigDataService: any;
  constructor(private allconfigDataService:AllConfigDataService, private modalctrl:ModalController) { }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig("images");
  } 

  async proceed() {
    const modal = this.modalctrl.create({
      component: MrktOrder6Component,
      componentProps: {
        'imageList': this.imageList,
      },
      cssClass: 'create-watch-list-modal',
      backdropDismiss: true
    })
      ; (await modal).present()
  }

}
