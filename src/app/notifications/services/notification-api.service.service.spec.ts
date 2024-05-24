import { TestBed } from '@angular/core/testing';

import { NotificationApiServiceService } from './notification-api.service.service';

describe('NotificationApiServiceService', () => {
  let service: NotificationApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
