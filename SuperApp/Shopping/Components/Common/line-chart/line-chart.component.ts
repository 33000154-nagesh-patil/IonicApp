import { Component, Input, OnInit } from '@angular/core';
import { Chart as ChartJS, Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  data: any;
  lineData: any;
  @Input() set digiBenifit(val){
    this.lineData=val
    setTimeout(() => {
      this.chartMap(val)
    }, 100);
  }
  chartvalue: any[];
  graph: any[];
  linechart1: any;

  constructor() { }

  ngOnInit() {}
  ngAfterViewInit() {


  }
  toStirng(val){
    return  JSON.parse(JSON.stringify(val).replace('â‚¹', '₹').toString());
  }
  chartMap(data) {
    this.chartvalue = []
    this.graph = []
    for (let x of data?.graph) {
      this.chartvalue.push(x?.nav)

      if(x?.nav_date){
        this.graph.push(x?.nav_date)
      }else{
        this.graph.push(" ")

      }
    }

    this.linechart1 = new Chart("linechart1", {
      type: 'line',
      data: {
        labels: this.graph.reverse(),
        datasets: [{
          data: this.chartvalue,
          pointRadius: 4,
          fill: true,
          tension: 0.3,
          borderColor: '#96CF5C',
          pointBackgroundColor:'#96CF5C',
          backgroundColor: "#bdf0ab",


        }]
      },

      options: {
        scales: {
          x: {
            ticks: {
              maxRotation:90,
              minRotation:90,
              font: {
                size: 12,
              }
            },
            grid: {
              display: false
            }
          },
          y: {
            ticks: {
              display: false,
              font: {
                size: 12,
              }
            },
            grid: {
              display: false,
              drawBorder: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }

    });
  }

}
