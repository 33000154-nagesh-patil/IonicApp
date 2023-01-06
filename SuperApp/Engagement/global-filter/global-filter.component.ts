import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService, CommonService } from 'index';
import { modalController } from '@ionic/core';
import globalFilter from '../globalFilter.json';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';


@Component({
  selector: 'app-global-filter',
  templateUrl: './global-filter.component.html',
  styleUrls: ['./global-filter.component.scss'],
})
export class GlobalFilterComponent implements OnInit {
  hide1: boolean = false;
  hide2: boolean = false;
  hey: boolean = false;
  hey1: boolean = false;
  condition: boolean = true;
  condition1: boolean = false;
  imageList: any
  userFilter: any
  yes: any
  term: any = ""
  filterVal: any;
  SelectedFilterData = []
  filter: any;
  filterKey = [];
  filterKey1: any;
  apiCatalog: any;
  appEnviron: any;
  productName: any;
  breadCrumb: string;
  globalFilterData: any;
  existingFilterData: any;
  methodName: any;
  valueSelectionArray = [];
  selectedValue: any;


  constructor(private allConfigDataService: AllConfigDataService, private modalctrl: ModalController, private http: HttpClient, private commonservice: CommonService, private router: Router, private location: Location, private eduService: eduService) {
    this.apiCatalog = {
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb = 'Engagement/EngagementGlobalFilter';
    this.existingFilterData = this.allConfigDataService.getFilterData();
    this.methodName = "getList";

  }

  ngOnInit() {

    this.imageList = this.allConfigDataService.getConfig('images');
    this.productName = this.router.getCurrentNavigation().extras.state.routing;
    console.log("productName", this.productName);

    this.eduService.fromVault.subscribe((val) => {
      if (val == "True") {
        this.methodName = "portFolioList";
      }
    })

    console.log(this.methodName, "methodName");

    // this.filterType = this.apiCatalog.getList;
    //this.getFilterDataFromLocalJson();
     this.getFilterDataFromAPI();

  }

  getFilterDataFromLocalJson() {
    this.globalFilterData = globalFilter;
    this.filterKey = globalFilter.Orderlist;
    this.filterKey1 = globalFilter.Orderlist[0];
    this.filterVal = globalFilter[this.filterKey1];

    if (!this.filter)
      this.filter = {}
    for (let x of this.filterKey) {
      this.filter[x] = [];
    }

  }

  getFilterDataFromAPI() {
    let params = {
      "Product": this.productName,
      "TokenId": localStorage.getItem('id_token'),
      "Type": this.methodName
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron] + this.breadCrumb + this.apiCatalog.globalFilter, params).subscribe(
      async (data: any) => {       
        this.globalFilterData = await data;
        this.filterKey = data.OrderList;
        this.filterKey1 = data.OrderList[0];
        this.filterVal = data[this.filterKey1];

        if (!this.filter)
          this.filter = {}
        for (let x of this.filterKey) {
          this.filter[x] = [];
        }
      })
  }


  keySelection(x) {

    this.filterKey1 = x
    this.filterVal = this.globalFilterData[x]
    console.log(this.filterKey1, "filterKey");

  }

  newKeySelection(x) {

    // this.filterKey1 = x.name;
    this.filterVal = x.hasLayer
    console.log(this.filterKey1, "filterKey");
  }


  valueSelection(x) {
   
    // start code for take third layer as a key's
    // if (x.hasLayer.length) this.valueSelectionArray.push(x)
    // end code for take third layer as a key's




    // this.SelectedFilterData.push(x)
    // this.keySelection(this.filterKey1)

    if (this.filter[this.filterKey1].includes(x.name)) {
      this.filter[this.filterKey1].splice(x.name, 1);
    } else {
      this.filter[this.filterKey1].push(x.name);
    }
  }

  clearAll() {
    for (let x of this.filterKey) {
      this.filter[x] = [];
    }

  }
  apply() {
    var obj = { ...this.filter, search: "" }


    this.allConfigDataService.setFilterData(obj)

    // window.history.back()

    this.location.back();
    //this.modalctrl.dismiss(this.SelectedFilterData);
    console.log("Request body", this.filter);

  }
  cancel() {
    // this.clearAll();
    //this.modalctrl.dismiss([]);
    window.history.back()
  }
  getValue(e) {
    this.term = e.target.value
  }

  gotoSearch() {

    this.router.navigate(['Engagement/EngagementGobalSearch/getGlobalSearch']);

  }



}


