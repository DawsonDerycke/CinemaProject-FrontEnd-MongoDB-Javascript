import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRatingsComponent } from './crud-ratings.component';

describe('CrudRatingsComponent', () => {
  let component: CrudRatingsComponent;
  let fixture: ComponentFixture<CrudRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudRatingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
