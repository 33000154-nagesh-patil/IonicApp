import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { SettingComponent } from '../setting/setting.component';

@Component({
  selector: 'lib-stsettings1',
  templateUrl: './stsettings1.component.html',
  styleUrls: ['./stsettings1.component.scss'],
})
export class STsettings1Component implements OnInit {
  hide = true;
  panelOpenState = false;
  imageList: any;
  constructor(private allConfigDataService: AllConfigDataService,private modalCtrl: ModalController) { }


  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
  }

  async backToSetting(){
    // this.modalCtrl.dismiss()
    window.history.back()
 }


}
