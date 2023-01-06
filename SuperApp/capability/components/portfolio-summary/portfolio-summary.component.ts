import { HttpClient } from '@angular/common/http';
import { AllConfigDataService, CommonService, LoaderService } from 'index';
import { Component, OnInit } from '@angular/core';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';

@Component({
  selector: 'app-portfolio-summary',
  templateUrl: './portfolio-summary.component.html',
  styleUrls: ['./portfolio-summary.component.scss'],
})
export class PortfolioSummaryComponent implements OnInit {

  constructor(private eduService:eduService,private allConfigDataService:AllConfigDataService,private http:HttpClient,private loaderService:LoaderService) { }
  apiCatelog={
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "",
    "environment": this.allConfigDataService.getConfig('environmentType'),
};
PortFolioSummary:any
  ngOnInit() {
   
   this.getPortfolioSummary()

  }
  getPortfolioSummary(){
    let breadCrumb:any
    this.eduService.categoryValueForAPI.subscribe(val => {
        breadCrumb = "Operations/" + val["categoryLanding"] + "/" + val['productLanding']
    })
    let param = {
      "tokenId":localStorage.getItem('id_token')
    } 
    this.http.post(this.apiCatelog.baseURL[this.apiCatelog.environment] +breadCrumb+ this.apiCatelog.getPortfolioSummary, param)
      .subscribe((e:any)=>{     
        this.PortFolioSummary=e
    },(err)=>{
      this.loaderService.hideLoader();
      this.loaderService.hideLoader();
      // this.alertService.showAlert("Error","","Fail to render Landing","Ok")  
    })
    

  }
  

}
