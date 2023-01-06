import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WealthWellnessService } from 'projects/wealth-wellness/src/public-api';

@Component({
  selector: 'lib-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss'],
})
export class TestComponentComponent implements OnInit {
  LtpVal: any;
  constructor(
    private wellnessService: WealthWellnessService,
    private modalctrl: ModalController
  ) {}
  ngOnInit() {
    // this.showLtp()
  }

  // showLtp(){
  //   this.wellnessService.openWebSocket('qwer');
  //   this.LtpVal = this.wellnessService;
  //   console.log(this.LtpVal,'LTPVAL');
  // }

  goBack() {
    this.modalctrl.dismiss();
  }
}
