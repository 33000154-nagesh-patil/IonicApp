import { Component, Input, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import {Chart as ChartJS,Chart,registerables  } from 'chart.js';
import { Button } from 'protractor';
Chart.register(...registerables);

@Component({
  selector: 'lib-my-portfolio',
  templateUrl: './my-portfolio.component.html',
  styleUrls: ['./my-portfolio.component.scss'],
})
export class MyPortfolioComponent implements OnInit {
  title="Mutual Funds";
  textName="Mutual Funds"
  @Input()SumOfCurrantValue:any
  @Input()InvestedAmount:any
  @Input()TotalReturnPer:any
 

    currencySymbol: any;
    currencyList: any;
    imageList:any;
    gradientFill:any
    polarAreaLegend = true; 
  Buttondata: any='1d';
  chartvalue: any;
  chartIndex: number=0;
  linechart: ChartJS<"line", any, string>;
    

    constructor(private allConfigDataService: AllConfigDataService) { }

  ngOnInit() {
    this.chartMap();
    this.imageList = this.allConfigDataService.getConfig('images')
    this.currencyList = this.allConfigDataService.getConfig('listCodeCountry')
    this.currencySymbol = this.currencyList['IND']['currencySymbol']

  
}


activebutton(e,index:number){
  
  this.Buttondata=e
  this.chartIndex=index
  this.linechart.destroy();
  this.chartMap();
 
}
chartMap(){
  this.chartvalue=[[10,50,40,50,20,40,70,10,50,40,50,20,40,70,10,50,40,50,20,40],[77,50,40,40,20,33,20,40,70,10,50,66,50,20,90],[10,50,40,50,20,40,55,10,50,60,50,20,40,70,88,50,77,50,20,40],[5,50,40,10,20,40,70,10,50,18,50,20,40,70,10,50,40,20,20,40],[10,20,40,50,90,40,70,10,50,40,50,20,40,70,10,50,40,50,20,40],[10,50,40,50,20,40,70,10,50,40,60,20,40,70,10,50,40,50,10,20],[10,50,40,50,20,40,70,10,50,40,50,20,40,70,50,20,40]]

  this.linechart = new Chart("linechart", {
    type: 'line',
    data: {
      labels: ['', '', '', '', '', '', '','', '', '', '', '', '', '', '', '','', '', '', ''],
      datasets: [{
        data: this.chartvalue[this.chartIndex],
        pointRadius: 0,
        fill:true,
        tension: 0.3,
         borderColor : '#96CF5C',
        backgroundColor:"#bdf0ab"

      }]
    },

    options: {
      scales: {
        x: {
          ticks: {
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

