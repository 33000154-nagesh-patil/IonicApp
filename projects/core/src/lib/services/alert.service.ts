import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor( public alertController: AlertController) { }

//alert
  async showAlert(headerContains,subheaderContains,messageContains,buttonName) {
    // console.log("messageContains",messageContains)
    const alert = await this.alertController.create({
      header: headerContains,
      //subHeader: subheaderContains,
      cssClass: 'custAlert',
      message: messageContains,
      buttons: [buttonName]
    });

    await alert.present();
  }
//confirm alert
showExitConfirm(message) {
    this.alertController.create({
      header: '',
      subHeader: '',
      message: message,
      backdropDismiss: false,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Application exit prevented!');
          }
        },
        {
          text: 'Exit',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
//prompt
  showPrompt() {
    this.alertController.create({
      header: 'Prompt Alert',
      subHeader: 'Enter information requested',
      message: 'Enter your favorate place',
      inputs: [
        {
          name: 'Place',
          placeholder: 'Eg.NY',

        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },
        {
          text: 'Done!',
          handler: (data: any) => {
            console.log('Saved Information', data);
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
}
