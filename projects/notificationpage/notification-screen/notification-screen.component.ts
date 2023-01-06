import { NotificationFilterComponent } from './../notification-filter/notification-filter.component';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { IonCardTitle, ModalController } from '@ionic/angular';
// import { debug } from 'console';
import { BankDetailsComponent } from 'projects/core/src/lib/components/bank-details/bank-details.component';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { stringify } from 'querystring';
import notificationData from '../../../src/assets/notificationData.json'
import { FiltercomponentComponent } from '../filtercomponent/filtercomponent.component';


@Component({
  selector: 'app-notification-screen',
  templateUrl: './notification-screen.component.html',
  styleUrls: ['./notification-screen.component.scss'],
})
export class NotificationScreenComponent implements OnInit {

  @Input() imageList: any;
  
  categroies = ['All', 'Promotional', 'Unread']
  data: any
  contactList: Array<string> = [];

  toogleCol: boolean = true;
  days: any
  seeding: boolean = false;
  pressTimer: any
  segmentModel = "All";
  counter: any;
  filterIcon: boolean = true;
  selectIcon: boolean = true;
  cancelIcon: boolean = false;
  deSelectIcon: boolean = false;
  selectAll: boolean = false;
  delete: boolean = false;
  active: any;
  change: boolean = true;
  selection: any
  ids: any;
  seedings: boolean = false
  delete1: boolean;
  counter1: any;
  deletionValue: any;
  count: number;
  data1: any;
  valueData: any = [];
  valueData1: any;
  counter2: any;
  switchIcon: boolean;
  // counter2: any=0;
  notificationID: any = [];
  filter: any = {};
  emptyData: boolean = false;
  unreadCounter: any;
  filterCount: any;
  selectEvent:any;
  filteredData: any;
  
 



  segmentchanged(category) {
    this.notificationData();
    this.segmentModel = category;

  }

  constructor(private cdn: ChangeDetectorRef, private http: HttpClient,
    private allConfigDataService: AllConfigDataService, private modalCtrl: ModalController, private CommonService: CommonService) {
  }

  ngOnInit() {
    this.notificationData();
    this.imageList = this.allConfigDataService.getConfig('images')
    this.data = notificationData.data;
    console.log("Notification Data ---->", this.data);
  }

