import { CommonService } from './../../../../projects/core/src/lib/services/common.service';
import { EducationNotificationService } from './../../../../projects/core/src/lib/services/education-notification.service';
import { Component, Input, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonModule, Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NotificationFilterComponent } from './notification-filter/notification-filter.component';

@Component({
  selector: 'app-notificationpage',
  templateUrl: './notificationpage.page.html',
  styleUrls: ['./notificationpage.page.scss'],
})
export class NotificationpagePage implements OnInit {
  
  @Input() backUrlName: any;
  filterSelectionCount: any;

  imageList: any;
  seeding: boolean =false;
  filter: any = {};
  data: any;

  constructor(private location:Location ,
    private router:Router, private allConfigDataService:AllConfigDataService,private modalctrl:ModalController,
    private eduNoti:EducationNotificationService, private CommonService:CommonService) { }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images')
  }

  async goToBack(){  
   
      this.location.back()
   
  }

  async gotoFilter(){
    
    const modal = await this.modalctrl.create({
      component: NotificationFilterComponent,
      componentProps: {
        'imageList': this.imageList,
      },
      //backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data.data) this.filter = data.data
        this.filterSelectionCount = (this.filter["Type"].length) + (this.filter["Category"].length) + (this.filter["Sub-Category"].length)
        let param = {
          "CustGuId": localStorage.getItem('CustGuId'),
          // "6A59625C-5479-4A5A-8227-E2E1B235FBF6"
          // "Offering": "Education, Stock",
          "Offering": "",
          "CreatedOnDate": null
        }
        if (this.filter.Category.length > 0) {
          param['Offering'] = this.filter.Category[0].toString();
          this.CommonService.notificationFilter(param).subscribe(async (res: any) => {
            this.data = await res.filteredNotifications;     
          });
        }
      });
    return await modal.present();
  }

}
