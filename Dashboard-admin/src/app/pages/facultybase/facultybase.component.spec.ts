import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultybaseComponent } from './facultybase.component';

describe('FacultybaseComponent', () => {
  let component: FacultybaseComponent;
  let fixture: ComponentFixture<FacultybaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultybaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultybaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
