import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';

@Component({
  selector: 'lib-lab-recommended',
  templateUrl: './lab-recommended.component.html',
  styleUrls: ['./lab-recommended.component.scss'],
})
export class LabRecommendedComponent implements OnInit {
  imageList: any;
  data:any;
  getCurrency:any;
  rupeesSymbol:any;
  errorList: any;


  constructor(private loaderService: LoaderService,private allConfigDataService:AllConfigDataService, private router: Router, private modalcontroller : ModalController,private http:HttpClient,private commonFunctionService:CommonFunctionService) { }

  ngOnInit() {
    this.getProductRecommends();
      this.imageList = this.allConfigDataService.getConfig('images');
      this.getCurrency=this.allConfigDataService.getConfig('listCodeCountry'); 
      this.rupeesSymbol=this.getCurrency['IND']['currencySymbol'];
  }

  getProductRecommends(){
   
    this.http.get("http://uat.torusdigital.in/api/v1/Call/Shopping/Health/Get/recommendation/products").subscribe(
      (res: any) => {
          console.log("Lab recommendations", res)
         this.data=res;
        }, (error: any) => {
          this.errorShow(error?.Message, "productList -> Http request");
        })
       
      }
     
    errorShow(message, functionName) {
      this.loaderService.hideLoader();
      this.commonFunctionService.showErrorsService(this.errorList?.error, null, message, this.errorList?.okText);
    }
}


