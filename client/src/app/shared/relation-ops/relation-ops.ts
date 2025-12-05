import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Type alias for ordered pairs of numbers
type Pair = [number, number];

@Component({
  selector: 'app-relation-ops',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './relation-ops.html',
  styleUrls: ['./relation-ops.css']
})
export class RelationOps {

  // The set A that both relations are defined on
  A = [1, 2, 3];

  // First relation as array of ordered pairs
  R1: Pair[] = [
    [1, 2],
    [2, 3],
    [3, 1]
  ];

  // Second relation as array of ordered pairs
  R2: Pair[] = [
    [2, 3],
    [3, 1],
    [3, 2]
  ];

  // Matrix representation of R1 (M1[i][j] = 1 if (i+1, j+1) ∈ R1)
  M1 = [
    [0, 1, 0],
    [0, 0, 1],
    [1, 0, 0]
  ];

  // Matrix representation of R2 (M2[i][j] = 1 if (i+1, j+1) ∈ R2)
  M2 = [
    [0, 0, 0],
    [0, 0, 1],
    [0, 1, 0]
  ];

  // Currently selected operation (bound to UI)
  operation = 'union';

  // Helper functions for pair comparison
  // Convert pair to string for use as Set key
  private pairToString(pair: Pair): string {
    return `${pair[0]},${pair[1]}`;
  }

  // Convert string back to pair
  private stringToPair(str: string): Pair {
    const [a, b] = str.split(',').map(Number);
    return [a, b];
  }

  // Check if two pairs are equal
  private pairsEqual(p1: Pair, p2: Pair): boolean {
    return p1[0] === p2[0] && p1[1] === p2[1];
  }

  // Remove duplicate pairs from array
  private removeDuplicatePairs(pairs: Pair[]): Pair[] {
    const seen = new Set<string>();
    return pairs.filter(pair => {
      const key = this.pairToString(pair);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  // Ordered Pair Operations
  // Union: R1 ∪ R2 - all pairs in either R1 or R2
  union(): Pair[] {
    const set = new Set(this.R1.map(p => this.pairToString(p)));
    this.R2.forEach(p => set.add(this.pairToString(p)));
    return Array.from(set).map(s => this.stringToPair(s));
  }

  // Intersection: R1 ∩ R2 - pairs in both R1 and R2
  intersection(): Pair[] {
    const s2 = new Set(this.R2.map(p => this.pairToString(p)));
    return this.R1.filter(p => s2.has(this.pairToString(p)));
  }

  // Difference: R1 - R2 - pairs in R1 but not in R2
  difference(): Pair[] {
    const s2 = new Set(this.R2.map(p => this.pairToString(p)));
    return this.R1.filter(p => !s2.has(this.pairToString(p)));
  }

  // Inverse: R⁻¹ - reverse all pairs (a,b) becomes (b,a)
  inverse(R: Pair[]): Pair[] {
    return R.map(([a, b]) => [b, a] as Pair);
  }

  // Composition: Ra ∘ Rb - pairs (a,c) where ∃b: (a,b) ∈ Ra and (b,c) ∈ Rb
  composition(Ra: Pair[], Rb: Pair[]): Pair[] {
    const result: Pair[] = [];

    // For each pair (a,b) in Ra
    for (const [a, b] of Ra) {
      // For each pair (x,c) in Rb
      for (const [x, c] of Rb) {
        // If b equals x, we can compose to get (a,c)
        if (b === x) result.push([a, c]);
      }
    }

    // Remove any duplicate pairs created
    return this.removeDuplicatePairs(result);
  }

  // Matrix Operations
  // Matrix OR: M1 ∨ M2 - element-wise logical OR (equivalent to union)
  matrixOr(): number[][] {
    return this.M1.map((row, i) =>
      row.map((val, j) => (val || this.M2[i][j] ? 1 : 0))
    );
  }

  // Matrix AND: M1 ∧ M2 - element-wise logical AND (equivalent to intersection)
  matrixAnd(): number[][] {
    return this.M1.map((row, i) =>
      row.map((val, j) => (val && this.M2[i][j] ? 1 : 0))
    );
  }

  // Matrix NOT: ¬M1 - element-wise logical NOT (complement)
  matrixNot(): number[][] {
    return this.M1.map(row => row.map(v => (v ? 0 : 1)));
  }

  // Boolean matrix multiplication: used for composition
  // Result[i][j] = 1 if ∃k: A[i][k]=1 and B[k][j]=1
  booleanMultiply(A: number[][], B: number[][]): number[][] {
    const n = A.length;
    const res = Array.from({ length: n }, () => Array(n).fill(0));

    // For each row i
    for (let i = 0; i < n; i++) {
      // For each intermediate element k
      for (let k = 0; k < n; k++) {
        // If A[i][k] is 1, check all columns
        if (A[i][k] === 1) {
          for (let j = 0; j < n; j++) {
            // If B[k][j] is also 1, set result to 1
            if (B[k][j] === 1) res[i][j] = 1;
          }
        }
      }
    }
    return res;
  }

  // Combined computed results
  // Compute result as ordered pairs based on selected operation
  get pairResult(): Pair[] {
    switch (this.operation) {
      case 'union': return this.union();
      case 'intersection': return this.intersection();
      case 'difference': return this.difference();
      case 'inverse': return this.inverse(this.R1);
      case 'composition': return this.composition(this.R1, this.R2);
      default: return [];
    }
  }

  // Compute result as matrix based on selected operation
  get matrixResult(): number[][] {
    switch (this.operation) {
      case 'union': return this.matrixOr();
      case 'intersection': return this.matrixAnd();
      case 'difference': return this.M1; // Difference shown as pairs only
      case 'inverse': return this.M1; // Inverse shown as pairs only
      case 'composition': return this.booleanMultiply(this.M1, this.M2);
      default: return this.M1;
    }
  }
}