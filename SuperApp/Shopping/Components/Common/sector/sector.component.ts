import { Component, OnInit,Input } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('400ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
  ])
]
})
export class SectorComponent implements OnInit {
  @Input() data:any
  Sector: any;
  sagment: any = "Sectors"
  itemsData: any
  isView: boolean =false;
  state: string='default';
  segmentValue: any = "Sectors";
  rowValue: any;

  percent: number;
  constructor() { }

  ngOnInit() {
    
  
    // this.rowValue = this.data.row[0]
    console.log(this.rowValue, "rowvalue");

    this.itemsData = this.data.Sectors
    
    console.log(this.itemsData, "itemdata");

  }
  onSegmentChanged(x) {
    this.segmentValue = x
    this.itemsData = this.data[x];


  }
  ViewMore(e){
    this.isView=!e;
    // if(!e){
    // this.data=[]
    //  for(let i=0;i<this.Apidate.length;i++){
    //   this.data.push(this.Apidate[i])
    //  }
    // }else{
    //   this.data.splice(2)
    // }  

    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }


}
