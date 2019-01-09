import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewCategoryComponent } from './dialog-new-category.component';

describe('DialogNewCategoryComponent', () => {
  let component: DialogNewCategoryComponent;
  let fixture: ComponentFixture<DialogNewCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNewCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
