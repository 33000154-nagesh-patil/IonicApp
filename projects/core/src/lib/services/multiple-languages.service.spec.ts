import { TestBed } from '@angular/core/testing';

import { MultipleLanguagesService } from './multiple-languages.service';

describe('MultipleLanguagesService', () => {
  let service: MultipleLanguagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultipleLanguagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
