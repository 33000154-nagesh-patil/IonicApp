import { LoaderService } from './../../../core/src/lib/services/loader.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'lib-digiShopingDasboard',
  templateUrl: './digi-shoping-dasboard.component.html',
  styleUrls: ['./digi-shoping-dasboard.component.scss'],
})
export class DigiShopingDasboardComponent implements OnInit {
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
  constructor(private allconfigDataService:AllConfigDataService,private router:Router,private loaderService:LoaderService) { }

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
  }
  

}
