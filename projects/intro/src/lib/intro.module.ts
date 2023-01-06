import { LibConfigModule } from './../../../lib-config/src/lib/lib-config.module';
import { NgModule } from '@angular/core';
import { InformationComponent } from 'projects/intro/information/information.component';
import { SplashScreenComponent } from 'projects/intro/splash-screen/splash-screen.component';
import { IntroComponent } from './intro.component';
// import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from "@angular/common";
import {RouterModule} from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
@NgModule({
  declarations: [InformationComponent,SplashScreenComponent,IntroComponent],
  imports: [CommonModule,RouterModule,IonicModule.forRoot(),LibConfigModule.forChild(IntroComponent),TranslateModule
  ],
  exports:[InformationComponent,SplashScreenComponent,IntroComponent]
})
export class IntroModule { }
