import { TestBed } from '@angular/core/testing';

import { FiltrarServiceDesde } from './filtrarDesde.service';

describe('FiltrarServiceDesde', () => {
  let service: FiltrarServiceDesde;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltrarServiceDesde);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
