import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'lib-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.scss'],
})
export class UpdateEmailComponent implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() { }

  cancel() {
    this.modalCtrl.dismiss();
  }
  updateEmail() {
    this.modalCtrl.dismiss();
  }

}
