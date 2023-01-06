import { Injectable } from '@angular/core';
import { Observable, fromEvent, merge, of,BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { Network } from '@ionic-native/network/ngx';
import { ToastController, Platform } from '@ionic/angular';
import { platForm } from '../enums/comman.enum';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private statusDevice: BehaviorSubject<any> = new BehaviorSubject(false);
  private statusBrowser: BehaviorSubject<any> = new BehaviorSubject(false);
  private cordovaStatus: BehaviorSubject<any> = new BehaviorSubject(false);
  public appIsOnline$: Observable<boolean>;
  public _platform: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private network: Network, private toastController: ToastController, private plt: Platform) { 
    this.plt.ready().then(() => {
      const status =  this.network.type !== 'none' ? true : false;
      this.statusDevice.next(status);
      this.initializeEnvironment();
      this.initializeNetworkEvents();
     
    });
    this.initConnectivityMonitoring();
  }
  private initializeNetworkEvents() {
    // console.log('network')
    if (this.plt.is('cordova')) {
      this.deviceNetwork();
    }else{
      this.browserNetwork();
    }
 }

 initializeEnvironment(){
  let localCordovaStatus = this.plt.is(platForm?.cordova)?this.plt.is(platForm?.cordova):false;
  let localPlatform = this.plt.platforms() && this.plt.platforms().length > 0 ?this.plt.platforms():'';
  if(localPlatform && localPlatform.length > 0){
    this.setCurrentPlatform(localPlatform[0])
  }
  if(localCordovaStatus){
    this.setCordovaStatus(localCordovaStatus)
  }else{
    this.setCordovaStatus(false)
  }
 }
 setCordovaStatus(data):void{
  this.cordovaStatus.next(data);
 }
 getCordovaStatus():Observable<any>{
  return this.cordovaStatus.asObservable();
 }
 deviceNetwork():void{
  this.network.onDisconnect().subscribe(() => {
    this.statusDevice.next(false);
    this.updateNetworkStatusDevice(false);
  });
  this.network.onConnect().subscribe(() => {
    this.statusDevice.next(true);
    this.updateNetworkStatusDevice(true);
  });
 }

 private async updateNetworkStatusDevice(status: any) {
  this.statusDevice.next(status);

  //const connection = status === ConnectionStatus.Offline ? 'Offline' : 'Online';
  //this.popup(connection,'device');
}
//platform
setCurrentPlatform(platform):void{
  this._platform.next(platform);
}
getCurrentPlatform(): Observable<any>{
  return this._platform.asObservable();
}
onNetworkChange(): Observable<any> {
  return this.statusDevice.asObservable();
}

getCurrentNetworkStatus(): void {
  return this.statusDevice.getValue();
}

updateNetworkStatusbrowser(){
  this.statusBrowser.getValue();
  //this.popup(e,'Browser');
}
updateNetworkStatusbrowserchange(): Observable<any>{
  return this.statusBrowser.asObservable();
  //this.popup(e,'Browser');
}
initConnectivityMonitoring():void {

    if (!window || !navigator || !('onLine' in navigator)) return;

    this.appIsOnline$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
     ).pipe(map(() => navigator.onLine))

}

  browserNetwork():void{
    this.appIsOnline$.subscribe((data:any)=>{
      if(data){
        this.statusBrowser.next(data);
      }else{
        this.statusBrowser.next(false);
      }
    })
  }
}
