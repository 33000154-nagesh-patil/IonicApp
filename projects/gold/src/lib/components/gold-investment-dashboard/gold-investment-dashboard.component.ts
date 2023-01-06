import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-gold-investment-dashboard',
  templateUrl: './gold-investment-dashboard.component.html',
  styleUrls: ['./gold-investment-dashboard.component.scss'],
})
export class GoldInvestmentDashboardComponent implements OnInit {
  @Input() imageList:any;
  @Input() errorList:any;
  @Input() investmentStatus:any;
  @Input() currentMoneySymbols:any;
  constructor() { }

  ngOnInit() {}

}
