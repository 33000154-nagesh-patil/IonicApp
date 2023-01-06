import { DigiShopingModule } from './../../../../projects/digi-shoping/src/lib/digi-shoping.module';
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
import { CoreModule } from './../../../../projects/core/src/lib/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DigiGoldSilverPageRoutingModule } from './digi-gold-silver-routing.module';

import { DigiGoldSilverPage } from './digi-gold-silver.page';
import { DigiShopingDasboardModule } from 'projects/digi-shoping-dasboard/src/projects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot({animated: false}),
    DigiGoldSilverPageRoutingModule,
    CoreModule,
    TranslateModule,DigiShopingModule,
    DigiShopingDasboardModule
  ],
  declarations: [DigiGoldSilverPage]
})
export class DigiGoldSilverPageModule {}
