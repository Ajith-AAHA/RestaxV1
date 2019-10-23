import { TestBed } from '@angular/core/testing';

import { DepartmentdataService } from './departmentdata.service';

describe('DepartmentdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartmentdataService = TestBed.get(DepartmentdataService);
    expect(service).toBeTruthy();
  });
});
