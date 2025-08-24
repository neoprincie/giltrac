import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupYnab } from './setup-ynab';

describe('SetupYnab', () => {
  let component: SetupYnab;
  let fixture: ComponentFixture<SetupYnab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupYnab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupYnab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
