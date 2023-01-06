import { TestBed } from '@angular/core/testing';

import { EducationNotificationService } from './education-notification.service';

describe('EducationNotificationService', () => {
  let service: EducationNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
