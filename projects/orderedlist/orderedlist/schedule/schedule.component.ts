import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit,Input } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { SummaryComponent } from '../summary/summary.component';
import { FormGroup } from '@angular/forms';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  imageList: any;
  isDatePicked:any=false
  active: any;
  pickedSlot:any;
  dateSel:any;
  selectTimeSlots: any;
  errorList: any;
  @Input() patientData
  @Input() addressData
  @Input() data:any;
  @Input() FreshData:any;
  @Input() FreshPatientData


  DaterForm : FormGroup;
  minFromDate= new Date();
  maxToDate = new Date().setDate(2);
  continue: boolean=true;
  @Input() productDetails: any;
  @Input() productWithMultipleDetails: any;
  // @Input() selectTimeSlots:any
  constructor(private http: HttpClient, private commonFunctionService:CommonFunctionService,  private allconfigDataService:AllConfigDataService,public modalController: ModalController,private loaderService: LoaderService) { }


dateSelected(val){

  const months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  }

  let dummy = val.value.toString().split(" ")
  console.log("dataDate__>",dummy[2]+"/"+dummy[1]+"/"+dummy[3]);
  this.dateSel=dummy[2]+"/"+months[dummy[1]]+"/"+dummy[3];
  this.isDatePicked=true
  console.log(this.dateSel);

}

ToggleFun(e:any) {
  this.active=e
  this.continue=false
}

// this.date = new FormControl(new Date());
// this.serializedDate = new FormControl(new Date().toISOString());

async openSummaryPage(): Promise<void> {
  this.modalController.dismiss()

  this.loaderService.showLoader();
  const modal = await this.modalController.create({
    component: SummaryComponent,
    componentProps: {
"selectedTimeSlot":this.active,
"date":this.dateSel,
"FreshData": this.FreshData,
"FreshPatientData": this.FreshPatientData,
"productDetails" : this.productDetails,
"productWithMultipleDetails": this.productWithMultipleDetails
    },
    backdropDismiss: false
  });
  modal.onDidDismiss()
    .then((data) => {
      if (data && data?.data) {

      }
    });
  this.loaderService.hideLoader();
  return await modal.present();
}

closeSelectPage(){
  console.log("date----->",this.dateSel);

  this.modalController.dismiss(this.dateSel)
}
  ngOnInit() {

    // this.getApi();
    console.log("heloooooooooooooooooooooo ",this.FreshData);
    this.imageList=this.allconfigDataService.getConfig('images')

  }

  selectTimeSlotss=[

  {
    selectedSlot:"7:00 AM - 11:00 AM"
  },

  {
    selectedSlot:"11:00 AM - 03:00 PM"
  },

  {
      selectedSlot:"03:00 PM - 08:00 PM"
  }

]


// getApi(){
//   let headers: HttpHeaders = new HttpHeaders({
//     "Token" : "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi"
//   });
//   let params={
//       "vendorId": "123",
//       "vendorName": "Torus",
//       "date": this.dateSel
//   }

// this.http.post("https://apixuat.heytorus.com/api/v1/Call/Shopping/Health/Lab/getSlot", params,{headers}).subscribe(async (res: any) => {
//     console.log("Slected time============================>",await res)
//    this.selectTimeSlots=res;
//   })

// }

}
