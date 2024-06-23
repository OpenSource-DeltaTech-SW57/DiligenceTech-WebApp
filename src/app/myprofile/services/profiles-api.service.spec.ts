import { TestBed } from '@angular/core/testing';

import { ProfilesApiService } from './profiles-api.service';

describe('ProfilesApiService', () => {
  let service: ProfilesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
