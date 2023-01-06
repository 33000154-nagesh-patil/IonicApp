import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterTestingModule } from '@angular/router/testing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AlertController, IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { TranslateModule } from 'SuperApp/Common/pipe/translate.module';


import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { AppComponent } from './app.component';
import { ContainerViewPageModule } from './features/container-view/container-view.module';
import { OrderBookComponent } from 'SuperApp/Shopping/Components/order-book/order-book.component';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Network } from '@ionic-native/network/ngx';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { AlertService } from 'projects/core/src/lib/services/alert.service';
import { ToastService } from 'projects/core/src/lib/services/toast.service';

describe('AppComponent', () => {
let service
  beforeEach(waitForAsync(() => {
    
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ RouterTestingModule.withRoutes([]),BrowserModule, BrowserAnimationsModule, IonicModule.forRoot(), ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.production,
        // Register the ServiceWorker as soon as the app is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
    }),  HttpClientModule, TranslateModule, NgbModule,FormsModule,ReactiveFormsModule,MatInputModule],
      providers: [ScreenOrientation,InAppBrowser,Network,FormBuilder,AllConfigDataService]
    }).compileComponents();
    service = TestBed.inject(AllConfigDataService);
    service.load()
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should create OrderBook', waitForAsync(() => {
    const fixture = TestBed.createComponent(OrderBookComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
