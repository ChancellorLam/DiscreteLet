import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { QuizComponent } from '../../shared/quiz-template/quiz-template';

@Component({
  selector: 'app-basic-structures-page',
  imports: [
    AccordionModule,
    ToggleButtonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    TabsModule,
    QuizComponent
  ],
  templateUrl: './basic-structures-page.html',
  styleUrl: './basic-structures-page.css'
})
export class BasicStructuresPage {
  activeTabs: string[] = [];
  activeTab = '0';
  isExpanded = false;

  value1 = '';
  isValid1: boolean | null = null;
  parsedSet1: string[] = [];

  value2 = '';
  isValid2: boolean | null = null;
  parsedSet2: string[] = [];

  functionInput = '';
  isValidFunction: boolean | null = null;
  parsedFunction: { input: string; output: string }[] = [];

  function2Input = '';
  isValidFunction2: boolean | null = null;
  parsedFunction2: { input: string; output: string }[] = [];

  functionProperties = {
    isInjective: null as boolean | null,
    isSurjective: false,
    isBijective: false
  };

  composedFunction: { input: string; output: string }[] = [];
  compositionError = '';

  matrixAInput = '';
  isValidMatrixA: boolean | null = null;
  matrixA: number[][] = [];

  matrixBInput = '';
  isValidMatrixB: boolean | null = null;
  matrixB: number[][] = [];

  matrixSum: number[][] = [];
  matrixProduct: number[][] = [];
  matrixError = '';

  scalarValue = 1;
  scalarResult: number[][] = [];
  transposeResult: number[][] = [];

  setOperationResult: string[] = [];
  setOperationLabel = '';
  subsetResult: boolean | null = null;

  checkSetInput(which: 'value1' | 'value2') {
    const valueKey = which;
    const validKey = which === 'value1' ? 'isValid1' : 'isValid2';
    const parsedKey = which === 'value1' ? 'parsedSet1' : 'parsedSet2';

    let input = this[valueKey].trim();

    if (!input) {
      this[validKey] = null;
      this[parsedKey] = [];
      return;
    }

    if (input.startsWith('{') && input.endsWith('}')) {
      input = input.slice(1, -1).trim();
    }

    const pattern = /^[A-Za-z0-9]+(\s*,\s*[A-Za-z0-9]+)*$/;

    if (!pattern.test(input)) {
      this[validKey] = false;
      this[parsedKey] = [];
      return;
    }

    const elements = input
      .split(',')
      .map(e => e.trim())
      .filter(e => e !== '');

    const uniqueElements = new Set(elements);

    if (elements.length !== uniqueElements.size) {
      this[validKey] = false;
      this[parsedKey] = [];
      return;
    }

    this[validKey] = true;
    this[parsedKey] = Array.from(uniqueElements);
  }

  checkFunctionInput() {
    const input = this.functionInput.trim();

    if (!input) {
      this.isValidFunction = null;
      this.parsedFunction = [];
      return;
    }

    const pairs = input.split(',').map(p => p.trim());

    const parsed: { input: string; output: string }[] = [];

    for (const pair of pairs) {
      let inputVal = '';
      let outputVal = '';

      if (pair.includes('->')) {
        const parts = pair.split('->');
        if (parts.length !== 2) {
          this.isValidFunction = false;
          this.parsedFunction = [];
          return;
        }
        inputVal = parts[0].trim();
        outputVal = parts[1].trim();
      } else if (pair.includes(':')) {
        const parts = pair.split(':');
        if (parts.length !== 2) {
          this.isValidFunction = false;
          this.parsedFunction = [];
          return;
        }
        inputVal = parts[0].trim();
        outputVal = parts[1].trim();
      } else {
        this.isValidFunction = false;
        this.parsedFunction = [];
        return;
      }

      if (!inputVal || !outputVal) {
        this.isValidFunction = false;
        this.parsedFunction = [];
        return;
      }

      parsed.push({ input: inputVal, output: outputVal });
    }

    this.isValidFunction = true;
    this.parsedFunction = parsed;
  }

  checkMatrixInput(which: 'A' | 'B') {
    const inputKey = which === 'A' ? 'matrixAInput' : 'matrixBInput';
    const validKey = which === 'A' ? 'isValidMatrixA' : 'isValidMatrixB';
    const matrixKey = which === 'A' ? 'matrixA' : 'matrixB';

    const input = this[inputKey].trim();

    if (!input) {
      this[validKey] = null;
      this[matrixKey] = [];
      return;
    }

    const rows = input.split(';').map(r => r.trim());

    if (rows.length === 0) {
      this[validKey] = false;
      this[matrixKey] = [];
      return;
    }

    const matrix: number[][] = [];
    let numCols = -1;

    for (const row of rows) {
      const elements = row.split(',').map(e => e.trim());

      if (numCols === -1) {
        numCols = elements.length;
      } else if (elements.length !== numCols) {
        this[validKey] = false;
        this[matrixKey] = [];
        return;
      }

      const numRow: number[] = [];
      for (const elem of elements) {
        const num = parseFloat(elem);
        if (isNaN(num)) {
          this[validKey] = false;
          this[matrixKey] = [];
          return;
        }
        numRow.push(num);
      }

      matrix.push(numRow);
    }

    this[validKey] = true;
    this[matrixKey] = matrix;
  }

  addMatrices() {
    this.matrixError = '';
    this.matrixSum = [];

    if (!this.isValidMatrixA || !this.isValidMatrixB) {
      this.matrixError = 'Please enter valid matrices for both A and B.';
      return;
    }

    if (this.matrixA.length !== this.matrixB.length) {
      this.matrixError = 'Matrices must have the same number of rows to be added.';
      return;
    }

    if (this.matrixA.length === 0 || this.matrixA[0].length !== this.matrixB[0].length) {
      this.matrixError = 'Matrices must have the same dimensions to be added.';
      return;
    }

    const sum: number[][] = [];

    for (let i = 0; i < this.matrixA.length; i++) {
      const row: number[] = [];
      for (let j = 0; j < this.matrixA[i].length; j++) {
        row.push(this.matrixA[i][j] + this.matrixB[i][j]);
      }
      sum.push(row);
    }

    this.matrixSum = sum;
  }

  toggleAll() {
    if (this.isExpanded) {
      this.collapseAll();
    } else {
      this.expandAll();
    }
    this.isExpanded = !this.isExpanded;
  }

  expandAll() {
    this.activeTabs = ['0', '1', '3', '4'];
  }

  collapseAll() {
    this.activeTabs = [];
  }
}
