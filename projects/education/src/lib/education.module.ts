import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
import { EducationComponent } from './education.component';
import { CoreModule } from 'projects/core/src/public-api';
import { CommonModule} from '@angular/common';
import { EducationCategoryDashboardComponent } from './component/education-category-dashboard/education-category-dashboard.component';

@NgModule({
  declarations: [EducationComponent,EducationCategoryDashboardComponent],
  imports: [IonicModule,TranslateModule,CoreModule,CommonModule
  ],
  exports:[EducationComponent,EducationCategoryDashboardComponent]
})
export class EducationModule { }
