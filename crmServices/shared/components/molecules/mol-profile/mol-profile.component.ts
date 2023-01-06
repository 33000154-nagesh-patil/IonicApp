import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mol-profile',
  templateUrl: './mol-profile.component.html',
  styleUrls: ['./mol-profile.component.scss'],
})
export class MolProfileComponent implements OnInit {
@Input()  profileDetail:any
  constructor() { }

  ngOnInit() {
    
  }

}
