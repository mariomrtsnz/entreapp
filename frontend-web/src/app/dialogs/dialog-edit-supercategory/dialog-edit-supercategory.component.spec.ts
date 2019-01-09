import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditSupercategoriaComponent } from './dialog-edit-supercategory.component';

describe('DialogEditSupercategoriaComponent', () => {
  let component: DialogEditSupercategoriaComponent;
  let fixture: ComponentFixture<DialogEditSupercategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditSupercategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditSupercategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
