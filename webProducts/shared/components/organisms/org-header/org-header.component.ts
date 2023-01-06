import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-org-header',
  templateUrl: './org-header.component.html',
  styleUrls: ['./org-header.component.scss'],
})
export class OrgHeaderComponent implements OnInit {
  @Input() headerCon:any[]
  @Input() headerCommon:any;
  listDetail:any[]
showDropDown:boolean=false;
@Output() setHeaderDetail=new EventEmitter<string>();
  constructor(private http:HttpClient) { }

  ngOnInit() {
   
  }
  getHeaderValue(val){
    this.listDetail=val.value
    if(val.val!='')this.showDropDown=!this.showDropDown
    this.setHeaderDetail.emit(val)
  }

}
