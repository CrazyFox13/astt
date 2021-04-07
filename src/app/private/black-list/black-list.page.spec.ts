import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackListPage } from './black-list.page';

describe('BlackListPage', () => {
  let component: BlackListPage;
  let fixture: ComponentFixture<BlackListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlackListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
