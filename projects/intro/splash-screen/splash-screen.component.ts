import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit,AfterViewInit {
@Input() allData:any;
@Output() loadIntro  = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.hideSplashScreen()
  }

  hideSplashScreen(){
    setTimeout(() => { 
      this.loadIntro.next(false);
     }, 6000)
  }
}
