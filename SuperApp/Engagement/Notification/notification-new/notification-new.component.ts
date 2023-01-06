import { CommonService } from 'projects/core/src/lib/services/common.service';
import { HttpClient } from '@angular/common/http';
//import { AllConfigDataService } from './../../../../../projects/core/src/lib/services/all-config-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'index';

@Component({
  selector: 'app-notification-new',
  templateUrl: './notification-new.component.html',
  styleUrls: ['./notification-new.component.scss'],
})
export class NotificationNewComponent implements OnInit {
  notificationDataToday = [];
  notificationDataMonth = [];
  imageList: any;
  buttonText = ['Today', 'Last week', 'Last month'];
  data: any;
  option: string;
  noDataFound: boolean = false;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  constructor(private allConfigDataService: AllConfigDataService, private http:HttpClient,private commonService:CommonService, private router: Router) {

    this.apiCatalog = this.allConfigDataService.getConfig('apiCatalog');
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    // this.breadCrumb=this.router.url;
    this.breadCrumb = 'Engagement/EngagementNotification'
    //getAllNotification
  }


  ngOnInit() {


    this.option = "today"
    this.getNotificationList(this.option);
    this.imageList = this.allConfigDataService.getConfig('images');
  }


  tabName = "Today";
  onTabClick(e) {

    this.tabName = e.target.innerText;
    if(this.tabName == "Last week"){
      this.option = "week"
      this.getNotificationList(this.option);
    }
    else if(this.tabName == "Last month"){
      this.option = "month"
      this.getNotificationList(this.option);
    }
    else{
      this.option = "today"
      this.getNotificationList(this.option);
    }
  }

   getNotificationList(option){
    let unreadcount;
    let params={
    // "CustGuId":localStorage.getItem('CustGuId'),  
    //"TokenId": "JN5/beHV0KP9sSfiaB3MmD6z/DBsz2omVxWoanOguyAaEfUpGJFV822/bErXgHngnDccHgmMStcsK/aLOTOjRlQ0QT8P1vz5tVJMxQJ4pfbznqoTj30zwkYNtxtyoYPHMTobt6ij9JkmZxUSiK+HNtezz9At5QmKWNSmvfk2Rn/NXx4ybNazsLK0QTublUMOxW53gYe5HcO7uIFFNWXmmxJUZPR9",
    "TokenId":localStorage.getItem('id_token'),
    "option": option
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getAllNotification,params).subscribe(async(res:any) =>{
      this.data = await res.Notification;
      unreadcount = res.countUnRead.countUnRead;
      console.log("Rizwan",unreadcount);

      console.log(this.data);
      if(this.data == null || this.data == ''){
        this.noDataFound = true;
      }
      else{
        this.noDataFound=false;
      }
    },(error=>{
      this.errorShow(error?.message);
    }))
  }

  readNotification(notificationId) {
    let params = {
      "TokenId":localStorage.getItem('id_token'),
      "NotificationId": notificationId
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.readNotification,params).subscribe(async (res: any) => {
      this.data = await res;
      console.log(this.data, "readNotification");
      this.getNotificationList(this.option);

    }

    )

  }

  errorShow(errorMsg:any){
    throw new Error('Error form Notification List API');
  }
}
