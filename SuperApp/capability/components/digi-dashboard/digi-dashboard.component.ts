import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart as ChartJS, Chart, registerables } from 'chart.js';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';


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
  ApexTitleSubtitle,
  ChartComponent
} from "ng-apexcharts";
import { retry, filter } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { log } from 'console';

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
  selector: 'app-digi-dashboard',
  templateUrl: './digi-dashboard.component.html',
  styleUrls: ['./digi-dashboard.component.scss'],
})
export class DigiDashboardComponent implements OnInit {
  @Input() portFolioSummary:any
  chartShow:boolean;
  goldpercent:any;
  silverpercent:any;
  toggleGold:boolean = false;
  segment: any = 'Gold'
  value:any
  @ViewChild("chartObj",{ static: true }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() digiBenifit: any;
  chartvalue: any[];
  graph: any[];
  linechart1:  any;
  toggle: any;
  objg:any
  objh: any;
  constructor(private eduService:eduService) { }

  ngOnInit() {
     this.eduService.PortfolioSummary.subscribe((obj) => {
      this.portFolioSummary=obj;
      this.chengeSegment()
    });
    }
    ngAfterViewInit() {
      
   
      // this.chartMap(this.digiBenifit?.objectContent[0]?.Gold[1])
    

  }
  chengeSegment(){
 

    this.objg=this.digiBenifit?.objectContent[0][this.segment].filter(val=> ["linearGraph","Donut"].includes(val.contentType));

  this.objh=this.portFolioSummary[this.segment.toLowerCase()];

      

      console.log(this.objh,'portFolioSummary');
   
 
 
    
 

  
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
          pointRadius: 0,
          fill: true,
          tension: 0.3,
          borderColor: '#96CF5C',
          backgroundColor: "#bdf0ab"

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
