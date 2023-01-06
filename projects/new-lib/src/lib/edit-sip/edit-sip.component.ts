import { Component, Input, OnInit } from '@angular/core';
import dummyInvestnowData from '../../../../../src/assets/mockData/dummyInvestnowData.json';

@Component({
  selector: 'lib-edit-sip',
  templateUrl: './edit-sip.component.html',
  styleUrls: ['./edit-sip.component.scss'],
})
export class EditSipComponent implements OnInit {
  @Input() imageList:any;
  x = dummyInvestnowData;
  btnEnable:any;
  progressBarModal: boolean = true;

  constructor() { }

  ngOnInit() {
    console.log(this.x);
    console.log("hello");
    
  }

  enable(e) {
    this.btnEnable = e;
  }

}
