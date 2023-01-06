import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
// import { AllConfigDataService } from '../../services/all-config-data.service';

@Component({
  selector: 'lib-historical-report',
  templateUrl: './historical-report.component.html',
  styleUrls: ['./historical-report.component.scss'],
})
export class HistoricalReportComponent implements OnInit {
  imageList:any;
  minFromDate= new Date();
  maxToDate = new Date().setDate(2);



  constructor(private allconfig:AllConfigDataService,private router: Router) { }

  ngOnInit() {
    this.imageList=this.allconfig.getConfig('images')
  }
  dateSelected(val){

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
  goBack() {
    // this.router.navigate(['goToStocksProfile']);
    window.history.back()
  }

}
