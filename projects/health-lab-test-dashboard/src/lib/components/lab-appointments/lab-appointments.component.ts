import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';


@Component({
  selector: 'lib-lab-appointments',
  templateUrl: './lab-appointments.component.html',
  styleUrls: ['./lab-appointments.component.scss'],
})
export class LabAppointmentsComponent implements OnInit {
 imageList: any= [];
 upcoming: boolean = true;
 completed: boolean = false;
 canceled: boolean = false;
 data1:any;
 data2:any;
 data3:any;
 errorList:any;
 segment: any = "Upcoming"


  constructor(private loaderService: LoaderService,private allConfigDataService:AllConfigDataService, private router: Router, private modalcontroller : ModalController,private http:HttpClient,private commonFunctionService:CommonFunctionService) { }
  Upcoming(){
   this.upcoming= true;
   this.completed = false;
   this.canceled = false;
  }
  Completed(){
   this.completed = true;
   this.upcoming = false;
   this.canceled = false;
  }
  Cancelled(){
    this.canceled = true;
    this.completed = false;
    this.upcoming = false;
  }


  ngOnInit() {
    this.getProductUpcoming();
    this.getProductCompleted();
    this.getProductCancelled();
    this.imageList = this.allConfigDataService.getConfig('images');
    this.upcoming= true;
 
  }


  getProductUpcoming(){
   
    this.http.get("http://uat.torusdigital.in/api/v1/Call/Shopping/Health/Get/Upcoming/Test").subscribe(
      (res: any) => {
          console.log("Lab Upcoming", res)
         this.data1=res;
        }, (error: any) => {
          this.errorShow(error?.Message, "productList -> Http request");
        })
       
      }
      
  getProductCompleted(){
   
        this.http.get("http://uat.torusdigital.in/api/v1/Call/Shopping/Health/Get/CompletedTest").subscribe(
          (res: any) => {
              console.log("Lab Completed", res)
             this.data2=res;
            }, (error: any) => {
              this.errorShow(error?.Message, "productList -> Http request");
            })
           
          }

  getProductCancelled(){
   
            this.http.get("http://uat.torusdigital.in/api/v1/Call/Shopping/Health/Get/CancelledTest").subscribe(
              (res: any) => {
                  console.log("Lab Cancelled", res)
                 this.data3=res;
                }, (error: any) => {
                  this.errorShow(error?.Message, "productList -> Http request");
                })
               
              }
      
     
    errorShow(message, functionName) {
      this.loaderService.hideLoader();
      this.commonFunctionService.showErrorsService(this.errorList?.error, null, message, this.errorList?.okText);
    }

    segmentChanged (ev: any) {

    }

 
      
     
  
}


