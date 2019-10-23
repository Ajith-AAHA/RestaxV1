import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExambaseComponent } from './exambase.component';

describe('ExambaseComponent', () => {
  let component: ExambaseComponent;
  let fixture: ComponentFixture<ExambaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExambaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExambaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
