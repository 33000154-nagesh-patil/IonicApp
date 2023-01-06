import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
    selector: 'app-splash',
    template: `
    <div>
    <img src="{{url}}">
    </div>

    `,
    
    styles: [`
    div{
        display:flex;justify-content:center;align-items:center;width:100%;height:100%;
    }
    img{
        width:80px;
	-webkit-animation: rotate-center 2.0s linear infinite both;
	        animation: rotate-center 2.0s linear infinite both;
}
@-webkit-keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

    `]
})
export class AppSplash implements OnInit{
url: any="assets/icon/torus_logo_transperent_svg.svg";

    constructor(private modalCtrl: ModalController) {}
    ngOnInit(): void {
        setTimeout(() => {
            this.modalCtrl.dismiss()
        }, 2000);
    }
    
}