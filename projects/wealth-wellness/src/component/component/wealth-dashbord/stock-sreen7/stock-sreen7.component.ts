import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'lib-stock-sreen7',
  templateUrl: './stock-sreen7.component.html',
  styleUrls: ['./stock-sreen7.component.scss'],
})
export class StockSreen7Component implements OnInit {
  imageList: any;
  currencyList: any;
  currencySymbol: any;
  search: any;
  ClientCode:string;
  getValue: any;
  data:any=[]
  qtynumber:any;

  constructor(private allConfigDataService: AllConfigDataService,private router: Router,
     private http:HttpClient) { }

  ngOnInit() {

    this.imageList = this.allConfigDataService.getConfig('images')
    this.currencyList = this.allConfigDataService.getConfig('listCodeCountry')
    this.currencySymbol = this.currencyList['IND']['currencySymbol']
    this.ClientCode = localStorage.getItem('ClientID').toString();
    this.getproductList()


  }

  onKeySearch(val) {
    this.search = val;
    console.log(this.search);

  }

  getproductList() {

    let data = {
      "entity_id": this.ClientCode,
      "source": "N",
      "data": {
          "client_id": this.ClientCode
      }

  }
    this.http.post("https://apixuat.heytorus.com/api/v1/wealth/stock/Mpost/HoldingDetails", data).subscribe(
      (res: any) => {
        this.getValue = res.data
        console.log("Al-------getvalue----------->", this.getValue);

        // this.qtynumber=(this.getValue.last_traded_price*this.getValue.remaining_quantity)
        // console.log(this.qtynumber,"total qty");


      }
    )
  }
}
