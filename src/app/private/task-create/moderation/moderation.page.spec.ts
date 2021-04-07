import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerationPage } from './moderation.page';

describe('ModerationPage', () => {
  let component: ModerationPage;
  let fixture: ComponentFixture<ModerationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModerationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModerationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
