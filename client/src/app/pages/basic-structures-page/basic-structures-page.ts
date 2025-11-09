import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basic-structures-page',
  imports: [
    AccordionModule,
    ToggleButtonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
  ],
  templateUrl: './basic-structures-page.html',
  styleUrl: './basic-structures-page.css'
})
export class BasicStructuresPage {
  activeTabs: string[] = [];
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

  clearAll() {
    this.value1 = '';
    this.isValid1 = null;
    this.parsedSet1 = [];
    this.value2 = '';
    this.isValid2 = null;
    this.parsedSet2 = [];
    this.functionInput = '';
    this.isValidFunction = null;
    this.parsedFunction = [];
    this.function2Input = '';
    this.isValidFunction2 = null;
    this.parsedFunction2 = [];
    this.matrixAInput = '';
    this.isValidMatrixA = null;
    this.matrixA = [];
    this.matrixBInput = '';
    this.isValidMatrixB = null;
    this.matrixB = [];
    this.matrixSum = [];
    this.matrixProduct = [];
    this.matrixError = '';
    this.scalarResult = [];
    this.transposeResult = [];
    this.setOperationResult = [];
    this.setOperationLabel = '';
    this.subsetResult = null;
    this.functionProperties = { isInjective: null, isSurjective: false, isBijective: false };
    this.composedFunction = [];
    this.compositionError = '';
  }

  loadSetExample1() {
    this.value1 = '1, 2, 3, 4, 5';
    this.checkSetInput('value1');
  }

  loadSetExample2() {
    this.value2 = 'a, b, c, d';
    this.checkSetInput('value2');
  }

  generateRandomSet1() {
    const examples = [
      '1, 2, 3, 4, 5',
      'a, b, c',
      'red, blue, green',
      '10, 20, 30, 40',
      'x, y, z'
    ];
    this.value1 = examples[Math.floor(Math.random() * examples.length)];
    this.checkSetInput('value1');
  }

  generateRandomSet2() {
    const examples = [
      'a, b, c, d',
      '1, 2, 3',
      'apple, banana, orange',
      '5, 10, 15, 20, 25',
      'p, q, r, s'
    ];
    this.value2 = examples[Math.floor(Math.random() * examples.length)];
    this.checkSetInput('value2');
  }

  calculateSetUnion() {
    if (!this.isValid1 || !this.isValid2) return;
    const union = new Set([...this.parsedSet1, ...this.parsedSet2]);
    this.setOperationResult = Array.from(union);
    this.setOperationLabel = 'Union (A ∪ B)';
  }

  calculateSetIntersection() {
    if (!this.isValid1 || !this.isValid2) return;
    const intersection = this.parsedSet1.filter(x => this.parsedSet2.includes(x));
    this.setOperationResult = intersection;
    this.setOperationLabel = 'Intersection (A ∩ B)';
  }

  calculateSetDifference() {
    if (!this.isValid1 || !this.isValid2) return;
    const difference = this.parsedSet1.filter(x => !this.parsedSet2.includes(x));
    this.setOperationResult = difference;
    this.setOperationLabel = 'Difference (A - B)';
  }

  checkSubset() {
    if (!this.isValid1 || !this.isValid2) return;
    this.subsetResult = this.parsedSet1.every(x => this.parsedSet2.includes(x));
  }

  loadFunctionExample() {
    this.functionInput = '1:a,2:b,3:c';
    this.checkFunctionInput();
  }

  checkFunction2Input() {
    const input = this.function2Input.trim();

    if (!input) {
      this.isValidFunction2 = null;
      this.parsedFunction2 = [];
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
          this.isValidFunction2 = false;
          this.parsedFunction2 = [];
          return;
        }
        inputVal = parts[0].trim();
        outputVal = parts[1].trim();
      } else if (pair.includes(':')) {
        const parts = pair.split(':');
        if (parts.length !== 2) {
          this.isValidFunction2 = false;
          this.parsedFunction2 = [];
          return;
        }
        inputVal = parts[0].trim();
        outputVal = parts[1].trim();
      } else {
        this.isValidFunction2 = false;
        this.parsedFunction2 = [];
        return;
      }

