import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mol-segment',
  templateUrl: './mol-segment.component.html',
  styleUrls: ['./mol-segment.component.scss'],
})
export class MolSegmentComponent implements OnInit {
  @Input() indiviualDetail:any;
  accordianData:any;
  constructor() { }

  ngOnInit() {}
  getSegmentValue(value){
    this.accordianData=value.value
  }
}
