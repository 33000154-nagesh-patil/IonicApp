import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'lib-update-nominee-details',
  templateUrl: './update-nominee-details.component.html',
  styleUrls: ['./update-nominee-details.component.scss'],
})
export class UpdateNomineeDetailsComponent implements OnInit {
  dateSel: string;
  isDatePicked: boolean;
  DaterForm: FormGroup;
  minFromDate = new Date();
  maxToDate = new Date().setDate(2);
  continue: boolean = true;
  imageList: any;
  ClientData: any;

  constructor(
    private allConfigDataService: AllConfigDataService,
    private http: HttpClient,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
  }

  goBack() {
    // this.modalCtrl.dismiss();
    window.history.back()
  }
  dateSelected(val) {
    // const months = {
    //   Jan: '01',
    //   Feb: '02',
    //   Mar: '03',
    //   Apr: '04',
    //   May: '05',
    //   Jun: '06',
    //   Jul: '07',
    //   Aug: '08',
    //   Sep: '09',
    //   Oct: '10',
    //   Nov: '11',
    //   Dec: '12',
    // }

    // let dummy = val.value.toString().split(" ")
    // console.log("dataDate__>",dummy[2]+"/"+dummy[1]+"/"+dummy[3]);
    // this.dateSel=dummy[2]+"/"+months[dummy[1]]+"/"+dummy[3];
    // this.isDatePicked=true
    console.log(val.target.value);
  }
}
