import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mol-doughnut-chart',
  templateUrl: './mol-doughnut-chart.component.html',
  styleUrls: ['./mol-doughnut-chart.component.scss'],
})
export class MolDoughnutChartComponent implements OnInit {
  @Input() chartDetail:any;

  constructor() { }

  ngOnInit() {}

}
