import { TestBed } from '@angular/core/testing';

import { GlobalServiceInterceptorService } from './global-service-interceptor.service';

describe('GlobalServiceInterceptorService', () => {
  let service: GlobalServiceInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalServiceInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
