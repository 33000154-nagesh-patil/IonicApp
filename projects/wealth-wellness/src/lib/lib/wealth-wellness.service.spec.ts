import { TestBed } from '@angular/core/testing';

import { WealthWellnessService } from './wealth-wellness.service';

describe('WealthWellnessService', () => {
  let service: WealthWellnessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WealthWellnessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
