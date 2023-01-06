import { CurrencyCommasHundredsPipe } from './currency-commas-hundreds.pipe';

describe('CurrencyCommasHundredsPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyCommasHundredsPipe();
    expect(pipe).toBeTruthy();
  });
});
