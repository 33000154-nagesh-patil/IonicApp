import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import myIssues from 'src/assets/myIssues.json';

@Component({
  selector: 'lib-myissues',
  templateUrl: './myissues.component.html',
  styleUrls: ['./myissues.component.scss'],
})
export class MyissuesComponent implements OnInit {
  imageList: any;
  issues: any;
  cardDetail: any;

  constructor(private allConfigDataService: AllConfigDataService, private router: Router, private location: Location) { }

  ngOnInit() {
    this.issues = myIssues.data;
    this.imageList = this.allConfigDataService.getConfig('images')

  }
  getDetail(val) {
    this.cardDetail = val
    this.router.navigate(['/myissueDetail', { value: JSON.stringify(this.cardDetail) }])
    // console.log(this.cardDetail);

  }
  goToBack() {
    this.location.back()
  }
  raisedTicket() {
    this.router.navigate(['chatbot'])
  }
}
