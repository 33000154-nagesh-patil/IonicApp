// import { fetcherList } from './../../../../core/src/lib/enums/comman.enum';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Chart as ChartJS, Chart, registerables } from 'chart.js';
import { CompareFundComponent } from '../compare-fund/compare-fund.component';
import { HttpClient } from '@angular/common/http';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { MFServiceService } from 'projects/core/src/lib/services/mfservice.service';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';

Chart.register(...registerables);


@Component({
  selector: 'app-mfcard-detail',
  templateUrl: './mfcard-detail.component.html',
  styleUrls: ['./mfcard-detail.component.scss'],
})
export class MFCardDetailComponent implements OnInit {
  @Input() imageList: any;
  @Input() currentCountry: any;
  @Input() currentProductDatalib: any;
  @Input() errorList: any;
  @Input() currentDigiDataOrderList: any;
  @Input() selectedCard: any
  //  selectedCard:any;
  Linechart: any
  notificationCount: any
  title: any
  labelIcon: any
  cartCount: any
  currentMode: any
  x: any;
  showModal: boolean;
  currentFetcherModule: any;
  fundData: any;
  segmentValue: any = 'friends'
  segmentValue1: any = 'Sectors';
  Buttondata: any = '1m';
  chartIndex: number = 0; addincart: boolean;
  cartData: unknown[];
  fundDetail: any;
  basicDetail: any;
  riskometer: any;
  riskImageShow: any;
  AssetsDetail: any;
  NavDates: any;

  chartvalue: any = [];
  linechart: ChartJS<"line", number[], string>;
  space: any = [];
  MyDate: any;
  equty: any[];
  dept: any[];
  others: any[];
  index: any = 1;
  index1: any = 1;
  index2: any = 1;
  company: any[];
  industry: any[];
  sector: any[];
  showButton: any = "Show More";
  showButton1: any = "Show More";
  Rate: any;
  i: any;
  equityRate: any;
  debtRate: any;
  othersRate: any;

  constructor(
    private MFService: MFServiceService,
    private eduService:eduService,
    private loaderService: LoaderService, private commonfunction: CommonFunctionService, private modalCtrl: ModalController, private router: Router, private http: HttpClient, private allConfigDataService: AllConfigDataService) { }

  ngOnInit() {
    // this.riskChart()
    // this.selectedCard = this.NewLibService.getSelectedCard();
    // this.cartData = Object.values(this.commonfunction.getCartList())
    // this.cartCount = this.cartData.length
    this.imageList = this.router.getCurrentNavigation().extras.state.imageList;
    this.currentCountry = this.router.getCurrentNavigation().extras.state.currentCountry;
    this.selectedCard = this.router.getCurrentNavigation().extras.state.selectedCard;
    this.x = this.router.getCurrentNavigation().extras.state.x;
    this.MyDate = this.commonfunction.dobFormattedDDMMYYYY(new Date())

    let Currentdate = this.commonfunction.dobFormattedYYYYMMDD(new Date())
    let CurrentYear = new Date().getFullYear()
    let CurrentMonth = new Date().getMonth()
    let CurrentDay = new Date().getDay()
    console.log(Currentdate, CurrentYear, CurrentMonth, CurrentDay)
    this.imageList = this.allConfigDataService.getConfig('images')
    this.getFundAnalysis()

    this.getAllMFDetails1({ "PlanId": this.selectedCard.plan_id });
    this.getAllMFDetails3({ "PlanId": this.selectedCard.plan_id });
    this.getAllMFDetails5({
      "PlanId": this.selectedCard.plan_id,
      "fromDate": (CurrentYear) + "-" + (CurrentMonth) + "-" + (CurrentDay),
      "toDate": Currentdate
    });
    this.getAllMFDetails2({ "PlanId": this.selectedCard.plan_id });
    this.getAllMFDetails4({ "PlanId": this.selectedCard.plan_id });
    // this.getAllMFDetails4({"PlanId": 204});
    // this.getAllMFDetails6({"PlanId": this.selectedCard.plan_id});
  }

  async Buyit() {
    // this.router.navigate(['/Fullfilment/MutualFunds'], {
    //   state: {
    //     imageList: this.imageList,
    //     x: this.x,
    //     currentCountry: this.currentCountry,
    //     SelectedCard: this.selectedCard,
    //     ValidationDetail: this.basicDetail
    //   }
    // });
    this.router.navigate(['/Shopping/OrderBook']);
    this.eduService.productName.next("mutualFund")
  }

  onCancelSIP() {
    this.modalCtrl.dismiss();
  }

  openModal() {

    this.showModal = !this.showModal;
    console.log("this.showModal", this.showModal)
  }
  async compareCompany() {
    this.router.navigate(['/Shopping/Wealth/MutualFunds/comparelist'], {
      state: {
        imageList: this.imageList,
        selectedCard: this.selectedCard
      }
    });

  }

