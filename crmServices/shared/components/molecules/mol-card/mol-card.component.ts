import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mol-card',
  templateUrl: './mol-card.component.html',
  styleUrls: ['./mol-card.component.scss'],
})
export class MolCardComponent implements OnInit {
@Input() cardDetail:any;
@Output() getCardValue=new EventEmitter<string>()
tabName='Total Cases'
  constructor() {
   }

  ngOnInit() {}
  getCard(value){
    this.tabName=value.title;
    this.getCardValue.emit(value)    
  }
}
