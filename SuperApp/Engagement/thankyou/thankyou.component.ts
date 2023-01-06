import { AllConfigDataService, CommonService } from 'index';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import globalsuccess from '../globalThankyouPage.json';
import getLanding from '../Dashboard Json/getLanding.json';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';


@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss'],
})

export class ThankyouComponent implements OnInit {
  heading: any;
  card: any;
  transcationDetails: any;
  progressBar: any;
  singleRowCardData: any;
  segment: any;
  torusCoins: any;
  apiCatalog: any = {
    ...this.allConfigDataService.getConfig('apiCatalog'),
    breadCrumb:"",
    environment: this.allConfigDataService.getConfig('environmentType'),
  };
  constructor(private eduService: eduService, private commonService: CommonService, private router: Router, private allConfigDataService: AllConfigDataService, private cdn: ChangeDetectorRef) { }

  ngOnInit() {
    this.heading = globalsuccess;
    this.card = globalsuccess.bannerCard;
    this.transcationDetails = globalsuccess.transactionDetails
    this.singleRowCardData = globalsuccess.stockData;
    this.segment = this.singleRowCardData.segmentValues[0]?.title
    
  
    // this.getThankYou='Wealth/ST/getLanding?ThankYou'
    this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog.breadCrumb +'?'+"Thankyou"
    console.log(this.transcationDetails, "banner data");

  }

  changeBreadcrum(val, abc) {
    console.log(abc, "akshay")
    let myObj = {}
    // method to store product value for Dynamic API calling.
    const sub = this.eduService.categoryValueForAPI.subscribe(obj => {
      obj["productLanding"] = abc;

      console.log("sdaasd")
      obj["categoryLanding"] = 'Wealth';

      myObj = obj;
      sub.unsubscribe();
    })

    setTimeout(() => {
      this.eduService.categoryValueForAPI.next(myObj);
      this.router.navigate(['Shopping/listing'])
    }, 100);
  }

  explore(val) {
    switch (val) {
      case "Mutual Fund":
        this.changeBreadcrum(val, 'MF')
        break;
      case "Stock":
        this.changeBreadcrum(val, 'ST')
        break;
      case "Gold":
        this.changeBreadcrum(val, 'DG')
        break;
      case "Loans":
        this.changeBreadcrum(val, 'Las')
        break;
    }
    this.commonService.footerData.next(val);
    this.cdn.detectChanges();
  }



}
