import { TestBed } from '@angular/core/testing';

import { AllConfigDataService } from './all-config-data.service';

describe('AllConfigDataService', () => {
  let service: AllConfigDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllConfigDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
