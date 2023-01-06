import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { EducationNotificationService } from 'projects/core/src/lib/services/education-notification.service';
import { EducationFulfillmentComponent } from 'projects/education-fulfillment/src/projects';
import { EducationLibraryComponent } from 'projects/education-library/src/projects';
import content from '../../../../src/assets/content.json';
import { FiltercomponentComponent } from '../filtercomp/filtercomponent.component';

@Component({
  selector: 'lib-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.scss'],
})
export class CourselistComponent implements OnInit {
  @Input() filterVal = [];
  @Input() courseInfo: any;
  @Input() notificationCount:any; 
  imageList: any;
  data: any;
  placeholder: any;
  filterTerm: string;
  search: any;
  modal: any;

  showSerchBar: boolean = false;
  showHeader: boolean = true;
  searchIcon: boolean = true;
  closeIcon: boolean = false;
  searchBar: any;
  filterIcon: boolean = true;
  price: any;
  wellnessFooterData: any;
  currentMode: any = 1;
  pressTimer: any;
  filter: any={};



  constructor(private allConfigServices: AllConfigDataService,
    private router: Router, private modalCtrl: ModalController,
    private http: HttpClient,
    private commonservice:CommonService,private eduNoti:EducationNotificationService) { }
  myfun1(v) {
    console.log("clear");

    clearTimeout(this.pressTimer)
  }
  myfun(v) {
    this.pressTimer = window.setTimeout(() => {
      console.log("hello");
    }, 1000)
  }
  ngOnInit() {
    
    // fetch("assets/education/eduCourse.json").then(async res =>{
    //   this.courseInfo = await res.json();
    //   console.log("sadad",this.courseInfo);

    // })

    // setInterval(() => {this.eduNoti.getNotificationUnreadCount();}, 10000);
    // setInterval(() => {
    //   this.notificationCount=this.eduNoti.getNotificationUnreadCount();
    //   }, 2000);

   

    console.log("notificationCount",this.notificationCount);
    
    if (this.filter.length == 0) {
      this.commonservice.getCourseListAll().subscribe(async (res: any) => {
        this.data = await res;
        console.log( "courselist data",this.data[0].level);
        console.log(res);
  
      })
    } else {
        let param= this.filter
        this.commonservice.postfilterAll(param).subscribe(async (res:any) => {
        this.data = await res;
        console.log(res);

      })
      console.log(this.filterVal);

    }

    this.imageList = this.allConfigServices.getConfig('images');
    this.data = content;
    console.log(this.data)
    console.log(this.price)
    this.placeholder = "Search Courses";
    this.wellnessFooterData = this.allConfigServices.getConfig('educationinTab');
    console.log(this.wellnessFooterData)
  }

  headerBack() {
    this.modal.dismiss("data")
  }

  searchBarBack() {
    this.showHeader = true;
    this.showSerchBar = false;
    this.filterIcon = true;
  }

  async navigateToCart() {
    const modal = await this.modalCtrl.create({
      // component: CoursecategoryComponent,
      component: EducationFulfillmentComponent,
      componentProps: {
        'imageList': this.imageList,
        "courseInfo": this.data
      },
      backdropDismiss: false
    })
    modal.onDidDismiss().then((data) => {
      console.log(data)
    })
    return await modal.present()
  }


  async navigateEducationFulfillment(val) {
    console.log(val)
    const modal = await this.modalCtrl.create({
      component: EducationLibraryComponent,
      componentProps: {
        'imageList': this.imageList,
        'data': val,
        // "courseInfo":this.data
      },
    });
    modal.onDidDismiss()
      .then((data) => {
      });
    // this.loaderService.hideLoader();
    return await modal.present();
  }


  async filterComponent() {
    const modal = await this.modalCtrl.create({
      component: FiltercomponentComponent,
      componentProps: {
        'imageList': this.imageList,
        // 'filter':this.filter
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
        
        if(data.data)this.filter=data.data
        let param= {
          "categoryid":"",
          "level":"",
          "lowprice":"",
          "highprice":"",
          "rating":""
        }
        param['level']=this.filter.Level[0]
        param['rating']=this.filter.Ratings[0]
        this.commonservice.postfilterAll(param).subscribe(async (res:any) => {
          this.data = await res;
          console.log(res);
      });
        
      });
    return await modal.present();
  }


  onKeySearch(val) {
    this.search = val;
    console.log(this.search);
  }

  clearSearchIcon() {
    this.searchIcon = false;
    this.closeIcon = true;
  }

  toggleID() {
    this.showSerchBar = !this.showSerchBar;
    this.showHeader = false;
    this.filterIcon = false;
  }

  gotoNotification(){
    
    this.modalCtrl.dismiss();
    this.router.navigate(['/notificationpage']);
   
  }

  // this.singleclickadd=true;

}




