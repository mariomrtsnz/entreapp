import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewSupercategoryComponent } from './dialog-new-supercategory.component';

describe('DialogNewSupercategoryComponent', () => {
  let component: DialogNewSupercategoryComponent;
  let fixture: ComponentFixture<DialogNewSupercategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNewSupercategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewSupercategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
