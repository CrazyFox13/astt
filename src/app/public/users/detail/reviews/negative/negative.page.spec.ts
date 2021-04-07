import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegativePage } from './negative.page';

describe('NegativePage', () => {
  let component: NegativePage;
  let fixture: ComponentFixture<NegativePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegativePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegativePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
