import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from 'SuperApp/Common/pipe/translate.module';
import { GlobalCartComponent } from '../Components/global-cart/global-cart.component';
import { BasketComponent } from '../Components/global-cart/basket/basket.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { CapabilityModule } from 'SuperApp/capability/capability.module';
import { currencyCommasModule } from 'projects/core/src/lib/pipe/currency-commas.module';



const routes: Routes = [
    {
        path: '',
        component: GlobalCartComponent,
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        IonicModule,
        FormsModule,
        TranslateModule,
        CommonModule,
        NgbModule,
        MatButtonModule,
        CapabilityModule,
        currencyCommasModule

    ],
    exports: [GlobalCartComponent],
    declarations: [
        GlobalCartComponent,
        BasketComponent
    ],
    providers: [],

})
export class CartModule { }