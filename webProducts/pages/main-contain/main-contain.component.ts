import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { CrmServiceService } from '../../services/crm-service.service';


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
  tableDetails: Object;
  subHeaderValue:any;
 

  constructor(private http: HttpClient, private crmService: CrmServiceService,private cdn:ChangeDetectorRef) {


  }

  ngOnInit() {
    this.http.get('/assets/crmJsons/crm.json').subscribe(async (res) => {
      this.containVal = await res
      this.headerVal = this.containVal.mainContain
      this.headerCommon = this.headerVal.header
      this.menuDetail = this.headerVal.menuBar
    })
    this.http.get('/assets/crmJsons/crmDashboard.json').subscribe(async (res) => {
      this.dashBoardData=await res   
      this.subHeaderValue=this.dashBoardData['subHeader'];
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
    
    this.http.get('/assets/crmJsons/'+value.url+'.json').subscribe(async (res) => {
      this.productSelection=await res['productSelection'];
      this.showProduct =true;
      })
  }
  closeTab(){
    this.showProduct =false;
  }

  segmentData(val){
    this.http.get('/assets/crmJsons/crmDelegation.json').subscribe(async (res) => {
    this.dashBoardData=await res[val];
      this.table=this.dashBoardData['table']; 
      this.crmService.setTableData(this.table);
      this.searchDetail=this.dashBoardData['search'];
      this.crmService.searchData.next(this.searchDetail.value);
    })
  }
  getMenuBarValue(val) {
    this.crmService.checkMenu.next('')
    this.http.get('/assets/crmJsons/'+val.url+'.json').subscribe(async (res) => {
      this.dashBoardData=await res;   
      this.subHeaderValue=this.dashBoardData['subHeader'];
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
    this.crmService.checkMenu.next(value['LeadID'].title)
    this.http.get('/assets/crmJsons/crmIndiviDetail.json').subscribe(async (res) => {
      this.dashBoardData=await res   
      this.subHeaderValue=this.dashBoardData['subHeader'];
      this.particularDetail=this.dashBoardData['details'].value;
      this.crmService.createForm.next(res['search'].value);
    })
    this.showDetail=true;
  }


  getCardValue(value){   
    this.http.get('/assets/crmJsons/'+value.url+'.json').subscribe(async (res) => {
      this.tableDetails=await res 
      this.table=this.tableDetails['table'];   
      this.crmService.setTableData(this.table);
    })
  }

}

