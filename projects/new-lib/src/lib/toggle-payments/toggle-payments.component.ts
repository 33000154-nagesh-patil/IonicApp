import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-toggle-payments',
  templateUrl: './toggle-payments.component.html',
  styleUrls: ['./toggle-payments.component.scss'],
})
export class TogglePaymentsComponent implements OnInit {
  @Input() imageList:any;
  @Input() showModal:any=true;
  

  constructor() { }
  openModal() {
    
    this.showModal = !this.showModal;
    console.log("this.showModal", this.showModal)
  }
  openSIPEvent(e) {
    this.showModal = false;
    this.investNow()
  }
  investNow() {
    throw new Error('Method not implemented.');
  }
  
  ngOnInit() {}

}
