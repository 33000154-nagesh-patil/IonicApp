import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-org-menu-bar',
  templateUrl: './org-menu-bar.component.html',
  styleUrls: ['./org-menu-bar.component.scss'],
})
export class OrgMenuBarComponent implements OnInit {
  @Input() menuDetail:any[]
  @Output() getMenuBarValue = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}
  getMenuValue(val){
    this.getMenuBarValue.emit(val)
  }
}
