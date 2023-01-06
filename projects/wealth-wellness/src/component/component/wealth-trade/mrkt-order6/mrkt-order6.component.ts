import { Component, Input, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'lib-mrkt-order6',
  templateUrl: './mrkt-order6.component.html',
  styleUrls: ['./mrkt-order6.component.scss'],
})
export class MrktOrder6Component implements OnInit {
  @Input() imageList: any;
  constructor(private allConfigDataService:AllConfigDataService ) {}

  ngOnInit() {

    setTimeout(() => {
      this.navigateCDSL()
    }, 3000);
   
    this.imageList = this.allConfigDataService.getConfig('images');
  }
  navigateCDSL(){
    window.open("http://mockedis.cdslindia.com/EDIS/VerifyDIS")
  }
}
