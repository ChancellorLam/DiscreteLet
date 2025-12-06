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
    UnitTestTemplate
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

  discreteStructuresQuestions = [
  {
    text: 'Which of the following is a valid set?',
    options: ['{1, 2, 3}', '{1, {2, 3}}', 'Both A and B', 'Neither A nor B'],
    correct: 'Both A and B',
    explanation:
      'Both {1,2,3} and {1,{2,3}} follow the rules of set notation—sets can contain numbers or other sets.'
  },
  {
    text: 'A function f: A → B is injective if:',
    options: [
      'Every input has exactly one output',
      'Different inputs always map to different outputs',
      'Every element in B has a preimage',
      'The function has an inverse for every element'
    ],
    correct: 'Different inputs always map to different outputs',
    explanation:
      'Injective (one-to-one) means no two distinct elements in A map to the same element in B.'
  },
  {
    text: 'What does matrix multiplication require?',
    options: [
      'Same number of rows in both matrices',
      'Same number of columns in both matrices',
      'Columns in the first equal rows in the second',
      'Rows in the first equal rows in the second'
    ],
    correct: 'Columns in the first equal rows in the second',
    explanation:
      'Matrix multiplication AB is defined only when A has dimensions m×n and B has n×k.'
  },
  {
    text: 'A matrix is invertible only if:',
    options: [
      'Its determinant is zero',
      'Its determinant is nonzero',
      'It has more rows than columns',
      'It is symmetric'
    ],
    correct: 'Its determinant is nonzero',
    explanation:
      'A square matrix is invertible if and only if det(A) ≠ 0.'
  },
  {
    text: 'Which property must an equivalence relation satisfy?',
    options: ['Reflexive', 'Symmetric', 'Transitive', 'All of the above'],
    correct: 'All of the above',
    explanation:
      'Equivalence relations always satisfy all three: reflexive, symmetric, and transitive.'
  },
  {
    text: 'A function f: A → B is surjective if:',
    options: [
      'Every element of A has an output',
      'Different inputs produce different outputs',
      'Every element of B has a preimage in A',
      'The function is invertible'
    ],
    correct: 'Every element of B has a preimage in A',
    explanation:
      'Surjective (onto) functions cover the entire codomain B.'
  },
  {
    text: 'The determinant of a 2×2 matrix [[a, b], [c, d]] is:',
    options: ['a + d', 'ad − bc', 'ab + cd', 'ac − bd'],
    correct: 'ad − bc',
    explanation:
      'The determinant formula det(A) = ad − bc helps determine invertibility.'
  }
];

