import { Location } from '@angular/common';
import { CommonFunctionService } from 'index';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'index';
// import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
//import myIssues from '../myIssues.json'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'lib-myissues',
  templateUrl: './myissues.component.html',
  styleUrls: ['./myissues.component.scss'],
})
export class MyissuesComponent implements OnInit {
  imageList: any;
  issues: any;
  cardDetail: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  issuesLength: any;
  Title = "My Issues";
  issueDetails: any;
  cartCount;
  datas: any;
  docUpload: any;


  constructor(private allConfigDataService: AllConfigDataService, private router: Router, private location: Location,
    private http: HttpClient) {
    this.apiCatalog = {
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb = 'Engagement/EngagementMyIssues';
  }



  ngOnInit() {

    this.imageList = this.allConfigDataService.getConfig('images')
    this.getList();
    //this.issues=myIssues.data;
  }

  getList() {
    let prams =
      {
        "TokenId":localStorage.getItem('id_token')
    }


    this.http.post(this.apiCatalog.baseURL[this.appEnviron] + this.breadCrumb + this.apiCatalog.issues + "?issuesList", prams).subscribe((res: any) => {
      this.issues = res.data;
      // this.issueDetails = res;
      console.log(this.issues,"jjjdjdjdjdjd");

      // this.docUpload = res.docattachments;
      this.issuesLength = this.issues.length;

    })

  }


  getDetail(e) {
    // console.log(val, "issues data ");
    // this.cardDetail = val
    // this.datas = {
    //   ...e,
    //   header:this.issueDetails
    // }
    this.router.navigate(['Engagement/EngagementMyIssues/myissuedetails'],{state:{Header: e}})
    // this.router.navigate(['Engagement/EngagementMyIssues/myissuedetails'], {state: {data: this.cardDetail}});
    // console.log(this.cardDetail);
    console.log(e,"ljlkjljlk");


  }
  goToBack() {
    this.location.back()
  }
  filterPage() {
    this.router.navigate(['Engagement/EngagementGlobalFilter/globalFilter'])
  }
}
