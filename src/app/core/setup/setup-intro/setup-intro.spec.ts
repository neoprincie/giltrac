import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupIntro } from './setup-intro';

describe('SetupIntro', () => {
  let component: SetupIntro;
  let fixture: ComponentFixture<SetupIntro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupIntro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupIntro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
