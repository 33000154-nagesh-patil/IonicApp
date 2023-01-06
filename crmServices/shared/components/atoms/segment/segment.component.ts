import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss'],
})
export class SegmentComponent implements OnInit {
@Input() segmentData:any[];
@Output() setSegmentVlaue=new EventEmitter <string>()
  constructor() { }

  ngOnInit() {}
  changeSegment(segment){
    this.setSegmentVlaue.emit(segment)
  }
}
