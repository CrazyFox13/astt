import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskResponseAddPage } from './task-response-add.page';

describe('TaskResponseAddPage', () => {
  let component: TaskResponseAddPage;
  let fixture: ComponentFixture<TaskResponseAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskResponseAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskResponseAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
