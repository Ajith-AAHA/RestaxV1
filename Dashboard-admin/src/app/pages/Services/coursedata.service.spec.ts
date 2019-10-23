import { TestBed } from '@angular/core/testing';

import { CoursedataService } from './coursedata.service';

describe('CoursedataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoursedataService = TestBed.get(CoursedataService);
    expect(service).toBeTruthy();
  });
});
