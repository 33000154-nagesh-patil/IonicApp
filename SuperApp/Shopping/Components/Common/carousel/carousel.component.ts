import { log } from 'console';
import { Component, Input, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
@Input() set portFolioSummary (val){
  if(['bar'].includes(val.graphType))this.data.push(val);
}
  //@Input() Donut :any

 @Input() set objectContent(val){
  this.data=[]
  for(let x of val){
    if(['creditScore','riskometer','Donut', 'linearGraph'].includes(x.contentType))this.data.push(x);
    
  }
  // if(['bar'].includes(this.portFolioSummary.graphType))this.data.push(this.portFolioSummary);
 }
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  data:any=[]
  constructor() { }


  ngOnInit() {
    console.log(this.data[4],'lili');

  }


}
