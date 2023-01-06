import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  title:any;
  segment:any="Gold"
  imageList: any;
  notificationCount:any = 0;
  cartCount:any = 0;
  textName:any;
  labelIcon:any;
  currentMode:any=1;
  mfFooterData:any;
  fundListData:any;
  errorList:any;
  currentLanguage:any
  currentMoneySymbols:any;
  stepperData:any;
  loginCustGuId:any;
  currentFetcherModule:any;
  gold: boolean = true;
  silver: boolean = false;
  goldFooterData: any;
  constructor(private allconfigDataService:AllConfigDataService,private router:Router) { }

  Gold(){
    this.gold= true;
    this.silver = false;
    
   }
   Silver(){
    this.silver = true;
    this.gold = false;
    
   }

  ngOnInit() {
    this.imageList = this.allconfigDataService.getConfig('images')
    this.title = 'Digi Gold'
    this.textName = 'Digi Gold'
    
    console.log(this.segment,'asdfguugdgdsaf');
    this.goldFooterData = this.allconfigDataService.getConfig('goldTab');

  }

}
