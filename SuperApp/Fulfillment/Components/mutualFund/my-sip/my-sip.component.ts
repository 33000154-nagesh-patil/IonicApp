import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'app-my-sip',
  templateUrl: './my-sip.component.html',
  styleUrls: ['./my-sip.component.scss'],
})
export class MySipComponent implements OnInit {
  @Input() imageList: any;
  bookmarkdata:any=[]
  asd: string;
  DummayAPiData: any;

  constructor(private modalCtrl:ModalController,private http:HttpClient,private allConfigDataService: AllConfigDataService) { 
    this.getDummayApi();
    this.imageList=allConfigDataService.getConfig('images')
   }

  ngOnInit() {

    this.asd=this.imageList['saveIcon']
    
  }

  redirectTo() {
    this.modalCtrl.dismiss();
    window.history.back();
  }

  getbookmarkData(val) {
    if(this.asd==this.imageList["saveIcon"]) {
      this.asd=this.imageList["saveIcon2"];}

    else this.asd=this.imageList["saveIcon"];

    
    this.bookmarkdata[val]=[];
    console.log(this.bookmarkdata)
  
  }
  async navigate() {
    // let eventEmitter = new EventEmitter();
    // eventEmitter.subscribe((res)=>{
    //   console.log(res);
      
    // })
    // const modal = await this.modalCtrl.create({
    //   component:SipDetailComponent,
    //   componentProps:{
    //     'imageList':this.imageList,
    //     'event':eventEmitter
    //   },
    //   backdropDismiss:false
    // });
    // modal.onDidDismiss().then((data) => {
    //  if(data.data){
    //    setTimeout(() => {
    //      this.modalCtrl.dismiss("1");
    //    });
    //  }
      
    // })
    // return await modal.present();
  }

  getDummayApi(){
    let data={
      "CFT":"Shopping",
      "Product":"MF",
      "FileName":"getMySIP"   
    }
  this.http.post("http://uat.torusdigital.in/api/v1/Dummy/get/generalApi",data).subscribe(
    (data: any) => {
      this.DummayAPiData=data.records
      console.log("qu",this.DummayAPiData)
    

      })
  
  }
  
  
    
  
}


