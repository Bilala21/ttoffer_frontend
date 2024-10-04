import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedCarouselComponent } from './related-carousel.component';

describe('RelatedCarouselComponent', () => {
  let component: RelatedCarouselComponent;
  let fixture: ComponentFixture<RelatedCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatedCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
