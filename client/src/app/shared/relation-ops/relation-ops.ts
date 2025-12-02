import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Pair = [number, number];

@Component({
  selector: 'app-relation-ops',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './relation-ops.html',
  styleUrls: ['./relation-ops.css']
})
export class RelationOps {

  A = [1, 2, 3];

  R1: Pair[] = [
    [1, 2],
    [2, 3],
    [3, 1]
  ];

  R2: Pair[] = [
    [2, 3],
    [3, 1],
    [3, 2]
  ];

  M1 = [
    [0, 1, 0],
    [0, 0, 1],
    [1, 0, 0]
  ];

  M2 = [
    [0, 0, 0],
    [0, 0, 1],
    [0, 1, 0]
  ];

  operation = 'union';

  // --------------------------
  // Helper functions for pair comparison
  // --------------------------
  private pairToString(pair: Pair): string {
    return `${pair[0]},${pair[1]}`;
  }

  private stringToPair(str: string): Pair {
    const [a, b] = str.split(',').map(Number);
    return [a, b];
  }

  private pairsEqual(p1: Pair, p2: Pair): boolean {
    return p1[0] === p2[0] && p1[1] === p2[1];
  }

  private removeDuplicatePairs(pairs: Pair[]): Pair[] {
    const seen = new Set<string>();
    return pairs.filter(pair => {
      const key = this.pairToString(pair);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  // --------------------------
  // Ordered Pair Operations
  // --------------------------
  union(): Pair[] {
    const set = new Set(this.R1.map(p => this.pairToString(p)));
    this.R2.forEach(p => set.add(this.pairToString(p)));
    return Array.from(set).map(s => this.stringToPair(s));
  }

  intersection(): Pair[] {
    const s2 = new Set(this.R2.map(p => this.pairToString(p)));
    return this.R1.filter(p => s2.has(this.pairToString(p)));
  }

  difference(): Pair[] {
    const s2 = new Set(this.R2.map(p => this.pairToString(p)));
    return this.R1.filter(p => !s2.has(this.pairToString(p)));
  }

  inverse(R: Pair[]): Pair[] {
    return R.map(([a, b]) => [b, a] as Pair);
  }

  composition(Ra: Pair[], Rb: Pair[]): Pair[] {
    const result: Pair[] = [];

    for (const [a, b] of Ra) {
      for (const [x, c] of Rb) {
        if (b === x) result.push([a, c]);
      }
    }

    return this.removeDuplicatePairs(result);
  }

  // --------------------------
  // Matrix Operations
  // --------------------------
  matrixOr(): number[][] {
    return this.M1.map((row, i) =>
      row.map((val, j) => (val || this.M2[i][j] ? 1 : 0))
    );
  }

  matrixAnd(): number[][] {
    return this.M1.map((row, i) =>
      row.map((val, j) => (val && this.M2[i][j] ? 1 : 0))
    );
  }

  matrixNot(): number[][] {
    return this.M1.map(row => row.map(v => (v ? 0 : 1)));
  }

  booleanMultiply(A: number[][], B: number[][]): number[][] {
    const n = A.length;
    const res = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let k = 0; k < n; k++) {
        if (A[i][k] === 1) {
          for (let j = 0; j < n; j++) {
            if (B[k][j] === 1) res[i][j] = 1;
          }
        }
      }
    }
    return res;
  }

  // --------------------------
  // Combined computed results
  // --------------------------
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

  get matrixResult(): number[][] {
    switch (this.operation) {
      case 'union': return this.matrixOr();
      case 'intersection': return this.matrixAnd();
      case 'difference': return this.M1; // difference doesn't apply
      case 'inverse': return this.M1; // inverse is for pairs only
      case 'composition': return this.booleanMultiply(this.M1, this.M2);
      default: return this.M1;
    }
  }
}