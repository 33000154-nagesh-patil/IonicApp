import { CommonService } from 'projects/core/src/lib/services/common.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EducationNotificationService {

  notification:any;
  isloading: boolean=true;
  constructor(private commonService:CommonService) { }
  setNotification(){
    
    let params = {
      "CustGuId": localStorage.getItem('CustGuId')
    }
    this.commonService.getNotificationAll(params).subscribe(async (res:any) => {
      this.notification =await res;
      console.log(this.notification.UnreadCount);
      
      this.isloading = false;
    })
  }
  getNotification(){
    return this.notification.notifications;
  }
  getNotificationUnreadCount(){
    return this.notification.UnreadCount;
  }
  getNotificationCount(){
    return this.notification.Count;
  }
}
