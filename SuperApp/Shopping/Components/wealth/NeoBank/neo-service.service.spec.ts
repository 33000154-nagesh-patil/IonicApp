import { TestBed } from '@angular/core/testing';

import { NeoServiceService } from './neo-service.service';

describe('NeoServiceService', () => {
  let service: NeoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
