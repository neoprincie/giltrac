import { TestBed } from '@angular/core/testing';

import { DemoSheetsService } from './demo-sheets-service';

describe('DemoSheetsService', () => {
  let service: DemoSheetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoSheetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
