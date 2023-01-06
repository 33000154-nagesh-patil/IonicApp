import { Component, OnInit,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { MFAutoPayComponent } from './mfauto-pay/mfauto-pay.component';


@Component({
  selector: 'lib-newLib',
  templateUrl: './new-lib.component.html',
  styleUrls: ['./new-lib.component.scss'],
})
export class NewLibComponent implements OnInit {
 @Input() imageList:any;
 @Input() x:any;
  mfFooterData: any;

  constructor(private allconfigdataservice:AllConfigDataService,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.imageList = this.allconfigdataservice.getConfig('images');
    this.mfFooterData = this.allconfigdataservice.getConfig('mfTab');
  }
 
    
    async onSubmit(){
      const modal = await this.modalCtrl.create({
        component: MFAutoPayComponent ,
        cssClass: 'h-100 w-100 modal-fullscreen',
        componentProps: {
          'imageList':this.imageList,
        },
        backdropDismiss:false
      });
      modal.onDidDismiss()
      .then((data) => {

      });
      return await modal.present();
  


  
  }
 


}
