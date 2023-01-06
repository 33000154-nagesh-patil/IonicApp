import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
import { HealthComponent } from './health.component';
import { CoreModule } from 'projects/core/src/public-api';
import { CommonModule} from '@angular/common';
import { HealthCategoryComponent } from './components/health-category/health-category.component';
@NgModule({
  declarations: [HealthComponent,HealthCategoryComponent],
  imports: [IonicModule,TranslateModule,CoreModule,CommonModule
  ],
  exports:[HealthComponent,HealthCategoryComponent]
})
export class HealthModule { }
