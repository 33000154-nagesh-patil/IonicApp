import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'lib-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
})
export class InformationComponent implements OnInit {
@Input() allData:any;
@ViewChild('mySlider') slides: IonSlides;

@Output() getOutPutDetails  = new EventEmitter<any>();
slideOpts = {
  effect: 'flip',
};
  constructor() { }

  ngOnInit() {}
  swipeNext() {
    this.slides.slideNext();
  }
  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }
  skip() {
    this.sendOutput()
    //this._router.navigate(['../SignUp']);
  }
  sendOutput(){
    this.getOutPutDetails.emit('login')
  }

}
