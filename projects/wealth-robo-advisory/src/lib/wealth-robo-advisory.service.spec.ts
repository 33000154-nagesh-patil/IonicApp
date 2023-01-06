import { TestBed } from '@angular/core/testing';

import { WealthRoboAdvisoryService } from './wealth-robo-advisory.service';

describe('WealthRoboAdvisoryService', () => {
  let service: WealthRoboAdvisoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WealthRoboAdvisoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
