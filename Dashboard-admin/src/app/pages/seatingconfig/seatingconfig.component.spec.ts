import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatingconfigComponent } from './seatingconfig.component';

describe('SeatingconfigComponent', () => {
  let component: SeatingconfigComponent;
  let fixture: ComponentFixture<SeatingconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatingconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatingconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
