import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
// import { MatCommonModule, MatOptionModule } from '@angular/material/core';
// import { MatSelectModule } from '@angular/material/select';
// import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'lib-lab-overview',
  templateUrl: './lab-overview.component.html',
  styleUrls: ['./lab-overview.component.scss'],
})
export class LabOverviewComponent implements OnInit {
  rupeesSymbol: any;
  getCurrency: any;
  data: any = {};
  selected: string;
  patientName: any = "";

  
  yearSelect: any = "";
  count = 0;
  total: any = 0;
  value: any

  constructor(private allconfigdataservice: AllConfigDataService, private router: Router, private modalcontroller: ModalController) { }

  ngOnInit() {
    this.getCurrency = this.allconfigdataservice.getConfig('listCodeCountry');
    this.rupeesSymbol = this.getCurrency['IND']['currencySymbol'];
  }



  canvas(val) {
    let chartStatus = Chart.getChart("myChart");
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: Object.keys(this.data),
        datasets: [{

          data: Object.values(this.data),
          backgroundColor: "#44C8F5"

        }]
      },

      options: {
        scales: {
          x: {
            ticks: {
              font: {
                size: 9,
              }
            },
            grid: {
              display: false
            }
          },
          y: {
            ticks: {
              font: {
                size: 9,
              }
            },
            grid: {
              display: false
            }
          }
        },
        plugins: {
          tooltip : {
            enabled: false
          },
          legend: {
            display: false
          }
        }
      }

    });

  }


  updateChart() {
    if (this.patientName === 'swapnil vasanth' && this.yearSelect === '2022') this.data = {
      'Jan': '5', 'Feb': '0', 'Mar': '2.3', 'Apr': '1', 'May': '0', 'Jun': '1.1',
      'Jul': '1', 'Aug': '2', 'Sep': '0', 'Oct': '1', 'Nov': '5', 'Dec': '0.5'
    }
    else {
      this.data = {}
      this.count = 0
      this.total = 0
    }

    if (this.patientName == 'rishikesh' && this.yearSelect === '2021') this.data = {
      'Jan': '1', 'Feb': '3.1', 'Mar': '1', 'Apr': '0', 'May': '1', 'Jun': '2',
      'Jul': '3', 'Aug': '2', 'Sep': '1', 'Oct': '4', 'Nov': '5', 'Dec': '1.5'
    }
    if (this.patientName == 'debasis' && this.yearSelect === '2020') this.data = {
      'Jan': '1.2', 'Feb': '0', 'Mar': '4.2', 'Apr': '6', 'May': '5', 'Jun': '1.1',
      'Jul': '1', 'Aug': '2', 'Sep': '0', 'Oct': '1', 'Nov': '2', 'Dec': '0.5'
    }
    this.canvas(1);

    // console.log(Object.values(this.data))
    // console.log(Object.values(this.data).length)


    for (let value of Object.values(this.data)) {
      if (value > 0) {
        this.count = this.count + 1;
        this.total = this.total + (+value * 1000)
      }
    }


  }

}
