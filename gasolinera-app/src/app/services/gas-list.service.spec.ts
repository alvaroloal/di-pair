import { TestBed } from '@angular/core/testing';

import { GasListService } from './gas-list.service';

describe('GasListService', () => {
  let service: GasListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GasListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
