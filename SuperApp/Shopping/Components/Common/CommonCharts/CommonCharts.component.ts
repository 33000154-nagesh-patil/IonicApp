import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { Route, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Chart as ChartJS, Chart, registerables } from 'chart.js';
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
import { retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeyValue } from '@angular/common';
import { WebSocketServiceForStocks } from 'SuperApp/Shopping/Services/stockswebsocket.service';

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
  selector: 'app-CommonCharts',
  templateUrl: './CommonCharts.component.html',
  styleUrls: ['./CommonCharts.component.scss'],
})
export class CommonCharts implements OnInit {
  @Input() showDonut: any;
  @Input() showGraph: any;
  @Input() showBar: any;
  @Input() graphData: any;
  @Input() donutData: any;
  @Input() barGraphData: any;
  @Input() Product:any

  showButon:any=true


  Ratingvalue: any
  imageList: any;
  GraphValue: any = []
  Buttondata: any = "1m";
  chartIndex: number = 30;
  linechart9: any;
  lable: any[];
  rupeesSymbol: any;
  getCurrency: any;
  gold: any;
  silver: any;
  goldholding: any;
  silverholding: any;
  totalval: any;
  goldpercent: any;
  silverpercent: any;
  silveringrams: any;
  goldingrams: any;
  chartShow: boolean;
  toggle: any
  data: any = []
  Data: any = {};
  barChart:any
  Array:any

  doughnutRadio:any
  @ViewChild("chartObj", { static: true }) chart: ChartComponent;
  @ViewChild("barCanvas") barCanvas: ElementRef;
  public chartOptions: Partial<ChartOptions>;
  percentChange: string;
  CloseValue: any;
  constructor(private allConfigDataService: AllConfigDataService, private router: Router,
    private changDetector:ChangeDetectorRef
    ) {

  }

  ngOnInit() {
    console.log(this.barGraphData)


      if(this.showBar && this.barGraphData ){

      setTimeout(() => {
      this.getBarGraph(this.barGraphData)
      }, 1000);
      }





    if (this.showGraph && this.graphData) {

      if (this.graphData?.graph.length > 30) {
        for (let i = 0; i < 30; i++) {
          this.GraphValue[i] = this.graphData?.graph[i]

        }
        setTimeout(() => {
          this.chartMap(this.GraphValue)
          this.GraphValue = []
          console.log(this.graphData)
        }, 100)

      } else {
        setTimeout(() => {
          this.chartMap(this.graphData?.graph)
        }, 100)

      }
      if(this.graphData?.row2){
        this.Ratingvalue = this.graphData?.row2[0]["Rating"]
        }
    }




    this.imageList = this.allConfigDataService.getConfig('images');



  }
  ngAfterViewInit() {

    if (this.donutData && this.showDonut) {
    this.change(this.donutData?.donutData[0].label)
    }
  }
  activebutton(e, index: number) {
    this.Buttondata = e
    this.linechart9.destroy();
    this.chartIndex = index
    if (this.graphData?.graph.length >= this.chartIndex) {
      for (let i = 0; i < this.chartIndex; i++) {
        this.GraphValue[i] = this.graphData?.graph[i]
      }
      this.chartIndex = 0
      this.chartMap(this.GraphValue);
      this.GraphValue = []
    }
  }
  chartMap(Data) {
    this.data = []
    this.lable = []
    for (let x of Data) {
      this.data.push(x?.nav)
      if(this.Product=="Digigold"){
        this.lable.push(x?.nav_date)
      }else{
        this.lable.push(" ")
      }
    }
    this.linechart9 = new Chart("linechart17", {
      type: 'line',
      data: {
        labels: this.lable,
        datasets: [{
          data: this.data,
          pointRadius: 4,
          fill: true,
          tension: 0.3,
          borderColor: '#96CF5C',
          backgroundColor: "#bdf0ab",
          pointBorderWidth: 1,
          pointHitRadius: 10,

        }]
      },

      options: {
        scales: {
          x: {
            ticks: {
              maxRotation: 90,
              minRotation: 90,
              font: {
                size: 12,
              }
            },
            grid: {
              display: false
            }
          },
          y: {
            stacked: true,
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
            display: true
          }
        }
      }

    });
    // this.linechart9.destroy();
  }
  getBarGraph(Array) {
    let value = []
    let label = []
    for (let x of Array?.barData) {
      value.push(x?.value);
      label.push(x?.label);
    }
    this.barChart = new Chart("barChart", {
      type: 'bar',
      data: {
        labels:label,
        datasets: [{
          label: ' ',
          data: value,
          borderColor: '#96CF5C',
          backgroundColor:Array.color ,
          barThickness: 20,
          minBarLength:10
        }]
      },
      options: {
        scales: {
          x: {
            stacked: true,
          },
            y: {
              stacked: true,
            },
          },
          plugins: {
            legend: {
              display: false
            }
          }
        },


    });

  }

