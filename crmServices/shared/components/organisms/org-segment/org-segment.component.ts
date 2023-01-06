import { Component, Input, OnInit } from '@angular/core';
import crm  from "src/assets/crmJsons/crm.json";
@Component({
  selector: 'app-org-segment',
  templateUrl: './org-segment.component.html',
  styleUrls: ['./org-segment.component.scss'],
})
export class OrgSegmentComponent implements OnInit {
  constructor() { }

tabName="case Info";

newData:any
  ngOnInit() {}
  changeSegment(value){
      this.newData=value.value
  }
}
