import { TestBed } from '@angular/core/testing';

import { SupercategoryService } from './supercategory.service';

describe('SupercategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupercategoryService = TestBed.get(SupercategoryService);
    expect(service).toBeTruthy();
  });
});
