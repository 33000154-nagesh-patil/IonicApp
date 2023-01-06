import { BehaviorSubject } from 'rxjs';
import { async } from '@angular/core/testing';
import { Injectable } from "@angular/core";
import { root } from "rxjs/internal-compatibility";
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { HttpClient } from '@angular/common/http';
//import { AllConfigDataService } from './../../../../../projects/core/src/lib/services/all-config-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'index';


@Injectable({
    providedIn: 'root',
})


export class notificationCountService {
    apiCatalog: any;
    appEnviron: any;
    breadCrumb: string;
    notification: any;
    isloading: boolean = true;
    public notificationUnReadCount: any = new BehaviorSubject(null);

    constructor(private allConfigDataService: AllConfigDataService, private http: HttpClient, private commonService: CommonService, private router: Router) {
        this.apiCatalog = this.allConfigDataService.getConfig('apiCatalog');
        this.appEnviron = this.allConfigDataService.getConfig('environmentType');
        this.breadCrumb = "Engagement/EngagementNotification";
    }

    async setNotification() {
        let params = {
            "TokenId": localStorage.getItem('id_token'),
            "option": ""
        }
        this.http.post(this.apiCatalog.baseURL[this.appEnviron] + this.breadCrumb + this.apiCatalog.getAllNotification, params).subscribe(async (res: any) => {           
            this.notificationUnReadCount.next(res?.countUnRead?.countUnRead)            
        })
    }
}