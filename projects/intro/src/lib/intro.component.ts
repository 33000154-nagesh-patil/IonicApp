import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
@Input() showSplashScreen:any;
@Input() showIntroductionScreen:any;
@Input() allData:any;

@Output() collectIntroductionData  = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {}

  getOutPut(data){
    this.collectIntroductionData.emit(data)
  }

  getSplashData(data){
    this.showSplashScreen = data;
  }
}
