import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailsPageRoutingModule } from './product-details-routing.module';

import { ProductDetailsPage } from './product-details.page';
import { ProductDetailsModule } from 'projects/product-details/src/public-api';
import { CoreModule } from 'projects/core/src/public-api';
import {TranslateModule} from 'projects/core/src/lib/pipe/translate.module'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    TranslateModule,
    ProductDetailsPageRoutingModule,
    ProductDetailsModule
  ],
  declarations: [ProductDetailsPage]
})
export class ProductDetailsPageModule {}
