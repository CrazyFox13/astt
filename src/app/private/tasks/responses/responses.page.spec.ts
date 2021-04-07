import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsesPage } from './responses.page';

describe('ResponsesPage', () => {
  let component: ResponsesPage;
  let fixture: ComponentFixture<ResponsesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
