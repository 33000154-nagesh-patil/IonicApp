import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'lib-digiShoping',
  templateUrl: './digi-shoping.component.html',
  styleUrls: ['./digi-shoping.component.scss'],
})
export class DigiShopingComponent implements OnInit {
  @Input() commodity:any;
  @Input()_type:any;
  @Input() imageList: any;
  title:any="Invest";
  textName:any="Invest"
  goldFooterData:any
  notificationCount:any = 0;
  cartCount:any = 0;
 
  labelIcon:any;
  currentMode:any=0;
  wellnessFooterData:any;
  currentNativeNetwork:any;
  currentWindowNetwork:any;
  isCordovaStatus:any;
  currentLanguage:any;
  errorList:any;
  custGuId:any;
  loggedInModal:boolean=false
  ErrorMsg:any;
  
  type:any// rama digi
  show:boolean=false// rama digi
  mfFooterData: any;

  currentMoneySymbols:any;
  stepperData:any;
  loginCustGuId:any;
  currentFetcherModule:any;
  @Output() thisBack = new EventEmitter();
  constructor(private allConfigDataService:AllConfigDataService) { }
  back(){
    this.thisBack.emit(false);
  }
  ngOnInit() {
    this.imageList=this.allConfigDataService.getConfig('images')
    this.mfFooterData = this.allConfigDataService.getConfig('goldTab');
  }

}
