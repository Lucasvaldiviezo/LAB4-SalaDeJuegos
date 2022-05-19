import { TestBed } from '@angular/core/testing';

import { GuardianAutentificadorGuard } from './guardian-autentificador.guard';

describe('GuardianAutentificadorGuard', () => {
  let guard: GuardianAutentificadorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardianAutentificadorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