discreteStructuresUnitTestConfig: UnitTestConfig = {
  title: 'Basic Structures, Functions, and Matrices Unit Test',
  description: 'Evaluate your understanding of sets, relations, functions, matrix operations, and determinants.',
  passingScore: 70,
  timeLimit: 30,
  questions: [

    // -------------------------------
    // EASY QUESTIONS (15)
    // -------------------------------
    {
      question: 'Which of the following represents a valid set?',
      options: ['{1,2,3}', '{1,{2,3}}', 'Both', 'Neither'],
      correctAnswer: 2,
      explanation: 'Sets may contain numbers or other sets; both are valid.',
      difficulty: 'easy'
    },
    {
      question: 'A function is defined as:',
      options: [
        'A rule assigning each input to many outputs',
        'A rule assigning each input to exactly one output',
        'A rule assigning outputs only to some inputs',
        'A relation with no ordered pairs'
      ],
      correctAnswer: 1,
      explanation: 'A function assigns exactly one output to each input.',
      difficulty: 'easy'
    },
    {
      question: 'A function f: A → B is injective if:',
      options: [
        'Different inputs map to different outputs',
        'Every element in B has a preimage',
        'f has an inverse',
        'It is symmetric'
      ],
      correctAnswer: 0,
      explanation: 'Injective means no two inputs share the same output.',
      difficulty: 'easy'
    },
    {
      question: 'A function f: A → B is surjective if:',
      options: [
        'Every element of B has a preimage',
        'Different inputs map to different outputs',
        'A contains B',
        'f is symmetric'
      ],
      correctAnswer: 0,
      explanation: 'Surjectivity means f covers the entire codomain.',
      difficulty: 'easy'
    },
    {
      question: 'Which three properties define an equivalence relation?',
      options: [
        'Reflexive, Symmetric, Transitive',
        'Symmetric, Antisymmetric, Transitive',
        'Symmetric, Transitive, Bijective',
        'Reflexive, Transitive, Injective'
      ],
      correctAnswer: 0,
      explanation: 'Equivalence relations require all three: reflexive, symmetric, and transitive.',
      difficulty: 'easy'
    },
    {
      question: 'If A has 3 elements and B has 4, how many functions f: A → B exist?',
      options: ['3', '4', '12', '64'],
      correctAnswer: 3,
      explanation: 'Each of 3 inputs has 4 choices: 4³ = 64.',
      difficulty: 'easy'
    },
    {
      question: 'Matrix multiplication AB is defined only if:',
      options: [
        'A has the same number of rows as B',
        'A has the same number of columns as B',
        'Columns of A = rows of B',
        'Rows of A = columns of B'
      ],
      correctAnswer: 2,
      explanation: 'AB exists only if A is m×n and B is n×k.',
      difficulty: 'easy'
    },
    {
      question: 'The determinant of [[a, b], [c, d]] is:',
      options: ['ab + cd', 'ac − bd', 'ad − bc', 'a + d'],
      correctAnswer: 2,
      explanation: 'det(A) = ad − bc.',
      difficulty: 'easy'
    },
    {
      question: 'A matrix is invertible only if its determinant is:',
      options: ['0', '1', 'positive', 'nonzero'],
      correctAnswer: 3,
      explanation: 'det(A) ≠ 0 is required for invertibility.',
      difficulty: 'easy'
    },
    {
      question: 'Which of the following is a 3×2 matrix?',
      options: ['[[1,2,3],[4,5,6]]', '[[1,2],[3,4],[5,6]]', '[[1],[2],[3]]', '[[1,2]]'],
      correctAnswer: 1,
      explanation: 'It has 3 rows and 2 columns.',
      difficulty: 'easy'
    },
    {
      question: 'If f is bijective, what can be said?',
      options: [
        'f is injective only',
        'f is surjective only',
        'f is both injective and surjective',
        'f has no inverse'
      ],
      correctAnswer: 2,
      explanation: 'Bijective = injective + surjective.',
      difficulty: 'easy'
    },
    {
      question: 'The identity matrix I has the property:',
      options: ['I² = 0', 'IA = A', 'IA = 0', 'A + I = 0'],
      correctAnswer: 1,
      explanation: 'Multiplying by the identity leaves A unchanged.',
      difficulty: 'easy'
    },
    {
      question: 'Which of these is always true for sets?',
      options: ['A ⊆ A', 'A ⊂ A', 'A ∩ A = ∅', 'A ∪ A = ∅'],
      correctAnswer: 0,
      explanation: 'Every set is a subset of itself.',
      difficulty: 'easy'
    },
    {
      question: 'The inverse of a bijection f: A → B is:',
      options: [
        'A function B → A',
        'Not a function',
        'A constant function',
        'A relation but not a function'
      ],
      correctAnswer: 0,
      explanation: 'A bijection guarantees a well-defined inverse.',
      difficulty: 'easy'
    },
    {
      question: 'The rank of a matrix refers to:',
      options: [
        'Number of rows',
        'Number of columns',
        'Number of pivot positions',
        'Its determinant'
      ],
      correctAnswer: 2,
      explanation: 'Rank = number of linearly independent rows/columns.',
      difficulty: 'easy'
    },

    // -------------------------------
    // HARD QUESTIONS (15)
    // -------------------------------
    {
      question: 'How many bijections exist from a set with n elements to itself?',
      options: ['n', 'n²', '2ⁿ', 'n!'],
      correctAnswer: 3,
      explanation: 'The number of bijections (permutations) of an n-element set is n!.',
      difficulty: 'hard'
    },
    {
      question: 'If f: A → B and g: B → C are bijections, what is true about g ○ f?',
      options: ['Always injective', 'Always surjective', 'Always bijective', 'Not necessarily a function'],
      correctAnswer: 2,
      explanation: 'Composition of bijections is a bijection.',
      difficulty: 'hard'
    },
    {
      question: 'The inverse of a product of matrices satisfies:',
      options: ['(AB)⁻¹ = A⁻¹B⁻¹', '(AB)⁻¹ = B⁻¹A⁻¹', 'A⁻¹ must equal B', 'Only true for symmetric matrices'],
      correctAnswer: 1,
      explanation: '(AB)⁻¹ = B⁻¹A⁻¹ for all invertible matrices A and B.',
      difficulty: 'hard'
    },
    {
      question: 'What is the determinant of a triangular matrix?',
      options: ['Always 0', 'Always 1', 'Product of diagonal entries', 'Sum of diagonal entries'],
      correctAnswer: 2,
      explanation: 'Triangular matrices have determinant equal to the product of diagonal values.',
      difficulty: 'hard'
    },
    {
      question: 'If A is a 3×3 matrix and rank(A) = 2, what can be concluded?',
      options: ['A is invertible', 'A has determinant 0', 'A is symmetric', 'A has no nullspace'],
      correctAnswer: 1,
      explanation: 'Rank < n implies det(A) = 0 and A is singular.',
      difficulty: 'hard'
    },
    {
      question: 'How many relations on a set of size n exist?',
      options: ['n', 'n²', '2ⁿ', '2^(n²)'],
      correctAnswer: 3,
      explanation: 'Each ordered pair can be included/excluded independently → 2^(n²).',
      difficulty: 'hard'
    },
    {
      question: 'A function f: A → B has a left inverse only if:',
      options: ['f is injective', 'f is surjective', 'f is bijective', 'f is constant'],
      correctAnswer: 0,
      explanation: 'Left inverses exist only for injective functions.',
      difficulty: 'hard'
    },
    {
      question: 'A function f: A → B has a right inverse only if:',
      options: ['f is injective', 'f is surjective', 'f is bijective', 'f is constant'],
      correctAnswer: 1,
      explanation: 'Right inverses require surjectivity.',
      difficulty: 'hard'
    },
    {
      question: 'If A is invertible, the solution to Ax = b is:',
      options: ['x = bA', 'x = A + b', 'x = A⁻¹b', 'No solution'],
      correctAnswer: 2,
      explanation: 'Multiply both sides by A⁻¹: x = A⁻¹b.',
      difficulty: 'hard'
    },
    {
      question: 'Which of the following is true for a linear transformation T(x) = Ax?',
      options: [
        'T preserves addition only',
        'T preserves scalar multiplication only',
        'T preserves both addition and scalar multiplication',
        'T preserves nothing'
      ],
      correctAnswer: 2,
      explanation: 'Linear transformations satisfy T(x + y) = T(x) + T(y) and T(cx) = cT(x).',
      difficulty: 'hard'
    },
    {
      question: 'If A is 4×4 and det(A)=5, what is det(3A)?',
      options: ['15', '243', '3⁴ · 5', '3 · 5'],
      correctAnswer: 2,
      explanation: 'det(kA) = kⁿ det(A), so det(3A) = 3⁴ × 5.',
      difficulty: 'hard'
    },
    {
      question: 'What is the rank of the identity matrix Iₙ?',
      options: ['0', '1', 'n', 'n²'],
      correctAnswer: 2,
      explanation: 'The identity matrix has n pivot positions.',
      difficulty: 'hard'
    },
    {
      question: 'If A is symmetric (Aᵀ = A), which statement is true?',
      options: ['A is invertible', 'A is diagonal', 'A has real eigenvalues', 'A is always orthogonal'],
      correctAnswer: 2,
      explanation: 'Real symmetric matrices always have real eigenvalues.',
      difficulty: 'hard'
    },
    {
      question: 'For sets A and B, the number of functions A → B equals:',
      options: ['|A| × |B|', '(|A| + |B|)!', '|B|^|A|', '2^(|A||B|)'],
      correctAnswer: 2,
      explanation: 'Each of |A| elements chooses from |B| outputs: |B|^|A|.',
      difficulty: 'hard'
    },
    {
      question: 'If A is invertible, what is det(A⁻¹)?',
      options: ['det(A)', '1/det(A)', 'det(A)²', '0'],
      correctAnswer: 1,
      explanation: 'det(A⁻¹) = 1/det(A).',
      difficulty: 'hard'
    }
  ]
};

}

