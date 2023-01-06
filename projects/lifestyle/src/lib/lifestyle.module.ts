import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
import { LifestyleComponent } from './lifestyle.component';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [LifestyleComponent],
  imports: [IonicModule,TranslateModule,MatInputModule,MatIconModule
  ],
  exports: [LifestyleComponent]
})
export class LifestyleModule { }
