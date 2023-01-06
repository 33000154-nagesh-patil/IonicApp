import { HttpClient } from '@angular/common/http';
import { AllConfigDataService } from 'index';
import { Component, OnInit } from '@angular/core';
import cards from '../trackmedicine.json'
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicine-track-order',
  templateUrl: './medicine-track-order.component.html',
  styleUrls: ['./medicine-track-order.component.scss'],
})
export class MedicineTrackOrderComponent implements OnInit {
  imageList=this.allconfigDataService.getConfig('images')
  cards;
  progressBar: any;
  inProgress: any;
  res: any;
  val: any;
  apiCatalog:any={

    ...this.allconfigDataService.getConfig('apiCatalog'),

    "breadCrumb": "Health/Medicine",
     

    "environment": this.allconfigDataService.getConfig('environmentType'),

  }
  constructor(public allconfigDataService:AllConfigDataService,private http:HttpClient,private router:Router) { 
    this.cards=cards.card;
    this.progressBar=cards.progressBar;
    this.val = this.router.getCurrentNavigation().extras.state.health;
  }

  ngOnInit() {
  this.protoApicall();
    console.log(cards);
    this.progressBar.filter(res=>{
      if(res.Status=="Pankaj"){
        return this.inProgress=true;
      }
    })
    console.log(this.inProgress,"123");
    
  }
  goBack(){
    window.history.back()
    
  }
  protoApicall(){
    let params={
      
      "OrderReferenceNo": this.val["Order Reference No"],
      "TokenId": localStorage.getItem('id_token'),
      "order_id":this.val.order_id
    }
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog['breadCrumb'] + this.apiCatalog.getPortFolioDetails,params).subscribe((data:any) => {
      this.res=data
    })
  }

}
