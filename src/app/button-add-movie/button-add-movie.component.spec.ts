import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAddMovieComponent } from './button-add-movie.component';

describe('ButtonAddMovieComponent', () => {
  let component: ButtonAddMovieComponent;
  let fixture: ComponentFixture<ButtonAddMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonAddMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
