
import { Injectable } from '@angular/core';
// import { environment } from './../../../../../src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Injectable({
  providedIn: 'root'
})
export class MFServiceService {
  public productData: BehaviorSubject<any> = new BehaviorSubject(null);
  public customerGuID: BehaviorSubject<any> = new BehaviorSubject(null);
  public userDetail: BehaviorSubject<any> = new BehaviorSubject(null);
  public fetchParentModule: BehaviorSubject<any> = new BehaviorSubject(null);
  public fetchChildModule: BehaviorSubject<any> = new BehaviorSubject(null);
  private environmentAPIList = this.allConfigDataService.getCurrentApiList();
  public digiType :BehaviorSubject<any> = new BehaviorSubject(null);
  kraStatus: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  breadCrumb2: string;

  constructor(private http:HttpClient, private allConfigDataService:AllConfigDataService) {
    this.apiCatalog=this.allConfigDataService.getConfig('apiCatalog');
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Shopping/Wealth/MF';
    this.breadCrumb2='Operations/Wealth/MF';
  }


  public getAllMutuaFundCard():Observable<any>{
    return this.http.get(this.apiCatalog.baseURL[ this.appEnviron]+ this.breadCrumb+this.apiCatalog.getList)
  }
  getMFOrder(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.apiCatalog.baseURL[ this.appEnviron]+ this.breadCrumb+this.apiCatalog.mfOrder, obj)
  }

  getMFUpdateOrder(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.apiCatalog.baseURL[ this.appEnviron]+ this.breadCrumb+this.apiCatalog.getOrderUpdate, obj)
  }
  GetReedem(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.apiCatalog.baseURL[ this.appEnviron]+ this.breadCrumb+this.apiCatalog.getRedeemOrder, obj)
  }
  getProtfolio(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.apiCatalog.baseURL[ this.appEnviron]+ this.breadCrumb2+this.apiCatalog.getPortfolio, obj)
  }
  getAllMFDetails1(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.apiCatalog.baseURL[ this.appEnviron]+ this.breadCrumb+this.apiCatalog.getDetail, obj)
  }
  getAllMFDetails2(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.apiCatalog.baseURL[ this.appEnviron]+ this.breadCrumb+this.apiCatalog.getDetailReturns, obj)
  }
  getAllMFDetails3(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.apiCatalog.baseURL[ this.appEnviron]+ this.breadCrumb+this.apiCatalog.getDetailAssetLocation, obj)
  }
  getAllMFDetails4(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.apiCatalog.baseURL[ this.appEnviron]+ this.breadCrumb+this.apiCatalog.getDetailSchemeHolding, obj)
  }
  getAllMFDetails5(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.apiCatalog.baseURL[ this.appEnviron]+ this.breadCrumb+this.apiCatalog.navDetails, obj)
  }
  getAllMFDetails6(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.apiCatalog.baseURL[ this.appEnviron]+ this.breadCrumb+this.apiCatalog.getProductListing, obj)
  }
  getAllMFListByCategory(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.apiCatalog.baseURL[ this.appEnviron]+ this.breadCrumb+this.apiCatalog.getList, obj)
  }
  getRagularDirect(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.apiCatalog.baseURL[ this.appEnviron]+ this.breadCrumb+this.apiCatalog.getRagularDirect, obj)
  }
  getBuyTransaction(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.apiCatalog.baseURL[ this.appEnviron]+ this.breadCrumb+this.apiCatalog.getTransactionDetail, obj)
  }

  UCCgenerate(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.apiCatalog.baseURL[ this.appEnviron]+ this.breadCrumb+this.apiCatalog.UccCreation, obj)
  }
  CompareFund(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.apiCatalog.baseURL[ this.appEnviron]+ this.breadCrumb+this.apiCatalog.getCompareFunds, obj)
  }
  checkInvestment(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.apiCatalog.baseURL[ this.appEnviron]+ this.breadCrumb+this.apiCatalog.getcheckInvestment, obj)
  }
  getBuyStatus(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.apiCatalog.baseURL[ this.appEnviron]+ this.breadCrumb+this.apiCatalog.getBuyStatus, obj)
  }

}
