import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import myIssues from 'src/assets/myIssues.json'
import {trigger, state, style, animate, transition} from '@angular/animations';
import { Location } from '@angular/common';

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
  value1:any ;
  imageList: any;
  getAllData: any;
  allDetails: any;
  isView: boolean =false;
  state: string='default';
  title: any;

  constructor(private route:ActivatedRoute,private allConfigDataService:AllConfigDataService,private router :Router,private location:Location) { }

  ngOnInit() {
    this.allDetails=myIssues.detail
    console.log("----------------------------",this.allDetails);
    
    this.imageList = this.allConfigDataService.getConfig('images')
    this.value1=this.route.snapshot.paramMap.getAll('value')
    this.getAllData=JSON.parse(this.value1)
    this.title=this.getAllData.status
    console.log("==================================>",this.title);
    
    
  }
  // chatBot

  ViewMore(e){
    this.isView=!e;
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

  goToBack(){
    this.location.back()
}

get(val){
  // debugger
  console.log("=================================>",val);
  
  if(val=='Resolved') return 'StepProgress-item is-done'
  else if(val == 'In Progress') return 'StepProgress-item in-progress'
  else if(val =='Pending') return 'StepProgress-item in-pending'
  else if(val == 'On-hold') return 'StepProgress-item on-hold'
  else return 'StepProgress-item current'
}
}
