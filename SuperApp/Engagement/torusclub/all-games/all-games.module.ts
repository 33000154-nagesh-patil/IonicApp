import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ParentGamesComponent } from './parent-games/parent-games.component';
import { VoucherSpinnerComponent } from './voucher-spinner/voucher-spinner.component';
import { GiftCardSpinnerComponent } from './gift-card-spinner/gift-card-spinner.component';
import { CashBackSpinnerComponent } from './cash-back-spinner/cash-back-spinner.component';
import { JackpotSpinnerComponent } from './jackpot-spinner/jackpot-spinner.component';

const route: Routes = [
  {
    path: 'games',
    component: ParentGamesComponent,
    children: [
      {
        path: 'voucher',
        component: VoucherSpinnerComponent,
      },
      {
        path: 'jackPot',
        component: JackpotSpinnerComponent,
      },
      {
        path: 'gift',
        component: GiftCardSpinnerComponent,
      },
      {
        path: 'cashBack',
        component: CashBackSpinnerComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    ParentGamesComponent,
    VoucherSpinnerComponent,
    CashBackSpinnerComponent,
    GiftCardSpinnerComponent,
    JackpotSpinnerComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(route), IonicModule],
  exports: [
    ParentGamesComponent,
    VoucherSpinnerComponent,
    CashBackSpinnerComponent,
    JackpotSpinnerComponent,
    CommonModule,
  ],
})
export class AllGamesModule {}
