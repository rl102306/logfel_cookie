import { TestBed } from '@angular/core/testing';

import { NlGuard } from './nl.guard';

describe('NlGuard', () => {
  let guard: NlGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NlGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
