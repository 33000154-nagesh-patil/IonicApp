import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import increaserMargin from 'src/assets/Margin.json';

@Component({
  selector: 'lib-wealth-margin',
  templateUrl: './wealth-margin.component.html',
  styleUrls: ['./wealth-margin.component.scss'],
})
export class WealthMarginComponent implements OnInit {
  imageList: any;
  data: any;

  constructor(private allConfiDataService: AllConfigDataService,private mdlctr: ModalController) { }

  ngOnInit() {
    this.imageList = this.allConfiDataService.getConfig('images')
    this.data = increaserMargin;
  }
  Back(){
    this.mdlctr.dismiss()
  }
  confirmnApply(){

  }

}
