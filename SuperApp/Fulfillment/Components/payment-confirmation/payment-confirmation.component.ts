import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'index';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { HealthService } from 'SuperApp/Shopping/Services/health.service';
import { TorusbannerComponent } from '../torusbanner/torusbanner.component';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.scss'],
})
export class PaymentConfirmationComponent implements OnInit {
  imageList: any;
  status: any;
  transactionId: any;
  grandTotal:any;
  collection:any;
  popup:any=false

  constructor(
    private modalCtrl: ModalController,
    private eduService:eduService,
    private router:Router,
    private route:ActivatedRoute,
    private allConfigDataService:AllConfigDataService

  ) {
    this.imageList=this.allConfigDataService.getConfig('images');
   }

  ngOnInit() {
    this.status=this.route.snapshot.paramMap.get('status');
    console.log(this.status);

    // let start = setInterval(() => {
      console.log(this.status);

      if(this.status=='success'){
        this.eduService.razorpay_payment_id.subscribe((res: any) => {
          this.transactionId = res;
        });
        console.log(this.transactionId);
        this.getData();
        // if(this.transactionId)clearInterval(start);
        
        setTimeout(() => {
          this.toruspopup();
        },2500)
        
      }
      else if(this.status=='failure'){
        // clearInterval(start);
      }
    // }, 1000);
  }
  getData() {
    this.eduService.cartData.subscribe((res: any) => {
      this.collection = res;
      console.log(res);

    });
    this.grandTotal=0;
    this.collection.forEach(element => {
      this.grandTotal += element.totalAmount;
    })
  }
  mylearning(){
    // this.eduService.setCartData([]);
this.router.navigate(['Fullfilment/Career/Courses']);
  }
  CourseView(){
    // this.eduService.setCartData([]);
    this.router.navigate(['/Engagement']);
  }
  dismiss(){

  }


  async toruspopup() {
    const modal = await this.modalCtrl.create({
      component: TorusbannerComponent,
      cssClass: 'all-brands-modal',
      componentProps:{
        'allData':""
      },
      backdropDismiss: true
    });
    modal.onDidDismiss()
      .then((data) => {
       
      });
    return await modal.present();
 }
  
}
