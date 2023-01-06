import { Component, Input, OnInit, ViewChild } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexResponsive,
  ApexGrid,

} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  responsive: ApexResponsive[];
  colors: string[]
  grid: ApexGrid;
};

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  @Input() barChartValue:any;
  datas: any;
  categories = [];
  seriesData = [];
  colorScheme = {
    domain: ['#44C8F5']
  };
  chartColors
  chartLabels
  grid

  @ViewChild("chartObj", { static: true }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor() { }

  ngOnInit() {

    this.datas = this.barChartValue;
    this.categories= this.datas.map(res=>res.title)
    this.seriesData= this.datas.map(res=>res.value)
    this.chartOptions = {
      series: [
        {
          name: "basic",
          data:this.seriesData
        }
      ],
      chart: {
        toolbar: {
          show: false
        },
        type: "bar",
        height: 300,
        width: 300,
      },
      grid: {
        show: false,
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      
      plotOptions: {
        bar: {
          barHeight: '80%',
          columnWidth: '20%',

          borderRadius: 4,
          horizontal: true,
        }
        

      },
      colors:['#44C8F5'],

      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 6,
        colors: ['transparent'],
      },
      xaxis: {      
         categories: this.categories, 

      }
    };

  }

}
