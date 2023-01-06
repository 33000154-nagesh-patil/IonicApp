
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { LoginType } from '../enums/comman.enum';
// import * as moment from "moment";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public isAuthenticated$ = this.isAuthenticated.asObservable();
  token = '';
  constructor(private http: HttpClient) {
    this.loadToken();
   }

   async loadToken() {
    const token =  localStorage.getItem('id_token');
    if (token) {
      this.token = token;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  // login(loginType,userData): void {
  //   switch (loginType){
  //     case LoginType.mobile:
  //       this.loginAuthentication(userData,'');
  //       break;
  //     case LoginType.gmail:
  //       this.loginAuthentication(userData,'');
  //       break;
  //     case LoginType.fb:
  //       this.loginAuthentication(userData,'');
  //       break;
  //     case LoginType.face:
  //       this.loginAuthentication(userData,'');
  //       break;
  //     case LoginType.fingerprint:
  //       this.loginAuthentication(userData,'');
  //       break;
  //     case LoginType.instagram:
  //       this.loginAuthentication(userData,'');
  //       break;
  //     case LoginType.other:
  //       this.loginAuthentication(userData,'');
  //       break;
  //     default:
  //       break;
  //   }
  // }

  setLoginAuthentication(data,type){
    console.log("data",data)
    
    if(data){
      localStorage.setItem('torusToken', data);
      this.isAuthenticated.next(true);
      // console.log("PARAMS_VAL 2", JSON.stringify(type));
    }else{
      this.isAuthenticated.next(false);
    }
  }

  logout():void{
    this.isAuthenticated.next(false);
    localStorage.removeItem('id_token');
    localStorage.removeItem('torusSkip');
    sessionStorage.removeItem('OnboardingStep');
    // localStorage.clear()
  }

  setLogin(){
    this.isAuthenticated.next(true);
  }
}
