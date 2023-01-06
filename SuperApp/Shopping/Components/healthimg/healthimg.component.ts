// import { Component, OnInit } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-healthimg',
  templateUrl: './healthimg.component.html',
  styleUrls: ['./healthimg.component.scss'],
})
export class HealthimgComponent implements OnInit {
  @Input() Selectimage:any
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
    console.log(this.Selectimage,"ppp--->")
  }
  // slice
  deleteimg(val1){
    let x={
      img:val1,
      status:"delete"
    }
    this.modalCtrl.dismiss(x)
  }

  confirm(val) {
    let x={
      img:val,
      status:"select"
    }
    this.modalCtrl.dismiss(x)
    // window.history.back()
  }
}
