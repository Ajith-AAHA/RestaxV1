import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwtprofileComponent } from './pwtprofile.component';

describe('PwtprofileComponent', () => {
  let component: PwtprofileComponent;
  let fixture: ComponentFixture<PwtprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwtprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwtprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
