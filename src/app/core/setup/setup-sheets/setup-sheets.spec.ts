import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupSheets } from './setup-sheets';

describe('SetupSheets', () => {
  let component: SetupSheets;
  let fixture: ComponentFixture<SetupSheets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupSheets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupSheets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
