import { TestBed } from '@angular/core/testing';

import { DemoYnabService } from './demo-ynab-service';

describe('DemoYnabService', () => {
  let service: DemoYnabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoYnabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
