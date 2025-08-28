import { TestBed } from '@angular/core/testing';

import { DemoGoogleAuthService } from './demo-google-auth-service';

describe('DemoGoogleAuthService', () => {
  let service: DemoGoogleAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoGoogleAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
