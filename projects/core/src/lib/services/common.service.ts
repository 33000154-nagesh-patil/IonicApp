import { panDetails } from './../interfaces/common.interface';
import { environment } from './../../../../../src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AllConfigDataService } from './all-config-data.service';

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public productData: BehaviorSubject<any> = new BehaviorSubject(null);
  public customerGuID: BehaviorSubject<any> = new BehaviorSubject(null);
  public userDetail: BehaviorSubject<any> = new BehaviorSubject(null);
  public fetchParentModule: BehaviorSubject<any> = new BehaviorSubject(null);
  public fetchChildModule: BehaviorSubject<any> = new BehaviorSubject(null);
  private environmentAPIList = this.allConfigDataService.getCurrentApiList();
  public digiType :BehaviorSubject<any> = new BehaviorSubject(null);
  public userPan = new BehaviorSubject(null);
  public userPanName = new BehaviorSubject(null);
  public userBankData = new BehaviorSubject(null);
  public footerData=new BehaviorSubject("SuperApp");
  public appLayout=new BehaviorSubject(null);
  exhangeVlaue:any
  kraStatus: any;
  titleValue: any;
  holdingsQty: any;
  goToLandingHome: any=new BehaviorSubject(null);
  billAmount: any;
  constructor(private http:HttpClient, private allConfigDataService:AllConfigDataService) { }


   //Any Data Type
   getConfigData(): Observable<any> {
    return this.http.get(environment.configApi)
  }

  get nativeWindow(): any {
    return _window();
  }

  //With catchError
  getConfigDataError(): Observable<any> {
    return this.http.get(environment.configApi)
      .pipe(
        catchError((err) => {
          console.log('error caught in service')
          console.error(err);

          //Handle the error here

          return throwError(err);    //Rethrow it back to component
        })
      )
  }


  //api
  setLocalIdentifier(){
    return this.environmentAPIList?.identity
  }
  loginAuthentication(obj):Observable<any>{
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.loginAPI, obj);
  }

  otpGenerateValidation(obj):Observable<any>{
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.loginAPI, obj);
  }

  otpValidation(obj):Observable<any>{
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.otpValidationAPI, obj);
  }

  getDummyData():Observable<any>{
    return this.http.get(this.environmentAPIList?.dummyDataAPI)
  }

  getAadharValidation(requestParams): Observable<any> {
    // For the time we are using static token & login id to avoid license expiry error from backend
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.adharAPI, requestParams, { headers })
  }

  validateAadharOtp(requestParams): Observable<any> {
    // For the time we are using static token & login id to avoid license expiry error from backend
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.adharMobileOtp, requestParams, { headers })
  }

  generateAadharCaptcha(requestParams): Observable<any> {
    // For the time we are using static token & login id to avoid license expiry error from backend
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.adharCaptchaGenerate, requestParams, { headers })
  }

  validateAadharCaptcha(requestParams): Observable<any> {
    // For the time we are using static token & login id to avoid license expiry error from backend
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.adharCaptchaValidate, requestParams, { headers })
  }

  getPanDetails(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.panDetail, obj,{headers})
  }
  postPanDetails(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.postPANDetail, obj,{headers})
  }
  postCivilKra(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.cVLPanInquiryGetInquiryDetails, obj,{headers})
  }
  getBankDetails(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.bankDetails, obj,{headers})
  }
  getPanNameMatch(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.getPanNameMatch, obj,{headers})
  }
  getSearchBranch(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.searchBranch, obj,{headers})
  }
  getOfferList():Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.getOfferList,"", {headers})
  }
  getOfferingDocList(reqParams):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.getOfferingDocList,reqParams, {headers})
  }
  getGoldSilverProductList(reqParams):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.getGoldSilverProductList,reqParams, {headers})
  }
  getHealthProductList(reqParams):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.healthCategoryList,reqParams, {headers})
  }
  getHealthProductDetails(reqParams):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.healthCategoryDetails,reqParams, {headers})
  }
  getCategoryList(reqParams):Observable<any>{
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.categoryList,reqParams, {})
  }
  setNomineeDetails(reqParams):Observable<any>{
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.setNomineeDetails,reqParams)
  }
  getProfileDetails(reqParams):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.getProfileDetails,reqParams, {headers})
  }
  setProfileDetails(reqParams):Observable<any>{
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.setProfileDetails,reqParams)
  }

  uploadPanAadhar(reqParams):Observable<any>{
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.uploadPanAadhar,reqParams )
  }

  getMasterDetails(reqParams):Observable<any>{
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.masterDetail,reqParams)
  }
  getGoldProductTransaction(reqParams):Observable<any>{
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.goldProductTransaction,reqParams)
  }
  getGoldPaymentProductTransaction(reqParams):Observable<any>{
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.goldPayment,reqParams)
  }
  getBseStar(reqParams):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Authorization" : 'Basic fMqHkvwLKoN6rTyt_j7F3HNgnvhBtWWE'
    });

    return this.http.post(this.environmentAPIList?.bseStar,reqParams, {headers})
  }

  getAdharDetails(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.adharAPI, obj,{headers})
  }

  //subscribe data
  setProductData(data):void{
    this.productData.next(data);
  }
  getProductData(): Observable<any>{
    return this.productData.asObservable();
  }
  setCustomerGuID(data):void{
    this.customerGuID.next(data);
  }
  getCustomerGuID(): Observable<any>{
    return this.customerGuID.asObservable();
  }
  setUserDetail(data):void{
    this.userDetail.next(data);
  }
  getUserDetail(): Observable<any>{
    return this.userDetail.asObservable();
  }
  setOfferListData(data):void{
    this.fetchParentModule.next(data);
  }
  getOfferListData(): Observable<any>{
    return this.fetchParentModule.asObservable();
  }
  setGetOfferingDocList(data):void{
    this.fetchChildModule.next(data);
  }
  getGetOfferingDocList(): Observable<any>{
    return this.fetchChildModule.asObservable();
  }
  getDocumentList(reqParams): Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.offeringDocList,reqParams, {headers})
  }
  setDigiType(e){
    this.digiType.next(e);
  }
  getDigiType(): Observable<any>{
    return this.digiType.asObservable();
  }

  getDummyBasicModeDataAPI():Observable<any>{
    return this.http.get(this.environmentAPIList?.dummyBasicModeDataAPI)
  }

  getDummyBasicModeLabelsEN():Observable<any>{
    return this.http.get(this.environmentAPIList?.dummyBasicModeLabelsEN)
  }

  getDummyBasicModeWealthLabels():Observable<any>{
    return this.http.get(this.environmentAPIList?.dummyBasicModeWealthEN)
  }

  getSelfieUpload(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post<any>(this.environmentAPIList?.baseURL + this.environmentAPIList?.FaceApiVerify, obj,{headers})
  }

  public getSelfieUpload1(formData) {

    return this.http.post<any>(this.environmentAPIList?.baseURL + this.environmentAPIList?.FaceApiVerify, formData, {
        reportProgress: true,
        observe: 'events'
      });
  }
  public getEsign(reqParams): Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token,
      "enctype" : "multipart/form-data"
    });
    // const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.esign, reqParams,{headers})
    // return this.http.post<any>(this.environmentAPIList?.baseURL + this.environmentAPIList?.esign,reqParams)
  }

  public ExchangeSelectionDataList():Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.ExchangeSelectionDataList,"",{headers})
  }

  public ExchangeSelectionDataInsertList(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.ExchangeSelectionDataInsertList, obj,{headers})
  }

  public getCustomerEsingedStatus(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.CheckCustomerEsingedStatus, obj,{headers})
  }

  getChequeOcr(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    // console.log(this.environmentAPIList?.baseURL + this.environmentAPIList?.chequeOcr);
    return this.http.post<any>(this.environmentAPIList?.baseURL + this.environmentAPIList?.chequeOcr, obj,{headers})
  }

  getPanOcr(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    // console.log(this.environmentAPIList?.baseURL + this.environmentAPIList?.panOcr);
    return this.http.post<any>(this.environmentAPIList?.baseURL + this.environmentAPIList?.panOcr, obj,{headers})
  }
  getAadharOcr(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    // console.log(this.environmentAPIList?.baseURL + this.environmentAPIList?.panOcr);
    return this.http.post<any>(this.environmentAPIList?.baseURL + this.environmentAPIList?.aadharOcr, obj,{headers})
  }
  getAdhaarSeeding(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.panAadhaarSeeding, obj,{headers})
  }
  getCustMobileDetail(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.GetCustMobileDetail, obj,{headers})
  }

  getKraStatus(){
    return this.kraStatus;
  }

  setKraStatus(val){
  this.kraStatus = val;
  // console.log("------ kraStatus ------",this.kraStatus);
  }

  getExistingcustomerDetails(obj):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.isExistingCustomer, obj,{headers})
  }

  //digiGoldStart
  setSellData(reqParams):Observable<any>{
    return this.http.post(this.environmentAPIList?.baseURLDigigold + this.environmentAPIList?.setSellData,reqParams)
  }

  postBankRegistration(reqParams):Observable<any>{
    return this.http.post(this.environmentAPIList?.baseURLDigigold + this.environmentAPIList?.BankRegistration,reqParams)

  }
  postTransactionData(reqParams):Observable<any>{
    return this.http.post(this.environmentAPIList?.baseURLDigigold + this.environmentAPIList?.transactiondetail,reqParams)

  }
  getproduct(reqParams):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL2 + this.environmentAPIList?.getproductAll,reqParams,{headers})
  }
  getdigigold(apiName){
    return this.http.get(this.environmentAPIList?.baseURL + this.environmentAPIList[apiName])
      }
  getDigiGoldRates(){
    // return this.http.get(this.environmentAPIList?.baseURLDigigold+this.environmentAPIList?.GoldSilverlistRates)
    return this.http.get('assets/digigoldjsonfile/getDigiGoldRate.json')
  }
  postdigiKycPan(reqParams){
    return this.http.post(this.environmentAPIList?.baseURLDigigold + this.environmentAPIList?.postdigiKycPan+""+localStorage.getItem('ClientCode'),reqParams)
  }
  getInvoicedetails(txnID){
    // return this.http.get(this.environmentAPIList?.baseURLDigigold + this.environmentAPIList?.getInvoicedetails+'/'+txnID)
    return this.http.get('assets/digigoldjsonfile/getInvoicedetails.json')

  }
  getDigiBankData(){
    return this.http.get(this.environmentAPIList?.baseURLDigigold + this.environmentAPIList?.getBankData + "TOR5729152")
  }
  postNotification(reqParams){
    return this.http.post(this.environmentAPIList?.baseURLDigigold + this.environmentAPIList?.postNotification,reqParams)
  }
  setCustomerdata(reqParams):Observable<any>{
    return this.http.post(this.environmentAPIList?.baseURLDigigold + this.environmentAPIList?.setCustomerdata,reqParams)
  }
  setBuyData(reqParams):Observable<any>{
    // return this.http.post(this.environmentAPIList?.baseURLDigigold + this.environmentAPIList?.setBuyData,reqParams)
    return this.http.get('assets/digigoldjsonfile/buyDigiGold.json')
  }

  getNotificationAll(reqParams){
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.getnotificationall,reqParams,{headers})
  }
  getNotificationDelete(reqParams):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.getnotificationdelete,reqParams,{headers})
  }
  getNotificationRead(reqParams):Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      "Token" : this.environmentAPIList?.token
    });
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.getnotificationread,reqParams,{headers})
  }

  notificationFilter(reqParams){
    return this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.notificationFilter,reqParams)
  }


  //digigoldend
