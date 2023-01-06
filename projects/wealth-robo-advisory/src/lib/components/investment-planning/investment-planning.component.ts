import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-investment-planning',
  templateUrl: './investment-planning.component.html',
  styleUrls: ['./investment-planning.component.scss'],
})
export class InvestmentPlanningComponent implements OnInit {
  @Input() trackData:any;
  @Input() currentMoneySymbols:any;
  @Input() planningTransactData:any;
  showTransact:any=true
  showTrack:any=false;
  constructor() { }

  ngOnInit() {}
  openAccordionPlanningDetails(value){
    if(value === 'transact'){
      this.showTransact =  !this.showTransact
    }
    if(value === 'track'){
      this.showTrack =  !this.showTrack
    }
  }
}
