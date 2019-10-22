import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayopsComponent } from './dayops.component';

describe('DayopsComponent', () => {
  let component: DayopsComponent;
  let fixture: ComponentFixture<DayopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
