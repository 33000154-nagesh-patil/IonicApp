import { Component } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ToastService } from 'projects/core/src/lib/services/toast.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AppSplash } from './splash';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  existingScreenOrientation: string;
  constructor(private platform: Platform,
    private modalCtrl: ModalController,
    private toastService:ToastService,private so: ScreenOrientation) {
      this.showSplashScreen()
    this.handleSplashScreen()
    localStorage.setItem('torusSkip','0')
  }
  async showSplashScreen() {
    const splashScreen=await this.modalCtrl.create({
      component:AppSplash,
      swipeToClose:true,
      

    })
    return splashScreen.present()
  }
  ngOnInit() {
    this.platform.ready().then(() => {
      this.handleSplashScreen();
      if (this.platform.is('cordova')) {
        this.handleOrientation();
      }
      
    });
    
  }


  // hide #splash-screen when app is ready
  async handleSplashScreen(): Promise<void> {
    try {
      // wait for App to finish loading
      await this.platform.ready()
    } catch (error) {
      // TODO: there is probably nothing we can do about that...
    }
    // Here you may
    
    const splash = document.getElementById('splash-screen')
    // start opacity animation
    if(splash){
      splash.style.opacity = '0';
       // remove after it is hidden
      setTimeout(() => { splash.remove() }, 300)
    }
  }

  async handleOrientation(): Promise<void>{
    try {
      // wait for App to finish loading
      await this.platform.ready()
    } catch (error) {
      // TODO: there is probably nothing we can do about that...
    }
    // Here you may
     // get current orientation
     this.existingScreenOrientation = this.so.type; 

     // find out changes in orientation
    this.so.onChange().subscribe(
      () => {
        // console.log("Orientation updated" + this.so.type);
        this.existingScreenOrientation = this.so.type;
      }
    );
    // this.lockToLandscape();    
    this.lockToPortrait();
  }

   // Lock to portrait
   lockToPortrait(){
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
  }

  // Lock to landscape
  lockToLandscape(){
    this.so.lock(this.so.ORIENTATIONS.LANDSCAPE);
  }

  // Unlock screen orientation 
  unlockScreenOrientation(){
    this.so.unlock();
  }

  ngOnDestroy() {
  }
}
