import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GlobalSearchComponent } from './global-search.component';
import { IonicModule } from '@ionic/angular';
import { VoicePopupComponent } from './voice-popup/voice-popup.component';
import { VoiceRecognitionService } from '../../Engagement/Engagement services/voice-recognition.service'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { PhotoSearchComponent } from './photo-search/photo-search.component';
import { Camera } from '@ionic-native/camera/ngx'; 
import { CapabilityModule } from 'SuperApp/capability/capability.module';

// import { WebView } from '@ionic-native/ionic-webview/ngx'; 
import { WebcamModule } from 'ngx-webcam'; 
import { Shopping } from 'SuperApp/Shopping/Module/shopping.module';

const routes: Routes = [
  { path: '', redirectTo: 'getGlobalSearch', pathMatch: 'full' },

  {
    path: 'getGlobalSearch',
    component: GlobalSearchComponent,
  },
  {
    path: 'getClickPicture',
    component: PhotoSearchComponent,
  },

];

@NgModule({
  declarations: [GlobalSearchComponent,VoicePopupComponent,PhotoSearchComponent],
  imports: [RouterModule.forChild(routes), CommonModule, IonicModule, FormsModule, Ng2SearchPipeModule,WebcamModule,Shopping,
    CapabilityModule
  ],
  exports:[GlobalSearchComponent,VoicePopupComponent],
  providers: [VoiceRecognitionService, Camera, WebcamModule],
})
export class GlobalSearchModule { }
