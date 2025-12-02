import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruthTableSolver } from './truth-table-solver';

describe('TruthTableSolver', () => {
  let component: TruthTableSolver;
  let fixture: ComponentFixture<TruthTableSolver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruthTableSolver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruthTableSolver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
