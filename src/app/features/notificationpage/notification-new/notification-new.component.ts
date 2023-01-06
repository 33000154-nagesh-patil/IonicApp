import { CommonService } from 'projects/core/src/lib/services/common.service';
import { HttpClient } from '@angular/common/http';
import { AllConfigDataService } from './../../../../../projects/core/src/lib/services/all-config-data.service';
import { Component, OnInit } from '@angular/core';

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
  constructor(private allConfigDataService: AllConfigDataService, private http:HttpClient,private commonService:CommonService) {

    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Engagement/Notification';
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

    let params={
    "CustGuId":localStorage.getItem('CustGuId'),
    "Option":option
    //"78ED280F-2432-41D0-AB96-CE95572C731A"
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.listNotification,params).subscribe(async(res:any) =>{
      this.data = await res.notifications;
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
      "CustGuId": localStorage.getItem('CustGuId'),
      "notificationId": notificationId
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
