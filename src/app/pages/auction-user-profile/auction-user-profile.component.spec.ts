import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionUserProfileComponent } from './auction-user-profile.component';

describe('AuctionUserProfileComponent', () => {
  let component: AuctionUserProfileComponent;
  let fixture: ComponentFixture<AuctionUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionUserProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
