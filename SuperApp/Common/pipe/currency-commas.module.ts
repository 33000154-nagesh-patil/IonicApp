import { NgModule } from '@angular/core';
import { CurrencyCommasHundredsPipe } from './currency-commas-hundreds.pipe';
@NgModule({
    declarations: [CurrencyCommasHundredsPipe],
    imports: [],
    exports:[CurrencyCommasHundredsPipe]
})
export class currencyCommasModule {}