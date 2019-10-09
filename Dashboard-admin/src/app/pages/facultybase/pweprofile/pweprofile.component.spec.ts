import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PweprofileComponent } from './pweprofile.component';

describe('PweprofileComponent', () => {
  let component: PweprofileComponent;
  let fixture: ComponentFixture<PweprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PweprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PweprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
