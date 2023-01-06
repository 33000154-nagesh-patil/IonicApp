import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';

@Component({
  selector: 'app-lifestyle',
  templateUrl: './lifestyle.page.html',
  styleUrls: ['./lifestyle.page.scss'],
})
export class LifestylePage implements OnInit {
  title:any;
  imageList: any;
  notificationCount:any = 0;
  cartCount:any = 0;
  textName:any;
  labelIcon:any;
  currentMode:any=1;
  wellnessFooterData:any;
  constructor(private router:Router,private allConfigDataService:AllConfigDataService, private commonFunctionService:CommonFunctionService, private commonService:CommonService) { }

  ngOnInit() {
    this.title = 'Lifestyle';
    this.imageList = this.allConfigDataService.getConfig('images');
    this.wellnessFooterData = this.allConfigDataService.getConfig('wellnessTab');
    this.allConfigDataService.appMode.subscribe((data)=>{
      this.currentMode = data;
    })
  }

}
