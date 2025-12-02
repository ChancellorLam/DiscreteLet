import { Component, signal, input, inject } from '@angular/core';
import { Button } from "primeng/button";
import { InputText } from "primeng/inputtext";
import { FormsModule } from '@angular/forms';
import { LogicalExpressionService } from '../../../core/services/logical-expression-service';
import { TruthTable } from "../truth-table/truth-table";
import { LatexContainer } from '../../../shared/components/latex-container/latex-container';

@Component({
  selector: 'app-truth-table-solver',
  imports: [Button, InputText, FormsModule, TruthTable, LatexContainer],
  templateUrl: './truth-table-solver.html',
  styleUrl: './truth-table-solver.css'
})
export class TruthTableSolver {
  logicalExpressionService = inject(LogicalExpressionService);

  expression = signal<string>('');
  subExpressions = signal<string[]>([]);
  tableData = signal<Record<string, boolean>[]>([]);
  title = input<string>('');

  computeTruthTable() {
    const { subexpressions, table } = this.logicalExpressionService.generateTruthTable(this.expression());
    this.subExpressions.set(subexpressions);
    this.tableData.set(table);
  }

  addSymbol(symbol: string) {
    this.expression.set(this.expression() + symbol);
  }

  clearAll() {
    this.expression.set('');
  }
}
