import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { CommonFunctionService } from '../../services/common-function.service';
@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
@Input() title:any;
@Input() showArrow:any;
@Input() showLabel:any;
@Input() showImg:any;
@Input() imgURL:any;
@Input() showIndex:any;
@Input() showNotification:any;
@Input() showCartWithName:any;
@Input() notificationCount:any;
@Input() cardCount:any;
@Input() showSideMenu:any;
@Input() showSearch:any;
@Input() showClose:any;
@Input() showShare:any;
@Input() showWatchList:any;
@Input() showCartWithoutName:any;
@Input() showStories:any;
@Input() otherTextName:any;
@Input() showOtherText:any;
@Input() imageList:any
@Input() superMode:any;
@Input() backUrlName:any;
@Input() DigiGold:any
@Input() Education:any
@Input() MutualFund:any;
@Input() Health:any;
@Input() Wealth:any;
profileName:any;
titleBool: boolean = false;
////Akshay///
search:any;
clickSearch:boolean=true
@Output() searchEmit = new EventEmitter();
onKeySearch(){
  this.searchEmit.emit(this.search)
}
onClickSearch(){
  this.clickSearch=false;
  this.showClose=true;
}
onClickClose(){
  this.clickSearch=true;
  this.showClose=false;
  this.search='';
  this.onKeySearch();
}
navigateCart(){
    this.router.navigate(['Fullfilment/Global-Cart']);
}
///Akshay///
  constructor(private router:Router,private commonService:CommonService,private commonFunctionService:CommonFunctionService) { }

  ngOnInit() {
    //console.log("imageList",this.imageList)
    this.commonService.getUserDetail().subscribe((data:any)=>{
      if(data){
        this.profileName = this.commonFunctionService.getShortName(data?.FirstName.replace(/\s/g, "").concat(' ', data?.LastName.replace(/\s/g, "")));
      }
    })

    // console.log(this.otherTextName);
  }

  openSubMenu(){

  }
  goToBack(){
    this.router.navigate(['/'+this.backUrlName]);
  }

  goToNotificationpage(){
    this.router.navigate(['/notification'])
    if(this.DigiGold){
      this.router.navigate(['/notification'])
    }
    if(this.Education){
      this.router.navigate(['/notification'])
    }
    if(this.MutualFund){
      this.router.navigate(['/notification'])
    }
    if(this.Health){
      this.router.navigate(['/notification'])
    }
    if(this.Wealth){
      this.router.navigate(['/notification'])
    }
    }

}
