import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainTempComponent } from './main-temp/main-temp.component';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { DetailTempComponent } from './detail-temp/detail-temp.component';



@NgModule({
  declarations: [MainTempComponent,DetailTempComponent],
  imports: [
    CommonModule,
    IonicModule
    // FlexLayoutModule
  ],
  exports:[MainTempComponent,DetailTempComponent]
})
export class TemplatesModule { }
