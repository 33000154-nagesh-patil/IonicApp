import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { modalController } from '@ionic/core';
@Component({
  selector: 'lib-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  hide1:boolean = false;
  hide2:boolean = false;
  hey:boolean=false;
  hey1:boolean=false;
  condition:boolean=true;
  condition1:boolean=false;
  imageList:any
  userFilter: any
  yes:any
  term:any=""
  filterVal:any=[]
  SelectedFilterData=[]
@Input() filter:any;
filterKey=['AMC',"Category",'Rating','Risk', 'Available to invest','Plan Type','Sort By']

  filterKey1: any;
  constructor(private allConfigDataService: AllConfigDataService, private modalctrl:ModalController) { }

  ngOnInit() {
    this.SelectedFilterData=[]
    this.imageList=this.allConfigDataService.getConfig('images');
  this.filterVal=[
    {
    "name":'ICICI Mutual Fund',
    },{
    "name":'Axis Mutual Fund',
     },{
     "name":'DSP Mutual Fund',
      },{
    "name":'Edelweiss Mutual Fund',
       },{
    "name":'Canara Robeco Mutual...',
      },
       {
     "name":'Essel Mutual Fund',
       },{
       "name":'Franklin Templeton Mu...',
         },
        {
      "name":'ICICI Prudential',
        },
    
  ]

    if(!this.filter)this.filter={
      "AMC":[],
      "Category":[],
      "Rating":[],
      "Risk":[],
      "Available to invest":[],
      "Plan Type":[],
      "Sort By":[],
    }
this.imageList=this.allConfigDataService.getConfig("images")
this.yes=this.allConfigDataService.getConfig('filter1');
this.filterKey1="AMC"
  }
  ngIfCtrl1(){
    this.hide1 = !this.hide1;
    this.hey=!this.hey
    this.condition=!this.condition

  }
  ngIfCtrl2(){
    this.hide2 = !this.hide2;
    this.hey1=!this.hey1
    this.condition1=!this.condition1
  }

  filterSelected(x){
    this.filterKey1=x;
    console.log(this.filterKey1);

    if(x=='AMC'){
      this.filterVal=[
        {
        "name":'ICICI Mutual Fund',
        },{
           "name":'Axis Mutual Fund',
          },{
          "name":'DSP Mutual Fund',
          },{
         "name":'Edelweiss Mutual Fund',
           },{
           "name":'Canara Robeco Mutual...',
              },
           {
           "name":'Essel Mutual Fund',
               },{
              "name":'Franklin Templeton Mu...',
              },
               {
               "name":'ICICI Prudential',
                 },
        
      ]
    }
    else if(x=='Category'){
      this.filterVal=[
        {
          "name":'Debt Schemes',
          },
          {
            "name":'Equity Schemes',
           },{
             "name":'Contra',
            },{
            "name":'Dividend Yield',
            },{
           "name":'ELSS',
             },{
             "name":'Flexi Cap',
                },
             {
             "name":'Hybrid Schemes',
                 },{
                "name":'Others Schemes',
                }]
    }
    else if(x=='Rating'){
      this.filterVal=[
        {
          "icon":this.imageList?.star5,
          },
          {
            "icon":this.imageList?.star4,
           },{
             "icon":this.imageList?.star3,
            },{
            "icon":this.imageList?.star2,
            },{
           "icon":this.imageList?.star1,
             },
        
        
        
        
        
        
        ]
    }
    else if(x=='Risk'){
      this.filterVal=[
        {
          "name":'Low',
          },
          {
            "name":'Moderately',
           },{
             "name":'High',
            },{
            "name":'Very High',
            },]
    }
    else if(x=='Available to invest'){
      this.filterVal=[
        {
          "name":'SIP',
          },
          {
            "name":'One Time',
           },
        ]
    }
    else if(x=='Sort By'){
      this.filterVal=[
        {
          "name":'Popularity',
          },
          {
            "name":'Ratings - High to Low',
           },
           {
            "name":'Returns - High to Low',
           }]
    }else if(x=="Plan Type"){
      this.filterVal=[
        {
          "name":'Direct',
          },
          {
            "name":'Ragular',
           },
           {
            "name":'All',
           }
      ]
    }
    else{
      this.filterVal=[]
    }
  }
  selectFilter(x){
    // this.filterSelected(this.filterKey1)
    this.SelectedFilterData.push(x)
    if(this.filter[this.filterKey1].includes(x)){
      this.filter[this.filterKey1].splice(x,1);
    }else{

      this.filter[this.filterKey1].push(x);
    }

  }
  clearAll(){
    this.filter={
      "AMC":[],
      "Category":[],
      "Rating":[],
      "Risk":[],
      "Available to invest":[],
      "Plan Type":[],
      "Sort By":[],
    }

  }
  apply(){
    this.modalctrl.dismiss(this.SelectedFilterData);
  }
  cancel(){
    this.clearAll();
    this.modalctrl.dismiss([]);
    window.history.back()
  }
  getValue(e){
    this.term=e.terget.value

  }


}

