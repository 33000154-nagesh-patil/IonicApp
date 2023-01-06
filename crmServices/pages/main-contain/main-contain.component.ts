import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { CrmServiceService } from '../../../crmServices/services/crm-service.service';


@Component({
  selector: 'app-main-contain',
  templateUrl: './main-contain.component.html',
  styleUrls: ['./main-contain.component.scss'],
})
export class MainContainComponent implements OnInit {
  containVal: any;
  headerVal: any;
  headerCon: any;
  headerCommon: any;
  menuDetail: any;
  @ViewChild('drawer') drawer: MatDrawer;
  @ViewChild('snav') snav;
  @ViewChild('nav') nav;

  menuBarValue: any = {
    title: "Dashboard",
    uxClass: "muli-34pt"
  };
  dashBoard: any;
  showHide: any;
  searchDetail: any;
  showSearch: any;
  showCard: any;
  showDoughnut: any;
  showBarChart: any;
  table: any;
  particularDetail: any;
  showDetail:boolean=false
  details:any;
  productSelection:any;
  showProduct:boolean=false;
  dashBoardData: Object;
  subHeader: any;
  cardDetail: any;
  doughnutDetails: any;
  doughnutDetail: any;
  barChartDeatil: any;
  segment: any;



  constructor(private http: HttpClient, private crmService: CrmServiceService) {


  }

  ngOnInit() {
    this.http.get('/assets/crmServiceJson/crm.json').subscribe(async (res) => {
      this.containVal = await res
      this.headerVal = this.containVal.mainContain
      this.headerCommon = this.headerVal.header
      this.menuDetail = this.headerVal.menuBar
    })
    this.http.get('/assets/crmServiceJson/crmDashboard.json').subscribe(async (res) => {
      this.dashBoardData=await res
      this.menuBarValue=this.dashBoardData['subHeader'];
      this.searchDetail=this.dashBoardData['search'];
      this.crmService.searchData.next(this.searchDetail.value);
      this.cardDetail=this.dashBoardData['cards'];
      this.doughnutDetail=this.dashBoardData['doughnut'];
      this.barChartDeatil=this.dashBoardData['barChart'];
      this.table=this.dashBoardData['table']
      this.crmService.setTableData(this.table)
    });
  }
  getHeaderDetail(value) {
    if (value.key == 'menu')
    {
      this.showProduct =true;
      this.productSelection=value

    }
  }
  closeTab(){
    this.showProduct =false;
  }
  getMenuBarValue(val) {
    this.http.get('/assets/crmServiceJson/'+val.url+'.json').subscribe(async (res) => {
      this.dashBoardData=await res
      this.menuBarValue=this.dashBoardData['subHeader'];
      this.searchDetail=this.dashBoardData['search'];
      this.segment=this.dashBoardData['segment'];
      this.crmService.searchData.next(this.searchDetail.value);
      this.cardDetail=this.dashBoardData['cards'];
      this.doughnutDetail=this.dashBoardData['doughnut'];
      this.barChartDeatil=this.dashBoardData['barChart'];
      this.table=this.dashBoardData['table'];
      this.crmService.setTableData(this.table);
    });
    this.showDetail=false;

  }


  getDetail(value) {
    this.http.get('/assets/crmServiceJson/crmIndiviDetail.json').subscribe(async (res) => {
      this.dashBoardData=await res
      this.menuBarValue=this.dashBoardData['subHeader'];
      this.particularDetail=this.dashBoardData['details'].value;
      this.crmService.createForm.next(res['search'].value);
    })
    this.showDetail=true;

    //  if (this.details.title==value['LeadID'].title) {
    //   this.particularDetail=this.details.value
    //  }
  }
  getCardValue(value){
    this.crmService.setTableHeader(value)
  }
}

