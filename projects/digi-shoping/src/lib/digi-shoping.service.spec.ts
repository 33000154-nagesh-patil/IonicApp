import { TestBed } from '@angular/core/testing';

import { DigiShopingService } from './digi-shoping.service';

describe('DigiShopingService', () => {
  let service: DigiShopingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigiShopingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
