import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-infostep',
  templateUrl: './infostep.component.html',
  styleUrls: ['./infostep.component.scss'],
})
export class InfostepComponent implements OnInit {

  @Input() Stepdata:any
  @Input() heading:any
  imageList: any;
  environment:any
  apiCatalog: any = {
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "",
    "environment": this.allConfigDataService.getConfig('environmentType'),
  };
  constructor(private allConfigDataService:AllConfigDataService) { }

  ngOnInit() {
    if(this.apiCatalog.environment=="proto"){
      this.environment=true
    }
    console.log(this.Stepdata,"strp")
    this.imageList = this.allConfigDataService.getConfig('images');

  }


}
