import { TestBed } from '@angular/core/testing';

import { NewLibService } from './new-lib.service';

describe('NewLibService', () => {
  let service: NewLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
