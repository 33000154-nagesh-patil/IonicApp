import { TestBed } from '@angular/core/testing';

import { OrderedlistService } from './orderedlist.service';

describe('OrderedlistService', () => {
  let service: OrderedlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderedlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
