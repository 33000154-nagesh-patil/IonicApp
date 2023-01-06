import { Component, OnInit } from '@angular/core';
import { AllConfigDataService } from 'index';
import layout from '../layout.json'


@Component({
  selector: 'app-semigridtype',
  templateUrl: './semigridtype.component.html',
  styleUrls: ['./semigridtype.component.scss'],
})
export class SemigridtypeComponent implements OnInit {
  imageList:any;
  data:any;
  
  constructor(private allConfigDataService:AllConfigDataService) { }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
    this.data = layout;
    console.log(this.data);

  }

}
