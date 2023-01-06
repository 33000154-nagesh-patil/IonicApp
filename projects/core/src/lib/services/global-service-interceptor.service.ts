import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalServiceInterceptorService {

  constructor(private http: HttpClient) { }

  handleError(error: Error | HttpErrorResponse) {
    if(error != undefined){
      console.log('GlobalErrorHandlerService')
      console.error(error);
    }

  }
}
