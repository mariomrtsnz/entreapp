import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSuperCategoriesComponent } from './list-supercategories.component';

describe('ListSuperCategoriesComponent', () => {
  let component: ListSuperCategoriesComponent;
  let fixture: ComponentFixture<ListSuperCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSuperCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSuperCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