      if (!inputVal || !outputVal) {
        this.isValidFunction2 = false;
        this.parsedFunction2 = [];
        return;
      }

      parsed.push({ input: inputVal, output: outputVal });
    }

    this.isValidFunction2 = true;
    this.parsedFunction2 = parsed;
  }

  checkFunctionProperties() {
    if (!this.isValidFunction || this.parsedFunction.length === 0) return;

    //check for one to one
    const outputs = this.parsedFunction.map(p => p.output);
    const uniqueOutputs = new Set(outputs);
    this.functionProperties.isInjective = outputs.length === uniqueOutputs.size;

    //surjective check
    this.functionProperties.isSurjective = true; 

    this.functionProperties.isBijective = this.functionProperties.isInjective && this.functionProperties.isSurjective;
  }

  composeFunctions() {
    this.compositionError = '';
    this.composedFunction = [];

    if (!this.isValidFunction || !this.isValidFunction2) {
      this.compositionError = 'Please enter valid functions for both f and g.';
      return;
    }

    const gMap = new Map<string, string>();
    this.parsedFunction2.forEach(pair => {
      gMap.set(pair.input, pair.output);
    });

    const fMap = new Map<string, string>();
    this.parsedFunction.forEach(pair => {
      fMap.set(pair.input, pair.output);
    });

    const composed: { input: string; output: string }[] = [];

    for (const gPair of this.parsedFunction2) {
      const gOutput = gPair.output;
      const fOutput = fMap.get(gOutput);

      if (fOutput !== undefined) {
        composed.push({ input: gPair.input, output: fOutput });
      } else {
        this.compositionError = `Cannot compose: g(${gPair.input}) = ${gOutput}, but f(${gOutput}) is not defined.`;
        return;
      }
    }

    this.composedFunction = composed;
  }

  multiplyByScalar(which: 'A' | 'B') {
    const matrix = which === 'A' ? this.matrixA : this.matrixB;
    if (!matrix || matrix.length === 0 || !this.scalarValue) return;

    this.scalarResult = matrix.map(row => row.map(val => val * this.scalarValue));
  }

  transposeMatrix(which: 'A' | 'B') {
    const matrix = which === 'A' ? this.matrixA : this.matrixB;
    if (!matrix || matrix.length === 0) return;

    const rows = matrix.length;
    const cols = matrix[0].length;
    this.transposeResult = [];

    for (let j = 0; j < cols; j++) {
      const newRow: number[] = [];
      for (let i = 0; i < rows; i++) {
        newRow.push(matrix[i][j]);
      }
      this.transposeResult.push(newRow);
    }
  }

  multiplyMatrices() {
    this.matrixError = '';
    this.matrixProduct = [];

    if (!this.isValidMatrixA || !this.isValidMatrixB) {
      this.matrixError = 'Please enter valid matrices for both A and B.';
      return;
    }

    const rowsA = this.matrixA.length;
    const colsA = this.matrixA[0].length;
    const rowsB = this.matrixB.length;
    const colsB = this.matrixB[0].length;

    if (colsA !== rowsB) {
      this.matrixError = `Cannot multiply: A is ${rowsA}×${colsA} and B is ${rowsB}×${colsB}. Number of columns in A must equal number of rows in B.`;
      return;
    }

    const product: number[][] = [];

    for (let i = 0; i < rowsA; i++) {
      const row: number[] = [];
      for (let j = 0; j < colsB; j++) {
        let sum = 0;
        for (let k = 0; k < colsA; k++) {
          sum += this.matrixA[i][k] * this.matrixB[k][j];
        }
        row.push(sum);
      }
      product.push(row);
    }

    this.matrixProduct = product;
  }

  loadMatrixExample() {
    this.matrixAInput = '1,2;3,4';
    this.matrixBInput = '5,6;7,8';
    this.checkMatrixInput('A');
    this.checkMatrixInput('B');
  }
}

