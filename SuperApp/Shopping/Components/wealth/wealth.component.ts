import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'index';

@Component({
  selector: 'app-wealth',
  templateUrl: './wealth.component.html',
  styleUrls: ['./wealth.component.scss'],
})
export class WealthComponent implements OnInit {
  breadcrumb=this.router.url
  imageList=this.allConfigDataService.getConfig("images");
  userFirstName = "Salman";
  constructor(
    private router: Router,
    private allConfigDataService: AllConfigDataService
  
  ) { }
  footerListData= this.allConfigDataService.getConfig("ShoppingTab");

  ngOnInit() {
    
  }
  navigateTo(val){
    this.router.navigate([this.breadcrumb+val]);//this.router.url is the current url of the page ie breadcrumb
  }
  
}
