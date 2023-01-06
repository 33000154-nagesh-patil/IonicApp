import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-org-doughnut-chart',
  templateUrl: './org-doughnut-chart.component.html',
  styleUrls: ['./org-doughnut-chart.component.scss'],
})
export class OrgDoughnutChartComponent implements OnInit {
  @Input() doughnutChartDetail:any
  constructor() { }

  ngOnInit() {}

}
