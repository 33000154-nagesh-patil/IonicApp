import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'lib-planning-track-modal',
  templateUrl: './planning-track-modal.component.html',
  styleUrls: ['./planning-track-modal.component.scss'],
})
export class PlanningTrackModalComponent implements OnInit {
  custHeader;
  type;
  dummyData
  currentMoneySymbols
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  dismiss() {  
    this.modalCtrl.dismiss();  
  } 
}
