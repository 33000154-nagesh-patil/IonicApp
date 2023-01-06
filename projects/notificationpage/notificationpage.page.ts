// import { EducationNotificationService } from './../../../../projects/core/src/lib/services/education-notification.service';
import { Component, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';
// import { CoursehomeComponent } from 'projects/reusable/src/lib/components/coursehome/coursehome.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificationpage',
  templateUrl: './notificationpage.page.html',
  styleUrls: ['./notificationpage.page.scss'],
})
export class NotificationpagePage implements OnInit {
  imageList: any;
  seeding: boolean =false;

  constructor(private router:Router, private allConfigDataService:AllConfigDataService,private modalctrl:ModalController) { }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images')
  }

  async goToBack(){  
    //this.router.navigate(['/Education'])
    // let count = this.eduNoti.setNotification();
    this.modalctrl.dismiss();
  }

}
