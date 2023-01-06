import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss'],
})
export class CustomModalComponent implements OnInit {
  @Input() imageList:any;
  @Input() moduleView:any;
  @Output() statusStartSIP = new EventEmitter()
  constructor() { }

  ngOnInit() {}
  startSIP(){
    this.statusStartSIP.emit('active')
  }

}
