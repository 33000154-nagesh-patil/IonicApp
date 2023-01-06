import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  AllConfigDataService,

 } from 'index';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';

@Component({
  selector: 'app-onboarding-bare-bone',
  templateUrl: './onboarding-bare-bone.component.html',
  styleUrls: ['./onboarding-bare-bone.component.scss'],
})
export class OnboardingBareBoneComponent implements OnInit {
  imageList: any;
showHeader=false;
onboardingStep:any;
  ConfirmErrorMsg: boolean;
  progressBarModal: boolean = true;
  constructor(
    private allConfigDataService:AllConfigDataService,
    private router:Router,
    private eduService:eduService
  ) {

   }

  ngOnInit() {
    this.imageList=this.allConfigDataService.getConfig('images');
    this.showHeader=false;
   this.onboardingStep = JSON.parse(sessionStorage.getItem("OnboardingStep"))
   
  }
  dismiss(){
    this.router.navigate(['/Engagement']);
  }
  onActivate(val){
    console.log(val.dontShowHeader);

val.dontShowHeader?this.showHeader=true:this.showHeader=false

  }
  ionViewDidLeave(){
   this.showHeader=false;
  }

  getCancel() {
    this.ConfirmErrorMsg = true;
  }

  onCancel() {
    this.ConfirmErrorMsg = false;
  }

  onConfirmNo() {
    this.ConfirmErrorMsg = false;
    this.progressBarModal = false;
  }

  Resume() {
    this.progressBarModal = false
  }

  retryNavigate(val){
    this.progressBarModal = false;
    this.router.navigate(['Onboarding'+val.pageUrl])
  }
}
