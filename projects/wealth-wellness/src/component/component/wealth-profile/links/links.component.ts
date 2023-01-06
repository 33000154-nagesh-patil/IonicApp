import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SettingComponent } from '../setting/setting.component';

@Component({
  selector: 'lib-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent implements OnInit {
  imageList: any;

  constructor(private modalCtrl: ModalController, private route:Router) { }

  ngOnInit() {}

  async backToSetting(){
   this.modalCtrl.dismiss()
 }

 navigateToNse()
 {
  window.open("https://www.nseindia.com/")
 }
 navigateToBse()
 {
  window.open("https://www.bseindia.com/")

 }
 navigateToMcx()
 {
  window.open("https://www.mcxindia.com/")

 }
 navigateToNcdex(){
  window.open("https://www.ncdex.com/")

 }
navigateToSebi(){
  window.open("https://www.sebi.gov.in/")

}
}