  dissmis() {
    this.modalCtrl.dismiss()
    this.router.navigate(['/Shopping/Wealth/MutualFunds'])
  }

  getFundAnalysis() {
    let data = {
      "CFT": "Shopping",
      "Product": "MF",
      "FileName": "getFundsInPortal"
    }
    this.http.post("https://apixcug.heytorus.com/api/v1/Dummy/get/generalApi", data).subscribe(
      (data: any) => {
        this.fundData = data.InPortal

      }
    )

  }
  segmentChanged(e) {
    this.segmentValue = e.detail.value;

  }
  segmentChanged2(e) {
    this.segmentValue1 = e.detail.value;

  }
  // selectedCard
  Addtocart(selectedCard) {
    console.log(selectedCard, "addtocart")
    this.addincart = true
    // this.commonfunction.putAddToCart(selectedCard)
    // this.cartData = Object.values(this.commonfunction.getCartList())
    this.cartCount = this.cartData.length
    // console.log(this.cartData,this.cartCount,"ram")

  }

  activebutton(e, index: number) {
    let Currentdate = this.commonfunction.dobFormattedYYYYMMDD(new Date())
    let CurrentYear = new Date().getFullYear()
    let CurrentMonth = new Date().getMonth()
    let CurrentDay = new Date().getDay()
    if (index == 1) {
      this.Rate = this.fundDetail?.fundRet1
    } else if (index == 3) {
      this.Rate = this.fundDetail?.fundRet3
    } else if (index == 5) {
      this.Rate = this.fundDetail?.fundRet5
    } else if (index == 10) {
      this.Rate = this.fundDetail?.fundRetMax
    } else if (index == 0) {
      this.Rate = this.fundDetail?.month_ret1
    } else if (index == 2) {
      this.Rate = this.fundDetail?.month_ret3
    } else if (index == 6) {
      this.Rate = this.fundDetail?.month_ret6
    }

    console.log(Currentdate, CurrentYear, CurrentMonth, CurrentDay)
    this.Buttondata = e
    this.chartIndex = index
    this.linechart.destroy();
    this.space = []
    this.chartvalue = []
    if (this.Buttondata == "1m" || this.Buttondata == "3m" || this.Buttondata == "6m") {
      let differDate = CurrentMonth - index
      if (differDate < 0) {
        CurrentYear = CurrentYear - 1
        CurrentMonth = 12 - differDate
      } else {
        CurrentMonth = CurrentMonth - index
      }
    } else {
      CurrentYear = CurrentYear - index
    }

    this.getAllMFDetails5({
      "PlanId": this.selectedCard.plan_id,
      "fromDate": (CurrentYear) + "-" + (CurrentMonth) + "-" + (CurrentDay),
      "toDate": Currentdate
    });


  }
  chartMap() {

    this.linechart = new Chart("linechart2", {
      type: 'line',
      data: {
        labels: this.space,
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

  async openCart() {


  }


  getAllMFDetails2(obj) {
    // this.loaderService.showLoader();
    this.MFService.getAllMFDetails2(obj).subscribe((data) => {
      this.loaderService.hideLoader();
      if (data) {
        this.fundDetail = data.data[0]
        this.Rate = this.fundDetail.fundRet1
      } else {
        this.errorShow(data?.Message, "MutualFundReedemStatus -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "MutualFundReedemStatus -> Http request");
    })
  }
  getAllMFDetails4(obj) {
    // this.loaderService.showLoader();
    this.MFService.getAllMFDetails4(obj).subscribe((data) => {
      this.loaderService.hideLoader();
      if (data) {
        this.riskometer = data
        this.getLesData1();
      } else {
        this.errorShow(data?.Message, "MutualFundReedemStatus -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "MutualFundReedemStatus -> Http request");
    })
  }

  getLesData1() {
    this.company = []
    this.industry = []
    this.sector = []
    for (let i = 0; i < 3; i++) {
      if (this.riskometer.Company.length > 3) {
        this.company.push(this.riskometer.Company[i])
      } else {
        this.company = this.riskometer.Company
      }
      if (this.riskometer.Instrument.length > 3) {
        this.industry.push(this.riskometer.Instrument[i])
      } else {
        this.industry = this.riskometer.Instrument
      }
      if (this.riskometer.Sector.length > 3) {
        this.sector.push(this.riskometer.Sector[i])
      } else {
        this.sector = this.riskometer.Sector
      }
    }
  }
  // getAllMFDetails6(obj) {
  //   // this.loaderService.showLoader();
  //   this.MFService.getAllMFDetails6(obj).subscribe((data) => {
  //     this.loaderService.hideLoader();
  //     if (data) {
  //       this.riskometer = data
  //       this.riskImageShow = data[0]?.colour_name
  //       console.log(this.riskometer)
  //     } else {
  //       this.errorShow(data?.Message, "MutualFundReedemStatus -> status");
  //     }
  //   }, (error: any) => {
  //     this.errorShow(error?.Message, "MutualFundReedemStatus -> Http request");
  //   })
  // }
  getAllMFDetails1(obj) {
    // this.loaderService.showLoader();
    this.MFService.getAllMFDetails1(obj).subscribe((data) => {
      this.loaderService.hideLoader();
      if (data) {
        this.basicDetail = data.data[0]
        this.riskImageShow = this.basicDetail?.colour_name
      } else {
        this.errorShow(data?.Message, "MutualFundReedemStatus -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "MutualFundReedemStatus -> Http request");
    })
  }
  getAllMFDetails3(obj) {
    // this.loaderService.showLoader();
    this.MFService.getAllMFDetails3(obj).subscribe((data) => {
      this.loaderService.hideLoader();
      if (data) {
        this.AssetsDetail = data

        for (let i = 0; i < this.AssetsDetail.TOTAL.length; i++) {
          if (this.AssetsDetail?.TOTAL[i]?.typeDesc == 'Equity') {
            this.equityRate = this.AssetsDetail?.TOTAL[i]?.allocationPercentage + "%"
          } else if (this.AssetsDetail?.TOTAL[i]?.typeDesc == 'Debt') {
            this.debtRate = this.AssetsDetail?.TOTAL[i]?.allocationPercentage + "%"
          } else if (this.AssetsDetail?.TOTAL[i]?.typeDesc == 'Others') {
            this.othersRate = this.AssetsDetail?.TOTAL[i]?.allocationPercentage + "%"
          }
        }
        this.getLessdata()

      } else {
        this.errorShow(data?.Message, "MutualFundReedemStatus -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "MutualFundReedemStatus -> Http request");
    })
  }
  getLessdata() {
    this.equty = []
    this.dept = []
    this.others = []
    for (let i = 0; i < 3; i++) {
      if (this.AssetsDetail.Equity.length > 3) {
        this.equty.push(this.AssetsDetail.Equity[i])
      } else {
        this.equty = this.AssetsDetail.Equity
      }
      if (this.AssetsDetail.Debt.length > 3) {
        this.dept.push(this.AssetsDetail.Debt[i])
      } else {
        this.dept = this.AssetsDetail.Debt
      }
      if (this.AssetsDetail.Others.length > 3) {
        this.others.push(this.AssetsDetail.Others[i])
      } else {
        this.others = this.AssetsDetail.Others
      }
    }
  }

  getAllMFDetails5(obj) {
    // this.loaderService.showLoader();
    this.MFService.getAllMFDetails5(obj).subscribe((data) => {
      this.loaderService.hideLoader();
      if (data) {
        this.NavDates = data.Data
        this.NavDates.forEach(element => {
          this.chartvalue.push(element.nav)
          this.space.push(" ");
        });
        this.chartMap()
      } else {
        this.errorShow(data?.Message, "MutualFundReedemStatus -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "MutualFundReedemStatus -> Http request");
    })
  }

  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonfunction.showErrorsService(this.errorList?.error, 'Pan card component -> ' + functionName, message, this.errorList?.okText);
  }

  // getMoreData(){
  //   if(this.index<this.AssetsDetail?.Equity?.length){
  //     let jump=this.index1
  //    while(this.index1<jump+3 &&  this.index1<this.AssetsDetail.Equity.length){
  //      this.equty.push(this.AssetsDetail.Equity[this.index1]);
  //      this.index1++;
  //    }
  //   }
  //   if(this.index2<this.AssetsDetail?.Dept?.length){
  //     let jump=this.index2
  //    while(this.index2<jump+3 &&  this.index2<this.AssetsDetail.Dept.length){
  //      this.dept.push(this.AssetsDetail.Dept[this.index2]);
  //      this.index2++;
  //    }
  //   }
  //   if(this.index<this.AssetsDetail?.Others?.length){
  //     let jump=this.index
  //    while(this.index<jump+3 &&  this.index<this.AssetsDetail.Others.length){
  //      this.others.push(this.AssetsDetail.Others[this.index]);
  //      this.index++;
  //    }
  //   }

  // }
  getMoreData() {
    this.equty = this.AssetsDetail.Equity
    this.dept = this.AssetsDetail.Debt
    this.others = this.AssetsDetail.Others
    if (this.showButton == "Show Less") {
      this.getLessdata()
    }
    if (this.equty.length >= this.AssetsDetail.Equity.length) {
      this.showButton = "Show Less";
    } else {
      this.showButton = "Show More";
    }

  }
  getMoreData1() {
    this.company = this.riskometer.Company
    this.industry = this.riskometer.Instrument
    this.sector = this.riskometer.Sector
    if (this.showButton1 == "Show Less") {
      this.getLesData1()
    }
    if (this.company.length >= this.riskometer.Company.length) {
      this.showButton1 = "Show Less";
    } else {
      this.showButton1 = "Show More";
    }
  }
}
