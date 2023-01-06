import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'lib-option-calc',
  templateUrl: './option-calc.component.html',
  styleUrls: ['./option-calc.component.scss'],
})
export class OptionCalcComponent implements OnInit {
 @Input() imageList: any;
  allConfigDataService: any;

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
  }

  backToSetting(){
    this.modalCtrl.dismiss()
  }

}
