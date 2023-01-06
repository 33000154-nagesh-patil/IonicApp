import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import {trigger, state, style, animate, transition} from '@angular/animations';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';

@Component({
  selector: 'lib-lab-reports',
  templateUrl: './lab-reports.component.html',
  styleUrls: ['./lab-reports.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('400ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
  ])
]
})

export class LabReportsComponent implements OnInit {
 imageList: any;
 state: string = 'default';
 errorList: any;
 data: any=[];
 data2: any;
 getCurrency:any;
 rupeesSymbol:any;
 isView: boolean = false;
 i:any
 hideViewMore:any=false;
  Apidate: any;
  constructor(private loaderService: LoaderService,private allConfigDataService:AllConfigDataService, private router: Router, private modalcontroller : ModalController, private http:HttpClient,private commonFunctionService:CommonFunctionService) { }

  ngOnInit() {
    this.getProductReports()
   
  
    this.imageList = this.allConfigDataService.getConfig('images');
    this.getCurrency=this.allConfigDataService.getConfig('listCodeCountry');
    this.rupeesSymbol=this.getCurrency['IND']['currencySymbol'];
  }


  ViewMore(e){
    this.isView=!e;
    if(!e){
    this.data=[]
     for(let i=0;i<this.Apidate.length;i++){
      this.data.push(this.Apidate[i])
     }
    }else{
      this.data.splice(2)
    }  

    this.state = (this.state === 'default' ? 'rotated' : 'default');
  } 

  getProductReports(){
   
    this.http.get("http://uat.torusdigital.in/api/v1/Call/Shopping/Health/Get/LabsReports").subscribe(
      (res: any) => {
         for(let i=0; i<2;i++){
           this.data.push(res[i]);
         }
         this.Apidate=res
         console.log(this.data)
        }, (error: any) => {
          this.errorShow(error?.Message, "productList -> Http request");
        })
       
      }
     
    errorShow(message, functionName) {
      this.loaderService.hideLoader();
      this.commonFunctionService.showErrorsService(this.errorList?.error, null, message, this.errorList?.okText);
    }

}

