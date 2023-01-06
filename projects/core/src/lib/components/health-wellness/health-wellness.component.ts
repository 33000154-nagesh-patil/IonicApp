import { Component, OnInit, Input } from '@angular/core';
import { AllConfigDataService } from '../../services/all-config-data.service';
import healthdata from 'src/assets/healthdata.json'
import { Router } from '@angular/router';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { CommonFunctionService } from '../../services/common-function.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-health-wellness',
  templateUrl: './health-wellness.component.html',
  styleUrls: ['./health-wellness.component.scss'],
})
export class HealthWellnessComponent implements OnInit {

  // @Input() imageList:any;
  // @Input() errorList:any;
  // @Input() currentMoneySymbols:any;
  // @Input() goldData:any;
  // @Input() silverData:any;
  // @Input() goldSilverData:any;
  // @Input() currentDigiDataOrderList:any;

  imageList: any;
  data: any;
  environmentAPIList: any;
  errorList: any;

  constructor(private allConfigDataService: AllConfigDataService,private loaderService:LoaderService, private router: Router,private http:HttpClient,private commonFunctionService:CommonFunctionService) { }

  ngOnInit() {
    // this.getApi();
     this.environmentAPIList = this.allConfigDataService.getCurrentApiList();
    this.data = healthdata;
    this.imageList = this.allConfigDataService.getConfig('images');



  }


  // handleExplore(){
  //   this.router.navigate(['/lab-test-page']);
  // }

  handleClick(id: number){
    if(id == 1){
      console.log(id);

      // this.router.navigate(['/lab-test-page']);
    }
    if(id == 2){
      console.log(id);
      this.router.navigate(['/healthLabTestDashBoard']);
    }
    if(id == 3){
      console.log(id);

      // this.router.navigate(['health-page-two']);
    }

  }



  getApi(){
    // let headers: HttpHeaders = new HttpHeaders({
    //   "Token" : this.environmentAPIList?.token
    // });
//     this.http.get("http://uat.torusdigital.in:5000/api/v1/Call/Shopping/Health/Get/ProductCategoryList").subscribe((res: any) => {
//   // this.loaderService.hideLoader();
//   console.log("librery ",res);
//   if (res) {
//     console.log("librery Al ",res);

//   }
//    else {
//   }

// },
//   (error: any) => {
//   }
// )

this.http.get("http://uat.torusdigital.in:5000/api/v1/Call/Shopping/Health/Get/ProductCategoryList").subscribe(
  (res: any) => {
      console.log("Product details", res)
    //  this.data=res;
    },
    // (error: any) => {
      // this.errorShow(error?.Message, "productList -> Http request");
    // }
    )

  }


}
