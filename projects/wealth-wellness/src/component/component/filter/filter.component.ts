import { ModalController } from '@ionic/angular';
import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { modalController } from '@ionic/core';
import { Router } from '@angular/router';
import filter  from 'src/assets/notificationFilter.json'

@Component({
  selector: 'lib-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  active: any;
  rating: boolean=false;
  showDot :boolean=false
  dateShow: boolean=false;

  showSerchBar: boolean = false;
  showHeader: boolean = true;
  searchIcon: boolean = true;
  closeIcon: boolean = false;
  searchBar: any;
  filterIcon: boolean = true;
  placeholder: any;
  filterTerm: string;
  search: any;

  uncheckAll() {
   this.checkboxes.forEach((element) => {
     element.nativeElement.checked = false;
   });
 }
 getDetails(x){
   
 }

  imageList:any 
  Orderlist:any
  getItemArray:any
  ProductDetails: any;
  
  // private trueFormControl = new FormControl(false);
  // private falseFormControl = new FormControl(false);

  constructor(private allconfigDataService:AllConfigDataService,private router: Router,private mdlcntrl:ModalController) { }
 
  
  ngOnInit() {
  this.Orderlist=filter.Orderlist
    
    this.imageList=this.allconfigDataService.getConfig('images')
    this.getItemArray=this.ProductDetails
    this.ProductDetails=this.getItemArray
    console.log("filter component", filter.Orderlist);
  }
  

  toggleColor(e:any){
    this.active=e
  }

  headerBack() {
    this.mdlcntrl.dismiss("data")
  }

  searchBarBack() {
    this.showHeader = true;
    this.showSerchBar = false;
  
  }

  // clearSearchIcon() {
  //   this.searchIcon = false;
  //   this.closeIcon = true;
  // }

  toggleID() {
    this.showSerchBar = !this.showSerchBar;
    this.showHeader = false;
    
    this.searchIcon = false;
    this.closeIcon = true;
  
  }
  onKeySearch(val) {
    this.search = val;
    console.log(this.search);
  }

  getFilterItem(x){
  
    if(x=="Category"){
      this.showDot=true
      this.getItemArray=filter.Category
    this.dateShow=false

    }
    if(x=="Sub-Category"){
      this.showDot=false
    this.dateShow=false
       this.getItemArray=filter.SubCategory
    }
  }
  
  getFilter(){
    this.dateShow=true
  }

  onTran(){
    this.mdlcntrl.dismiss();
  }

}

