import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import stocks from 'src/assets/Stocks.json'

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],
})
export class ConvertComponent implements OnInit {
  ConvertpopUp: boolean=false
  btnTypeAll:any
  msgpop:any=false
  popUp: any=false;
  Data:any=[];
  checkHere:boolean=false
  constructor(private modalCtrl:ModalController, private http:HttpClient, private allconfigDataService:AllConfigDataService) { }


  ngOnInit() {
    this.Data=stocks;
    this.convertToDelivery()
  }

  convert(){

    this.ConvertpopUp = true;
    this.popUp=true
  }

  btnIntraday(e) {
    this.btnTypeAll = e;
  }

  hidePopUp(){
    this.modalCtrl.dismiss()
    this.popUp=false
    this.msgpop=false
  }

  hidemsgpop(){
    this.msgpop=false

  }

  convertToDelivery() {
    let param = {
      "entity_id": "12348",
      "source": "N",
      "token_id": "",
      "vi": "",
      "data": {
          "client_id": localStorage.getItem("ClientID"),
          "user_id": "",
          "txn_type": "B",
          "exchange": "NSE",
          "segment": "E",
          "security_id": "1",
          "product_form ": "I",
          "product_to ": "I",
          "quantity": "1",
          "user_type": "C",
          "mkt_type": "SP"
      }
  }

    // this.http.post('https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/ConToDel', param).subscribe((Data: any) => {
    //   console.log(Data, "convertDATA");
    // })
  }




}
