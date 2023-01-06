import { TestBed } from '@angular/core/testing';

import { PanadharService } from './panadhar.service';

describe('PanadharService', () => {
  let service: PanadharService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanadharService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
