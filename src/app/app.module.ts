/* eslint-disable max-len */
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AllConfigDataService } from 'index';
import { GlobalHttpInterceptorService } from 'projects/core/src/lib/services/global-http-interceptor.service';
import { GlobalServiceInterceptorService } from 'projects/core/src/lib/services/global-service-interceptor.service';
import { TranslateModule } from '../../projects/core/src/lib/pipe/translate.module';
import { Network } from '@ionic-native/network/ngx';
import { DefaultRouteGuard } from './guards/default-route.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NetworkService } from 'projects/core/src/lib/services/network.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContainerViewPageModule } from './features/container-view/container-view.module';
// declare var SMSReceive: any;

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, BrowserAnimationsModule, IonicModule.forRoot(), AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }), ContainerViewPageModule, HttpClientModule, TranslateModule, NgbModule],
    providers: [DefaultRouteGuard, InAppBrowser, File, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: APP_INITIALIZER, useFactory: (config: AllConfigDataService) => () => config.load(), deps: [AllConfigDataService], multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true },
        { provide: ErrorHandler, useClass: GlobalServiceInterceptorService },
        Network, NetworkService, ScreenOrientation, TextToSpeech
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
