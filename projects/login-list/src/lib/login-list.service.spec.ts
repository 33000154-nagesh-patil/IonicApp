import { TestBed } from '@angular/core/testing';

import { LoginListService } from './login-list.service';

describe('LoginListService', () => {
  let service: LoginListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
