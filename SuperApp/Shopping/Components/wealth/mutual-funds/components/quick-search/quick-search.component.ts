import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { MFcategoryCardComponent } from '../mfcategory-card/mfcategory-card.component';


@Component({
  selector: 'lib-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.scss'],
})
export class QuickSearchComponent implements OnInit {
  @Input() imageList: any;
  fundCategory: any;
  fundType: any;
  minimumInvestment: any;
  ratedBy: any;
  research: any
  Searchvalue:any;
  allStars: any
  Search:any
  starwhite5: boolean = false
  blackstar5: boolean = true
  starwhite4: boolean = false
  blackstar4: boolean = true
  starwhite3: boolean = false
  blackstar3: boolean = true
  starwhite2: boolean = false
  blackstar2: boolean = true
  blackstar1: boolean = true
  starwhite1: boolean = false
  DummayAPiData: any;
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  f: string;
  g: string;
  h: string;
  i: string;
  carddata: any;
  filterCardData: any=[];


  constructor(private http :HttpClient,private AllConfigDataService: AllConfigDataService,private modalCtrl:ModalController) { }

  ngOnInit() {
  this.cardApi()
    this.imageList = this.AllConfigDataService.getConfig('images')
    // this.page='equity'
    this.getDummayApi()
  }
  getfundCategory(e) {
    if(e=="Equity"){
      this.a="Equity"
    }
    if(e=="Hybrid"){
      this.b="Hybrid"
    } 
     if(e=="Debt"){
      this.c="Debt"
    } 
     if(e=="Tax"){
      this.d="Tax"
    }
    // this.fundCategory = e;
  }
  getfundType(e) {
    // this.fundType = e;
    if(e=="growth"){
      this.e="growth"
    }
    if(e=="divident"){
      this.f="divident"
    }
  }

  getInvestment(e) {
    // this.minimumInvestment = e;
    if(e=="five"){
      this.g="five"
    }if(e=="fiveToTwo"){
      this.h="fiveToTwo"
    }if(e=="Two"){
      this.i="Two"
    }
  }

  getRated(e) {
    this.research = e;
  }

  btnStar5() {
    this.allStars = 'star5'
    this.starwhite5 = true
    this.blackstar5 = false
    this.blackstar4 = true
    this.starwhite4 = false
    this.blackstar3 = true
    this.starwhite3 = false
    this.blackstar2 = true
    this.starwhite2 = false
    this.blackstar1 = true
    this.starwhite1 = false
  }

  btnStar4() {
    this.allStars = 'star4'
    this.starwhite5 = false
    this.blackstar5 = true
    this.starwhite4 = true
    this.blackstar4 = false
    this.starwhite3 = false
    this.blackstar3 = true
    this.starwhite2 = false
    this.blackstar2 = true
    this.starwhite1 = false
    this.blackstar1 = true
  }

  btnStar3() {
    this.allStars = 'star3'
    this.starwhite1 = false
    this.blackstar1 = true
    this.starwhite2 = false
    this.blackstar2 = true
    this.starwhite3 = true
    this.blackstar3 = false
    this.blackstar4 = true
    this.starwhite4 = false
    this.blackstar5 = true
    this.starwhite5 = false
  }

  btnStar2() {
    this.allStars = 'star2'
    this.starwhite2 = true
    this.blackstar2 = false
    this.starwhite3 = false
    this.blackstar3 = true
    this.starwhite4 = false
    this.blackstar4 = true
    this.starwhite5 = false
    this.blackstar5 = true
    this.starwhite1 = false
    this.blackstar1 = true
  }

  btnStar1() {
    this.allStars = 'star1'
    this.starwhite1 = true
    this.blackstar1 = false
    this.starwhite2 = false
    this.blackstar2 = true
    this.starwhite3 = false
    this.blackstar3 = true
    this.starwhite4 = false
    this.blackstar4 = true
    this.blackstar5 = true
    this.starwhite5 = false
  }
  dissmis(){
    this.modalCtrl.dismiss();
  }
 
 
    async ViewAll() {
      let data={
        "fundCategory":this.fundCategory,
        "fundType":this.fundType,
        'minimumInvestment':this.minimumInvestment,
        "research":this.research
      }
      console.log("Searching Item",data);
      this.modalCtrl.dismiss(this.DummayAPiData);
      let eventEmitter = new EventEmitter();
      eventEmitter.subscribe((res)=>{
        console.log(res);
        
      })
      const modal = await this.modalCtrl.create({
        component:MFcategoryCardComponent,
        componentProps:{
          'headerName':"Quick Search Data",
          "DummayApi":this.DummayAPiData
        },
        backdropDismiss:false
      });
      modal.onDidDismiss().then((data) => {
        // console.log(data);
      })
      return await modal.present();
    }
  
  getDummayApi(){
    let data={
      "CFT":"Shopping",
      "Product":"MF",
      "FileName":"getQuickSearch"   
    }
  this.http.post("http://uat.torusdigital.in/api/v1/Dummy/get/generalApi",data).subscribe(
    (data: any) => {
      if(data){
     this.DummayAPiData=data.QuickSearch
     console.log("qu",this.DummayAPiData)

      }
  
    }
  )
    
  }
  resetAll(){
    this.a=""
    this.b=""
    this.c=""
    this.d=""
    this.e=""
    this.f=""
    this.g=""
    this.h=""
    this.i=""
 


    this.research = "";
  }


  cardApi(){
    // let data={
    //   "CFT":"Shopping",
    //   "Product":"MF",
    //   "FileName":"getCategoryList"   
    // }
  this.http.get("http://uat.torusdigital.in:5000/api/v1/Call/Shopping/Wealth/get/MFList/All").subscribe(
    (data: any) => {
      if(data){
       this.carddata=data
      
      }
  
    }
  )
    
  }
  getdata(e){
   
    this.Searchvalue=e.target.value
    setTimeout(() => {
    this.filterCardData = this.carddata.filter(function (str) { return (str?.basic_name).toUpperCase().includes((e.target.value).toUpperCase()); });
      
    });
  }

}
