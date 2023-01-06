import { Router } from '@angular/router';
import { AllConfigDataService, CommonService } from 'index';
import { Component, Input, OnInit } from '@angular/core';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';

@Component({
  selector: 'app-card1',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

imageList = this.allConfigDataService.getConfig("images");
   _card: any;
// @Input() card : any;
@Input() set card(val){
  this._card=  JSON.parse(JSON.stringify(val).replace('â‚¹', '₹').toString());
}
apiCatalog: any = {
  ...this.allConfigDataService.getConfig('apiCatalog'),
  "environment": this.allConfigDataService.getConfig('environmentType'),
};

  constructor(
    private allConfigDataService:AllConfigDataService,
    private router:Router,
    private eduService: eduService,
    private commonService:CommonService
  ) {
    // this.router.getCurrentNavigation().extras.state.val
  }

  ngOnInit() {
    console.log(this._card);
    this.commonService.footerData.subscribe((res)=>{
      this.changeValueForList(res)
    })
    this.eduService.categoryValueForAPI.subscribe(val => {
      this.apiCatalog['breadCrumb'] = 'Shopping/' + val['categoryLanding'] + '/' + val['productLanding']
      console.log(val['productLanding'],'bejjgeb')
    })
  }

  changeBookmark(val){
    val.row1.selectWatchList =! val.row1.selectWatchList
    console.log(val,"asfdyusduygidfgui")
    // if(this.emptyArrayBookmark.includes(val)){
    //   this.emptyArrayBookmark.splice(this.emptyArrayBookmark.indexOf(val),1)
    // }
    // else{
    //   this.emptyArrayBookmark.push(val)
    // }
  }

  navigateToDetail(){
    this.router.navigate(['Shopping/Detail'],{state: {listing:this._card.row1, listing1:this._card.row2}});
  }

  changeBreadcrum(val){
    let myObj={}                  // method to store product value for Dynamic API calling.
    this.eduService.categoryValueForAPI.subscribe(obj=>{
      obj["productLanding"]=val;
      myObj=obj;
    })
    this.eduService.categoryValueForAPI.next(myObj);
  }
    changeValueForList(name){
        switch (name) {
          case 'Gold':
            this.eduService.productName.next("digiGold");
            this.changeBreadcrum('DG');
            break;
          case 'Mutual Fund':
            this.eduService.productName.next("mutualFund");
            this.changeBreadcrum('MF');
            break;
          case 'Stock':
            this.eduService.productName.next("stock");
            this.changeBreadcrum('ST');
            break;
          case 'Courses':
            this.eduService.productName.next("educationCourses");
            this.changeBreadcrum('Courses');
            break;
          case 'Jobs':
            this.eduService.productName.next("educationJob");
            this.changeBreadcrum('Job');
            break;
          case 'Assessment':
            this.eduService.productName.next("educationAssessment");
            this.changeBreadcrum('Assessment');
            break;
          case 'Lab Test':
            this.eduService.productName.next("healthLabTest");
            this.changeBreadcrum('LabTest');
            break;
          case 'Medicine':
            this.eduService.productName.next("healthMedicine");
            this.changeBreadcrum('Medicine');
            break;
          case 'Loans':
            this.eduService.productName.next("las");
            this.changeBreadcrum('Las');
            break;
          case 'Bill Payments':
            this.eduService.productName.next("billPayment");
            this.changeBreadcrum('BillPayment');
            break;
          case 'Insurance':
            this.eduService.productName.next("insurance");
            this.changeBreadcrum('Insurance');
            break;
        }
      // })
    }


}
