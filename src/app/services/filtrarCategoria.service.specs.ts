import { TestBed } from '@angular/core/testing';

import { FiltrarServiceCategoria } from './filtrarCategoria.service';

describe('FiltrarServiceCategoria', () => {
  let service: FiltrarServiceCategoria;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltrarServiceCategoria);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
