import { TestBed } from '@angular/core/testing';

import { LogicalExpressionService } from './logical-expression-service';

describe('LogicalExpressionService', () => {
  let service: LogicalExpressionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogicalExpressionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
