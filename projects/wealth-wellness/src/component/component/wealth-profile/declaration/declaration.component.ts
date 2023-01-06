import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'lib-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.scss'],
})
export class DeclarationComponent implements OnInit {
  imageList: any;
  
  
  constructor(private allConfigDataService: AllConfigDataService,private modalCtrl: ModalController) { }


  ngOnInit() {

    this.imageList = this.allConfigDataService.getConfig('images')
  }

  stepperBracket(){
    
  }
  back(){
    this.modalCtrl.dismiss()
  }

}
