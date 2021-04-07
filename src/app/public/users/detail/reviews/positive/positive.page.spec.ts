import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositivePage } from './positive.page';

describe('PositivePage', () => {
  let component: PositivePage;
  let fixture: ComponentFixture<PositivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositivePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
