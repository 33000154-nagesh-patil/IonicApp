import { LibConfigModule } from './../../../../projects/lib-config/src/lib/lib-config.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus  } from '@ionic-native/google-plus/ngx';
import { LoginPage } from './login.page';
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
import { LoginListModule } from 'projects/login-list/src/lib/login-list.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    LoginPageRoutingModule,
    LoginListModule,
    LibConfigModule.forChild(LoginPage)
  ],
  declarations: [LoginPage],
  exports:[LoginPage],
  providers:[Facebook,GooglePlus]
})
export class LoginPageModule {}
