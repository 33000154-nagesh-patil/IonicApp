import { Component, Input, OnInit } from '@angular/core';
import jsonData from './creditScore.json'
@Component({
  selector: 'app-creditscore-tracker',
  templateUrl: './creditscore-tracker.component.html',
  styleUrls: ['./creditscore-tracker.component.scss'],
})
export class CreditscoreTrackerComponent implements OnInit {
  @Input() set content(val){
    // this.data=val
  }
alwaysTrue: boolean = true;
range: any = 0;
data: any;

  constructor() { }

  ngOnInit() {
    this.data = jsonData.content;
    if(this.data.score > 300 && this.data.score <= 700  ) {
      this.range = (((this.data.score-300)/600)*100)-5;
    }else if (this.data.score > 700 && this.data.score <= 900 ) {
      this.range = (((this.data.score-300)/600)*100)-7;
    }
  }

}
