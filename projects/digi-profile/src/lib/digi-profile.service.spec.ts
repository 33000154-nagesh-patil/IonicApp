import { TestBed } from '@angular/core/testing';

import { DigiProfileService } from './digi-profile.service';

describe('DigiProfileService', () => {
  let service: DigiProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigiProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
