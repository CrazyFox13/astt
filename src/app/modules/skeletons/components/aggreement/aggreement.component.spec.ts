import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggreementComponent } from './aggreement.component';

describe('AggreementComponent', () => {
  let component: AggreementComponent;
  let fixture: ComponentFixture<AggreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggreementComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
