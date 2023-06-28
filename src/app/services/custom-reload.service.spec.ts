import { TestBed } from '@angular/core/testing';

import { CustomReloadService } from './custom-reload.service';

describe('CustomReloadService', () => {
  let service: CustomReloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomReloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
