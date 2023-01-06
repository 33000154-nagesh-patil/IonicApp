import { Component, Input, OnInit } from '@angular/core';
import getLanding from './../../../Engagement/Dashboard Json/getLanding.json';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  torusClubData:any;
 @Input() torusClub:any;
 @Input() banner : any;

//  = [
//       {
//         "title": "In-clinic Doctor Appointments",
//         "data":[
//           {
//           "icon":"assets/health-page-logos/Confidential.svg",
//           "subTitle":"Completely Confidential"
//           },
//           {
//           "icon":"assets/health-page-logos/Access to Doctor.svg",
//           "subTitle":"24*7 Access to  Doctors"
//           },
//           {
//           "icon":"assets/health-page-logos/Integrated lab.svg",
//           "subTitle":"Integrated Lab"
//           }
//         ]
//     }
//   ]


  constructor() { }

  ngOnInit() {
    this.torusClubData = getLanding.categoryLanding.torusClub.banner;
    console.log("hbf",this.torusClubData);
    

    // console.log(this.banner.data);
    
  }

}
