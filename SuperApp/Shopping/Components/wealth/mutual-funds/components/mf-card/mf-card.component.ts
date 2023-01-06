import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-mf-card',
  templateUrl: './mf-card.component.html',
  styleUrls: ['./mf-card.component.scss'],
})
export class MfCardComponent implements OnInit {
@Input() imageList:any;
@Input() id:any;
bookmark:any=false;
clicked:boolean=false;
counter:any=0;
  constructor() {
    
  }
  changeBookmark(){
    this.bookmark=!this.bookmark;
    if(this.bookmark)console.log(this.id+" setbookmark")
    if(!this.bookmark)console.log(this.id+" unSetbookmark")
  }
  checkBox(){
    this.clicked=!this.clicked;
    console.log(this.id,this.clicked);
  }
  ngOnInit() {}
}
