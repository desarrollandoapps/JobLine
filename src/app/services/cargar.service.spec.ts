import { TestBed } from '@angular/core/testing';

import { CargarService } from './cargar.service';

describe('CargarService', () => {
  let service: CargarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
