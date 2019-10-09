import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonsetupComponent } from './seasonsetup.component';

describe('SeasonsetupComponent', () => {
  let component: SeasonsetupComponent;
  let fixture: ComponentFixture<SeasonsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
