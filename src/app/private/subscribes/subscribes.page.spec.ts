import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribesPage } from './subscribes.page';

describe('SubscribesPage', () => {
  let component: SubscribesPage;
  let fixture: ComponentFixture<SubscribesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
