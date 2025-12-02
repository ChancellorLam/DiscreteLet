import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TruthTableSolver } from '../logic-page/truth-table-solver/truth-table-solver';

@Component({
  selector: 'app-primeng-test-page',
  imports: [TruthTableSolver],
  templateUrl: './primeng-test-page.html',
  styleUrl: './primeng-test-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'primeng-test-page' }
})
export class PrimengTestPage {

}
