import { TestBed } from '@angular/core/testing';

import { HealthLabTestDashboardService } from './health-lab-test-dashboard.service';

describe('HealthLabTestDashboardService', () => {
  let service: HealthLabTestDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthLabTestDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
