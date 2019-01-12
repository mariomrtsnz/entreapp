import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateUserComponent } from './dialog-create-user.component';

describe('DialogCreateUserComponent', () => {
  let component: DialogCreateUserComponent;
  let fixture: ComponentFixture<DialogCreateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCreateUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
