import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mol-header',
  templateUrl: './mol-header.component.html',
  styleUrls: ['./mol-header.component.scss'],
})
export class MolHeaderComponent implements OnInit {
@Input() header:any[]
@Output() getValue=new EventEmitter<string>();
  constructor() { }

  ngOnInit() {}
  getHeaderValue(val){
    this.getValue.emit(val)
  }
}
