import { TestBed } from '@angular/core/testing';

import { HardwareComponentsService } from './hardware-components.service';

describe('HardwareComponentsService', () => {
  let service: HardwareComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardwareComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
