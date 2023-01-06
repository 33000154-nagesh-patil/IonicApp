import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import event from 'src/assets/events.json'

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {

  imageList: any;

  data:any=[]
  segment='Dividends'
  dividendsStocks: any;
  BonusStocks: any;
  stockSplits: any;

  constructor(private allconfigdataservice: AllConfigDataService, private router: Router, private modalctrl: ModalController, private http:HttpClient) { }

  ngOnInit() {
    this.imageList = this.allconfigdataservice.getConfig("images");
    this.getproductList()
    this.segmentChanged()
  }



  getproductList() {
    let data = {
      "CFT": "Shopping",
      "Product": "Stocks",
      "FileName": "getStockDashboardEvents"
    }
    this.http.post("http://uat.torusdigital.in:5000/api/v1/Dummy/get/generalApi", data).subscribe(
      (res: any) => {
        this.dividendsStocks = res.dividends;
        this.data=res.dividends;
        console.log("Al------------------>", this.dividendsStocks);

        this.BonusStocks=res.Bonus
        console.log("Al------------------>", this.BonusStocks);

        this.stockSplits=res.stock_splits
        console.log("Al------------------>", this.stockSplits);
      }
    )
  }





  async dismiss()
  {
    this.modalctrl.dismiss("data")
  }

  segmentChanged() {
    if(this.segment=='Dividends')
   {
     this.data=this.dividendsStocks;
   }
    if(this.segment=='Bonus')
    {
      this.data=this.BonusStocks;
    }
    if(this.segment=='Stock')
    {
      this.data=this.stockSplits;
    }
  }

}
