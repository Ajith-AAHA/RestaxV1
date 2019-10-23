import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreopsComponent } from './preops.component';

describe('PreopsComponent', () => {
  let component: PreopsComponent;
  let fixture: ComponentFixture<PreopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
