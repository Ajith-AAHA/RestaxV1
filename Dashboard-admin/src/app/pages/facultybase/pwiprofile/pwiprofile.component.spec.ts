import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwiprofileComponent } from './pwiprofile.component';

describe('PwiprofileComponent', () => {
  let component: PwiprofileComponent;
  let fixture: ComponentFixture<PwiprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwiprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwiprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
