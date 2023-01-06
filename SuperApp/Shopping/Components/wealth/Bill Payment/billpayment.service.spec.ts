import { TestBed } from '@angular/core/testing';

import { BillpaymentService } from './billpayment.service';

describe('BillpaymentService', () => {
  let service: BillpaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillpaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
