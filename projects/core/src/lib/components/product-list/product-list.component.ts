import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fetcherList } from '../../enums/comman.enum';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { Router } from '@angular/router';
@Component({
  selector: 'lib-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
@Input() listOfData:any;
@Input() imageList:any;
@Input() currentMoneySymbols:any;
@Input()parentModule:any;
@Output() sendDataToParent = new EventEmitter();
  constructor(private commonService:CommonService,private router:Router) { }

  ngOnInit() {}
  redirectTCardDetails(data){
    switch (this.parentModule) {
      case fetcherList.Gold:
        this.sendDataToParent.emit(data)
        break;
      case fetcherList.MutualFund:
        this.sendDataToParent.emit(data)
        break;
      case fetcherList.Courses:
        this.sendDataToParent.emit(data)
        break;
      case fetcherList.Doctor:
        this.sendDataToParent.emit(data)
        break;
      case fetcherList.Health:
        this.sendDataToParent.emit(data)
        break;
      case fetcherList.Silver:
        this.sendDataToParent.emit(data)
        break;
      case fetcherList.Stock:
        this.sendDataToParent.emit(data)
        break;
        case fetcherList.Education:
        this.sendDataToParent.emit(data)
        break;
      default:
        break;
    }
   
  }

  gotoGoldDetailPage(type){
    this.commonService.setDigiType(type);
    this.router.navigate(['/InvestmentDetails']);
  }
}
