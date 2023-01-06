import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'app-market-indices',
  templateUrl: './market-indices.component.html',
  styleUrls: ['./market-indices.component.scss'],
})
export class MarketIndicesComponent implements OnInit {
  imageList: any;
  NSEdata:any;
  BSEdata:any;
  data:any=[];
  segment='NSE';
  value: any;
  clickVal: boolean;

  constructor(private allconfigdataservice: AllConfigDataService, private router: Router, private modalctrl: ModalController, private http:HttpClient) { }

  ngOnInit() {
    this.getproductList()
    this.imageList = this.allconfigdataservice.getConfig("images");
    this.segmentChanged()
  }


  getproductList() { 
    let data = {
      "CFT": "Shopping",
      "Product": "Stocks",
      "FileName": "getDashboardMarketIndices"
    }
    this.http.post("http://uat.torusdigital.in:5000/api/v1/Dummy/get/generalApi", data).subscribe(
      (res: any) => {
        this.NSEdata = res.nse;
        this.data=res.nse;
        console.log("Al------------------>", this.NSEdata);

        this.BSEdata = res.bse
        console.log("Al------------------>", this.BSEdata);
      }
    )

  }


  ToggleImg(){
    this.clickVal=!this.clickVal
  }
  
  async dismiss()
  {
    this.modalctrl.dismiss("data")
  }


  segmentChanged() {
   if(this.segment=='NSE')
   {
     this.data=this.NSEdata
   }
    if(this.segment=='BSE')
    {
      this.data=this.BSEdata
    }
  }







  

}
