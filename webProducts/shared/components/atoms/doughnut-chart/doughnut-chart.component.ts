import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexPlotOptions,
  ApexStates,
  ApexTheme,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ThemePalette } from '@angular/material/core';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: any;
  stroke: ApexStroke;
  states: ApexStates;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  theme: ApexTheme;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @Input() doughnut:any[]
  chartColor: any;
  data:any
  chartOptionSeries:any;
  chartLabel:any;
  jmavd:any
  mode: ProgressBarMode = 'determinate';
  value = 55;
  bufferValue = 0;
  color: ThemePalette = 'primary';

  constructor() { }

  ngOnInit() {
    
    this.data = this.doughnut;
    this.chartOptionSeries = this.data.map(res=> +res.value);
    this.chartColor=this.data.map(res=>res.cssx);
    this.chartLabel=this.data.map(res=>res.title);
    this.chartOptions = {
      series:this.chartOptionSeries,
      chart: {
        type: "donut"

      },

      plotOptions: {
        pie: {
          donut: {
            size:"80px",
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
                formatter: function (w) {
                      return `55/66`
                  
                }
              }
            }
          },
          expandOnClick: true,
        }

      },

      responsive: [
        {
          breakpoint: 5000,
          options: {
            chart: {
              width: 300,
              height:315
            },
            dataLabels: {
              enabled: false

            },
            legend: {
              show: false,
              fontSize: '12px',
              position: "right",
              onItemClick: {
                toggleDataSeries: false,

              },

              chart: {
                events: {
                  legendClick: {
                    function(chartContext, seriesIndex, config) {
                      console.log(chartContext);
                    }
                  }
                }
              },

            },
            stroke: {
              show: true,
              curve: 'stepline',
              lineCap: 'round',
              width: 0,
              dashArray: 0,

            },
            fill: {
              colors:this.chartColor
            }
          }


        }

      ]

    };
  }

}
