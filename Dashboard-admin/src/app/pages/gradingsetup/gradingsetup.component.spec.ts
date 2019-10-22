import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradingsetupComponent } from './gradingsetup.component';

describe('GradingsetupComponent', () => {
  let component: GradingsetupComponent;
  let fixture: ComponentFixture<GradingsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradingsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradingsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
