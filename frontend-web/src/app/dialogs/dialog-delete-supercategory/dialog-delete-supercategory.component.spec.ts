import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteSuperCategoryComponent } from './dialog-delete-supercategory.component';

describe('DialogDeleteCategoryComponent', () => {
  let component: DialogDeleteSuperCategoryComponent;
  let fixture: ComponentFixture<DialogDeleteSuperCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeleteSuperCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteSuperCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
