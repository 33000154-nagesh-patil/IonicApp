import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

import Marketmovers from 'src/assets/marketMovers.json';

@Component({
  selector: 'market-movers',
  templateUrl: './market-movers.component.html',
  styleUrls: ['./market-movers.component.scss'],
})
export class MarketMoversComponent implements OnInit {

  imageList: any;

  segmentModel:"Gainers";
  data:any=[]
  segment='Gainers'
  GAINERSdata: any;
  LOSERSdata: any;
  VOLUMEdata: any;
  gainers: any;
  losers: any;
  volumeShokers: any;

  constructor(private allconfigdataservice: AllConfigDataService, private router: Router, private modalctrl: ModalController
    , private http:HttpClient) { }

  ngOnInit() {
    this.imageList = this.allconfigdataservice.getConfig("images");

    this.GAINERSdata=Marketmovers.Gainers;
    this.LOSERSdata=Marketmovers.Losers;
    this.VOLUMEdata=Marketmovers.Volume;
    this.segmentChanged()
    this.getproductList()
  }




  getproductList() {
    let data = {
      "CFT": "Shopping",
      "Product": "Stocks",
      "FileName": "getDashboardMarketMovers"
    }
    this.http.post("http://uat.torusdigital.in:5000/api/v1/Dummy/get/generalApi", data).subscribe(
      (res: any) => {
        this.gainers = res.gainers
        this.data=res.gainers
        console.log("Al------------------>", this.gainers);

        this.losers = res.Losers
        console.log("Al------------------>", this.losers);

        this.volumeShokers = res.volume_shockers
        console.log("Al------------------>", this.volumeShokers);


      }
    )
  }





  async dismiss()
  {
    this.modalctrl.dismiss("data")
  }

  segmentChanged() {
    if(this.segment=='Gainers')
   {
     this.data=this.gainers
   }
    if(this.segment=='Losers')
    {
      this.data=this.losers
    }
    if(this.segment=='Volume')
    {
      this.data=this.volumeShokers
    }
  }

}
