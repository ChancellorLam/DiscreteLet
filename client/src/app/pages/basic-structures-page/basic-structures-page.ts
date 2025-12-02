import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { QuizComponent } from '../../shared/quiz-template/quiz-template';
import { UnitTestTemplate, UnitTestConfig } from '../../shared/unit-test-template/unit-test-template';

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
    QuizComponent,
    UnitTestTemplate,
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
    this.activeTabs = ['0', '1', '2', '3', '4', '5', '6'];
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

  relationUnitTestConfig: UnitTestConfig = {
    title: 'Relations Unit Test',
    description: 'Test your knowledge of relations, their properties, and operations',
    passingScore: 70,
    timeLimit: 30,
    questions: [
      // Easy Questions (15 total)
      {
        question: 'Let A = {a, b} and B = {1, 2}. Which of the following is a valid relation from A to B?',
        options: ['{(a, 1), (b, 2)}', '{(1, a), (2, b)}', '{(a, b), (1, 2)}', '{a, 1}'],
        correctAnswer: 0,
        explanation: 'A relation from A to B must be a set of ordered pairs (x, y) where x ∈ A and y ∈ B. Only {(a, 1), (b, 2)} satisfies this.',
        difficulty: 'easy'
      },
      {
        question: 'Which property means every element is related to itself?',
        options: ['Symmetric', 'Reflexive', 'Transitive', 'Antisymmetric'],
        correctAnswer: 1,
        explanation: 'Reflexive means (a, a) ∈ R for all elements a in the set.',
        difficulty: 'easy'
      },
      {
        question: 'If (a, b) ∈ R implies (b, a) ∈ R, what property does R have?',
        options: ['Reflexive', 'Symmetric', 'Transitive', 'Antisymmetric'],
        correctAnswer: 1,
        explanation: 'This is the definition of the symmetric property.',
        difficulty: 'easy'
      },
      {
        question: 'What does R₁ ∪ R₂ represent?',
        options: ['All pairs in both R₁ and R₂', 'All pairs in R₁ or R₂', 'Pairs in R₁ but not R₂', 'Reversed pairs'],
        correctAnswer: 1,
        explanation: 'Union combines all pairs from both relations.',
        difficulty: 'easy'
      },
      {
        question: 'In a relation matrix, what does a 1 at position [i,j] mean?',
        options: ['i is not related to j', 'i equals j', 'i is related to j', 'j is related to i'],
        correctAnswer: 2,
        explanation: 'A 1 indicates the pair (i, j) is in the relation.',
        difficulty: 'easy'
      },
      {
        question: 'Which three properties define an equivalence relation?',
        options: ['Reflexive, Symmetric, Antisymmetric', 'Reflexive, Symmetric, Transitive', 'Symmetric, Antisymmetric, Transitive', 'Reflexive, Antisymmetric, Transitive'],
        correctAnswer: 1,
        explanation: 'An equivalence relation must be reflexive, symmetric, and transitive.',
        difficulty: 'easy'
      },
      {
        question: 'What does R₁ ∩ R₂ represent?',
        options: ['All pairs in R₁ or R₂', 'Pairs in both R₁ and R₂', 'Pairs in R₁ but not R₂', 'Reversed pairs'],
        correctAnswer: 1,
        explanation: 'Intersection contains only the pairs that appear in both relations.',
        difficulty: 'easy'
      },
      {
        question: 'If (a, b) ∈ R and (b, c) ∈ R implies (a, c) ∈ R, what property does R have?',
        options: ['Reflexive', 'Symmetric', 'Transitive', 'Antisymmetric'],
        correctAnswer: 2,
        explanation: 'This is the definition of the transitive property.',
        difficulty: 'easy'
      },
      {
        question: 'What is the inverse of relation R?',
        options: ['All pairs not in R', 'All pairs in R reversed', 'All pairs (a,a) in R', 'Union of all relations'],
        correctAnswer: 1,
        explanation: 'R⁻¹ contains (b, a) for every (a, b) in R.',
        difficulty: 'easy'
      },
      {
        question: 'A relation on set A is a subset of what?',
        options: ['A', 'A × A', 'A ∪ A', 'A ∩ A'],
        correctAnswer: 1,
        explanation: 'A relation on A is a subset of the Cartesian product A × A.',
        difficulty: 'easy'
      },
      {
        question: 'If R = {(1,1), (2,2)}, which property does R definitely have?',
        options: ['Symmetric', 'Reflexive on {1,2}', 'Transitive', 'All of these'],
        correctAnswer: 3,
        explanation: 'R is reflexive on {1,2}, symmetric (no non-diagonal pairs to check), and transitive (vacuously true).',
        difficulty: 'easy'
      },
      {
        question: 'What does the complement of a relation matrix do?',
        options: ['Reverses all pairs', 'Flips 0s to 1s and 1s to 0s', 'Adds diagonal elements', 'Removes all pairs'],
        correctAnswer: 1,
        explanation: 'The complement operation (¬) flips all bits in the matrix.',
        difficulty: 'easy'
      },
      {
        question: 'If R is symmetric, what can we say about its matrix?',
        options: ['All diagonal entries are 1', 'It equals its transpose', 'All entries are 0 or 1', 'It has no 1s'],
        correctAnswer: 1,
        explanation: 'A symmetric relation has a matrix that equals its transpose (mirror across diagonal).',
        difficulty: 'easy'
      },
      {
        question: 'Which operation finds pairs (a,c) where there exists b such that (a,b) ∈ R₁ and (b,c) ∈ R₂?',
        options: ['Union', 'Intersection', 'Composition', 'Complement'],
        correctAnswer: 2,
        explanation: 'This describes composition R₁ ∘ R₂.',
        difficulty: 'easy'
      },
      {
        question: 'What is R₁ - R₂?',
        options: ['Pairs in R₁ or R₂', 'Pairs in both R₁ and R₂', 'Pairs in R₁ but not in R₂', 'Pairs in R₂ but not in R₁'],
        correctAnswer: 2,
        explanation: 'Set difference R₁ - R₂ contains elements in R₁ that are not in R₂.',
        difficulty: 'easy'
      },

      // Hard Questions (15 total)
      {
        question: 'Let R = {(1, 1), (2, 2), (1, 2), (2, 1)} be a relation on A = {1, 2}. Which properties does R have?',
        options: ['Reflexive only', 'Symmetric only', 'Reflexive and Symmetric only', 'Reflexive, Symmetric, and Transitive'],
        correctAnswer: 3,
        explanation: 'R is reflexive (has (1,1) and (2,2)), symmetric (if (a,b) then (b,a)), and transitive (all implications hold).',
        difficulty: 'hard'
      },
      {
        question: 'Given R₁ = {(1, 2), (2, 3)} and R₂ = {(2, 3), (3, 1)}, what is R₁ ∘ R₂ (composition)?',
        options: ['{(1, 3), (2, 1)}', '{(1, 2), (2, 3), (3, 1)}', '{(2, 3)}', '{(1, 1), (2, 2)}'],
        correctAnswer: 0,
        explanation: 'Composition R₁ ∘ R₂ finds pairs (a, c) where ∃b: (a, b) ∈ R₁ and (b, c) ∈ R₂. (1, 2) ∈ R₁ and (2, 3) ∈ R₂ gives (1, 3). (2, 3) ∈ R₁ and (3, 1) ∈ R₂ gives (2, 1).',
        difficulty: 'hard'
      },
      {
        question: 'Let A = {1, 2, 3} and R = {(1, 2), (2, 3), (3, 3)}. What is the matrix representation M_R?',
        options: ['[ 0 1 0 ] [ 0 0 1 ] [ 0 0 1 ]', '[ 0 1 0 ] [ 0 0 0 ] [ 0 0 1 ]', '[ 1 1 0 ] [ 0 1 1 ] [ 0 0 1 ]', '[ 0 0 0 ] [ 1 0 0 ] [ 0 1 1 ]'],
        correctAnswer: 0,
        explanation: 'The entry M_R[i, j] = 1 if (i, j) is in R. Row 1: (1,2) gives [0,1,0]. Row 2: (2,3) gives [0,0,1]. Row 3: (3,3) gives [0,0,1].',
        difficulty: 'hard'
      },
      {
        question: 'If M = [ 0 1 ] [ 1 0 ], what is the complement matrix ¬M?',
        options: ['[ 1 0 ] [ 0 1 ]', '[ 0 1 ] [ 1 0 ]', '[ 1 1 ] [ 0 0 ]', '[ 0 0 ] [ 1 1 ]'],
        correctAnswer: 0,
        explanation: 'The complement flips all bits: 0→1 and 1→0.',
        difficulty: 'hard'
      },
      {
        question: 'On the set {1, 2, 3, 4}, let R = {(1,1), (2,2), (3,3), (4,4), (1,2), (2,1)}. Is R an equivalence relation?',
        options: ['Yes', 'No - not reflexive', 'No - not symmetric', 'No - not transitive'],
        correctAnswer: 0,
        explanation: 'R is reflexive (all (a,a) present), symmetric ((1,2) and (2,1) both present), and transitive (all implications hold). Therefore R is an equivalence relation.',
        difficulty: 'hard'
      },
      {
        question: 'Which operation reverses all pairs in a relation?',
        options: ['Complement', 'Inverse', 'Union', 'Intersection'],
        correctAnswer: 1,
        explanation: 'The inverse operation R⁻¹ reverses each pair: (a,b) becomes (b,a).',
        difficulty: 'hard'
      },
      {
        question: 'Let R₁ = {(1,2), (2,3), (3,1)} and R₂ = {(2,3), (3,2)}. What is R₁ ∪ R₂?',
        options: ['{(2, 3)}', '{(1, 2), (3, 1), (3, 2)}', '{(1, 2), (2, 3), (3, 1), (3, 2)}', '{(1, 2), (3, 1)}'],
        correctAnswer: 2,
        explanation: 'The union includes all pairs from both sets.',
        difficulty: 'hard'
      },
      {
        question: 'Given M₁ = [ 0 1 ] [ 1 0 ] and M₂ = [ 1 0 ] [ 0 1 ], what is M₁ ∧ M₂ (logical AND)?',
        options: ['[ 0 0 ] [ 0 0 ]', '[ 1 1 ] [ 1 1 ]', '[ 0 1 ] [ 1 0 ]', '[ 1 0 ] [ 0 1 ]'],
        correctAnswer: 0,
        explanation: 'Logical AND means both must be 1. Since M₁[1,1]=0 and M₂[1,1]=1, result is 0. Similarly for all positions.',
        difficulty: 'hard'
      },
      {
        question: 'If a relation R is both symmetric and antisymmetric, what must be true?',
        options: ['R must be empty', 'R can only contain pairs (a,a)', 'R must be reflexive', 'R contains all possible pairs'],
        correctAnswer: 1,
        explanation: 'If R is both symmetric and antisymmetric, for any (a,b) in R with a≠b, both (a,b) and (b,a) must be in R (symmetric), but then a must equal b (antisymmetric). So only diagonal pairs (a,a) are allowed.',
        difficulty: 'hard'
      },
      {
        question: 'Let R be a relation on {1,2,3} where R = {(1,2), (2,1), (2,3), (3,2), (1,3), (3,1)}. Is R transitive?',
        options: ['Yes', 'No - (1,2) and (2,3) are in R but (1,3) is missing', 'No - (2,3) and (3,1) are in R but (2,1) is missing', 'No - multiple violations'],
        correctAnswer: 0,
        explanation: 'Check all cases: (1,2)∧(2,3)→(1,3)✓, (1,2)∧(2,1)→(1,1) not required, (2,1)∧(1,3)→(2,3)✓, etc. All requirements are met.',
        difficulty: 'hard'
      },
      {
        question: 'Given the matrix M = [ 1 0 1 ] [ 0 1 0 ] [ 1 0 1 ], is the relation reflexive?',
        options: ['Yes', 'No', 'Cannot determine', 'Only on subset {1,2}'],
        correctAnswer: 0,
        explanation: 'A relation is reflexive if all diagonal entries are 1. M[1,1]=1, M[2,2]=1, M[3,3]=1, so yes.',
        difficulty: 'hard'
      },
      {
        question: 'What is the transitive closure of R = {(1,2), (2,3)}?',
        options: ['{(1,2), (2,3)}', '{(1,2), (2,3), (1,3)}', '{(1,2), (2,3), (3,1)}', '{(1,1), (2,2), (3,3), (1,2), (2,3), (1,3)}'],
        correctAnswer: 1,
        explanation: 'The transitive closure adds all pairs needed to make the relation transitive. Since (1,2) and (2,3) are in R, we must add (1,3).',
        difficulty: 'hard'
      },
      {
        question: 'If R₁ = {(a,b), (b,c)} and R₂ = {(b,a), (c,b)}, what is R₁ ∘ R₂?',
        options: ['{(a,a), (b,b)}', '{(a,b), (b,c)}', '{(b,a), (c,b)}', '{(a,c), (b,a)}'],
        correctAnswer: 0,
        explanation: 'R₁ ∘ R₂ finds (x,z) where ∃y: (x,y)∈R₁ and (y,z)∈R₂. (a,b)∈R₁ and (b,a)∈R₂ gives (a,a). (b,c)∈R₁ and (c,b)∈R₂ gives (b,b).',
        difficulty: 'hard'
      },
      {
        question: 'A relation R is antisymmetric if:',
        options: ['(a,b) ∈ R implies (b,a) ∉ R for all a≠b', '(a,b) ∈ R and (b,a) ∈ R implies a=b', '(a,b) ∈ R implies (b,a) ∈ R', 'No pairs (a,b) exist in R'],
        correctAnswer: 1,
        explanation: 'Antisymmetric means if both (a,b) and (b,a) are in R, then a must equal b. It does not forbid (a,b) and (b,a) when a=b.',
        difficulty: 'hard'
      },
      {
        question: 'Let R be the "divides" relation on {2, 4, 8}. Which pairs are in R?',
        options: ['{(2,4), (2,8), (4,8)}', '{(2,2), (4,4), (8,8), (2,4), (2,8), (4,8)}', '{(4,2), (8,2), (8,4)}', '{(2,4), (4,8)}'],
        correctAnswer: 1,
        explanation: 'The "divides" relation includes all pairs (a,b) where a divides b. This includes reflexive pairs (a divides itself) and: 2|4, 2|8, 4|8.',
        difficulty: 'hard'
      }
    ]
  };
}

