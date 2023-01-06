import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SubmenuComponent } from './submenu.component';
// import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
import { CoreModule } from 'projects/core/src/public-api';
@NgModule({
  declarations: [SubmenuComponent],
  imports: [ CommonModule, RouterModule, TranslateModule, CoreModule, IonicModule.forRoot(),
  ],
  exports: [SubmenuComponent]
})
export class SubmenuModule { }
