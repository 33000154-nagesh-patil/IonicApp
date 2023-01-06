import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-org-subheader',
  templateUrl: './org-subheader.component.html',
  styleUrls: ['./org-subheader.component.scss'],
})
export class OrgSubheaderComponent implements OnInit {
@Input() menuTitle:any[]
@Input() subHeader:any;
  constructor() {
  }

  ionViewDidEnter(){
    
    
  }
  ngOnInit() {


  }

}
