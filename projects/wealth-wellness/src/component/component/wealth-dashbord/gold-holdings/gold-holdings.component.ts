import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from "chart.js";
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';




@Component({
  selector: 'lib-gold-holdings',
  templateUrl: './gold-holdings.component.html',
  styleUrls: ['./gold-holdings.component.scss'],
})
export class GoldHoldingsComponent implements OnInit {
  rupeesSymbol: any;
  getCurrency: any;
  apxchart: any;

  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  private doughnutChart: Chart;
  constructor(private allConfigDataService: AllConfigDataService, private router: Router) {}

ngOnInit() {
    this.getCurrency = this.allConfigDataService.getConfig('listCodeCountry');
    this.rupeesSymbol = this.getCurrency['IND']['currencySymbol'];   
  
}
ngAfterViewInit(): void{
  this.chartCreate()
}

chartCreate(){
  this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
    type: "doughnut",
    data: {
      labels: ["SmallCap", "MidCap", "LargeCap"],
      datasets: [
        {
          label: "# of Funds",
          data: [5000, 8000, 10000],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)"
           
          ],
          
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    },
    options: {    
      plugins: {
        legend: {
            position: 'right',
            labels: {
              // This more specific font property overrides the global property
              font: {
                  size: 14
              }
          }
        }
    }
    }
  });
}
}
   