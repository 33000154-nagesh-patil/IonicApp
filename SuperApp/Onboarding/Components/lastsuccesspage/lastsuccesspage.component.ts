import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'lib-lastsuccesspage',
  templateUrl: './lastsuccesspage.component.html',
  styleUrls: ['./lastsuccesspage.component.scss'],
})
export class LastsuccesspageComponent implements OnInit {
  @Input() imageList: any;

  constructor(private allConfigDataService:AllConfigDataService,private router:Router,private modalCtrl:ModalController  ) { }

  ngOnInit() {
    this.imageList=this.allConfigDataService.getConfig('images')

  }


  data=[

    {"offering":"Wallet"},
    {"offering":"Saving & Transaction Account"},
    {"offering":"RuPay Debit Card"},
    {"offering":"Investment Broking"},
    {"offering":"Mutual Fund"},
    {"offering":"Digi Gold"},
    {"offering":"Health"},
   
  ]
  data1=[
    {"offering":"Zero brokage fees"},
    {"offering":"No Platform fee"},
    {"offering":"Fully digital trading experience"},
    {"offering":"Invest in stocks and mutual funds"},
    {"offering":"Trade in F and O, Currency and Commodities"},
    {"offering":"Link your trading account with saving bank and enjoy safety and Convenience"}
   

  ]

  dismiss(){
    
    this.router.navigate(['/Engagement'])
      
    }
  route(){
    this.router.navigate([''])
  }

}
