import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AllConfigDataService } from 'index';
import { MFServiceService } from 'projects/core/src/lib/services/mfservice.service';
import { WebSocketServiceForStocks } from 'SuperApp/Shopping/Services/stockswebsocket.service';

@Component({
  selector: 'app-common-card',
  templateUrl: './common-card.component.html',
  styleUrls: ['./common-card.component.scss'],
})
export class CommanCardComponent implements OnInit {
  @Input() CardValue: any
  @Input() heading: any = "Basic Details"
  @Input() basicDetail: any
  @Input() orderId: any;

  segmentData: any
  imageList: any
  segmentValue1 = "Others"
  value: any
  Rating: any;
  Ratingvalue: any
  apiCatalog: any = {
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "environment": this.allConfigDataService.getConfig('environmentType'),
    "breadCrumb": "Onboarding"
  };
  constructor(private MFService: MFServiceService, private http: HttpClient, private allConfigDataService: AllConfigDataService, private stockWebsocket: WebSocketServiceForStocks) { }

  labls: any
  ngOnInit() {
    console.log(this.CardValue, "cardvalue")
    // this.Ratingvalue = this.CardValue?.row[0]["Rating"]
  }
  riskometer: any
  sector: any = {}
  company: any = {}
  industry: any = {}
  showButton1: any = "Show More"
  segmentChanged2(e) {
    this.segmentValue1 = e.detail.value
    for (let x of this.CardValue?.Cards) {
      this.segmentData = x?.data[this.segmentValue1]
    }
    console.log(this.segmentValue1, this.segmentData, "values")

  }
  getMoreData1() {

  }
  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }
  toString(val){
     return JSON.parse(JSON.stringify(val).replace('â‚¹', '₹'));
  }


}