  toString(val) {
    return JSON.parse(JSON.stringify(val).replace('â‚¹', '₹').toString());
  }
  hiii(){
    this.changDetector.detectChanges()
  }
  getChart(data, total) {
    let values = []
    let labals = []
    let sumValue = 0;
    for (let x of data) {
      sumValue += parseInt(x?.value);
    }
    for (let x of data) {
      let y = Number(x?.value);
      if (total?.valueType == "percentage") {
        values.push(Number(x?.value));
      } else {
        values.push(Number(((y / sumValue) * 100).toFixed(2)));
      }
      labals.push(x?.label)
    }


    var self = this;
    if (this.chart) this.chart.destroy();

    this.chartOptions = {
      series: values,
      chart: {
        type: "donut",
        animations: {
          enabled: true,
          speed: 0
        },
        events: {
          animationEnd: function (ctx) {
            for (let x of data) {
              if (self.toggle == x?.label) {
                ctx.toggleSeries(x?.label);
              }
            }
          },
          dataPointSelection: (event, chartContext, config) => {

            self.doughnutRadio=self.donutData?.donutData[config.dataPointIndex].label
            self.toggle =self.donutData?.donutData[config.dataPointIndex].label
            self.hiii()
          },
        }

      },


      plotOptions: {
        pie: {
          donut: {
            size: "65px",
            labels: {
              show: true,
              name: {
                show: true,
                color: '#020712',
                formatter: function (val) {
                  return val
                }
              },
              value: {
                show: true,
                fontSize: '25px',
                color: '#020712',
                formatter: function (val) {
                  return val + "%"
                }
              },

              total: {
                show: true,
                label: 'Total ',
                fontSize: '10px',
                color: '#0a1721',
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return (a + b) + "%"
                  })
                }
              },
            }
          },
          expandOnClick: true,
        }
      },

      labels: labals,

      responsive: [
        {
          breakpoint: 500,
          options: {
            states: {
              active: {
                filter: {
                  type: 'none'
                }
              },
              normal: {
                filter: {
                  type: 'none',
                  value: 0,
                }
              },
              hover: {
                filter: {
                  type: 'none',
                }
              }
            },

            chart: {
              width: 230,
              height: 230

            },
            dataLabels: {
              enabled: false,
            },

            legend: {
              show: false,
              offsetY: 40,
              offsetX: -60,
              fontSize: '12px',
              position: "right",
              onItemClick: {
                highlightDataSeries: false,
                toggleDataSeries: true,
              },

              chart: {
                dropShadow: {
                  enabled: true,
                  blur: 0,
                  top: 0,
                  opacity: 0
                }
              }
            },
            stroke: {
              show: true,
              curve: 'straight',
              lineCap: 'round',
              width: 1,
              dashArray: 0,

            },
            fill: {
              type: 'gradient',
              colors: total?.colors,
              shadeIntensity: 0.5,
            },
          },

        }]

    }
    this.chartShow = true;
  }


  change(val) {

    this.doughnutRadio=val
    this.toggle = val;
    this.getChart(this.donutData?.donutData, this.donutData);
  }

  StartSip() {
    this.router.navigate(['/Shopping/OrderBook']);
  }
  compareCompany() {
    // this.router.navigate(['/Shopping/Wealth/Mutualfunds/compareFunds']);
    this.router.navigate(['/Shopping/listing']);

  }
  originalOrder = (): number => {
    return 0;
  }

}
