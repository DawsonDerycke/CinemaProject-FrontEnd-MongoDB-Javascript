import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAddUserComponent } from './button-add-user.component';

describe('ButtonAddUserComponent', () => {
  let component: ButtonAddUserComponent;
  let fixture: ComponentFixture<ButtonAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonAddUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
