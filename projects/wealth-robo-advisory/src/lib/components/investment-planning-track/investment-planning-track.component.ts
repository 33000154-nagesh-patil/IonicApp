import { Component, Input, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { PlanningTrackModalComponent } from '../planning-track-modal/planning-track-modal.component';
@Component({
  selector: 'lib-investment-planning-track',
  templateUrl: './investment-planning-track.component.html',
  styleUrls: ['./investment-planning-track.component.scss'],
})
export class InvestmentPlanningTrackComponent implements OnInit {
  @Input() trackData:any;
  @Input() currentMoneySymbols:any;
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}
  async openTrack(text,type){
    const modal = await this.modalCtrl.create({  
      component: PlanningTrackModalComponent,
      componentProps: { 
        custHeader: text,
        type:type,
        dummyData: this.trackData,
        currentMoneySymbols:this.currentMoneySymbols
      } 
    });  
    return await modal.present();  
  }
}
