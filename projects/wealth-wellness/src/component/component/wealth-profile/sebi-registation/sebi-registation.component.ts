import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
// import { AllConfigDataService } from '../../services/all-config-data.service';

@Component({
  selector: 'lib-sebi-registation',
  templateUrl: './sebi-registation.component.html',
  styleUrls: ['./sebi-registation.component.scss'],
})
export class SebiRegistationComponent implements OnInit {
  @Input() imageList: any;

  lists = [
    {
      "title": "Stock Broker",
      "data": "INZ 000172433",
    },
    {
      "title": "CDSL",
      "data": "IN-DP-257-2016",
    },
    {
      "title": "NSDL",
      "data": "IN-DP-NSDL-363-2013",
    },
    {
      "title": "Research Analyst",
      "data": "INH000002384",
    },
    {
      "title": "IRDA Corporate Agent (Composite)",
      "data": "CA0195",
    },
    {
      "title": "NCDEX",
      "data": "INZ 000064939",
    },
    {
      "title": "MCX",
      "data": "INZ 000064939",
    }
  ];
  constructor(private allconfig:AllConfigDataService, private modalCtrl:ModalController) { }

  ngOnInit() {
    this.imageList=this.allconfig.getConfig('images')
  }
  backToSetting(){
    this.modalCtrl.dismiss()
  }
}
