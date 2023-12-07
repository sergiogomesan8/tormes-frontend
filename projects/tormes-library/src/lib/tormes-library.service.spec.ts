import { TestBed } from '@angular/core/testing';

import { TormesLibraryService } from './tormes-library.service';

describe('TormesLibraryService', () => {
  let service: TormesLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TormesLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
