import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import dummyInvestnowData from '../../../../../src/assets/mockData/dummyInvestnowData.json'; 

@Component({
  selector: 'app-allmutualfund',
  templateUrl: './allmutualfund.component.html',
  styleUrls: ['./allmutualfund.component.scss'],
})
export class AllmutualfundComponent implements OnInit {
  @Input() imageList: any;
  policyCheckBox: boolean;
  asd: any;
  mfFooterData;any
  currentMode:any=1;
  bookmarkdata: any=[];
  // jsonData = dummyInvestnowData;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.asd=this.imageList['saveIcon']
  }

  
  // checkBox(){
  //   this.clicked=!this.clicked;
  //   console.log(this.id,this.clicked);
  // }

  checkboxClick(e) {
    this.policyCheckBox = !this.policyCheckBox
  }

  getbookmarkData(val) {
    console.log(val);
    
    if(this.asd==this.imageList["saveIcon"]) {
      this.asd=this.imageList["saveIcon2"];}

    else this.asd=this.imageList["saveIcon"];

    
    this.bookmarkdata[val]=[];
    console.log(this.bookmarkdata)
  
  }

  onCancelSIP() {
    this.modalCtrl.dismiss();
  }
}
