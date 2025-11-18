import { Component, computed, inject, input } from '@angular/core';
import {LogicalExpressionService} from '../../../core/services/logical-expression-service';
import {LatexContainer} from '../../../shared/components/latex-container/latex-container';

@Component({
  selector: 'app-truth-table',
  imports: [LatexContainer],
  templateUrl: './truth-table.html',
  styleUrl: './truth-table.css'
})
export class TruthTable {
  subexpressions = input<string[]>([]);
  tableData = input<Record<string, boolean>[]>([]);

}
