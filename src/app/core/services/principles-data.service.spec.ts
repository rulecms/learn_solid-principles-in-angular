import { TestBed } from '@angular/core/testing';

import { PrinciplesDataService } from './principles-data.service';

describe('PrinciplesDataService', () => {
  let service: PrinciplesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrinciplesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
