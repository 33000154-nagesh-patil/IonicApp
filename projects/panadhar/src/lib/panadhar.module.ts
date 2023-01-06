import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { Dialogs } from '@awesome-cordova-plugins/dialogs/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { IonicRouteStrategy } from '@ionic/angular';
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
import { PanadharComponent } from './panadhar.component';

import { MatRadioModule } from '@angular/material/radio';




@NgModule({
  declarations: [PanadharComponent],
  providers:[Camera,Dialogs,File, {provide:RouteReuseStrategy,useClass:IonicRouteStrategy}],
  imports: [ReactiveFormsModule,TranslateModule,FormsModule,MatRadioModule],
  exports:[PanadharComponent,Camera]
})
export class PanadharModule {
 
 }
