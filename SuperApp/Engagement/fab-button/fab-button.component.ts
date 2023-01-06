import { Component, OnInit,Input,Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'index';
 import * as $ from 'jquery';
import { TicketgenerationComponent } from '../ticketgeneration/ticketgeneration.component';


@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss'],
})
export class FabButtonComponent implements OnInit {

  @Input() superMode:any;
  @Input() fabIcon:any;
  pos: number;
  pos2: number;
  imageList: any
flag: boolean=true
  pos1: number;
  constructor(private router:Router, private mdlctrl: ModalController,private allConfigDataService:AllConfigDataService) { }

  ngOnInit() {
     //this.fabButtonMoving();
  }
  
  async redflag() {
  const modal = await this.mdlctrl.create({
      component: TicketgenerationComponent,
      componentProps: {
        'imageList': this.imageList,
      },
      cssClass:'order-acknowledgement1-modal',
      backdropDismiss: true
    });
    this.flag=false
    modal.onDidDismiss().then((data: any) => {
      this.flag=true
    });
    return modal.present()
  }

  navigateToLink(e){

    if(e=='torusClub')this.router.navigate(['/Engagement/EngagementTorusClub/torusclub']);
    if(e=='chatBot')this.router.navigate(['/Engagement/EngagementChatbot/chatbot']);

  }




  toggleSuperMode(mode){
    this.allConfigDataService.setAppMode(mode)
    if(!mode){
     console.log("fab",mode);
     // this.router.navigate(['/Dashboard']);
    }

      $('.nav').toggleClass('show');   

}

fabButtonMoving(){
  const fabElement = document.getElementById("floating-snap-btn-wrapper");
let oldPositionX,
  oldPositionY;

const move = (e) => {
  if (!fabElement.classList.contains("fab-active")) {
    if (e.type === "touchmove") {
      fabElement.style.top = e.touches[0].clientY + "px";
      fabElement.style.left = e.touches[0].clientX + "px";
    } else {
      fabElement.style.top = e.clientY + "px";
      fabElement.style.left = e.clientX + "px";
    }
  }
};

const mouseDown = (e) => {
  console.log("mouse down ");
  oldPositionY = fabElement.style.top;
  oldPositionX = fabElement.style.left;
  if (e.type === "mousedown") {
    window.addEventListener("mousemove", move);
  } else {
    window.addEventListener("touchmove", move);
  }

  fabElement.style.transition = "none";
};

const mouseUp = (e) => {
  console.log("mouse up");
  if (e.type === "mouseup") {
    window.removeEventListener("mousemove", move);
  } else {
    window.removeEventListener("touchmove", move);
  }
  snapToSide(e);
  fabElement.style.transition = "0.3s ease-in-out left";
};

const snapToSide = (e) => {
  const wrapperElement = document.getElementById('main-wrapper');
  const windowWidth = window.innerWidth;
  let currPositionX, currPositionY;
  if (e.type === "touchend") {
    currPositionX = e.changedTouches[0].clientX;
    currPositionY = e.changedTouches[0].clientY;
  } else {
    currPositionX = e.clientX;
    currPositionY = e.clientY;
  }
  if(currPositionY < 50) {
   fabElement.style.top = 50 + "px"; 
  }
  if(currPositionY > wrapperElement.clientHeight - 50) {
    fabElement.style.top = (wrapperElement.clientHeight - 50) + "px"; 
  }
  if (currPositionX < windowWidth / 2) {
    fabElement.style.left = 30 + "px";
    fabElement.classList.remove('right');
    fabElement.classList.add('left');
  } else {
    fabElement.style.left = windowWidth - 30 + "px";
    fabElement.classList.remove('left');
    fabElement.classList.add('right');
  }
};

fabElement.addEventListener("mousedown", mouseDown);

fabElement.addEventListener("mouseup", mouseUp);

fabElement.addEventListener("touchstart", mouseDown);

fabElement.addEventListener("touchend", mouseUp);

fabElement.addEventListener("click", (e) => {
  if (
    oldPositionY === fabElement.style.top &&
    oldPositionX === fabElement.style.left
  ) {
    fabElement.classList.toggle("fab-active");
  }
});

}



}
