import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
// import { PanAadharComponent } from '../pan-aadhar/pan-aadhar.component';


@Component({
  selector: 'app-great',
  templateUrl: './great.component.html',
  styleUrls: ['./great.component.scss'],
})
export class GreatComponent implements OnInit {
  imageList: any;

  constructor(private allConfigDataService:AllConfigDataService, private router:Router) { }
  ngOnInit() {
    this.imageList=this.allConfigDataService.getConfig("images");

  }


    
  NavToOtherDetail(){
    this.router.navigate(['/Onboarding/OtherDetail'])
  }
  

}
