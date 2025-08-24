import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupFinish } from './setup-finish';

describe('SetupFinish', () => {
  let component: SetupFinish;
  let fixture: ComponentFixture<SetupFinish>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupFinish]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupFinish);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
