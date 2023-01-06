import { Component, OnInit,Input } from '@angular/core';
import { title } from 'process';
// import jsonData from './investmentCard.json';

@Component({
  selector: 'app-investment-card',
  templateUrl: './investment-card.component.html',
  styleUrls: ['./investment-card.component.scss'],
})
export class InvestmentCardComponent implements OnInit {
@Input() investmentCard:any
  @Input() set content(val){

  }
  data: any;


  constructor() { }

  ngOnInit() {
console.log(this.investmentCard, 'hihi');

  }

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

}
