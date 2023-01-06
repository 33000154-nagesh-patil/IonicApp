import { TestBed } from '@angular/core/testing';

import { PortfolioInsigthsService } from './portfolio-insigths.service';

describe('PortfolioInsigthsService', () => {
  let service: PortfolioInsigthsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioInsigthsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
