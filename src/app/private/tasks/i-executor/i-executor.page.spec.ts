import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IExecutorPage } from './i-executor.page';

describe('IExecutorPage', () => {
  let component: IExecutorPage;
  let fixture: ComponentFixture<IExecutorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IExecutorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IExecutorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
