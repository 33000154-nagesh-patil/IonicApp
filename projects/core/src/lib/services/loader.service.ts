import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular'
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loading: HTMLIonLoadingElement;
  private isShowing = false;
  isLoading = true;
  constructor(private loadingController: LoadingController) { }

  // This will show then autohide the loader
  showHideAutoLoader() {

    this.loadingController.create({
      message: 'This Loader Will Auto Hide in 2 Seconds',
      duration: 2000
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 2 Seconds', dis);
      });
    });

  }

  // Show the loader for infinite time
  // public async showLoader(): Promise<void> {
  //   console.log("showLoader")
  //   if (!this.isShowing) {
  //     console.log("showLoader-if")
  //     this.loading = await this.loadingController.create({
  //       message: 'Please wait...'
  //     });
  //     console.log("showLoader-if-loading",this.loading)
  //     this.isShowing = true;

  //     return await this.loading.present();
  //   }else{
  //     console.log("showLoader-else")
  //     // If loader is showing, only change text, won't create a new loader.
  //     this.isShowing = true;
  //     this.loading.message = 'Please wait...';
  //   }
  // }

  // // Hide the loader if already created otherwise return error
  // public async hideLoader(): Promise<void> {
  //   console.log("Hide Loader",this.loading)
  //   console.log("Hide Loader",this.isShowing)
  //   if (this.loading && this.isShowing) {
  //     console.log("Hide Loader -if")
  //       this.isShowing = false;
  //       await this.loading.dismiss();
  //   }
  // }

  async showLoader(): Promise<void> {
    this.isLoading = true;
    return await this.loadingController.create({
      // duration: 5000,
      message: 'Please wait...'
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        this.isShowing = true;
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async hideLoader(): Promise<void> {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => {this.isShowing = false});
  }
}
