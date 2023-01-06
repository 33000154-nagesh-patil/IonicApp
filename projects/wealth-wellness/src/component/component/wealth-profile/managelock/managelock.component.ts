import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import manageLock from 'src/assets/manageLock.json';
@Component({
  selector: 'lib-managelock',
  templateUrl: './managelock.component.html',
  styleUrls: ['./managelock.component.scss'],
})
export class ManagelockComponent implements OnInit {
  imageList: any;
  data: any;
  color = true;
  currentTextType: any = 'Yes';

  constructor(private allConfigDataService: AllConfigDataService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images')
    this.data = manageLock;
  }
  changeColor(e) {
    // console.log("e",e);
    this.color = !e;
    if (this.color) {
      this.currentTextType = "Yes"
      console.log(this.currentTextType);

    } else {
      this.currentTextType = "No"
      console.log(this.currentTextType);
    }

  }

  goBack() {
    this.modalCtrl.dismiss()
  }

}
