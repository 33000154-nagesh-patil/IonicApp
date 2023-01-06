import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Chart,ChartType,registerables  } from "chart.js";
import { ModalController} from '@ionic/angular';
import { PlanningRecommendedModalComponent } from '../planning-recommended-modal/planning-recommended-modal.component';
import { PlanningTranslateModalComponent } from '../planning-translate-modal/planning-translate-modal.component';
@Component({
  selector: 'lib-investment-planning-transact',
  templateUrl: './investment-planning-transact.component.html',
  styleUrls: ['./investment-planning-transact.component.scss'],
})
export class InvestmentPlanningTransactComponent implements OnInit,AfterViewInit {
  @Input() transactData:any;
  @Input() currentMoneySymbols:any;
  @Input() collectionData:any;
  @ViewChild("barCanvas") barCanvas: ElementRef;
  @ViewChild('doughnutCanvasRecommended') private doughnutCanvasRecommended: ElementRef;
  doughnutChartRecommended: any;
  barChart: Chart;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  ngAfterViewInit(){
    Chart.register(...registerables);
    this.dynamicChart()
    this.doughnutChartMethodRecommended()
  }
  async showModal(data) {  
    const modal = await this.modalCtrl.create({  
      component: PlanningTranslateModalComponent,
      componentProps: { 
        custHeader: data,
        dummyData: this.transactData,
        collectionData:this.collectionData
      }
    });  
    return await modal.present();  
  }
  async openRecommended (data,type){
    const modal = await this.modalCtrl.create({  
      component: PlanningRecommendedModalComponent,
      componentProps: { 
        custHeader: data,
        type:type,
        dummyData: this.transactData,
        collectionData:this.collectionData,
        currentMoneySymbols:this.currentMoneySymbols
      } 
    });  
    return await modal.present();  
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
}
