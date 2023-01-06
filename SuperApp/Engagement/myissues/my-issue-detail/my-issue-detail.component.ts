import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Location } from '@angular/common';
import { CommonFunctionService } from 'index';
// import myIssues from '../../myIssues.json'
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'lib-my-issue-detail',
  templateUrl: './my-issue-detail.component.html',
  styleUrls: ['./my-issue-detail.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('400ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
    ])
  ]
})
export class MyIssueDetailComponent implements OnInit {
  value1: any;
  imageList: any;
  getAllData: any;
  allDetails: any;
  isView: boolean = false;
  state: string = 'default';
  title: any;
  ticketID: any;
  cartCount;
  detailValue: string[];
  getCardDetails: any;
  @Input() Header: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  docUpload: any;
  issueDate: any;
  data: any;

  constructor(private commonFunctionService: CommonFunctionService, private route: ActivatedRoute, private allConfigDataService: AllConfigDataService, private router: Router, private location: Location,
    private http: HttpClient) {
    this.Header = this.router.getCurrentNavigation().extras.state.Header;
    this.apiCatalog = {
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb = 'Engagement/EngagementMyIssues';
  }

  ngOnInit() {

    // this.getCardDetails=this.commonFunctionService.getMyIssueData()
    this.imageList = this.allConfigDataService.getConfig('images')
    // this.detailValue = this.route.snapshot.paramMap.getAll('detailVlue')
    // this.value1=this.route.snapshot.paramMap.getAll('value')
    // this.getAllData=JSON.parse(this.value1)

    console.log(this.Header, "jjjjjjjjj")

    this.title = this.Header.status;
    console.log(this.issueDate, "kjkjkjkjk");

    // this.data = this.Header;
    // this.allDetails = this.Header.header.detail;
    // this.docUpload = this.Header.header.docattachments;
    // console.log("ddddddddddddddpankaj",this.allDetails[0].issueDate);
    // console.log("dsssssssss",this.docUpload);
    this.ticketID = "Ticket ID - " + this.Header.ticketId;
    this.issueDate = this.Header.issueDate;
    this.getList(this.ticketID);

  }
  // chatBot

  ViewMore(e) {
    this.isView = !e;
    // if(!e){
    // this.data=[]
    //  for(let i=0;i<this.Apidate.length;i++){
    //   this.data.push(this.Apidate[i])
    //  }
    // }else{
    //   this.data.splice(2)
    // }

    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }

  goToBack() {
    this.location.back()
  }


  getList(val) {
    // let headers: HttpHeaders = new HttpHeaders({
    //   "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
    // });
    let prams = {
      "TokenId": localStorage.getItem('id_token'),
      "TicketId": val,
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron] + this.breadCrumb + this.apiCatalog.issues + "?issuesDetail", prams).subscribe((res: any) => {
      this.allDetails = res.detail;
      this.docUpload = res.docattachments;
      console.log("detaillll", this.allDetails);
      console.log("detailllluploaddd", this.docUpload);
    })

  }

  get(val) {
    if (val == 'Resolved') return 'StepProgress-item is-done'
    else if (val == 'In Progress') return 'StepProgress-item in-progress'
    else if (val == 'Pending') return 'StepProgress-item in-pending'
    else if (val == 'On-hold') return 'StepProgress-item on-hold'
    else return 'StepProgress-item current'
  }
}
