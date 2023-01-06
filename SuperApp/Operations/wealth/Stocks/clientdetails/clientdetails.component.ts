import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AllConfigDataService, CommonService } from 'index';
import appLayout from '../../../../Engagement/Dashboard Json/getLayout.json';
import  account from '../../../Account.json'
import { eduService } from 'SuperApp/Shopping/Services/edu.service';

@Component({
  selector: 'app-clientdetails',
  templateUrl: './clientdetails.component.html',
  styleUrls: ['./clientdetails.component.scss'],
})
export class ClientdetailsComponent implements OnInit {
imageList: any;
footerListData: any;
Stjson: any;
stocksTab: any;
Funds: any;
appEnvironment = this.allConfigDataService.getConfig('environmentType');
apiCatalog: any = {
  ...this.allConfigDataService.getConfig('apiCatalog'),
  environment: this.allConfigDataService.getConfig('environmentType'),
};
  constructor(
    public commonService: CommonService,
    private allConfigDataService: AllConfigDataService,
    private eduService : eduService,
    private http: HttpClient,
  ) {
    this.commonService.footerData.subscribe(async (res: any) => {
      this.footerListData = appLayout[res].footer
    })
  }

  ngOnInit() {
    this.eduService.categoryValueForAPI.subscribe(val => {
      this.apiCatalog['breadCrumb'] = "Operations/" + val["categoryLanding"] + "/" + val['productLanding']
    })
    this.callApi()
    this.Stjson=account;
    this.imageList = this.allConfigDataService.getConfig('images');
    this.stocksTab = this.allConfigDataService.getConfig('stocksTab');
    console.log(this.Stjson,"--------------------Rajeshyadav777---------------");
  }


  callApi(){
    let Params = {
      "TokenId": localStorage.getItem("id_token"),
    }
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog['breadCrumb'] + this.apiCatalog.getPortfolio +'?clientDetails', Params)
        .subscribe((data) => {
          this.Funds = data
          console.log(this.Funds.HolderName,"this.Funds");
        })
  }

}
