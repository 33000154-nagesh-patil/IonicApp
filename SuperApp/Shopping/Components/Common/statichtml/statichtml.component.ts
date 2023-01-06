import { Component, Input, OnInit } from '@angular/core';
// import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { AllConfigDataService } from 'index';

@Component({
  selector: 'app-statichtml',
  templateUrl: './statichtml.component.html',
  styleUrls: ['./statichtml.component.scss'],
})
export class StatichtmlComponent implements OnInit {

  constructor(private allConfigDataService:AllConfigDataService) { }
  health:any
  DigiGold:any
  whatYouLearn:any
  requirement:any
  imageList:any
  step = 1;
  @Input() Data:any
 
  ngOnInit() {

  console.log(this.Data,"static")
    this.imageList = this.allConfigDataService.getConfig('images');

  }
  setStep(index: number) {
    this.step = index;
  }

}











