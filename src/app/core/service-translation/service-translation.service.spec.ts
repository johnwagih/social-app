import { TestBed } from '@angular/core/testing';

import { ServiceTranslationService } from './service-translation.service';

describe('ServiceTranslationService', () => {
  let service: ServiceTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