  async filterComponent() {
    const modal = await this.modalCtrl.create({
      component: NotificationFilterComponent,
      componentProps: {
        'imageList': this.imageList,
      },
      //backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data){
          this.filter = data.data
          this.filterCount = this.filter["Category"].length + this.filter["Sub-Category"].length;          
        }
       
        let param = {
          "CustGuId": localStorage.getItem('CustGuId'),
          // "6A59625C-5479-4A5A-8227-E2E1B235FBF6"
          // "Offering": "Education, Stock",
          "Offering": "",
          "CreatedOnDate": null
        }
        // if (this.filter.Category.length > 0) {
        //   param['Offering'] = this.filter.Category[0].toString();
        //   this.CommonService.notificationFilter(param).subscribe(async (res: any) => {
        //     this.data = await res.filteredNotifications;   
        //     if(!this.data.length)  {
        //         this.counter = 0;
        //         this.segmentModel = "All";
                
        //     }       
        //   });
        // }
      
      });
    return await modal.present();
  }


  showPopUp() {
    this.seeding = true;
  }

  select(e: any) {
  
    
    this.selectEvent = e.target.innerHTML;
     
    this.delete1 = false;
    this.selectAll = false;
    this.filterIcon = false;
    this.selectIcon = false;
    this.cancelIcon = true;
    
    // delete e.value;
  }

  selectAllCheckBox() {
    this.delete1 = true;
    this.selectAll = false;
    this.filterIcon = false;
    this.selectIcon = false;
    this.cancelIcon = false;
    this.deSelectIcon = true

    // delete e.value;
    // this.valueData = null;
    // this.valueData = this.data1;

    // console.log(".........", this.data1[0].notificationId);
    //this.off(this.valueData)

    this.data1.forEach(element => {
      this.notificationID.push(element.notificationId)

    });
    console.log("arrayyyyy", this.notificationID);
    this.valueData = null;
    this.valueData = this.notificationID

  }

  cancel(e: any) {
    this.delete1 = false;
    this.selectAll = false;
    this.filterIcon = true;
    this.selectIcon = true;
    this.cancelIcon = false;
    this.active != e
    this.change = true;
    this.valueData = []
    this.selectEvent =  null;
  }

  deSelectAll() {
    this.delete1 = false;
    this.selectAll = false;
    this.filterIcon = true;
    this.selectIcon = true;
    this.deSelectIcon = false;
    this.cancelIcon = false;
    this.change = true;
    this.valueData = [];
    this.selectEvent = null;

  }


  off(id) {
    if(this.selectEvent == "Select"){
      
      if (!this.valueData.includes(id)) {
        this.valueData.push(id)
      } else {
        for(let i=0; i< this.valueData.length;i++){
          if(this.valueData[i]===id){
            this.valueData.splice(i,1)
          }
        }
        //this.valueData.pop(id)
        //console.log("pop id",id);
        
      }
      console.log(this.valueData);
      this.switchIcon = true;
      console.log("off function", id);
  
      if (this.selectIcon && this.segmentModel == 'All' ) {
       
        this.read(id);
      }
      else if (this.cancelIcon && this.segmentModel == 'All') {
        this.active = id;
        this.delete1 = true;
        this.change = false;
        this.selectAll = true
        this.filterIcon = false;
        this.cancelIcon = false;
        this.selectIcon = false;
        this.deletionValue = id;
      }
     
    }
    else{      
      this.read(id);
       return;
    }

    
  }

  deleteData() {
    this.selectEvent =  null
    this.seedings = true
  }

  skipCancel() {
    this.seedings = false;
  }

  yesSkip() {
    this.dele();
    this.cdn.detectChanges();
    this.cancel(1);
  }
  notificationData() {
    let params = {
      "CustGuId": localStorage.getItem('CustGuId')
      // "CustGuId": " FD8E981C-0EA7-47F5-963B-01619FFAE79D"
    }
    // this.CommonService.getNotificationAll(params).subscribe(
    //   (data: any) => {
    //     console.log("NotificationData", data)
    //     this.counter = data.Count;
    //     this.unreadCounter = data.UnreadCount;
    //     this.data1 = data.notifications;
    //     this.cdn.detectChanges();
    //     console.log("title", this.data1);

        // if (data) {
        //   this.data1.forEach(element => {
        //     if (element.isRead == false) {
        //       console.log("Unread");
        //     } else {
        //       console.log("read");
        //     }
        //   });
        //   console.log("Esign",data);


        // } else {
          // this.errorShow(data?.Message, "getEsign -> status");
      //   }
      // }, (error: any) => {
        // this.errorShow(error?.Message, "getEsign -> Http request");
      // })
    // this.getESignStatus.emit("esign")
  }


  dele() {
    let params = {
      "CustGuId": localStorage.getItem('CustGuId'),
      "notificationId": this.valueData
    }

    // this.CommonService.getNotificationDelete(params).subscribe(
    //   (data: any) => {
    //     // console.log("NotificationData", data)
    //     this.counter = data.Count;
    //     this.data1 = data.notifications;
        // console.log("title",this.data1);

        // if (data.Status) {
        //   // console.log("Esign",data);
        //   //window.location.reload();
        //   this.notificationData();
        //   console.log("deleted");

  //         this.cdn.detectChanges();
  //         this.seedings = false;
  //       } else {
  //         // this.errorShow(data?.Message, "getEsign -> status");
  //       }
  //     }, (error: any) => {
  //       // this.errorShow(error?.Message, "getEsign -> Http request");
  //     })
  }


  read(notificationId) {

    let params = {
      "CustGuId": localStorage.getItem('CustGuId'),
      "notificationId": notificationId
    }

    // this.CommonService.getNotificationRead(params).subscribe(
    //   (data: any) => {
    //     // console.log("NotificationData", data)
    //     // this.counter=data.Count;
    //     // this.data1=data.notifications;
    //     // console.log("title",this.data1);
     
    //     if (data.Status == 1) {          
    //       this.notificationData();
    //     } else {
    //       alert('something went wrong msg from read function')
    //       // this.errorShow(data?.Message, "getEsign -> status");
  //       }
  //     }, (error: any) => {
  //       // this.errorShow(error?.Message, "getEsign -> Http request");
  //     })
  // }


}

}



