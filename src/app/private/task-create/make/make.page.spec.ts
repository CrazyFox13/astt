import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePage } from './make.page';

describe('MakePage', () => {
  let component: MakePage;
  let fixture: ComponentFixture<MakePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
