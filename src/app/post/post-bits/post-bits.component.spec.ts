/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostBitsComponent } from './post-bits.component';

describe('PostBitsComponent', () => {
  let component: PostBitsComponent;
  let fixture: ComponentFixture<PostBitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostBitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
