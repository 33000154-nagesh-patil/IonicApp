import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import blackDeal from 'src/assets/blackDeal.json';

@Component({
  selector: 'black-deal',
  templateUrl: './black-deal.component.html',
  styleUrls: ['./black-deal.component.scss'],
})
export class BlackDealComponent implements OnInit {
  imageList: any;
  BULKdata:any;
  BLOCKdata:any;
  segmentModel:"BULK";
  data:any=[]
  segment='BULK'
  bulkDeal: any;
  blockDeal: any;

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
      "FileName": "getStockDashboardBlockDeal"
    }
    this.http.post("http://uat.torusdigital.in:5000/api/v1/Dummy/get/generalApi", data).subscribe(
      (res: any) => {
        this.bulkDeal = res.Bulk_Deal
        this.data=res.Bulk_Deal
        console.log("Al------------------>", this.bulkDeal);

        this.blockDeal = res.block_deal
        console.log("Al------------------>", this.blockDeal);
      }
    )
  }





  async dismiss()
  {
    this.modalctrl.dismiss("data")
  }


  segmentChanged() {
   if(this.segment=='BULK')
   {
     this.data= this.bulkDeal
   }
    if(this.segment=='BLOCK')
    {
      this.data= this.blockDeal
    }



}
}
