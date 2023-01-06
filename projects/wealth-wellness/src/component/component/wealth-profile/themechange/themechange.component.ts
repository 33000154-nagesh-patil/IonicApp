import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'lib-themechange',
  templateUrl: './themechange.component.html',
  styleUrls: ['./themechange.component.scss'],
})
export class ThemechangeComponent implements OnInit {
  imageList: any;
  currentTextType:any='Yes';
  color: any;

  constructor(private allConfigDataService: AllConfigDataService, private modalctrl:ModalController) { }

  ngOnInit() {
    this.imageList=this.allConfigDataService.getConfig('images')
  }
  changeColor(){

  }

  custWithoutTextImg(){
    this.modalctrl.dismiss()
  }

  goBack(){
    this.modalctrl.dismiss()
  }

}
