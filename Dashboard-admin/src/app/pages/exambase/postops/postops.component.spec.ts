import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostopsComponent } from './postops.component';

describe('PostopsComponent', () => {
  let component: PostopsComponent;
  let fixture: ComponentFixture<PostopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
