import { TestBed } from '@angular/core/testing';

import { EncryptionDataService } from './encryption-data.service';

describe('EncryptionDataService', () => {
  let service: EncryptionDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
