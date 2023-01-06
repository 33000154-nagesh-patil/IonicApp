import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';

@Component({
  selector: 'app-nsdl',
  templateUrl: './nsdl.component.html',
  styleUrls: ['./nsdl.component.scss'],
})
export class NsdlComponent implements OnInit {
  @Input() nsdlUrl;

  nsdlUrlSani: any;



  constructor(private modalCtrl: ModalController, private domSanitizer: DomSanitizer) {
    this.nsdlUrlSani = this.domSanitizer.bypassSecurityTrustResourceUrl(this.nsdlUrl)
   }


  ngOnInit() {

    // this.nsdlUrlSani = this.domSanitizer.bypassSecurityTrustResourceUrl(this.nsdlUrl)
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
