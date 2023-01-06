

import { NgModule } from '@angular/core';

import { CommonModule } from "@angular/common";
import {RouterModule} from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SignInComponent } from './sign-in/sign-in.component';
import { LoginListComponent } from './login-list.component';
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
import { LoginAuthenticationComponent } from './login-authentication/login-authentication.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { CoreModule } from 'projects/core/src/public-api'; 
@NgModule({
  declarations: [LoginListComponent,SignInComponent,LoginAuthenticationComponent],
  imports: [CommonModule,RouterModule,IonicModule,TranslateModule,FormsModule,ReactiveFormsModule,MatFormFieldModule, MatInputModule,CoreModule
  ],
  exports:[LoginListComponent,SignInComponent,LoginAuthenticationComponent]
})
export class LoginListModule { }