//EDUCATION START//////////////////////////////////////////////////////////////////////////////////////////////////////////////

EnrollUser(reqParams):Observable<any>{
  return this.http.post(this.environmentAPIList?.baseURLED + this.environmentAPIList?.EnrollUser,reqParams)
}

EnrollCourse(reqParams):Observable<any>{
  return this.http.post(this.environmentAPIList?.baseURLED + this.environmentAPIList?.EnrollCourse,reqParams)
}
getCourseListAll(reqParams):Observable<any>{
  return this.http.post(this.environmentAPIList?.baseURLED + this.environmentAPIList?.getCourseList,reqParams)
   //return this.http.get('assets/education/courseList.json')
}
CourseByIdAll(reqParams):Observable<any>{
   return this.http.post(this.environmentAPIList?.baseURLED + this.environmentAPIList?.CourseById,reqParams)
 // return this.http.get('assets/education/product.json')
}
educationorderAll(reqParams){
  return this.http.post(this.environmentAPIList?.baseURLED + this.environmentAPIList?.educationorder,reqParams)
  }
  educationUpdate(reqParams){
    return this.http.post(this.environmentAPIList?.baseURLED + this.environmentAPIList?.educationUpdate,reqParams)
  }
  postfilterAll(reqParams):Observable<any>{
    // console.log(this.environmentAPIList?.baseURL + this.environmentAPIList?.postfilter);
    return this.http.post(this.environmentAPIList?.baseURLED + this.environmentAPIList?.postfilter,reqParams)
  }
  enrollmentUser(reqParams):Observable<any>{
    // console.log(this.environmentAPIList?.baseURL + this.environmentAPIList?.postfilter);
    return this.http.post(this.environmentAPIList?.baseURLED + this.environmentAPIList?.enrollmentUser,reqParams)
  }


//EDUCATION END//////////////////////////////////////////////////////////////////////////////////////////////////////////////


setBillAmount(val){
  this.billAmount=val
  console.log(this.billAmount,"llllllllllllll");


}
getBillAmount(){
  return this.billAmount
}
setExchangeValue(val){
this.exhangeVlaue=val
}
getExchangeValue(){
  return this.exhangeVlaue;
}


setQtyValue(val){
this.holdingsQty = val
}

getQtyValue(){
return this.holdingsQty;
}
setTitle(val){
  this.titleValue=val;

}
getTitle(){

  return this.titleValue
}



}
