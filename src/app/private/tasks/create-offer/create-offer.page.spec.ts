import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOfferPage } from './create-offer.page';

describe('CreateOfferPage', () => {
  let component: CreateOfferPage;
  let fixture: ComponentFixture<CreateOfferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOfferPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
