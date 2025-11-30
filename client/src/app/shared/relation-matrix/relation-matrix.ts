import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-relation-matrix',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './relation-matrix.html',
  styleUrls: ['./relation-matrix.css']
})
export class RelationMatrix {

  // User inputs
  setInput = 'a1, a2, a3';
  relationInput = '(a1,a2), (a2,a3)';

  // Parsed data
  A: string[] = [];
  matrix: number[][] = [];
  relationPairs: [string, string][] = [];

  // Parse set and relation
  updateSet() {
    this.A = this.setInput
      .split(',')
      .map(x => x.trim())
      .filter(x => x.length > 0);

    this.buildEmptyMatrix();
    this.updateRelationFromInput();
  }

  updateRelationFromInput() {
    const regex = /\(([^,]+),([^()]+)\)/g;
    let match;

    this.relationPairs = [];

    while ((match = regex.exec(this.relationInput)) !== null) {
      const a = match[1].trim();
      const b = match[2].trim();
      if (this.A.includes(a) && this.A.includes(b)) {
        this.relationPairs.push([a, b]);
      }
    }

    this.buildMatrixFromRelation();
  }

  buildEmptyMatrix() {
    const n = this.A.length;
    this.matrix = Array.from({ length: n }, () =>
      Array(n).fill(0)
    );
  }

  buildMatrixFromRelation() {
    this.buildEmptyMatrix();

    this.relationPairs.forEach(([x, y]) => {
      const i = this.A.indexOf(x);
      const j = this.A.indexOf(y);
      if (i !== -1 && j !== -1) {
        this.matrix[i][j] = 1;
      }
    });
  }

  // Clicking matrix cell toggles relation
  toggleCell(i: number, j: number) {
    this.matrix[i][j] = this.matrix[i][j] === 1 ? 0 : 1;
    this.updateRelationFromMatrix();
  }

  updateRelationFromMatrix() {
    const newPairs: [string, string][] = [];
    const n = this.A.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (this.matrix[i][j] === 1) {
          newPairs.push([this.A[i], this.A[j]]);
        }
      }
    }

    this.relationPairs = newPairs;
    this.relationInput = newPairs.map(p => `(${p[0]}, ${p[1]})`).join(', ');
  }
}
