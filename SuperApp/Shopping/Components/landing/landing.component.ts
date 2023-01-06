import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AllConfigDataService } from 'index';
import healthdata from 'src/assets/healthdata.json'



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {

  imageList = this.allConfigDataService.getConfig("images");
  data = healthdata;
  breadcrumb = this.router.url
  dataList
  userFirstName = "Salman";

  // JSON

  heading = [
    {
      "health": {
        "heading": "Health Wellness",
        "discription": "Health products to ensure wellness",
      },
      "wealth": {
        "heading": "Health Wellness",
        "discription": "Health products to ensure wellness",
      },
      "education": {
        "heading": "Health Wellness",
        "discription": "Health products to ensure wellness",
      }
    }];

  banner = [
    {
      "health": {

        "title": "In-clinic Doctor Appointments",
        "data": [
          {
            "icon": "assets/health-page-logos/Confidential.svg",
            "subTitle": "Completely Confidential"
          },
          {
            "icon": "assets/health-page-logos/Access to Doctor.svg",
            "subTitle": "24*7 Access to  Doctors"
          },
          {
            "icon": "assets/health-page-logos/Integrated lab.svg",
            "subTitle": "Integrated Lab"
          }
        ]
      }
    },
    {

    }
  ]

  @Input() health: false;
  wealth: false;
  education: false;


  constructor(private allConfigDataService: AllConfigDataService, private router: Router) { }

  ngOnInit() {

  }

  navigateTo(val) {
    this.router.navigate([this.breadcrumb + val]);//this.router.url is the current url of the page ie breadcrumb
  }

}
