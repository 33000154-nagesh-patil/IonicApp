import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';
import { CommonService, LoaderService } from 'index';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';

@Component({
  selector: 'cap-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  @Input() footerListData: any;
  @Input() activeImg: any;
  @Input() selectedIndex: any;
  @Input() parentTab: any;

  @Output() getHealthMainPage = new EventEmitter();
  @Output() getEducationMainPage = new EventEmitter();
  @Output() activeLanding = new EventEmitter();
  @Output() homeEvent = new EventEmitter();
  getHealthLabMainPage: any;
  constructor(private router: Router,
    private eduService:eduService,
    private commonService: CommonService) { }

  ngOnInit() {
    console.log(new Date())
  }
  selectTab(event,name) {
    //this.loaderService.showLoader();
    console.log("event", event)
    // console.log("index position",indexOfelement)
    if (this.parentTab === 'wellness') {
      this.wellnessTabEvent(event,name)
    }
    if (this.parentTab === 'listing') {
      this.listingEvent(event,name)
    }
    if (this.parentTab === 'mf' || this.parentTab === 'Mutual Fund') {
      this.mfTabEvent(event);
    }
    if (this.parentTab === 'Lifestyle') {
      this.lifeStyleTabEvent(event);
    }
    if (this.parentTab === 'Health') {
      this.healthTabEvent(event)
    }

    if (this.parentTab === 'labTest') {
      this.labTestTabEvent(event)
    }
    if (this.parentTab === 'Education') {
      this.educationTabEvent(event)
    }
    if (this.parentTab === 'wealthStocks') {
      this.wealthStocksTabEvent(event)
    }
    //this.loaderService.hideLoader();
    //this.currentIndex = event
  }
  listingEvent(event: any,name) {
    if(name=='home')this.homeEvent.emit(event)
    else{
      this.router.navigate(["/"+event])
    }
  }

  healthTabEvent(event) {
    // console.log("healthTabEvent", event)
    if (!event) {
      // console.log("healthTabEvent1", event)
      this.router.navigate(['/Dashboard']);
    } else {
      if (event === 'Health') {
        // console.log("healthTabEvent2", event)
        this.getHealthMainPage.emit('Health')
      } else {

        // console.log("healthTabEvent3", event)
        this.router.navigate(['/' + event]);
      }
    }
  }

  educationTabEvent(event) {
    // console.log("educationTabEvent", event)
    if (!event) {
      // console.log("educationTabEvent1", event)
      this.router.navigate(['/Dashboard']);
    } else {
      if (event === 'Education') {
        // console.log("educationTabEvent2", event)
        this.getEducationMainPage.emit('Education')
      } else {
        // console.log("educationTabEvent3", event)
        this.router.navigate(['/' + event]);
      }
    }
  }

  lifeStyleTabEvent(event) {
    // console.log("lifeStyleTabEvent", event)
    if (!event) {
      this.router.navigate(['/Dashboard']);
    } else {
      this.router.navigate(['/' + event]);
    }
  }

  wellnessTabEvent(event, name) {
    // if (!event && event=="") {
    //   console.log("eventTab1", event)
    //   // this.router.navigate(['/Dashboard']);
    // } else {
      // this.router.navigate(['/' + event]);
      if(name=='home'){
        this.router.navigate([event]);
        console.log('1');
        this.homeEvent.emit(name);

      }
      else if(name=='explore' || name=='invest' || name=='watchList'){
        this.commonService.footerData.subscribe((res)=>{
          this.changeValueForList(res)
        })
        this.router.navigate([event]);
        console.log('2');
      }
      else if(name =='learn' || name == 'vault' || name == 'portfolio' || name == 'policy' || name == 'track' || name == 'assessment' || name == 'jobs'|| name == 'trades' || name == 'loan' || name=='policy'){
        this.commonService.footerData.subscribe((res)=>{
          this.changeValueForList(res)
        })
        this.router.navigate([event]);
      } else if(name =='account')
      {
        this.router.navigate([event]);
      }
      else{
        this.activeLanding.emit(name);
        console.log('3',name);
        // let myObj = {};
        // this.eduService.categoryValueForAPI.subscribe((obj) => {
        // obj['categoryLanding'] = name;
        // myObj = obj;
        // console.log(myObj,'3');
        // });
        // this.eduService.categoryValueForAPI.next(myObj);
      }

    // }
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
        case 'Bill Payment':
          this.eduService.productName.next("billPayment");
          this.changeBreadcrum('BillPayment');
          break;
        case 'Insurance':
          this.eduService.productName.next("insurance");
          this.changeBreadcrum('Insurance');
          break;
        case 'Neo Bank':
          this.eduService.productName.next("neoBank");
          this.changeBreadcrum('NB');
          break;
      }
    // })
  }

  mfTabEvent(event) {
    if (!event) {
      return false;
    } else {
      this.router.navigate(['/' + event]);
    }
  }




  labTestTabEvent(event: any) {
    console.log("labTestTabEvent", event)
    if (!event) {
      this.router.navigate(['/exlore-lab-health']);
    } else {
      if (event === 'labTest') {
        this.getHealthLabMainPage.emit('labTest')
      } else {
        this.router.navigate(['/' + event]);
      }
    }
  }

  wealthStocksTabEvent(event) {
    console.log("wealthStocksTabEvent", event)
    if (!event) {
      return false;
    } else {
      this.router.navigate(['/' + event]);
    }
  }
}
