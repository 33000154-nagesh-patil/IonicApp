import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../src/environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { AlertService } from './alert.service';
import { ToastService } from './toast.service';
import { CommonFunctionService } from './common-function.service';
@Injectable({
  providedIn: 'root'
})
export class AllConfigDataService {
  private _config: any = null;
  private animationTimings:any;
  private currentThemeName:any;
  private currentLang:any;
  private apiList:any;
  public appMode = new BehaviorSubject<boolean>(true);
  // public _appMode:any;
  public _appMode: string = "superMode";
  filterData: any;
  constructor(private http: HttpClient ,private loaderService:LoaderService, private alertService:AlertService,private toastService:ToastService, private commonFunctionService:CommonFunctionService) { 
   
  }

  public load(){
    this.loaderService.showLoader();
    // this.commonService.currentNetworkStatus$.subscribe((data:any)=>{
    //   console.log("data",data)
    //   if(data){
        return new Promise((resolve, reject) => {
          this.http
            .get(environment.configApi)
            .pipe(
              map((res: any) => {
                /* If using the mockdata environment, turn off the login and intro, because it's annoying for developers. */
                return res;
              }),
              catchError(error => throwError(error))
            )
            .subscribe((confRes:any) => {
             
              this._config = confRes;
              this.animationTimings = confRes?.animationTimings;
              this.currentThemeName = confRes?.themes;
              this.currentLang = confRes?.language;
              this.apiList = confRes.environmentType?confRes.apiList[confRes.environmentType]:confRes.apiList['live'];
              //console.log("confRes",confRes)
              this.loaderService.hideLoader();
              resolve(true);
             
            },
            (error:any)=>{
              this.loaderService.hideLoader();
              this.commonFunctionService.showErrorsService("Error","all-config-data-service -> load -> Http request",error,"Ok")
            }
            );
        });
    //   }else{
    //     this.toastService.showAutoToast()
    //   }
    // })

  }
  getAllConfigSetting(){
    return this._config
  }

  getConfig(key: string) {
    return this._config[key];
  }

  getAnimationTimings(){
    return this.animationTimings;
  }

  getCurrentLanguage(){
    return this.currentLang;
  }

  getCurrentThemeName(){
    return this.currentThemeName;
  }
  getCurrentApiList(){
    return this.apiList;
  }

  setAppMode(e){
    this._appMode = e;
    this.appMode.next(e);
  }
  getAppMode(){
    return this._appMode;
  }

  getFilterData(){
    return this.filterData;
  }

  setFilterData(e){
    this.filterData =  e;
    
  }
}
