import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Chart,ChartType,registerables  } from "chart.js";
@Component({
  selector: 'lib-planning-translate-modal',
  templateUrl: './planning-translate-modal.component.html',
  styleUrls: ['./planning-translate-modal.component.scss'],
})
export class PlanningTranslateModalComponent implements OnInit, AfterViewInit {
  collectionData:any;
  @ViewChild("barCanvasModal") barCanvas: ElementRef;
  custHeader;
  dummyData;
  barChart: Chart;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  ngAfterViewInit(){
    Chart.register(...registerables);
    this.dynamicChart()
  }

  dismiss() {  
    this.modalCtrl.dismiss();  
  } 

  dynamicChart(){
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.collectionData?.labels,
        datasets: [
          {
            //label: "# of Votes",
            data: this.collectionData?.data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins:{
          legend:{
            display:false
          }
        },

        scales: {
          y: 
            {
              beginAtZero: true,
            }
          
        }
      }
    });
  }
}
