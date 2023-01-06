import { TestBed } from '@angular/core/testing';

import { MFServiceService } from './mfservice.service';

describe('MFServiceService', () => {
  let service: MFServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MFServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
