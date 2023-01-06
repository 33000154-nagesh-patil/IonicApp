import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private myToast: any;
  constructor(private toast: ToastController) { }

  async showAutoToast(messageContains) {
    const toast  = await this.toast.create({
      message: messageContains,
      duration: 2000,
      position: 'bottom',
      cssClass: "my-custom-class",
      buttons: [
        {
          side: 'end',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }

  async showManuallyToast() {
    const toast  = await this.toast.create({
      message: 'Ionic Auto Hide Toast on Bottom',
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }
  
  showToast() {
    this.myToast = this.toast.create({
      message: 'Ionic 4 Auto Hide Toast on Bottom',
      
    }).then((toastData) => {
      // console.log(toastData);
      toastData.present();
    });
  }

  HideToast() {
    this.myToast = this.toast.dismiss();
  }
}
