import { Component, OnInit,Output,EventEmitter } from '@angular/core';
// import filter from '../../../../../src/assets/notificationFilter.json'
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-notification-filter',
  templateUrl: './notification-filter.component.html',
  styleUrls: ['./notification-filter.component.scss'],
})
export class NotificationFilterComponent implements OnInit {

  hide1: boolean = false;
  hide2: boolean = false;
  hey: boolean = false;
  hey1: boolean = false;
  condition: boolean = true;
  condition1: boolean = false;
  imageList: any;
  yes: any;
  showDate:boolean=false;
  fromDate: string; 
  toDate: string;
 

  filter: any = {
    "Type":[],
    "Category": [],
    "Sub-Category": []
  };

  filterKey = ['Type','Category', 'Sub-Category']

  filterVal: any;
  // filterVal1: any = filter["Category"]
  filterKey1: any;
  categoryValue: any;
  filterCount: any;


  constructor(private allConfigDataService: AllConfigDataService, private modalctrl: ModalController) { }

  ngOnInit() {
    this.filterSelected('Type')
    if (!this.filter) this.filter = {
      "Type":[],
      "Category": [],
      "Sub-Category": []

    }
    this.imageList = this.allConfigDataService.getConfig("images")
    this.yes = this.allConfigDataService.getConfig('filter1');
  }

  ngIfCtrl1() {
    this.hide1 = !this.hide1;
    this.hey = !this.hey
    this.condition = !this.condition
  }

  ngIfCtrl2() {
    this.hide2 = !this.hide2;
    this.hey1 = !this.hey1
    this.condition1 = !this.condition1
  }
  async back() {
    this.modalctrl.dismiss(this.filter)
  }
  filterSelected(x) {

    this.showDate=false;  
    this.filterKey1 = x;
    console.log("filterKey1", this.filterKey1);

    if(x=='Type'){
      this.filterVal = ["Transactional","Promotional","News","Alerts"]
    }
    else if (x == 'Category') {
      this.filterVal = ["Wealth", "Health", "Education", "Lifestyle", "Bank"]     
    }

    else if (x == 'Sub-Category') {
      if (this.categoryValue == 'Wealth') {
        this.filterVal = ["Mutual Funds", "Us Stocks", "Baskets", "Gold", "Fixed Desposit's", "Bonds"]
      }
      else if (this.categoryValue == 'Health') {
        this.filterVal = ["Medicine", "Fitness", "LabTest", "DoctorConsultant"]
      }
      else if (this.categoryValue == 'Education') {
        this.filterVal = ["courses", "Assesment"]
      }
      else if (this.categoryValue == 'Lifestyle') {
        this.filterVal = ["Stocks", "ETF", "IPO"]
      }
      else if (this.categoryValue == 'Bank') {
        this.filterVal = ["Health Insurance", "Life  cover (Term Insurance)", "Child Insurance", "Two wheeler insurance",
          "Car Insurance", "Pension Plans", "Travel Insurance", "Loan Against Share", "Education Loan", "vechicle Loan", "Home Loan",
          "Business Loan", "Personal Loan"]
      }

    }
    else {

      this.filterVal = []
    }
  }

  selectFilter(x) {
    this.showDate=false; 
    this.categoryValue = x;

    this.filterSelected(this.filterKey1)

    if (this.filter[this.filterKey1].length > 0) {
      this.filter[this.filterKey1] = [];
      this.filter[this.filterKey1].push(x);

    } else {
      this.filter[this.filterKey1].push(x);
    }

   
    
    this.filterCount = (this.filter["Type".length]) + (this.filter["Category"].length) + (this.filter["Sub-Category"].length)
    console.log("this.filterCount", this.filterCount);
    
   
  
    console.log(this.filter);

  }


  clearAll() {
    this.filter = {
      "Type":[],
      "Category": [],
      "Sub-Category": []
    }
    this.fromDate=null;
    this.toDate=null;


    console.log(this.filter);
  }

  apply() {   
    this.modalctrl.dismiss(this.filter);  //this.filter    
  }

  cancel() {
    this.clearAll();
    this.modalctrl.dismiss(this.filter);
  }

  showDateFilter(){
    this.showDate=true;    
  }

}
