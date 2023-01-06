import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Chart,ChartType,registerables  } from "chart.js";
@Component({
  selector: 'lib-planning-recommended-modal',
  templateUrl: './planning-recommended-modal.component.html',
  styleUrls: ['./planning-recommended-modal.component.scss'],
})
export class PlanningRecommendedModalComponent implements OnInit, AfterViewInit {
  custHeader;
  type;
  dummyData;
  collectionData
  currentMoneySymbols
  @ViewChild('doughnutCanvasYou') private doughnutCanvasYou: ElementRef;
  @ViewChild('doughnutCanvasRecommended') private doughnutCanvasRecommended: ElementRef;
  doughnutChartYou: any;
  doughnutChartRecommended: any;
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
    this.doughnutChartMethodYou();
    if(this.type !== 3){
      this.doughnutChartMethodRecommended();
    }
  }

  doughnutChartMethodRecommended() {
    this.doughnutChartRecommended = new Chart(this.doughnutCanvasRecommended.nativeElement, {
      type: 'pie',
      data: {
        labels: this.collectionData?.labels,
        datasets: [{
          label: '# of Votes',
          data: this.collectionData?.data,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384'
          ]
        }]
      }
    });
  }
  doughnutChartMethodYou() {
    this.doughnutChartYou = new Chart(this.doughnutCanvasYou.nativeElement, {
      type: 'pie',
      data: {
        labels: this.collectionData?.labels,
        datasets: [{
          label: '# of Votes',
          data: this.collectionData?.data,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384'
          ],
          hoverOffset: 4
        }]
      }
    });
  }
}
