import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeutralPage } from './neutral.page';

describe('NeutralPage', () => {
  let component: NeutralPage;
  let fixture: ComponentFixture<NeutralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeutralPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeutralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
