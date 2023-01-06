import { TestBed } from '@angular/core/testing';

import { DigiShopingDasboardService } from './digi-shoping-dasboard.service';

describe('DigiShopingDasboardService', () => {
  let service: DigiShopingDasboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigiShopingDasboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
