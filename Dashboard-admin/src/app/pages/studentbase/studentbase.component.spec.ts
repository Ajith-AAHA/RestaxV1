import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentbaseComponent } from './studentbase.component';

describe('StudentbaseComponent', () => {
  let component: StudentbaseComponent;
  let fixture: ComponentFixture<StudentbaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentbaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
