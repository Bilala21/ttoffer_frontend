import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderGrayLinksComponent } from './header-gray-links.component';

describe('HeaderGrayLinksComponent', () => {
  let component: HeaderGrayLinksComponent;
  let fixture: ComponentFixture<HeaderGrayLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderGrayLinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderGrayLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
