import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mol-bar-chart',
  templateUrl: './mol-bar-chart.component.html',
  styleUrls: ['./mol-bar-chart.component.scss'],
})
export class MolBarChartComponent implements OnInit {
@Input() barChartValue:any
  constructor() { }

  ngOnInit() {}

}
