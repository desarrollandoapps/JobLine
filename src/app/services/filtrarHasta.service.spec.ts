import { TestBed } from '@angular/core/testing';

import { FiltrarServiceHasta } from './filtrarHasta.service';

describe('FiltrarServiceHasta', () => {
  let service: FiltrarServiceHasta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltrarServiceHasta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
