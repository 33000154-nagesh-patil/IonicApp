import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
// import { AllConfigDataService } from '../../services/all-config-data.service';

@Component({
  selector: 'lib-create-upid',
  templateUrl: './create-upid.component.html',
  styleUrls: ['./create-upid.component.scss'],
})
export class CreateUPIDComponent implements OnInit {
  ConvertpopUp: boolean=false
  btnTypeAll:any
  msgpop:any=false
  popUp: any=false;
  @Input() imageList:any;


  constructor(private allconfig:AllConfigDataService, private modalCtrl:ModalController) { }

  ngOnInit() {
    this.imageList=this.allconfig.getConfig('images')
  }
 
  convert(){  
    this.ConvertpopUp = true;
    this.popUp=true
  }

  hidePopUp(){
    this.popUp=false
    this.msgpop=false
  }

  hidemsgpop(){
    this.msgpop=false
  }

  goBack(){
    this.modalCtrl.dismiss()
  }
}
