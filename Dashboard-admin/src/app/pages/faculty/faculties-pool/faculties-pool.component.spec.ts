import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultiesPoolComponent } from './faculties-pool.component';

describe('FacultiesPoolComponent', () => {
  let component: FacultiesPoolComponent;
  let fixture: ComponentFixture<FacultiesPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultiesPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultiesPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
