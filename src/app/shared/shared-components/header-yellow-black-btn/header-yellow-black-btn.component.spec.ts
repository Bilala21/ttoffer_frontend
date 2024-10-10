import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderYellowBlackBtnComponent } from './header-yellow-black-btn.component';

describe('HeaderYellowBlackBtnComponent', () => {
  let component: HeaderYellowBlackBtnComponent;
  let fixture: ComponentFixture<HeaderYellowBlackBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderYellowBlackBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderYellowBlackBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
