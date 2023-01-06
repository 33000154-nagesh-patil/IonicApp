import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';


@Component({
  selector: 'lib-funds-portfolio',
  templateUrl: './funds-portfolio.component.html',
  styleUrls: ['./funds-portfolio.component.scss'],
})
export class FundsPortfolioComponent implements OnInit {
  imageList: any = [];
  currencySymbol: any;
  currencyList: any;

  constructor(private allConfigDataService: AllConfigDataService,private router: Router) { }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
    this.currencyList = this.allConfigDataService.getConfig('listCodeCountry')
    this.currencySymbol = this.currencyList['IND']['currencySymbol']
    

}

onFull(){
  this.router.navigate(['full-funds-portfolio']);

}
  }


