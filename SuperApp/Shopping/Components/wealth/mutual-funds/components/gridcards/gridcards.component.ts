import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit,EventEmitter, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';

@Component({
  selector: 'lib-gridcards',
  templateUrl: './gridcards.component.html',
  styleUrls: ['./gridcards.component.scss'],
})
export class GridcardsComponent implements OnInit {
  
  imageList: any;
  DummayAPiData:any
  DummayTitle: any=[];
  @Input() SIPLumsum:any=true

  constructor(private router:Router,private allConfigDataService:AllConfigDataService,private modalCtrl:ModalController,private CFS:CommonFunctionService,private http:HttpClient) { }

  ngOnInit() {

    this.imageList = this.allConfigDataService.getConfig('images');
    this.DummayTitle=[
      {
        "name":"Top Rated Fund",
      },
      {
        "name":"Tax Savers",
      }, {
        "name":"New Fund Offers",
      }, {
        "name":"Annual Return Fund",
      }, {
        "name":"Wealth Builder",
      }, {
        "name":"Steady Income",
      },
     ]
  }
     
    async getCol(data) {
      this.router.navigate(['/Shopping/Wealth/MutualFunds/category'],  { state: {  imageList:this.imageList,headerName:data,  } });
    }
 
   

     
  }

