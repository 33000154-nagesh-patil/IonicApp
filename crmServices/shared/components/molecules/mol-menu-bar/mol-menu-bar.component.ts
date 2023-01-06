import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mol-menu-bar',
  templateUrl: './mol-menu-bar.component.html',
  styleUrls: ['./mol-menu-bar.component.scss'],
})
export class MolMenuBarComponent implements OnInit {
  @Input() menuDet: any[];
  @Output() getMenuValue = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }
  tabName='Dashboard'
  getMenuData(val) {
    this.tabName=val.title
    this.getMenuValue.emit(val);
  }
}
