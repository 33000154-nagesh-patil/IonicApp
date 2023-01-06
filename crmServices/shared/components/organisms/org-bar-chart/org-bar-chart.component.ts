import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-org-bar-chart',
  templateUrl: './org-bar-chart.component.html',
  styleUrls: ['./org-bar-chart.component.scss'],
})
export class OrgBarChartComponent implements OnInit {
@Input() barChartDetail:any
  constructor() { }

  ngOnInit() {}

}
